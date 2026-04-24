document.addEventListener('DOMContentLoaded', () => {
  const textArea = document.getElementById('capturedText');
  const sendBtn = document.getElementById('sendBtn');

  // Inject content script to get text
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    const tabId = tabs[0].id;
    
    // Execute content script
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }).catch(err => {
      console.log('Error injecting content script:', err);
      textArea.value = "Lỗi: Không thể lấy dữ liệu từ trang này (có thể do trang web giới hạn hoặc đang ở trang Chrome Store). Bạn có thể tự dán nội dung vào đây.";
    });
  });

  // Listen for message from content.js
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "capture_content") {
      textArea.value = request.text;
    }
  });

  // Send to Web App
  sendBtn.addEventListener('click', () => {
    const text = textArea.value.trim();
    if (!text) {
      alert("Chưa có nội dung để gửi!");
      return;
    }

    // URL of our local Web App
    const targetUrl = 'http://127.0.0.1:8080/';
    
    // Encode text into URL params
    const fullUrl = `${targetUrl}?trend_topic=${encodeURIComponent(text)}`;
    
    // Open in new tab
    chrome.tabs.create({ url: fullUrl });
  });
});
