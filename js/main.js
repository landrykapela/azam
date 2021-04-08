const localStorage = window.localStorage;
let dummyResources = JSON.parse(localStorage.dummyResources);
let units = JSON.parse(localStorage.units);
let positions = JSON.parse(localStorage.positions);
let departments = JSON.parse(localStorage.departments);
let activities = localStorage.activities
  ? JSON.parse(localStorage.activities)
  : null;
// window.localStorage.setItem("activities", null);
let users = JSON.parse(localStorage.users);
users = users.filter((u, i) => {
  return u.position !== undefined && u.position !== null;
});

console.log("activities: ", activities);
var session = window.sessionStorage;

const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = Array.from(e.target.elements);
    let email = inputs[0].value;
    session.setItem("user", email);
    if (email.toLowerCase() === "admin@azam.com")
      window.location.pathname = "/admin.html";
    else window.location.pathname = "/dashboard.html";
  });
}
//process new activity form
const newActivityForm = document.querySelector("#new_activity_form");
if (newActivityForm) {
  newActivityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputs = Array.from(e.target.elements);
    let name = inputs[0].value;
    let dept = inputs[1].options[inputs[1].options.selectedIndex].value;
    let department = inputs[1].options[inputs[1].options.selectedIndex].text;
    let region = inputs[2].options[inputs[2].options.selectedIndex].value;
    let venue = inputs[3].value;
    let date = inputs[4].value;
    let stime = inputs[5].value;
    let etime = inputs[6].value;
    let cam = inputs[7].value;
    let producer = inputs[8].value;
    let presenter = inputs[9].value;
    let sound = inputs[10].value;
    let switcher = inputs[11].value;
    let visual = inputs[12].value;
    let electrical = inputs[13].value;
    let lighting = inputs[14].value;
    let note = inputs[15].value;
    let activity = {};
    if (activities === null || activities === undefined) activities = [];
    activity.id = activities.length;
    activity.name = name;
    activity.text = name;
    activity.region = region;
    activity.venue = venue;
    activity.dept = dept;
    activity.department = department;
    activity.date = date;
    activity.start_time = stime;
    activity.end_time = etime;
    activity.note = note;
    activity.resources = [
      { id: "camera_operator", value: cam },
      { id: "producer", value: producer },
      { id: "presenter", value: presenter },
      { id: "sound_engineer", value: sound },
      { id: "switcher", value: switcher },
      { id: "visual_editor", value: visual },
      { id: "electrical_engineer", value: electrical },
      { id: "lighting_engineer", value: lighting },
    ];
    activities.push(activity);
    localStorage.setItem("activities", JSON.stringify(activities));
    console.log("activies", localStorage.getItem("activities"));
    window.location.hash = "#all_activity";
  });
}

