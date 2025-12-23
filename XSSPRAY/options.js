async function refresh() {
  const { storedPayloads = [], labMode = false, auditLog = [] } = await chrome.storage.local.get(["storedPayloads", "labMode", "auditLog"]);
  document.getElementById("labMode").checked = labMode;
  document.getElementById("payloads").value = storedPayloads.join("\n");
  document.getElementById("log").textContent = auditLog.map(
    e => `[${e.time}] ${e.action} @ ${e.origin}\n${e.payloadPreview}`
  ).join("\n\n");
}

document.getElementById("labMode").addEventListener("change", async (e) => {
  await chrome.storage.local.set({ labMode: e.target.checked });
});

document.getElementById("save").addEventListener("click", async () => {
  const lines = document.getElementById("payloads").value
    .split("\n").map(l => l.trim()).filter(l => l.length && !l.startsWith("#"));
  await chrome.storage.local.set({ storedPayloads: lines });
  
  // Notify background to rebuild menu
  chrome.runtime.sendMessage({ action: "reloadMenu" });
  
  alert("Payloads saved! Menu will reload.");
  await refresh();
});

document.getElementById("import").addEventListener("click", async () => {
  const input = document.createElement("input");
  input.type = "file"; 
  input.accept = ".txt";
  input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split("\n").map(l => l.trim()).filter(l => l.length && !l.startsWith("#"));
    await chrome.storage.local.set({ storedPayloads: lines });
    
    // Notify background to rebuild menu
    chrome.runtime.sendMessage({ action: "reloadMenu" });
    
    alert(`Imported ${lines.length} payloads!`);
    await refresh();
  };
  input.click();
});

document.getElementById("export").addEventListener("click", async () => {
  const { storedPayloads = [] } = await chrome.storage.local.get("storedPayloads");
  const blob = new Blob([storedPayloads.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; 
  a.download = "xsspray_payloads.txt"; 
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("reload").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "reloadMenu" });
  alert("Menu reloaded!");
});

document.getElementById("clearLog").addEventListener("click", async () => {
  await chrome.storage.local.set({ auditLog: [] });
  await refresh();
});

refresh();