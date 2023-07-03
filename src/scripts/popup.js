const startTime = document.getElementById("start_time");
const endTime = document.getElementById("end_time");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const submit = document.getElementById("submit");

chrome.storage.sync.get("socialMediaBlockerOptions", (data) => {
  const savedOptions = data.socialMediaBlockerOptions || {};

  startTime.value = savedOptions.startTime || "12:00";
  endTime.value = savedOptions.endTime || "06:00";
  checkboxes.forEach((checkbox) => {
    checkbox.checked = savedOptions[checkbox.name] || false;
  });
});

submit.addEventListener("click", () => {
  const socialMediaBlockerOptions = {
    startTime: startTime.value,
    endTime: endTime.value,
  };

  checkboxes.forEach((checkbox) => {
    socialMediaBlockerOptions[checkbox.name] = checkbox.checked;
  });

  chrome.storage.sync.set({ socialMediaBlockerOptions }, () => {
    alert("Options saved successfully!");
  });
});
