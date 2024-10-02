document.getElementById("translateBtn").addEventListener("click", () => {
  const sourceLanguage = document.getElementById("sourceLanguageSelect").value;
  const targetLanguage = document.getElementById("languageSelect").value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "translateMessages",
        sourceLanguage,
        targetLanguage,
      });
    }
  });
});
