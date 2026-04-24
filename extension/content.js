// Get text from the active page
function getPageContent() {
  // 1. Try to get selected text first
  let selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    return selectedText;
  }

  // 2. If no selection, try to get the main post content on Facebook
  // This is a naive selector, Facebook classes change often, but data-ad-comet-preview="message" is sometimes used,
  // or we can just grab all text from elements with text-align: left that look like posts.
  // For simplicity, let's grab the first big chunk of text that looks like a post.
  let fbPost = document.querySelector('[data-ad-comet-preview="message"]');
  if (fbPost && fbPost.innerText.trim()) {
    return fbPost.innerText.trim();
  }

  // 3. Fallback: just return the page title and URL
  return document.title + '\n' + window.location.href;
}

// Send back to popup
chrome.runtime.sendMessage({
  action: "capture_content",
  text: getPageContent()
});
