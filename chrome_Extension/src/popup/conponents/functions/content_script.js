console.log("Content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in content script:", request);

  if (request.action === "changeFont") {
    console.log(`Changing font to: ${request.fontCss}`);

    // Apply the new font family to the body and all elements
    document.body.style.fontFamily = request.fontCss;

    // Ensure all elements inherit the new font family
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        font-family: ${request.fontCss} !important;
      }
    `;
    document.head.appendChild(style);

    sendResponse({ status: "fontChanged" });
  }
});
