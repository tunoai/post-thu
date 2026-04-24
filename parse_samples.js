const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { parse } = require('csv-parse/sync');

const dir = path.join(__dirname, 'VĂN PHONG MẪU');
const styles = [];

// ===== 1. FACEBOOK - HIEU ORION =====
{
  const content = fs.readFileSync(path.join(dir, 'FACEBOOK - HIEU ORION.csv'), 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, relax_column_count: true, relax_quotes: true });
  const posts = records.filter(r => r['VĂN PHONG MẪU'] && r['VĂN PHONG MẪU'].trim().length > 100).map(r => r['VĂN PHONG MẪU'].trim());
  
  styles.push({
    id: 'hieu-orion',
    name: 'Hiếu Orion',
    icon: '🦁',
    platform: 'facebook',
    description: 'Trầm tĩnh, sâu sắc, kể chuyện có chiều sâu. Hay dùng liên tưởng đời thường để truyền tải thông điệp ý nghĩa.',
    tone: 'Sâu lắng, triết lý nhẹ, chân thành',
    tags: ['Facebook', 'Kể chuyện', 'Triết lý'],
    sampleCount: posts.length,
    samples: posts.slice(0, 5).map((p, i) => ({
      title: p.split('\n')[0].substring(0, 80).replace(/[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ,.:!?"\-()\/]/gi, '').trim() || `Mẫu ${i+1}`,
      content: p
    }))
  });
}

// ===== 2. FACEBOOK - TONY BUỔI SÁNG =====
{
  const content = fs.readFileSync(path.join(dir, 'FACEBOOK - TONY BUỔI SÁNG.csv'), 'utf-8');
  const records = parse(content, { columns: true, skip_empty_lines: true, relax_column_count: true, relax_quotes: true });
  const posts = records.filter(r => r['VĂN PHONG MẪU'] && r['VĂN PHONG MẪU'].trim().length > 100).map(r => r['VĂN PHONG MẪU'].trim());
  
  styles.push({
    id: 'tony-buoi-sang',
    name: 'Tony Buổi Sáng',
    icon: '☀️',
    platform: 'facebook',
    description: 'Truyền cảm hứng, tích cực, dùng câu chuyện thực tế để rút bài học. Giọng ấm áp, gần gũi nhưng sâu sắc.',
    tone: 'Truyền cảm hứng, tích cực, mentor',
    tags: ['Facebook', 'Truyền cảm hứng', 'Bài học'],
    sampleCount: posts.length,
    samples: posts.slice(0, 5).map((p, i) => ({
      title: p.split('\n')[0].substring(0, 80).replace(/[^\w\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ,.:!?"\-()\/]/gi, '').trim() || `Mẫu ${i+1}`,
      content: p
    }))
  });
}

// ===== 3. FACEBOOK - TUNGCHU =====
{
  const wb = XLSX.readFile(path.join(dir, 'FACEBOOK - TUNGCHU.xlsx'));
  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  const posts = data.filter(r => r['VĂN PHONG MẪU'] && String(r['VĂN PHONG MẪU']).trim().length > 50).map(r => String(r['VĂN PHONG MẪU']).trim());
  
  styles.push({
    id: 'tungchu-facebook',
    name: 'TungChu (Facebook)',
    icon: '🔥',
    platform: 'facebook',
    description: 'Thẳng thắn, châm chọc, gần gũi kiểu "anh hàng xóm". Viết như nói, kể chuyện đời thường xen lẫn quan điểm sắc bén.',
    tone: 'Châm chọc, thẳng thắn, bình dân',
    tags: ['Facebook', 'Châm chọc', 'Đời thường'],
    sampleCount: posts.length,
    samples: posts.slice(0, 5).map((p, i) => ({
      title: (p.split('\n').find(l => l.trim().length > 10) || `Mẫu ${i+1}`).substring(0, 80).replace(/[\[\]]/g, '').trim(),
      content: p
    }))
  });
}

// ===== 4. VLOG TIKTOK TUNGTAMSU =====
{
  const wb = XLSX.readFile(path.join(dir, 'VLOG TIKTOK TUNGTAMSU.xlsx'));
  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  const cols = Object.keys(data[0] || {});
  const titleCol = cols[0]; // KINH NGHIỆM LÀM VLOG
  const contentCol = cols[1]; // long text column
  
  const posts = data.filter(r => r[contentCol] && String(r[contentCol]).trim().length > 50).map(r => ({
    title: String(r[titleCol] || '').trim(),
    content: String(r[contentCol]).trim()
  }));
  
  styles.push({
    id: 'tungtamsu-tiktok',
    name: 'TungTamSu (TikTok Vlog)',
    icon: '🎬',
    platform: 'tiktok',
    description: 'Vlog đời thường, giọng kể chuyện tự nhiên, có twist bất ngờ. Hook cảm xúc mạnh, chuyển đổi góc nhìn linh hoạt.',
    tone: 'Tự nhiên, twist, hook cảm xúc',
    tags: ['TikTok', 'Vlog', 'Kể chuyện'],
    sampleCount: posts.length,
    // Also capture the "KINH NGHIỆM LÀM VLOG" tips as metadata
    writingTips: cols[1] ? cols[1].replace(/\\r\\n/g, '\n').trim() : '',
    samples: posts.slice(0, 5).map(p => ({
      title: p.title.substring(0, 80) || 'Mẫu vlog',
      content: p.content
    }))
  });
}

// Write output
const output = `// Auto-generated from VĂN PHONG MẪU folder
// Generated: ${new Date().toISOString()}

const writingStyles = ${JSON.stringify(styles, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'writing-styles.js'), output, 'utf-8');
console.log('✅ Generated writing-styles.js');
console.log('\nStyles:');
styles.forEach(s => {
  console.log(`  ${s.icon} ${s.name} - ${s.sampleCount} samples - [${s.tags.join(', ')}]`);
  console.log(`    "${s.description}"`);
});
