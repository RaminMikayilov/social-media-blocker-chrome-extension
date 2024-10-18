const redirect = () => {
  window.location.href = "https://www.google.com/notfound";
}

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

    function checkTime() {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      const startTime = options.startTime;
      const endTime = options.endTime;
      const startHour = parseInt(startTime.split(":")[0]);
      const startMinute = parseInt(startTime.split(":")[1]);
      const endHour = parseInt(endTime.split(":")[0]);
      const endMinute = parseInt(endTime.split(":")[1]);

      return (
        (currentHour > startHour ||
          (currentHour === startHour && currentMinute >= startMinute)) &&
        (currentHour < endHour ||
          (currentHour === endHour && currentMinute <= endMinute))
      );
    }

    if (checkTime()) {
      socialMediaWebsites.forEach((website) => {
        if (options[website] && (website === 'twitter' && window.location.hostname === 'x.com')) {
          redirect();
        }
        if (options[website] && window.location.hostname.includes(website)) {
          redirect();
        }
      });
    }
  });
};

chrome.storage.onChanged.addListener(() => {
  blockWebsites();
});

// Initial blocking
blockWebsites();
