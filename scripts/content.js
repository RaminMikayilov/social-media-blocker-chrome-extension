const blockWebsites = () => {
  chrome.storage.sync.get("socialMediaBlockerOptions", (data) => {
    const socialMediaWebsites = [
      "facebook",
      "twitter",
      "instagram",
      "youtube",
      "linkedin",
      "whatsapp",
      "telegram",
      "tiktok",
    ];

    const options = data.socialMediaBlockerOptions || [];

    socialMediaWebsites.forEach((website) => {
      if (options[website] && window.location.hostname.includes(website)) {
        window.location.href = "https://www.google.com/notfound";
      }
    });
  });
};

chrome.storage.onChanged.addListener(() => {
  blockWebsites();
});

// Initial blocking
blockWebsites();
