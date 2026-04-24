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
    '📝 {topic}\n\n— Một bài viết của Tùng, viết trong trạng thái tỉnh táo bất thường —\n\nMở bài:\nCó những thứ ai cũng biết nhưng không ai nói. Giống như biết quán đó dở mà vẫn rủ bạn đi. Giống như biết sếp nói sai mà vẫn gật đầu.\n\n"{topic}" — đây là một trong những thứ đó.\n\nThân bài:\n{opinion}\n\nBối cảnh thì sao? {context}\n\nNhìn rộng ra, đây không chỉ là chuyện cá nhân. Đây là chuyện của cả một thế hệ đang cố sống "đúng" theo tiêu chuẩn của người khác, trong khi bản thân còn chưa biết "đúng" là gì.\n\nKết bài:\nTùng không có lời khuyên. Vì lời khuyên miễn phí thì giá trị cũng... miễn phí.\n\nNhưng nếu bài này khiến bạn dừng lại suy nghĩ 3 giây — thì đủ rồi.\n\n3 giây thôi. Rồi lướt tiếp. 🖊️\n\n#PostThủCủaTùng #ViếtDàiĐọcHếtThìGiỏi'
  ],
  caption: [
    '"{topic}" — viết bởi một người đã quá mệt để giả vờ lịch sự.\n\nFull bài 👆 Đọc xong share cho người cần nghe.\n\n#PostThủCủaTùng #GócSuyNgẫm #ChâmChọcNhẹThôi',
    'Hôm nay Tùng viết về: {topic}.\n\nKhông có giải pháp. Chỉ có sự thật.\nMà sự thật thì hay buồn cười lắm. 😏\n\n#PostThủCủaTùng #NóiThậtĐiMà'
  ],
  variant: [
    '🔀 Biến thể 1 — Giọng nhẹ nhàng hơn:\n\n{topic} — chuyện này ai cũng trải qua, nhưng ít ai nói ra. Hôm nay Tùng nói hộ.\n\n{opinion}\n\nKhông phán xét. Chỉ chia sẻ thôi. ☕\n\n---\n\n🔀 Biến thể 2 — Giọng gắt hơn:\n\n{topic}?! Thôi đi. Ai cũng biết sự thật rồi mà cứ giả vờ ngạc nhiên.\n\n{opinion}\n\nTùng nói thẳng: nếu bạn đang làm điều ngược lại — thì xin lỗi, bạn đang tự lừa mình. 🔥\n\n---\n\n🔀 Biến thể 3 — Giọng hài hước:\n\n{topic} — nghe giống tiêu đề báo mạng đúng không? Nhưng lần này là thật.\n\n{opinion}\n\nCười đi. Rồi khóc. Rồi share. Tùng cho phép. 😂'
  ]
};

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
function handleGenerate() {
  const btn = document.getElementById('generateBtn');
  if (btn.disabled) return;

  btn.classList.add('loading');
  btn.disabled = true;

  const topic = document.getElementById('topicInput').value.trim();
  const context = document.getElementById('contextInput').value.trim() || 'cuộc sống hàng ngày';
  const opinion = document.getElementById('opinionInput').value.trim();

  // Simulate AI generation
  setTimeout(() => {
    const output = {};
    const tabs = ['hook', 'short', 'long', 'caption', 'variant'];
    tabs.forEach(tab => {
      const templates = generatedTemplates[tab];
      const template = templates[Math.floor(Math.random() * templates.length)];
      output[tab] = template
        .replace(/\{topic\}/g, topic)
        .replace(/\{context\}/g, context)
        .replace(/\{opinion\}/g, opinion);
    });

    state.generatedOutput = output;
    renderOutput();

    btn.classList.remove('loading');
    validateForm();
    showToast('Bài viết đã được tạo thành công! ✨', 'success');

    // Scroll to output
    document.getElementById('output').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 2500);
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
function saveDraft() {
  if (!state.generatedOutput) return;
  const drafts = JSON.parse(localStorage.getItem('postthu_drafts') || '[]');
  drafts.push({
    id: Date.now(),
    type: state.selectedType,
    tone: state.selectedTone,
    output: state.generatedOutput,
    createdAt: new Date().toLocaleString('vi-VN'),
    topic: document.getElementById('topicInput').value.trim()
  });
  localStorage.setItem('postthu_drafts', JSON.stringify(drafts));
  showToast('Đã lưu nháp thành công! 💾', 'success');
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
  resultsDiv.innerHTML = '<div class="trend-placeholder">Đang kết nối API và cào dữ liệu từ TikTok...<br>Vui lòng đợi 15 - 30 giây...</div>';

  try {
    const payload = {
      searchQueries: [keyword],
      resultsPerPage: 3
    };

    const response = await fetch(`https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Lỗi khi gọi API Apify');
    const items = await response.json();

    if (!items || items.length === 0) {
      resultsDiv.innerHTML = '<div class="trend-placeholder">Không tìm thấy video nào cho từ khóa này.</div>';
      return;
    }

    resultsDiv.innerHTML = items.map((item) => {
      const text = item.text || item.desc || 'Không có mô tả';
      const author = item.authorMeta?.name || item.author?.uniqueId || item.author?.nickname || 'unknown';
      const playCount = formatNumber(item.playCount || item.stats?.playCount || item.viewCount || 0);
      const diggCount = formatNumber(item.diggCount || item.stats?.diggCount || item.likeCount || 0);
      const videoUrl = item.webVideoUrl || item.videoUrl || item.url || '#';
      const coverUrl = item.covers?.default || item.coverUrl || item.video?.cover || item.coverWebp || '';

      const escapedText = text.replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, " ");

      return `
        <div class="trend-item">
          ${coverUrl ? `<img class="trend-item-thumb" src="${coverUrl}" alt="cover">` : ''}
          <div class="trend-item-info">
            <div class="trend-item-author">@${author}</div>
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
const TREND_TOPICS = [
  "IT nghỉ việc làm shipper", "Khởi nghiệp thất bại", "Review Gen Z đi làm", "Cú sốc đầu đời", "Làm freelancer",
  "Drama công sở", "Sếp hãm", "Quiet quitting", "Chữa lành", "Bỏ phố về quê",
  "Ngáo giá", "Phông bạt", "Flex tài sản", "Kinh tế khó khăn 2024", "Cắt giảm nhân sự",
  "Nghề AI thay thế", "Mất việc tuổi 30", "Gia đình ép cưới", "Mẹ bỉm sữa khởi nghiệp", "Lùa gà khóa học",
  "Review quán cà phê dở", "Làm giàu không khó", "Mua nhà trước 30", "Gen Z mua đất", "Kiếp làm thuê",
  "Thao túng tâm lý", "Mối quan hệ độc hại", "Cách từ chối sếp", "Đồng nghiệp 2 mặt", "Freelancer đói việc"
];

function renderTrendSuggestions() {
  const container = document.getElementById('trendSuggestions');
  if (!container) return;

  // Shuffle and pick 5
  const shuffled = [...TREND_TOPICS].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  container.innerHTML = `
    <span class="trend-hint">Gợi ý từ khóa:</span>
    ${selected.map(topic => `<button class="trend-tag" onclick="setTrendKeyword('${topic}')">${topic}</button>`).join('')}
    <button class="trend-tag" style="background:none; border:none; color:var(--orange-dark); padding:4px;" onclick="renderTrendSuggestions()" title="Đổi gợi ý khác">🔄 Thêm gợi ý</button>
  `;
}
