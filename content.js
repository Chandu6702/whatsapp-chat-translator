const translateText = async (text, sourceLanguage, targetLanguage) => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${sourceLanguage}|${targetLanguage}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Translation API error");
    }

    const data = await response.json();
    const translatedText = data.responseData.translatedText;

    // Fallback to original text if translation is unsuccessful
    return translatedText || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text on error
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translateMessages") {
    const { sourceLanguage, targetLanguage } = request;

    // Select all message spans
    const messages = document.querySelectorAll(
      "span.selectable-text.copyable-text span"
    );

    // Translate each message
    messages.forEach(async (messageElement) => {
      const originalText = messageElement.innerText;
      if (originalText) {
        const translatedText = await translateText(
          originalText,
          sourceLanguage,
          targetLanguage
        );
        messageElement.innerText = translatedText;
      }
    });
  }
});
