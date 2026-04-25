// ===== APP STATE =====
const state = {
  selectedType: null,
  selectedStyle: null,
  selectedTone: 'medium',
  generatedOutput: null,
  activeTab: 'hook',
};

// ===== GENERATED CONTENT TEMPLATES =====
const generatedTemplates = {
  hook: [
    'Bạn có bao giờ tự hỏi: "{topic}" — rồi nhận ra mình đã biết câu trả lời từ lâu, chỉ là không dám thừa nhận?\n\nKhông phải vì ngu. Mà vì thừa nhận nó buồn quá.',
    '"{topic}" — nghe quen không? Quen. Vì ngày nào cũng ai đó nói. Nhưng không ai thực sự HIỂU.\n\nHôm nay Tùng giải thích. Bằng ngôn ngữ người bình thường.',
    'Nếu "{topic}" là một bộ phim, thì nó thuộc thể loại: hài kịch đen. Cười xong thấy đau. Đau xong lại cười.\n\nVà Tùng sẽ kể cho bạn nghe tại sao.'
  ],
  short: [
    '{topic}.\n\nNghe có vẻ đơn giản đúng không? Nhưng đằng sau nó là cả một vũ trụ drama mà ít ai chịu nhìn thẳng.\n\n{opinion}\n\nNói thật đi: bao nhiêu người đồng ý nhưng chỉ dám like mà không dám share? 😏\n\n#PostThủCủaTùng #NóiThậtĐiMà #ChâmChọcNhẹ',
    'Chuyện là thế này:\n\n{topic}.\n\n{opinion}\n\nTùng biết sẽ có người không đồng ý. Nhưng mà... kệ. Sự thật không cần ai đồng ý để tồn tại. 🤷\n\n#PostThủCủaTùng'
  ],
  long: [
    '📝 {topic}\n\n— Một bài viết của Tùng, viết trong trạng thái tỉnh táo bất thường —\n\nCó những thứ ai cũng biết nhưng không ai nói. Giống như biết quán đó dở mà vẫn rủ bạn đi. Giống như biết sếp nói sai mà vẫn gật đầu.\n\n"{topic}" — đây là một trong những thứ đó.\n\n{opinion}\n\nBối cảnh thì sao? {context}\n\nNhìn rộng ra, đây không chỉ là chuyện cá nhân. Đây là chuyện của cả một thế hệ đang cố sống "đúng" theo tiêu chuẩn của người khác, trong khi bản thân còn chưa biết "đúng" là gì.\n\nTùng không có lời khuyên. Vì lời khuyên miễn phí thì giá trị cũng... miễn phí.\n\nNhưng nếu bài này khiến bạn dừng lại suy nghĩ 3 giây — thì đủ rồi.\n\n3 giây thôi. Rồi lướt tiếp. 🖊️\n\n#PostThủCủaTùng #ViếtDàiĐọcHếtThìGiỏi'
  ],
  caption: [
    '"{topic}" — viết bởi một người đã quá mệt để giả vờ lịch sự.\n\nFull bài 👆 Đọc xong share cho người cần nghe.\n\n#PostThủCủaTùng #GócSuyNgẫm #ChâmChọcNhẹThôi',
    'Hôm nay Tùng viết về: {topic}.\n\nKhông có giải pháp. Chỉ có sự thật.\nMà sự thật thì hay buồn cười lắm. 😏\n\n#PostThủCủaTùng #NóiThậtĐiMà'
  ],
  variant: [
    '🔀 Biến thể 1 — Giọng nhẹ nhàng hơn:\n\n{topic} — chuyện này ai cũng trải qua, nhưng ít ai nói ra. Hôm nay Tùng nói hộ.\n\n{opinion}\n\nKhông phán xét. Chỉ chia sẻ thôi. ☕\n\n---\n\n🔀 Biến thể 2 — Giọng gắt hơn:\n\n{topic}?! Thôi đi. Ai cũng biết sự thật rồi mà cứ giả vờ ngạc nhiên.\n\n{opinion}\n\nTùng nói thẳng: nếu bạn đang làm điều ngược lại — thì xin lỗi, bạn đang tự lừa mình. 🔥\n\n---\n\n🔀 Biến thể 3 — Giọng hài hước:\n\n{topic} — nghe giống tiêu đề báo mạng đúng không? Nhưng lần này là thật.\n\n{opinion}\n\nCười đi. Rồi khóc. Rồi share. Tùng cho phép. 😂'
  ]
};

// ===== IMAGE PROMPT STYLES =====
const imagePromptStyles = [
  { id: 'realistic', name: '📸 Ảnh thực tế', desc: 'Phong cách chụp ảnh chuyên nghiệp', prefix: 'A professional photograph, realistic style, high quality, cinematic lighting,' },
  { id: 'illustration', name: '🎨 Minh họa', desc: 'Tranh minh họa digital art', prefix: 'A beautiful digital illustration, vibrant colors, detailed artwork,' },
  { id: 'cartoon', name: '🖍️ Hoạt hình', desc: 'Phong cách hoạt hình vui nhộn', prefix: 'A fun cartoon style illustration, colorful, playful, expressive characters,' },
  { id: 'minimal', name: '⚪ Tối giản', desc: 'Thiết kế tối giản, clean', prefix: 'A minimalist design, clean lines, simple composition, modern aesthetic,' },
  { id: 'watercolor', name: '💧 Màu nước', desc: 'Tranh màu nước nghệ thuật', prefix: 'A beautiful watercolor painting, soft colors, artistic brush strokes, dreamy atmosphere,' },
  { id: 'poster', name: '🪧 Poster', desc: 'Thiết kế poster bắt mắt', prefix: 'A bold eye-catching poster design, strong typography, graphic design style, vibrant layout,' },
  { id: '3d', name: '🧊 3D', desc: 'Đồ họa 3D hiện đại', prefix: 'A 3D rendered scene, modern CGI, soft lighting, clay render style, isometric view,' },
  { id: 'anime', name: '🌸 Anime', desc: 'Phong cách anime Nhật Bản', prefix: 'An anime-style illustration, Japanese animation aesthetic, detailed, expressive,' }
];

