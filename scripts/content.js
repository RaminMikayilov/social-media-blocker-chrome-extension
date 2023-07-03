const blockWebsites = () => {
  chrome.storage.sync.get("socialMediaBlockerOptions", (data) => {
    const socialMediaBlockerOptions = data.socialMediaBlockerOptions || [];

    const currentHostName = window.location.hostname;

    if (socialMediaBlockerOptions.includes(currentHostName)) {
      window.location.href = chrome.runtime.getURL("blocked.html");
    }
  });
};

window.addEventListener("load", blockWebsites);
