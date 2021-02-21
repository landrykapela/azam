const localStorage = window.localStorage;
const units = JSON.parse(localStorage.units);
const positions = JSON.parse(localStorage.positions);
const departments = JSON.parse(localStorage.departments);
const users = JSON.parse(localStorage.users);
// console.log("depts: ", departments);
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = Array.from(e.target.elements);
    console.log("inputs: ", inputs);
    let email = inputs[0].value;
    if (email.toLowerCase() === "admin@azam.com")
      window.location.pathname = "/admin.html";
    else window.location.pathname = "/dashboard.html";
  });
}

//populate select with
const populate = (id, data, dependant) => {
  let select = document.getElementById(id);

  select.innerHTML = "";

  data.forEach((d, i) => {
    let opt = new Option(d.name, d.id);
    if (i === 0) opt.selected = true;
    select.options.add(opt, i);
  });
  if (dependant) {
    populate(dependant.id, dependant.data, dependant.dependant);
  }
};
//load users list
const loadUsers = (id, users) => {
  const container = document.getElementById(id);
  const contChildren = Array.from(container.children);
  var listContainer;
  contChildren.forEach((c) => {
    if (c.id === "list") listContainer = c;
  });
  listContainer.innerHTML = "";
  users.forEach((u, i) => {
    const row = document.createElement("div");
    row.classList.add("col-md-8");
    row.classList.add("col-lg-8");
    row.classList.add("col-sm-12");
    row.classList.add("offset-2");
    row.classList.add("row");
    row.classList.add("highlight");
    row.id = u.id;
    const name = document.createElement("span");
    name.classList.add("col-md-4");
    name.classList.add("col-lg-4");
    name.textContent = u.name;
    row.appendChild(name);
    const position = document.createElement("span");
    position.classList.add("col-md-4");
    position.classList.add("col-lg-4");
    position.textContent = u.position;
    row.appendChild(position);
    const department = document.createElement("span");
    department.classList.add("col-md-4");
    department.classList.add("col-lg-4");
    department.textContent = u.department;
    row.appendChild(department);
    listContainer.appendChild(row);
  });
};

//load users list
const showPositions = (id, positions) => {
  const container = document.getElementById(id);
  const contChildren = Array.from(container.children);
  var listContainer;
  contChildren.forEach((c) => {
    if (c.id === "list") listContainer = c;
  });
  listContainer.innerHTML = "";
  positions = positions.map((p) => {
    let pos = p;
    units.forEach((u) => {
      if (u.id == p.unit) p.unit_name = u.name;
    });
    departments.forEach((d) => {
      if (d.id == p.deptId) p.department = d.name;
    });
    return pos;
  });

  positions.forEach((u) => {
    const row = document.createElement("div");
    row.classList.add("col-md-8");
    row.classList.add("col-lg-8");
    row.classList.add("col-sm-12");
    row.classList.add("offset-2");
    row.classList.add("row");
    row.id = u.id;
    const name = document.createElement("span");
    name.classList.add("col-md-4");
    name.classList.add("col-lg-4");
    name.textContent = u.name;
    row.appendChild(name);
    const unit = document.createElement("span");
    unit.classList.add("col-md-4");
    unit.classList.add("col-lg-4");
    unit.textContent = u.unit_name;
    row.appendChild(unit);
    const dept = document.createElement("span");
    dept.classList.add("col-md-4");
    dept.classList.add("col-lg-4");
    dept.textContent = u.department;
    row.appendChild(dept);
    listContainer.appendChild(row);
  });
};
const showContent = (hash) => {
  let content = document.querySelector("#content");
  let contentChildren = Array.from(content.children);
  contentChildren.forEach((child) => {
    if (child.id) {
      child.style.display = "none";
    }
  });
  contentChildren.forEach((child) => {
    if (child.id === hash.substr(1)) child.style.display = "block";
    if (child.id === "all_users") {
      let users = JSON.parse(localStorage.users);
      users.sort((a, b) => {
        return a.name.toLowerCase() - b.name.toLowerCase();
      });
      loadUsers(child.id, users);
    }
    if (child.id === "all_positions") {
      let positions = JSON.parse(localStorage.positions);
      positions.sort((a, b) => {
        return a.name.toLowerCase() - b.name.toLowerCase();
      });
      showPositions(child.id, positions);
    }
    if (child.id === "add_user") {
      let myunits = units.filter((u) => {
        return u.deptId == departments[0].id;
      });
      let mypos = positions.filter((p) => {
        return p.unit == myunits[0].id;
      });
      populate("user_department", departments, {
        id: "user_unit",
        data: myunits,
        dependant: { id: "user_position", data: mypos },
      });
    }
    if (child.id === "add_position") {
      let myunits = units.filter((u) => {
        return u.deptId == departments[0].id;
      });
      populate("position_dept", departments, {
        id: "position_unit",
        data: myunits,
        dependent: null,
      });
    }
  });
  if (hash === "#all_users") {
    const search = document.querySelector("#search");
    console.log("search: ", search.id);
    if (search) {
      search.addEventListener("change", (e) => {
        let keyword = e.target.value.toLowerCase();
        console.log("kw: ", keyword);
        let filteredUsers = users.filter((u) => {
          return (
            u.name.toLowerCase().includes(keyword) ||
            u.department.toLowerCase().includes(keyword) ||
            u.position.toLowerCase().includes(keyword)
          );
        });
        console.log("f: ", filteredUsers);
        loadUsers("all_users", filteredUsers);
      });
    }
  }
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

  //submit position form
  const newPositionForm = document.getElementById("new_position_form");
  if (newPositionForm) {
    newPositionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let inputs = Array.from(e.target.elements);
      // window.localStorage.clear();
      let positions = window.localStorage.positions;
      console.log("ls: ", positions);
      if (positions === null || positions === undefined) positions = [];
      else {
        positions = JSON.parse(positions);
      }
      let position = { id: positions.length };
      inputs.forEach((i) => {
        if (i.id === "position_dept") position.deptId = parseInt(i.value);
        if (i.id === "name") position.name = i.value;
        if (i.id === "position_unit") position.unit = i.value;
      });
      positions.push(position);
      window.localStorage.setItem("positions", JSON.stringify(positions));
      // console.log("ls2: ", window.localStor?age);
      window.location.hash = "#all_positions";
    });
  }

  //submit user form
  const newUserForm = document.getElementById("new_user_form");
  if (newUserForm) {
    newUserForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let user = {};
      let users = localStorage.users;
      if (users === null || users === undefined) {
        users = [];
        user.id = users.length;
      } else {
        users = users.sort((a, b) => {
          return a.name.toLowerCase() - b.name.toLowerCase();
        });
        user.id = users[users.length - 1].id + 1;
      }
      let inputs = Array.from(e.target.elements);
      inputs.forEach((input) => {
        if (input.id === "fname") user.name = input.value;
        if (input.id === "mname" || input.id === "lname")
          user.name = user.name + " " + input.value;
        if (input.id === "user_department") {
          user.deptId = input.options[input.options.selectedIndex].value;
          user.department = input.options[input.options.selectedIndex].text;
        }
        if (input.id === "position") {
          user.position = input.options[input.options.selectedIndex].text;
        }
      });
      window.location.hash = "#all_users";
    });
  }
}
const groupByArray = (xs, key) => {
  let result = xs.reduce((rv, x) => {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    }
    return rv;
  }, []);

  return result;
};

