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
  dp.scale = "Manual";
  dp.theme = "calendar_g";
  dp.timeline = [];
  for (var i = 0; i < 5; i++) {
    var day = {};
    day.start = dp.startDate.addDays(i);
    day.end = day.start.addDays(1);
    dp.timeline.push(day);
  }

  dp.events.list = calEvents.map((e) => {
    let event = e;
    event.text = e.activity;
    event.start = e.date + "T" + e.startTime;
    event.end = e.date + "T" + e.endTime;
    return event;
  });
  dp.onEventClicked = (args) => {
    let details = args.e.data;
    let crew = details.crew.map((c) => {
      let d = c.name + " (" + c.role + ")";
      return d;
    });
    let crewText = "";
    crew.forEach((c, i) => {
      crewText +=
        i +
        1 +
        ". " +
        c +
        ` 

        `;
    });
    let eDate =
      details.date + " from " + details.startTime + " to " + details.endTime;
    // detailText += "\n" + "Notes:\n" + details.notae;
    let modal = $("#modal1");
    modal.find(".modal-title").text(details.text);
    modal.find("#event-crew").text(crewText);
    modal.find("#event-date").text(eDate);
    modal.modal("show");

    $modalBody = document.querySelector("#event-details");
  };
  dp.init();
};
if (window.location.pathname.includes("/dashboard.html")) {
  window.addEventListener("load", () => {
    let hash = window.location.hash;
    if (!hash.length) hash = "#all_activity";
    showContent(hash);
    if (hash.substr(1) === "schedule") initializeSchedule();
  });
  window.addEventListener("hashchange", () => {
    let hash = window.location.hash;
    showContent(hash);
    if (hash.substr(1) === "schedule") initializeSchedule();
  });
}
