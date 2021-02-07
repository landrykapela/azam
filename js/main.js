const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.pathname = "/admin.html";
  });
}
const showContent = (hash) => {
  console.log("hash changed: ", hash);
  let content = document.querySelector("#content");
  let contentChildren = Array.from(content.children);
  contentChildren.forEach((child) => {
    if (child.id) {
      child.style.display = "none";
    }
  });
  contentChildren.forEach((child) => {
    if (child.id === hash.substr(1)) child.style.display = "block";
  });
};

if (window.location.pathname.includes("/admin.html")) {
  window.addEventListener("load", () => {
    let hash = window.location.hash;
    if (!hash.length) hash = "#all_users";
    showContent(hash);
  });
  window.addEventListener("hashchange", () => {
    let hash = window.location.hash;
    showContent(hash);
  });
}
const initializeSchedule = () => {
  var dp = new DayPilot.Calendar("schedule");
  dp.viewType = "Week";
  dp.init();
};
if (window.location.pathname.includes("/dashboard.html")) {
  window.addEventListener("load", () => {
    let hash = window.location.hash;
    if (!hash.length) hash = "#all_activity";
    showContent(hash);
  });
  window.addEventListener("hashchange", () => {
    let hash = window.location.hash;
    showContent(hash);
    if (hash.substr(1) === "schedule") initializeSchedule();
  });
}
