chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "insertPayload") {
    const active = document.activeElement;

    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable)) {
      if (active.tagName === "INPUT" || active.tagName === "TEXTAREA") {
        active.value = msg.payload;
      } else if (active.isContentEditable) {
        active.textContent += msg.payload;
      }
      sendResponse({ status: "ok" });
    } else {
      alert("Focus an input, textarea, or editable field before inserting.");
      sendResponse({ status: "no-input" });
    }
  }
});
