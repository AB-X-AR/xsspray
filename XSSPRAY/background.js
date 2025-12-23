// background.js for XSSPRAY
const PARENT_ID = "xsspray_parent";
let payloads = [];
let lastSelected = null;

// Load payloads.txt packaged with the extension
async function loadPayloads() {
  try {
    const response = await fetch(chrome.runtime.getURL("payloads.txt"));
    const text = await response.text();
    payloads = text
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.length && !l.startsWith("#")); // ignore blank lines and comments
  } catch (e) {
    console.error("Failed to load payloads.txt:", e);
    // fallback list
    payloads = ["<test>payload</test>", "\"payload\"", "payload()"];
  }
}

// Build the context menu
async function buildMenu() {
  await loadPayloads();

  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: PARENT_ID,
      title: "XSSPRAY ▶",
      contexts: ["all"]
    });

    if (payloads.length === 0) {
      chrome.contextMenus.create({
        id: "no_payloads",
        parentId: PARENT_ID,
        title: "(No payloads found — check payloads.txt)",
        enabled: false,
        contexts: ["all"]
      });
    } else {
      payloads.forEach((p, i) => {
        chrome.contextMenus.create({
          id: `payload_${i}`,
          parentId: PARENT_ID,
          title: p.length > 50 ? p.slice(0, 47) + "..." : p,
          contexts: ["all"]
        });
      });
    }
  });
}

// On install/startup, build menus
chrome.runtime.onInstalled.addListener(buildMenu);
chrome.runtime.onStartup.addListener(buildMenu);

// Handle clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId.startsWith("payload_")) {
    const idx = parseInt(info.menuItemId.replace("payload_", ""), 10);
    const payload = payloads[idx];
    lastSelected = payload;

    // Inject content.js into the page
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });

    // Send payload to content script
    chrome.tabs.sendMessage(tab.id, { action: "insertPayload", payload });
  }
});