//update activity detail form
const updateActivityForm = document.querySelector("#activity_detail_form");
if (updateActivityForm) {
  updateActivityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputs = Array.from(e.target.elements);
    // console.log("inputs: ", inputs);
    let name = inputs[0].value;
    let dept = inputs[1].options[inputs[1].options.selectedIndex].value;
    let department = inputs[1].options[inputs[1].options.selectedIndex].text;
    let region = inputs[2].options[inputs[2].options.selectedIndex].value;
    let venue = inputs[3].value;
    let date = inputs[4].value;
    let stime = inputs[5].value;
    let etime = inputs[6].value;
    let cam = inputs[7].value;
    let producer = inputs[8].value;
    let presenter = inputs[9].value;
    let sound = inputs[10].value;
    let switcher = inputs[11].value;
    let visual = inputs[12].value;
    let electrical = inputs[13].value;
    let lighting = inputs[14].value;
    let note = inputs[15].value;
    let activity_id = document.querySelector("#activity_id").value;
    let activity = activities.filter((a) => {
      return a.id == activity_id;
    })[0];
    let resource_data = activity.resource_data ? activity.resource_data : [];
    console.log("resource_data; ", resource_data);
    inputs.forEach((input) => {
      if (input.id.substr(0, 5) == "_res_") {
        let id = input.id.substr(5);
        let e = id.substring(0, id.lastIndexOf("_"));
        var d;
        input.addEventListener("change", () => {
          let v = input.options[input.options.selectedIndex].value;
          d = {
            id: id,
            parent: e,
            value: v,
          };
          resource_data.push(d);
        });
      }
    });
    console.log("rd: ", resource_data);

    // if (activities === null || activities === undefined) activities = [];
    // activity.id = activities.length;

    // activity.name = name;
    // activity.text = name;
    // activity.region = region;
    // activity.venue = venue;
    // activity.dept = dept;
    // activity.department = department;
    // activity.date = date;
    // activity.start_time = stime;
    // activity.end_time = etime;
    // activity.note = note;
    activity.resource_data = []; //resource_data;
    // resources.forEach((r) => {});
    activities = activities.map((a) => {
      let a2 = a;
      if (a.id == activity.id) a2 = activity;
      return a2;
    });
    localStorage.setItem("activities", JSON.stringify(activities));
    console.log("activies", activities);
    let parents = resource_data.map((r) => {
      return r.parent;
    });
    let children = resource_data.map((r) => {
      let c = { id: r.id, parent: r.parent, value: r.value };
      return c;
    });
    let newRes = resource_data.map((rd) => {
      let n = {};
      n.id = rd.parent;
      n.name = rd.parent;
      n.expanded = true;
      n.children = children.filter((c) => {
        return c.parent == rd.parent;
      });
      return n;
    });
    window.localStorage.setItem("resources", JSON.stringify(newRes));
    console.log("newRes: ", JSON.parse(window.localStorage.resources));
    // window.location.hash = "#all_activity";
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
const loadSpinner = (select, data, value = null) => {
  select.innerHTML = "";
  if (value !== null) select.value = value;
  data.forEach((d, i) => {
    let opt = new Option(d.name, d.id);
    if (value == d.id) opt.selected = true;
    select.options.add(opt, i);
  });
};
const loadRegions = (select, data, value = null) => {
  data = Array.from(select.options);
  data.forEach((o) => {
    if (o.value == value) o.selected = true;
  });
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

//show list of departments
const showDepartments = (target, data) => {
  console.log("showing depts...", data);
  const container = document.getElementById(target);
  const contChildren = Array.from(container.children);
  var listContainer;
  contChildren.forEach((c) => {
    if (c.id === "list") listContainer = c;
  });
  listContainer.innerHTML = "";
  data = data.map((p) => {
    let dept = p;
    users.forEach((u) => {
      if (u.id == p.manager) dept.manager_name = u.name;
    });

    return dept;
  });

  data.forEach((u) => {
    const row = document.createElement("div");
    row.classList.add("col-md-8");
    row.classList.add("col-lg-8");
    row.classList.add("col-sm-12");
    row.classList.add("offset-2");
    row.classList.add("row");
    row.id = u.id;
    const name = document.createElement("span");
    name.classList.add("col-md-6");
    name.classList.add("col-lg-6");
    name.textContent = u.name;
    row.appendChild(name);
    const manager = document.createElement("span");
    manager.classList.add("col-md-6");
    manager.classList.add("col-lg-6");
    manager.textContent = u.manager_name;
    row.appendChild(manager);

    listContainer.appendChild(row);
  });
};
//load units list
const showUnits = (id, data) => {
  const container = document.getElementById(id);
  const contChildren = Array.from(container.children);
  var listContainer;
  contChildren.forEach((c) => {
    if (c.id === "list") listContainer = c;
  });
  listContainer.innerHTML = "";
  data = data.map((p) => {
    let unit = p;
    users.forEach((u) => {
      if (u.id == p.hod) unit.hod_name = u.name;
    });
    departments.forEach((d) => {
      if (d.id == p.deptId) unit.dept_name = d.name;
    });

    return unit;
  });

  data.forEach((u) => {
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
    const dept = document.createElement("span");
    dept.classList.add("col-md-4");
    dept.classList.add("col-lg-4");
    dept.textContent = u.dept_name;
    row.appendChild(dept);
    const unit = document.createElement("span");
    unit.classList.add("col-md-4");
    unit.classList.add("col-lg-4");
    unit.textContent = u.hod_name;
    row.appendChild(unit);
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

      populate("user_department", departments, {
        id: "user_unit",
        data: myunits,
        dependant: null,
      });
      let myPos = positions.filter((p) => {
        return p.unit == myunits[0].id;
      });

      populate("user_position", myPos, null);
    }
    if (child.id === "add_activity") {
      populate("activity_department", departments, null);
    }
    if (child.id === "add_department") {
      let managers = users.filter((u) => {
        return u.position === "Manager";
      });
      populate("dept_manager", managers, null);
    }
    if (child.id === "all_units") {
      showUnits(child.id, units);
    }
    if (child.id === "all_departments") {
      // departments.sort();
      showDepartments(child.id, departments);
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
    if (child.id === "add_unit") {
      populate("unit_dept", departments, {
        id: "unit_hod",
        data: users.filter((u) => u.deptId == departments[0].id),
        dependant: null,
      });
    }
    if (child.id === "all_activity") {
      showActivities(activities, "Month");
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

  //submit Unit form
  const newUnitForm = document.getElementById("new_unit_form");
  if (newUnitForm) {
    newUnitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let inputs = Array.from(e.target.elements);
      if (units === null || units === undefined) units = [];

      let unit = { id: units.length };
      inputs.forEach((i) => {
        if (i.id === "unit_dept") unit.deptId = parseInt(i.value);
        if (i.id === "name") unit.name = i.value;
        if (i.id === "hod_unit") unit.hod = parseInt(i.value);
      });
      units.push(unit);
      window.localStorage.setItem("units", JSON.stringify(units));
      // console.log("ls2: ", window.localStor?age);
      window.location.hash = "#all_units";
    });
  }

  //submit position form
  const newPositionForm = document.getElementById("new_position_form");
  if (newPositionForm) {
    newPositionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let inputs = Array.from(e.target.elements);
      let positions = window.localStorage.positions;
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

  // submit new department form
  const newDepartmentForm = document.getElementById("new_department_form");
  if (newDepartmentForm) {
    newDepartmentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let inputs = Array.from(e.target.elements);
      if (departments === null || departments === undefined) departments = [];

      let department = { id: departments.length };
      inputs.forEach((i) => {
        if (i.id === "dept_manager") department.manager = parseInt(i.value);
        if (i.id === "dept_name") position.name = i.value;
      });
      positions.push(position);
      window.localStorage.setItem("positions", JSON.stringify(positions));
      // console.log("ls2: ", window.localStor?age);
      window.location.hash = "#all_positions";
    });
  }

  // submit user form
  const newUserForm = document.getElementById("new_user_form");
  if (newUserForm) {
    newUserForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let user = {};
      // let users = localStorage.users;
      console.log("users: ", users);
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
        if (input.id == "user_unit")
          user.unit = input.options[input.options.selectedIndex].text;
        if (input.id === "user_position") {
          user.position = input.options[input.options.selectedIndex].text;
        }
      });
      users.push(user);
      window.localStorage.users = JSON.stringify(users);
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
const showActivityDetail = (activity_id) => {
  const detail_form = document.querySelector("#activity_detail_form");
  let inputs = Array.from(detail_form.elements);
  let activity = activities.filter((a) => {
    return a.id == activity_id;
  });
  console.log("activity; ", activity[0]);
  // let select = document.getElementById(inputs[1].id);
  loadSpinner(inputs[1], departments, activity[0].dept);
  inputs[0].value = activity[0].name;
  loadRegions(inputs[2], [], activity[0].region);
  inputs[3].value = activity[0].venue;
  inputs[4].value = activity[0].date;
  inputs[5].value = activity[0].start_time;
  inputs[6].value = activity[0].end_time;
  inputs[7].value = activity[0].note;
  document.querySelector("#activity_id").value = activity_id;

  loadActivityResources(
    activity[0],
    document.querySelector("#activity_resources")
  );
};

const loadNames = (names, select) => {
  select.innerHTML = "";
  names.forEach((name) => {
    select.options.add(new Option(name.name, name.id));
  });
};
const loadActivityResources = (activity, container) => {
  let resources = activity.resources;
  let data = activity.resource_data;
  // let users = JSON.parse(localStorage.users);
  // console.log("users: ", users);
  resources.forEach((res) => {
    let formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    formGroup.id = res.id;
    let label = document.createElement("label");
    label.for = formGroup.id;
    let text = res.id.replace("_", " ");
    text = text[0].toUpperCase() + text.substr(1);
    label.textContent = text;
    formGroup.appendChild(label);
    for (let i = 0; i < res.value; i++) {
      let input = document.createElement("select");
      input.id = "_res_" + res.id + "_" + (i + 1);
      console.log("input.id: ", input.id);
      input.classList.add("form-control");
      input.classList.add("my-1");
      if (data != null) {
        data.forEach((d) => {
          // console.log("d.id: ", d);
          if (d !== null && d.id == input.id.substr(5)) {
            input.value = data.value;
          }
        });
      }
      let names = users.filter((u) => {
        return u.position.replace(" ", "_").toLowerCase() == res.id;
      });
      loadNames(names, input);
      formGroup.appendChild(input);
    }
    container.appendChild(formGroup);
  });
};

const showActivities = (activities, view = "Week") => {
  document.getElementById("all_activity").innerHTML = "";
  if (view.toLocaleLowerCase() == "month")
    var dp = new DayPilot.Month("all_activity");
  else {
    var dp = new DayPilot.Calendar("all_activity");
    dp.viewType = view;
  }
  dp.theme = "calendar_g";
  dp.width = "80%";

  dp.onEventClicked = (args) => {
    let details = args.e.data;
    if (window.location.hash !== "#activity_detail") {
      let location =
        window.location.origin +
        window.location.pathname +
        "?" +
        "activity_id=" +
        details.id +
        "#activity_detail";
      window.location.replace(location);
    }
    // showActivityDetail(details.id);
  };
  if (activities) {
    activities = activities.map((a) => {
      let mapped = a;
      mapped.start = a.date + "T" + a.start_time + ":00";
      mapped.end = a.date + "T" + a.end_time + ":00";
      return mapped;
    });
  }

  dp.events.list = activities;
  dp.init();
};
const initializeSchedule = () => {
  document.getElementById("schedule").innerHTML = "";
  var dp = new DayPilot.Scheduler("schedule");
  // var dp = new DayPilot.Scheduler("dp");

  // view
  dp.startDate = new DayPilot.Date("2021-04-18").firstDayOfMonth(); // or just dp.startDate = "2013-03-25";
  dp.cellGroupBy = "Month";
  dp.days = dp.startDate.daysInMonth();
  dp.cellDuration = 1440; // one day
  dp.cellWidth = 120;
  dp.treeEnabled = true;
  dp.resources = [
    {
      name: "Camera Operators",
      id: "Camera Operators",
      expanded: true,
      children: [
        { name: "Juma Ali", id: "0" },
        { name: "Fatma Mohammed", id: "1" },
        { name: "Jackson John", id: "2" },
        { name: "Mustafa Ayub", id: "3" },
      ],
    },
    {
      name: "Producers",
      id: "Producers",
      expanded: true,
      children: [
        { name: "Prosper Makundi", id: "4" },
        { name: "Jasmin Barongo", id: "5" },
      ],
    },
    {
      name: "Engineers",
      id: "Engineers",
      expanded: true,
      children: [
        { name: "Masudi Juma", id: "6" },
        { name: "Selemani Kaaya", id: "7" },
      ],
    },
    {
      name: "Studios",
      id: "Studios",
      expanded: true,
      children: [
        { name: "Studio 1", id: "10" },
        { name: "Studio 2", id: "11" },
      ],
    },
  ];

  // generate and load events
  dp.events.list = [
    {
      start: "2021-04-07T00:00:00",
      end: "2021-04-09T00:00:00",
      id: 1,
      resource: "0",
      text: "Karume Day",
    },
    {
      start: "2021-04-07T00:00:00",
      end: "2021-04-09T00:00:00",
      id: 2,
      resource: "1",
      text: "Karume Day",
    },
    {
      start: "2021-04-07T00:00:00",
      end: "2021-04-09T00:00:00",
      id: 3,
      resource: "4",
      text: "Karume Day",
    },
    {
      start: "2021-04-07T00:00:00",
      end: "2021-04-09T00:00:00",
      id: 4,
      resource: "6",
      text: "Karume Day",
    },
    {
      start: "2021-04-09T14:00:00",
      end: "2021-04-09T18:00:00",
      id: 5,
      resource: "10",
      text: "Build Up",
    },
    {
      start: "2021-04-09T16:00:00",
      end: "2021-04-09T18:00:00",
      id: 6,
      resource: "2",
      text: "Simba vs Kagera",
    },
  ];

  // event creating
  dp.onTimeRangeSelected = function (args) {
    var name = prompt("New event name:", "Event");
    dp.clearSelection();
    if (!name) return;
    var e = new DayPilot.Event({
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      resource: args.resource,
      text: name,
    });
    dp.events.add(e);
    dp.message("Created");
  };

  dp.init();
};
const assignResources = (activity) => {};
const prepareResources = (activities) => {};
if (window.location.pathname.includes("/dashboard.html")) {
  window.addEventListener("load", () => {
    let hash = window.location.hash;
    if (!hash.length) hash = "#all_activity";
    showContent(hash);
    if (hash == "#all_activity") {
      // let events = JSON.parse(localStorage.activities);
      showActivities(events, "Month");
    } else if (hash.substr(1) === "schedule") initializeSchedule();
    else if (hash == "#activity_detail") {
      let q = window.location.search;
      if (q.length > 3) {
        let id = q.split("=")[1];
        showActivityDetail(id);
      }
    } else if (hash == "#add_schedule") {
      console.log("u: ", users);
      console.log("units: ", units);
      let unit = document.getElementById("schedule_unit");
      let u = users.filter((u) => u.unit == units[0].id);
      populate("schedule_unit", units, {
        id: "schedule_crew_member",
        data: users,
        dependent: { id: "schedule_crew_member", data: u, dependent: null },
      });
    }
  });
  window.addEventListener("hashchange", () => {
    let hash = window.location.hash;
    let location = window.location.origin + window.location.pathname + hash;
    window.location.replace(location);
    showContent(hash);
    if (hash.substr(1) === "schedule") initializeSchedule();
    if (hash == "all_activity") showActivities(activities, "Week");
  });
}
