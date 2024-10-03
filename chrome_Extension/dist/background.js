console.log("Background script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeFont") {
    console.log(`Received request to change font to: ${request.fontCss}`);

    // Query the active tab directly
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        const tabId = tabs[0].id;
        console.log(`Found active tab ID: ${tabId}`);

        // Inject the script to change the font in the active tab
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            func: (fontCss) => {
              console.log(`Injected font change script for font: ${fontCss}`);

              // Set the font using chrome.fontSettings API
              ['standard', 'serif', 'sansserif', 'fixed'].forEach(family => {
                chrome.fontSettings.setFont({
                  genericFamily: family,
                  fontId: fontCss
                }, () => {
                  console.log(`Font for ${family} set to ${fontCss}`);
                });
              });
            },
            args: [request.fontCss]
          },
          (results) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
              sendResponse({ status: "error", message: chrome.runtime.lastError.message });
            } else {
              console.log('Font change script injected successfully');
              sendResponse({ status: "fontChanged" });
            }
          }
        );
      } else {
        console.error("No active tab found or invalid tab ID.");
        sendResponse({ status: "error", message: "No active tab found." });
      }
    });

    // Return true to indicate we will respond asynchronously
    return true;
  } else {
    console.error("Unknown action received:", request.action);
    sendResponse({ status: "error", message: "Unknown action." });
  }
});