const showActivities = (activities, view = "list") => {
  var dp = new DayPilot.Scheduler("all_activity");
  var date = new Date();
  dp.startDate = new DayPilot.Date(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  dp.scale = "Day";
  dp.timeHeaders = [
    { groupBy: "Month", format: "MMM yyyy" },
    { groupBy: "Day", format: "d" },
  ];
  dp.days = dp.startDate.daysInMonth();
  dp.treeEnabled = true;
  let events = [];
  activities.map((a) => {
    let e = a;
    e.text = a.name;
    e.start = a.startTime;
    e.end = a.endTime;
    return e;
  });
  dp.events.list = [
    {
      text: "Event 1",
      id: "5.1",
      resource: "2",
      join: 5,
      start: "2021-02-14T11:00:00",
      end: "2021-02-16T12:00:00",
    },
    {
      text: "Event 2",
      id: "5.2",
      resource: "visual",
      start: "2021-02-12T11:00:00",
      end: "2021-02-15T12:00:00",
    },
  ];
  let atvz = [];
  let assIds = [];
  console.log("dummy res: ", dummyResources);
  dummyResources.forEach((dr) => {
    activitiesData.forEach((ad) => {
      console.log("ad.resource: ", ad.resource);
      ad.resource.forEach((r) => {
        if (dr.id === r.id) {
          let ai = { id: r.id, children: [] };
          r.children.forEach((c) => {
            ai.children.push(c);
          });

          assIds.push(ai);
        }
      });
    });
  });
  console.log("assids: ", assIds);
  // events;
  dp.resources = dummyResources;
  dp.init();

  let gd = groupByArray(activities, "resource");
  console.log("gd:", gd);
};
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

  dp.events.list = calEvents.map((e, i) => {
    let event = e;
    event.text = e.activity;
    event.start = e.date + "T" + e.startTime;
    event.end = e.date + "T" + e.endTime;
    // if (i === 2) event.end = "2021-02-14T" + e.endTime;
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
    if (hash.substr(1) === "all_activity")
      showActivities(activitiesData, "cal");
    if (hash.substr(1) === "schedule") initializeSchedule();
  });
  window.addEventListener("hashchange", () => {
    let hash = window.location.hash;
    showContent(hash);
    if (hash.substr(1) === "schedule") initializeSchedule();
  });
}