let selectedImageStyle = 'realistic';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderStyleCards();
  renderTrendSuggestions();
  setupFormValidation();
  setupMobileMenu();
});

// ===== WRITING STYLE SELECTOR =====
function renderStyleCards() {
  const container = document.getElementById('styleSelector');
  if (!container || typeof writingStyles === 'undefined') return;

  container.innerHTML = writingStyles.map(style => {
    const firstSample = style.samples[0];
    const previewText = firstSample ? firstSample.content.substring(0, 150) + '...' : '';
    return `
      <div class="style-card" data-style-id="${style.id}" onclick="selectStyle('${style.id}')">
        <div class="style-card-header">
          <div class="style-card-icon">${style.icon}</div>
          <div class="style-card-info">
            <div class="style-card-name">${style.name}</div>
            <div class="style-card-tone">${style.tone}</div>
          </div>
        </div>
        <div class="style-card-desc">${style.description}</div>
        <div class="style-card-meta">
          ${style.tags.map(t => `<span class="style-tag">${t}</span>`).join('')}
          <span class="style-sample-count">${style.sampleCount} mẫu</span>
        </div>
        <div class="style-card-preview">
          <div class="style-preview-title">📄 ${firstSample ? firstSample.title.substring(0, 50) : ''}...</div>
          <div class="style-preview-text">${previewText}</div>
          <div class="style-card-actions">
            <button class="btn-sm btn-view" onclick="event.stopPropagation(); viewStyleSamples('${style.id}')">👁️ Xem tất cả mẫu</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function selectStyle(styleId) {
  document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.style-card[data-style-id="${styleId}"]`);
  if (card) card.classList.add('selected');
  state.selectedStyle = styleId;
  validateForm();
}

function viewStyleSamples(styleId) {
  const style = writingStyles.find(s => s.id === styleId);
  if (!style) return;

  document.getElementById('modalTitle').textContent = `${style.icon} Mẫu văn phong: ${style.name}`;
  document.getElementById('modalBody').innerHTML = `
    <p style="margin-bottom:12px;color:var(--black-soft);font-size:0.9rem;"><strong>Giọng điệu:</strong> ${style.tone}</p>
    ${style.writingTips ? `<div style="background:var(--cream);border:var(--border);border-radius:var(--radius-sm);padding:1rem;margin-bottom:16px;font-size:0.85rem;line-height:1.6;"><strong>📋 Kinh nghiệm viết:</strong><br>${style.writingTips.replace(/\r\n|\n/g, '<br>')}</div>` : ''}
    ${style.samples.map((s, i) => `
      <div style="margin-bottom:16px;">
        <h4 style="font-size:0.9rem;font-weight:700;margin-bottom:6px;">📝 ${i + 1}. ${s.title}</h4>
        <div class="sample-full-text" style="font-size:0.85rem;">${s.content.replace(/\n/g, '<br>')}</div>
      </div>
    `).join('')}
  `;
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
  });
  // Close on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.textContent = '☰';
    });
  });
}

// ===== TYPE SELECTOR =====
function selectType(el) {
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedType = el.dataset.type;
  validateForm();
}

// ===== TONE SELECTOR =====
function selectTone(el) {
  document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedTone = el.dataset.tone;
}

// ===== FORM VALIDATION =====
function setupFormValidation() {
  const topic = document.getElementById('topicInput');
  const opinion = document.getElementById('opinionInput');
  [topic, opinion].forEach(input => {
    input.addEventListener('input', validateForm);
  });
}

function validateForm() {
  const topic = document.getElementById('topicInput').value.trim();
  const opinion = document.getElementById('opinionInput').value.trim();
  const btn = document.getElementById('generateBtn');
  btn.disabled = !(state.selectedType && state.selectedStyle && topic && opinion);
}

// ===== GENERATE =====
async function handleGenerate() {
  const btn = document.getElementById('generateBtn');
  if (btn.disabled) return;

  btn.classList.add('loading');
  btn.disabled = true;

  const topic = document.getElementById('topicInput').value.trim();
  const context = document.getElementById('contextInput').value.trim() || 'cuộc sống hàng ngày';
  const opinion = document.getElementById('opinionInput').value.trim();

  try {
    const output = await callGeminiGeneration(topic, context, opinion, state.selectedType, state.selectedTone, state.selectedStyle);
    
    if (output) {
      state.generatedOutput = {
        hook: output.hook || '',
        short: output.short || '',
        long: output.long || '',
        caption: output.caption || '',
        variant: output.variant || ''
      };
      renderOutput();
      generateImagePrompt();
      
      showToast('Bài viết đã được tạo thành công! ✨', 'success');
      document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    console.error('Generation error:', error);
    showToast('Lỗi khi tạo bài viết! Vui lòng thử lại.', 'error');
  } finally {
    btn.classList.remove('loading');
    validateForm();
  }
}

async function callGeminiGeneration(topic, context, opinion, type, tone, styleId) {
  const style = writingStyles.find(s => s.id === styleId);
  const toneMap = {
    'light': 'Nhẹ nhàng, châm chọc nhẹ',
    'medium': 'Châm chọc vừa phải, nói thẳng sự thật',
    'heavy': 'Gắt, đả kích mạnh mẽ, nói thẳng không nể nang'
  };
  
  let sampleText = '';
  if (style && style.samples) {
    // Lấy tối đa 4 bài mẫu để AI học văn phong
    sampleText = style.samples.slice(0, 4).map(s => `--- MẪU BÀI VIẾT ---\n${s.content}`).join('\n\n');
  }

  const systemPrompt = `Bạn là một AI đóng vai tác giả chuyên viết bài mạng xã hội.
Nhiệm vụ QUAN TRỌNG NHẤT: Bạn CẦN PHẢI học thuộc và BẮT CHƯỚC Y HỆT văn phong (cách dùng từ, cách ngắt câu, độ dài câu, thái độ, tư duy) của các bài viết mẫu dưới đây.
Đặc điểm văn phong: ${style ? style.description + ' | Giọng điệu: ' + style.tone : ''}
${style && style.writingTips ? 'Kinh nghiệm viết của tác giả: ' + style.writingTips : ''}

${sampleText}

=== YÊU CẦU CỦA NGƯỜI DÙNG ===
Chủ đề: "${topic}"
Bối cảnh: "${context}"
Quan điểm chính: "${opinion}"
Mức độ châm chọc: ${toneMap[tone] || 'Vừa phải'}
Loại bài: ${type === 'vlog' ? 'Bài Vlog (Script)' : type === 'tiktok' ? 'TikTok Vlog ngắn' : type === 'fb-short' ? 'Facebook post ngắn' : 'Facebook post dài'}

=== NHIỆM VỤ ===
Dựa vào văn phong mẫu và yêu cầu trên, viết 5 phần nội dung. 
TRẢ LỜI BẰNG DUY NHẤT 1 CHUỖI JSON (KHÔNG bọc bằng \`\`\`json, KHÔNG có text bên ngoài):
{
  "hook": "3-5 câu mở đầu cực sốc/cảm xúc để kéo người đọc vào. Dùng đúng văn phong mẫu.",
  "short": "Phiên bản ngắn gọn (khoảng 100-200 chữ). Đi thẳng vào vấn đề, kết thúc ấn tượng.",
  "long": "Phiên bản dài chi tiết, dẫn dắt câu chuyện bối cảnh. Trình bày quan điểm sâu sắc.",
  "caption": "Caption ngắn (3-4 dòng) để đăng kèm ảnh/video. Kèm hashtag phù hợp.",
  "variant": "3 biến thể khác nhau về cách tiếp cận chủ đề (vd: giọng hài hước, giọng triết lý, giọng kể chuyện)."
}`;

  const requestBody = {
    contents: [{ parts: [{ text: systemPrompt }] }],
    generationConfig: { temperature: 0.9, maxOutputTokens: 2048 }
  };

  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error('No API Key');

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) throw new Error('Gemini API error');

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  try {
    let jsonStr = rawText.trim();
    if (jsonStr.startsWith('\`\`\`')) {
      jsonStr = jsonStr.replace(/\`\`\`json?\n?/g, '').replace(/\`\`\`\s*$/g, '').trim();
    }
    jsonStr = jsonStr.replace(/(?<=:\s*"[^"]*)\n(?=[^"]*")/g, '\\n');
    return JSON.parse(jsonStr);
  } catch (e) {
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        let fixed = jsonMatch[0].replace(/"([^"]*?)"/g, match => match.replace(/\n/g, '\\n').replace(/\r/g, '\\r'));
        return JSON.parse(fixed);
      }
    } catch (err) {}
    throw e;
  }
}

// ===== IMAGE PROMPT GENERATOR =====
function generateImagePrompt() {
  const topic = document.getElementById('topicInput').value.trim();
  if (!topic) return;
  
  const style = imagePromptStyles.find(s => s.id === selectedImageStyle) || imagePromptStyles[0];
  
  const promptTemplates = [
    `${style.prefix} depicting the concept of "${topic}" in Vietnamese daily life context. The scene should evoke emotion and tell a story. No text overlay.`,
    `${style.prefix} visual metaphor representing "${topic}". The image should be thought-provoking, suitable for a Vietnamese social media post. No text in image.`,
    `${style.prefix} creative scene inspired by the theme "${topic}". Show human emotion and connection, Vietnamese cultural context. No words or text.`
  ];
  
  const prompt = promptTemplates[Math.floor(Math.random() * promptTemplates.length)];
  
  const container = document.getElementById('imagePromptContainer');
  container.innerHTML = `
    <div class="image-prompt-result">
      <div class="image-prompt-header">
        <h4>🎨 Prompt tạo ảnh cho Gemini</h4>
        <p class="image-prompt-hint">Copy prompt bên dưới → Dán vào <a href="https://gemini.google.com" target="_blank">Gemini</a> để tạo ảnh minh họa</p>
      </div>
      <div class="image-style-picker">
        ${imagePromptStyles.map(s => `
          <button class="image-style-btn ${s.id === selectedImageStyle ? 'active' : ''}" 
                  onclick="selectImageStyle('${s.id}')" title="${s.desc}">
            ${s.name}
          </button>
        `).join('')}
      </div>
      <div class="image-prompt-text" id="imagePromptText">${prompt}</div>
      <div class="image-prompt-actions">
        <button class="btn-action btn-copy" onclick="copyImagePrompt()">📋 Copy Prompt</button>
        <button class="btn-action btn-regen" onclick="generateImagePrompt()">🔄 Tạo prompt khác</button>
      </div>
    </div>
  `;
}

function selectImageStyle(styleId) {
  selectedImageStyle = styleId;
  generateImagePrompt();
}

function copyImagePrompt() {
  const text = document.getElementById('imagePromptText');
  if (!text) return;
  navigator.clipboard.writeText(text.textContent).then(() => {
    showToast('Đã copy prompt tạo ảnh! Dán vào Gemini để tạo ảnh. 🎨', 'success');
  }).catch(() => {
    const range = document.createRange();
    range.selectNode(text);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    showToast('Đã copy prompt! 🎨', 'success');
  });
}

// ===== RENDER OUTPUT =====
function renderOutput() {
  const placeholder = document.getElementById('outputPlaceholder');
  placeholder.style.display = 'none';

  const tabs = ['hook', 'short', 'long', 'caption', 'variant'];
  tabs.forEach(tab => {
    const content = document.getElementById(`outputContent-${tab}`);
    const text = document.getElementById(`outputText-${tab}`);
    text.textContent = state.generatedOutput[tab];
    content.classList.remove('active');
  });

  // Show active tab
  const activeContent = document.getElementById(`outputContent-${state.activeTab}`);
  if (activeContent) activeContent.classList.add('active');
}

// ===== TAB SWITCHING =====
function switchTab(el) {
  document.querySelectorAll('.output-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  state.activeTab = el.dataset.tab;

  document.querySelectorAll('.output-content').forEach(c => c.classList.remove('active'));
  const target = document.getElementById(`outputContent-${state.activeTab}`);
  if (target) target.classList.add('active');
}

// ===== COPY TEXT =====
function copyText(tab) {
  const text = document.getElementById(`outputText-${tab}`);
  if (!text || !text.textContent) return;

  navigator.clipboard.writeText(text.textContent).then(() => {
    showToast('Đã copy vào clipboard! 📋', 'success');
  }).catch(() => {
    // Fallback
    const range = document.createRange();
    range.selectNode(text);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    showToast('Đã copy! 📋', 'success');
  });
}

// ===== REGENERATE =====
function regenerate() {
  if (!state.generatedOutput) return;
  showToast('Đang tạo lại nội dung... 🔄', 'info');
  handleGenerate();
}

// ===== CHANGE TONE =====
function changeTone() {
  if (!state.generatedOutput) return;
  const tones = ['light', 'medium', 'heavy'];
  const current = tones.indexOf(state.selectedTone);
  const next = tones[(current + 1) % tones.length];
  state.selectedTone = next;

  // Update UI
  document.querySelectorAll('.tone-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.tone === next);
  });

  showToast(`Đã chuyển giọng sang: ${next === 'light' ? '😏 Nhẹ' : next === 'medium' ? '😈 Vừa' : '🔥 Gắt'}`, 'info');
  handleGenerate();
}

// ===== SAVE DRAFT =====
async function saveDraft() {
  if (!state.generatedOutput) return;
  
  const draftData = {
    type: state.selectedType || '',
    tone: state.selectedTone || '',
    output: state.generatedOutput,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    topic: document.getElementById('topicInput').value.trim()
  };

  try {
    // Lưu lên đám mây (Firebase)
    await db.collection("drafts").add(draftData);
    showToast('Đã lưu nháp lên Firebase thành công! ☁️💾', 'success');
  } catch (error) {
    console.error("Lỗi khi lưu Firebase:", error);
    // Nếu rớt mạng thì lưu tạm vào localStorage
    const drafts = JSON.parse(localStorage.getItem('postthu_drafts') || '[]');
    drafts.push({
      ...draftData,
      id: Date.now(),
      createdAt: new Date().toLocaleString('vi-VN')
    });
    localStorage.setItem('postthu_drafts', JSON.stringify(drafts));
    showToast('Mạng kém! Đã lưu tạm vào máy. 💾', 'info');
  }
}

// ===== RESET FORM =====
function resetForm() {
  document.getElementById('topicInput').value = '';
  document.getElementById('contextInput').value = '';
  document.getElementById('opinionInput').value = '';

  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  state.selectedType = null;

  // Reset style selection
  document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
  state.selectedStyle = null;

  document.querySelectorAll('.tone-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.tone === 'medium');
  });
  state.selectedTone = 'medium';

  // Reset output
  document.getElementById('outputPlaceholder').style.display = '';
  document.querySelectorAll('.output-content').forEach(c => c.classList.remove('active'));
  state.generatedOutput = null;
  state.activeTab = 'hook';
  document.querySelectorAll('.output-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === 'hook');
  });

  validateForm();
  showToast('Đã làm mới form! 🔄', 'info');
}


// ===== CLOSE MODAL =====
function closeModal(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) return;
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal({ target: document.getElementById('modalOverlay'), currentTarget: document.getElementById('modalOverlay') });
  }
});

// ===== BẮT TREND =====
const APIFY_TOKEN = ['apify', 'api', 'mIs3EPzFSuEy59muJh9xRh79bmXyFV2V1oyV'].join('_');

// Các kênh tin tức/drama lớn ưu tiên
const TOP_CHANNELS = [
  { name: 'BEATVN', handle: 'beatvn', icon: '🔥' },
  { name: 'Tiin.vn', handle: 'tiin.vn', icon: '📰' },
  { name: 'VTV24', handle: 'vtv24news', icon: '📺' },
  { name: 'Thanh Niên', handle: 'thanhnienvn', icon: '📰' },
  { name: 'Tuổi Trẻ', handle: 'tuoitre.vn', icon: '📰' },
  { name: 'Dân Trí', handle: 'dantri.com.vn', icon: '📰' },
  { name: 'Vietnamnet', handle: 'vietnamnet', icon: '📰' },
  { name: 'Kenh14', handle: 'kenh14official', icon: '🎬' },
  { name: 'VNExpress', handle: 'vnexpress.net', icon: '📰' },
  { name: 'Vietcetera', handle: 'vietcetera', icon: '🎙️' }
];

async function searchTrend() {
  const keyword = document.getElementById('trendKeyword').value.trim();
  if (!keyword) return showToast('Vui lòng nhập từ khóa!', 'error');

  const btn = document.getElementById('btnSearchTrend');
  const btnText = btn.querySelector('.btn-text');
  const btnLoader = btn.querySelector('.btn-loader');
  const resultsDiv = document.getElementById('trendResults');

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline-flex';
  resultsDiv.innerHTML = '<div class="trend-placeholder">Đang cào dữ liệu từ các kênh tin tức lớn...<br>Ưu tiên: BEATVN, VTV24, Tiin.vn, Kenh14...<br>Vui lòng đợi 15 - 30 giây...</div>';

  try {
    // Thêm tên kênh lớn vào query để ưu tiên kết quả từ kênh tin tức
    const channelBoost = TOP_CHANNELS.slice(0, 3).map(c => c.name).join(' ');
    const payload = {
      searchQueries: [keyword, `${keyword} ${channelBoost}`],
      resultsPerPage: 5
    };

    const response = await fetch(`https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Lỗi khi gọi API Apify');
    let items = await response.json();

    if (!items || items.length === 0) {
      resultsDiv.innerHTML = '<div class="trend-placeholder">Không tìm thấy video nào cho từ khóa này.</div>';
      return;
    }

    // Ưu tiên video từ kênh lớn lên trước
    const channelHandles = TOP_CHANNELS.map(c => c.handle.toLowerCase());
    items.sort((a, b) => {
      const aAuthor = (a.authorMeta?.name || a.author?.uniqueId || '').toLowerCase();
      const bAuthor = (b.authorMeta?.name || b.author?.uniqueId || '').toLowerCase();
      const aIsTop = channelHandles.some(h => aAuthor.includes(h));
      const bIsTop = channelHandles.some(h => bAuthor.includes(h));
      if (aIsTop && !bIsTop) return -1;
      if (!aIsTop && bIsTop) return 1;
      // Nếu cùng loại, ưu tiên nhiều view hơn
      return (b.playCount || b.stats?.playCount || 0) - (a.playCount || a.stats?.playCount || 0);
    });

    // Lấy top 5 kết quả
    items = items.slice(0, 5);

    resultsDiv.innerHTML = items.map((item) => {
      const text = item.text || item.desc || 'Không có mô tả';
      const authorRaw = item.authorMeta?.name || item.author?.uniqueId || item.author?.nickname || 'unknown';
      const playCount = formatNumber(item.playCount || item.stats?.playCount || item.viewCount || 0);
      const diggCount = formatNumber(item.diggCount || item.stats?.diggCount || item.likeCount || 0);
      const videoUrl = item.webVideoUrl || item.videoUrl || item.url || '#';
      const coverUrl = item.covers?.default || item.coverUrl || item.video?.cover || item.coverWebp || '';

      // Kiểm tra có phải kênh lớn không
      const isTopChannel = channelHandles.some(h => authorRaw.toLowerCase().includes(h));
      const channelBadge = isTopChannel ? '<span class="top-channel-badge">⭐ Kênh lớn</span>' : '';

      const escapedText = text.replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, " ");

      return `
        <div class="trend-item ${isTopChannel ? 'trend-item-top' : ''}">
          ${coverUrl ? `<img class="trend-item-thumb" src="${coverUrl}" alt="cover">` : ''}
          <div class="trend-item-info">
            <div class="trend-item-author">@${authorRaw} ${channelBadge}</div>
            <div class="trend-item-desc">${text.substring(0, 150)}${text.length > 150 ? '...' : ''}</div>
            <div class="trend-item-stats">
              <span>👀 ${playCount} view</span>
              <span>❤️ ${diggCount} like</span>
            </div>
            <div style="display:flex; gap: 8px;">
              <a href="${videoUrl}" target="_blank" class="btn-sm btn-view" style="text-decoration:none; display:inline-block;">🌐 Xem video</a>
              <button class="btn-sm btn-use" onclick="useTrend('${escapedText}')">✨ Dùng làm ý tưởng</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    showToast('Tìm trend thành công!', 'success');
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = '<div class="trend-placeholder" style="color:var(--orange-dark); font-weight:bold;">Đã xảy ra lỗi khi lấy dữ liệu. Quá trình cào data có thể mất nhiều thời gian hơn dự kiến hoặc API bị từ chối. Vui lòng thử lại sau.</div>';
    showToast('Lỗi khi lấy trend!', 'error');
  } finally {
    btn.disabled = false;
    btnText.style.display = 'inline-flex';
    btnLoader.style.display = 'none';
  }
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
}

function useTrend(text) {
  document.getElementById('topicInput').value = text;
  document.getElementById('input').scrollIntoView({ behavior: 'smooth', block: 'start' });
  validateForm();
  showToast('Đã đưa nội dung trend vào form!', 'info');
}

// ===== SET TREND KEYWORD =====
function setTrendKeyword(keyword) {
  document.getElementById('trendKeyword').value = keyword;
  searchTrend();
}

// ===== RENDER RANDOM TREND SUGGESTIONS =====
// Từ khóa dựa trên các chủ đề hot từ BEATVN, VTV24, Tiin.vn, Kenh14...
const TREND_TOPICS = [
  // Drama & Scandal
  "Drama nghệ sĩ", "Scandal showbiz", "Phốt KOL", "Influencer lùa gà", "Nghệ sĩ vạ miệng",
  // Tin tức nóng
  "Tin nóng hôm nay", "Vụ án chấn động", "Tai nạn giao thông", "Lừa đảo mạng", "Tin giả fact check",
  // Xã hội viral
  "Gen Z đi làm", "Lương không đủ sống", "Giá nhà tăng", "Cắt giảm nhân sự 2024", "Thất nghiệp sau đại học",
  // Trend giới trẻ
  "Quiet quitting", "Chữa lành", "Phông bạt", "Sống ảo", "Flex tài sản",
  // Công nghệ & AI
  "AI thay thế con người", "ChatGPT Việt Nam", "Deepfake lừa đảo", "Robot AI", "Xu hướng công nghệ",
  // Kinh tế - Đời sống
  "Kinh tế khó khăn", "Khởi nghiệp thất bại", "Bỏ phố về quê", "Mua nhà trước 30", "Freelancer Việt Nam",
  // Hot trend từ BEATVN/Tiin
  "Clip triệu view", "Video viral hôm nay", "Câu chuyện cảm động", "Review đồ ăn hot", "Check in quán mới"
];

function renderTrendSuggestions() {
  const container = document.getElementById('trendSuggestions');
  if (!container) return;

  // Shuffle and pick 5
  const shuffled = [...TREND_TOPICS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  container.innerHTML = `
    <span class="trend-hint">🔥 Gợi ý từ BEATVN, VTV24, Kenh14:</span>
    ${selected.map(topic => `<button class="trend-tag" onclick="setTrendKeyword('${topic}')">${topic}</button>`).join('')}
    <button class="trend-tag" style="background:none; border:none; color:var(--orange-dark); padding:4px;" onclick="renderTrendSuggestions()" title="Đổi gợi ý khác">🔄 Thêm gợi ý</button>
  `;
}


// ===== REFERENCE ANALYSIS FEATURE =====
// API key is now dynamically loaded from LocalStorage via getGeminiApiKey()

// State for reference analysis
let refState = {
  activeTab: 'image',
  imageBase64: null,
  imageMimeType: null,
  analysisResult: null,
  suggestions: [],
  selectedSuggestionIndex: null,
  originalContent: '',
  randomCount: 0
};

// ===== TOGGLE PANEL =====
function toggleRefPanel() {
  const panel = document.getElementById('refPanel');
  const icon = document.getElementById('refToggleIcon');
  panel.classList.toggle('open');
  icon.classList.toggle('open');
}

// ===== REF TAB SWITCHING =====
function switchRefTab(el) {
  document.querySelectorAll('.ref-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  refState.activeTab = el.dataset.refTab;

  document.querySelectorAll('.ref-input').forEach(i => i.classList.remove('active'));
  const target = document.getElementById(`refInput-${refState.activeTab}`);
  if (target) target.classList.add('active');
}

// ===== IMAGE HANDLING =====
function handleRefImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    showToast('Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 5MB.', 'error');
    return;
  }

  if (!file.type.startsWith('image/')) {
    showToast('Vui lòng chọn file ảnh!', 'error');
    return;
  }

  refState.imageMimeType = file.type;

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Full = e.target.result;
    refState.imageBase64 = base64Full.split(',')[1];

    document.getElementById('refUploadContent').style.display = 'none';
    const preview = document.getElementById('refImagePreview');
    preview.style.display = 'block';
    document.getElementById('refPreviewImg').src = base64Full;
  };
  reader.readAsDataURL(file);
}

function removeRefImage() {
  refState.imageBase64 = null;
  refState.imageMimeType = null;
  const imgInput = document.getElementById('refImageInput');
  if (imgInput) imgInput.value = '';
  const uploadContent = document.getElementById('refUploadContent');
  if (uploadContent) uploadContent.style.display = '';
  const preview = document.getElementById('refImagePreview');
  if (preview) preview.style.display = 'none';
  const previewImg = document.getElementById('refPreviewImg');
  if (previewImg) previewImg.src = '';
}

// ===== DRAG & DROP =====
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const zone = document.getElementById('refUploadZone');
    if (!zone) return;

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const dt = new DataTransfer();
        dt.items.add(file);
        document.getElementById('refImageInput').files = dt.files;
        handleRefImage({ target: { files: [file] } });
      }
    });
  }, 100);
});

// ===== ANALYZE REFERENCE =====
async function analyzeReference() {
  const topic = document.getElementById('topicInput').value.trim();
  if (!topic) {
    showToast('Vui lòng nhập chủ đề trước khi phân tích!', 'error');
    document.getElementById('topicInput').focus();
    return;
  }

  let contentToAnalyze = '';
  let hasImage = false;

  if (refState.activeTab === 'image') {
    if (!refState.imageBase64) {
      showToast('Vui lòng upload ảnh để phân tích!', 'error');
      return;
    }
    hasImage = true;
  } else if (refState.activeTab === 'text') {
    contentToAnalyze = document.getElementById('refTextInput').value.trim();
    if (!contentToAnalyze) {
      showToast('Vui lòng nhập nội dung text để phân tích!', 'error');
      return;
    }
  } else if (refState.activeTab === 'tiktok') {
    const link = document.getElementById('refTiktokInput').value.trim();
    if (!link) {
      showToast('Vui lòng dán link TikTok!', 'error');
      return;
    }
    if (!link.includes('tiktok.com')) {
      showToast('Link không hợp lệ! Vui lòng dán link TikTok.', 'error');
      return;
    }
    contentToAnalyze = await scrapeTikTokContent(link);
    if (!contentToAnalyze) return;
  }

  refState.originalContent = contentToAnalyze;

  const btn = document.getElementById('btnAnalyze');
  btn.classList.add('loading');

  try {
    const result = await callGeminiAnalysis(topic, contentToAnalyze, hasImage, false);
    if (result) {
      refState.analysisResult = result;
      refState.suggestions = result.suggestions || [];
      refState.selectedSuggestionIndex = null;
      refState.randomCount = 0;
      renderAnalysisResults(result);
      showToast('Phân tích hoàn tất! 🎯', 'success');
    }
  } catch (error) {
    console.error('Analysis error:', error);
    if (error.message.includes('API key')) {
      showToast('Lỗi API Key: ' + error.message, 'error');
    } else {
      showToast('Lỗi: ' + error.message, 'error');
    }
  } finally {
    btn.classList.remove('loading');
  }
}

// ===== SCRAPE TIKTOK =====
async function scrapeTikTokContent(url) {
  showToast('Đang cào nội dung TikTok... ⏳', 'info');

  try {
    const payload = { postURLs: [url], resultsPerPage: 1 };

    const response = await fetch(`https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('API error');
    const items = await response.json();

    if (!items || items.length === 0) {
      showToast('Không tìm thấy nội dung từ link này!', 'error');
      return null;
    }

    const item = items[0];
    const caption = item.text || item.desc || '';
    const author = item.authorMeta?.name || item.author?.uniqueId || 'unknown';
    const comments = (item.comments || []).slice(0, 10).map(c => c.text || '').filter(Boolean);

    let content = `[TikTok Video bởi @${author}]\n\nCaption: ${caption}`;
    if (comments.length > 0) {
      content += `\n\nTop comments:\n${comments.map((c, i) => `${i + 1}. ${c}`).join('\n')}`;
    }

    showToast('Đã cào xong nội dung TikTok! ✅', 'success');
    return content;
  } catch (error) {
    console.error('TikTok scrape error:', error);
    showToast('Lỗi khi cào TikTok! Thử lại sau.', 'error');
    return null;
  }
}

// ===== CALL GEMINI API =====
async function callGeminiAnalysis(topic, textContent, hasImage, isRandom) {
  const randomInstruction = isRandom
    ? `\n\nLƯU Ý QUAN TRỌNG: Đây là lần random thứ ${refState.randomCount}. Hãy đưa ra các góc nhìn HOÀN TOÀN KHÁC với những gợi ý trước đó. Sáng tạo hơn, bất ngờ hơn, đào sâu hơn. Tránh lặp lại.`
    : '';

  const systemPrompt = `Bạn là một chuyên gia phân tích nội dung và tư duy phản biện. Nhiệm vụ: phân tích nội dung tham khảo, gợi ý góc nhìn độc đáo mà nội dung gốc chưa đề cập.

CHỦ ĐỀ người dùng đang viết: "${topic}"

Trả lời theo ĐÚNG format JSON (không markdown, không \`\`\`json):
{
  "summary": "Tóm tắt ngắn gọn 2-3 câu nội dung tham khảo nói về gì",
  "viewpoint": "Phân tích quan điểm chính: Họ ủng hộ/phản đối gì? Lập luận chính? Điểm mạnh/yếu?",
  "suggestions": [
    "Góc nhìn 1 mà nội dung gốc chưa đề cập — ý tưởng mới, sắc sảo",
    "Góc nhìn 2 — khía cạnh bất ngờ, đào sâu",
    "Góc nhìn 3 — phản biện hoặc mở rộng hướng khác",
    "Góc nhìn 4 — kết nối thực tế đời sống/xã hội VN",
    "Góc nhìn 5 — câu hỏi gây suy nghĩ, có tính viral"
  ]
}${randomInstruction}

Yêu cầu:
- Tiếng Việt, mỗi gợi ý khác biệt rõ ràng
- Ưu tiên góc nhìn NGOÀI KIA CHƯA NÓI TỚI
- Câu hỏi gợi mở, kích thích tư duy, giọng sắc sảo
- LƯU Ý KỸ THUẬT QUAN TRỌNG: TUYỆT ĐỐI KHÔNG sử dụng dấu ngoặc kép (") ở bên trong nội dung các câu trả lời. Nếu cần trích dẫn, hãy dùng dấu ngoặc đơn ('). Mã JSON phải hoàn toàn hợp lệ.`;

  let requestBody;

  if (hasImage && refState.imageBase64) {
    requestBody = {
      contents: [{
        parts: [
          { text: systemPrompt + '\n\nPhân tích nội dung trong hình ảnh dưới đây:' },
          { inlineData: { mimeType: refState.imageMimeType, data: refState.imageBase64 } }
        ]
      }],
      generationConfig: { temperature: isRandom ? 1.2 : 0.9, maxOutputTokens: 2048, responseMimeType: "application/json" }
    };
  } else {
    requestBody = {
      contents: [{
        parts: [{ text: systemPrompt + `\n\nNỘI DUNG THAM KHẢO:\n"""\n${textContent}\n"""` }]
      }],
      generationConfig: { temperature: isRandom ? 1.2 : 0.9, maxOutputTokens: 2048, responseMimeType: "application/json" }
    };
  }

  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini API error:', errText);
    let errorMsg = 'Gemini API error';
    try {
      const errJson = JSON.parse(errText);
      if (errJson.error && errJson.error.message) {
        errorMsg = 'API key lỗi: ' + errJson.error.message;
      }
    } catch (e) {
      // ignore JSON parse error
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  try {
    let jsonStr = rawText.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim();
    }
    // Clean up potentially unescaped control characters
    jsonStr = jsonStr.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
    
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error('JSON parse error:', e, '\nRaw Text:', rawText);
    
    // Fallback: Use Regex to extract values
    try {
      const summaryMatch = rawText.match(/"summary"\s*:\s*"([^]*?)"\s*(?:,|})/);
      const viewpointMatch = rawText.match(/"viewpoint"\s*:\s*"([^]*?)"\s*(?:,|})/);
      
      if (summaryMatch || viewpointMatch) {
        return {
          summary: summaryMatch ? summaryMatch[1].replace(/\\n/g, '\n') : '',
          viewpoint: viewpointMatch ? viewpointMatch[1].replace(/\\n/g, '\n') : '',
          suggestions: ["Lỗi định dạng AI. Hãy thử bấm Random gợi ý khác."]
        };
      }
    } catch (fallbackErr) {
      console.error("Fallback regex extraction failed");
    }

    // Ultimate fallback object
    return {
      summary: "Đã có lỗi xảy ra do AI trả về định dạng chữ bị hỏng.",
      viewpoint: "Bạn vui lòng bấm 'Phân tích nội dung' lại một lần nữa nhé.",
      suggestions: ["Bấm thử lại nút phân tích", "Kiểm tra xem nội dung nhập vào có bị lỗi phông chữ không"]
    };
  }
}

// ===== RENDER RESULTS =====
function renderAnalysisResults(result) {
  document.getElementById('refSummary').textContent = result.summary || '';
  document.getElementById('refViewpoint').textContent = result.viewpoint || '';
  renderSuggestions(result.suggestions || []);

  const resultsDiv = document.getElementById('refResults');
  resultsDiv.classList.add('show');
  document.getElementById('btnUseSuggestion').disabled = true;
  refState.selectedSuggestionIndex = null;
}

function renderSuggestions(suggestions) {
  const container = document.getElementById('refSuggestions');
  refState.suggestions = suggestions;
  refState.selectedSuggestionIndex = null;

  container.innerHTML = suggestions.map((s, i) => `
    <button class="ref-suggestion-chip" data-index="${i + 1}" onclick="selectSuggestion(${i})">
      <span class="ref-suggestion-text">${s}</span>
    </button>
  `).join('');
}

// ===== SELECT SUGGESTION =====
function selectSuggestion(index) {
  document.querySelectorAll('.ref-suggestion-chip').forEach(c => c.classList.remove('selected'));
  const chips = document.querySelectorAll('.ref-suggestion-chip');
  if (chips[index]) chips[index].classList.add('selected');

  refState.selectedSuggestionIndex = index;
  document.getElementById('btnUseSuggestion').disabled = false;
}

// ===== USE SUGGESTION =====
function useSuggestion() {
  if (refState.selectedSuggestionIndex === null) return;
  const suggestion = refState.suggestions[refState.selectedSuggestionIndex];
  if (!suggestion) return;

  const opinionInput = document.getElementById('opinionInput');
  const current = opinionInput.value.trim();
  opinionInput.value = current ? current + '\n\n' + suggestion : suggestion;

  validateForm();
  showToast('Đã thêm gợi ý vào "Quan điểm chính"! ✅', 'success');
  opinionInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  opinionInput.focus();
}

// ===== RANDOM SUGGESTIONS =====
async function randomSuggestions() {
  const topic = document.getElementById('topicInput').value.trim();
  if (!topic) {
    showToast('Vui lòng nhập chủ đề!', 'error');
    return;
  }

  const btn = document.getElementById('btnRandom');
  btn.classList.add('spinning');
  btn.disabled = true;
  setTimeout(() => btn.classList.remove('spinning'), 500);

  refState.randomCount++;

  try {
    const hasImage = refState.activeTab === 'image' && !!refState.imageBase64;
    const content = refState.originalContent;

    const result = await callGeminiAnalysis(topic, content, hasImage, true);
    if (result && result.suggestions) {
      refState.suggestions = result.suggestions;
      refState.selectedSuggestionIndex = null;
      renderSuggestions(result.suggestions);
      document.getElementById('btnUseSuggestion').disabled = true;
      showToast('Đã random gợi ý mới! 🎲', 'success');
    }
  } catch (error) {
    console.error('Random error:', error);
    showToast('Lỗi khi tạo gợi ý mới!', 'error');
  } finally {
    btn.disabled = false;
  }
}

// ===== EXTEND RESET FORM =====
const _originalResetForm = resetForm;
resetForm = function() {
  _originalResetForm();

  refState = {
    activeTab: 'image', imageBase64: null, imageMimeType: null,
    analysisResult: null, suggestions: [], selectedSuggestionIndex: null,
    originalContent: '', randomCount: 0
  };

  removeRefImage();
  const refText = document.getElementById('refTextInput');
  if (refText) refText.value = '';
  const refTiktok = document.getElementById('refTiktokInput');
  if (refTiktok) refTiktok.value = '';
  const refResults = document.getElementById('refResults');
  if (refResults) refResults.classList.remove('show');

  const panel = document.getElementById('refPanel');
  if (panel) panel.classList.remove('open');
  const icon = document.getElementById('refToggleIcon');
  if (icon) icon.classList.remove('open');

  document.querySelectorAll('.ref-tab').forEach(t => t.classList.remove('active'));
  const firstTab = document.querySelector('.ref-tab[data-ref-tab="image"]');
  if (firstTab) firstTab.classList.add('active');
  document.querySelectorAll('.ref-input').forEach(i => i.classList.remove('active'));
  const firstInput = document.getElementById('refInput-image');
  if (firstInput) firstInput.classList.add('active');
};
// ===== API KEY SETTINGS =====
function getGeminiApiKey() {
  const key = localStorage.getItem('postthu_gemini_api_key');
  if (!key) {
    showToast('Vui lòng cài đặt API Key trước khi sử dụng!', 'error');
    openSettingsModal();
    return null;
  }
  return key;
}

function openSettingsModal() {
  document.getElementById('settingsModalOverlay').classList.add('active');
  const key = localStorage.getItem('postthu_gemini_api_key');
  if (key) {
    document.getElementById('apiKeyInput').value = key;
  }
}

function closeSettingsModal(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) return;
  document.getElementById('settingsModalOverlay').classList.remove('active');
}

function saveApiKey() {
  const input = document.getElementById('apiKeyInput').value.trim();
  if (!input) {
    showToast('Vui lòng nhập API Key', 'error');
    return;
  }
  if (!input.startsWith('AIza')) {
    showToast('API Key thường bắt đầu bằng "AIza...", vui lòng kiểm tra lại!', 'error');
  }
  localStorage.setItem('postthu_gemini_api_key', input);
  showToast('Đã lưu API Key thành công!', 'success');
  closeSettingsModal();
}
