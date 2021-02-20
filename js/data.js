const departments = [
  { id: 0, name: "News", manager: 1 },
  { id: 1, name: "Production", manager: 2 },
  { id: 2, name: "UTV", manager: 3 },
  { id: 3, name: "Sports", manager: 4 },
  { id: 4, name: "Technical", manager: 5 },
  { id: 5, name: "Transport", manager: 6 },
  { id: 6, name: "Administration", manager: 7 },
];

//units
const units = [
  { id: 0, name: "Current Events", deptId: 0, hod: 10 },
  { id: 1, name: "International News", deptId: 0, hod: 11 },
  { id: 2, name: "Visual Editing", deptId: 1, hod: 12 },
  { id: 3, name: "Camera", deptId: 1, hod: 13 },
  { id: 4, name: "Switching", deptId: 1, hod: 14 },
  { id: 5, name: "Programs", deptId: 2, hod: 15 },
  { id: 6, name: "Live Events", deptId: 3, hod: 16 },
  { id: 7, name: "Engineering", deptId: 4, hod: 17 },
  { id: 8, name: "Broadcasting", deptId: 4, hod: 18 },
];

//users
const users = [
  {
    id: 0,
    name: "System Admin",
    position: "Administrator",
    deptId: 5,
    department: "Administration",
  },
  {
    id: 1,
    name: "Salma Bakari",
    position: "Manager",
    deptId: 0,
    department: "News",
  },
  {
    id: 2,
    name: "Alfred Mahenge",
    position: "Manager",
    deptId: 1,
    department: "Production",
  },
  {
    id: 3,
    name: "Xavier Banda",
    position: "Manager",
    deptId: 2,
    department: "UTV",
  },
  {
    id: 4,
    name: "Abdulaziz Juma",
    position: "Manager",
    deptId: 3,
    department: "Sports",
  },
  {
    id: 5,
    name: "Joyce Mzugu",
    position: "Manager",
    deptId: 4,
    department: "Technical",
  },
  {
    id: 20,
    name: "Juma Ali",
    position: "Camera Operator",
    deptId: 1,
    department: "Production",
  },
  {
    id: 21,
    name: "Fatma Mohammed",
    position: "Camera Operator",
    deptId: 1,
    department: "Production",
  },
  {
    id: 22,
    name: "Jackson John",
    position: "Camera Operator",
    deptId: 1,
    department: "Production",
  },
  {
    id: 23,
    name: "Mustafa Ayub",
    position: "Camera Operator",
    deptId: 1,
    department: "Production",
  },
  {
    id: 24,
    name: "Catherine Peter",
    position: "Camera Operator",
    deptId: 1,
    department: "Production",
  },
  {
    id: 25,
    name: "John Mamboleo",
    position: "Camera Operator",
    deptId: 1,
    department: "Production",
  },
  {
    id: 30,
    name: "Alex Muba",
    position: "Switcher",
    deptId: 1,
    department: "Production",
  },
  {
    id: 31,
    name: "Martha Kalokola",
    position: "Switcher",
    deptId: 1,
    department: "Production",
  },
  {
    id: 32,
    name: "Abuu Semainda",
    position: "Switcher",
    deptId: 1,
    department: "Production",
  },
  {
    id: 33,
    name: "Joyce Konda",
    position: "Switcher",
    deptId: 1,
    department: "Production",
  },
  {
    id: 40,
    name: "Joyce Banzi",
    position: "Visual Editor",
    deptId: 1,
    department: "Production",
  },
  {
    id: 41,
    name: "Mary Banzi",
    position: "Visual Editor",
    deptId: 1,
    department: "Production",
  },
  {
    id: 42,
    name: "Fauzia Ali",
    position: "Visual Editor",
    deptId: 1,
    department: "Production",
  },
  {
    id: 43,
    name: "Athuman Mbaruku",
    position: "Visual Editor",
    deptId: 1,
    department: "Production",
  },
  {
    id: 50,
    name: "Francis Kiboko",
    position: "Engineer",
    deptId: 4,
    department: "Technical",
  },
];

const calEvents = [
  {
    id: 0,
    activity: "Morning Trumpet Special",
    date: "2021-02-12",
    startTime: "06:00:00",
    endTime: "09:00:00",
    crew: [
      { id: 3, name: "Juma Ali", role: "Camera Operator" },
      { id: 45, name: "Ernesta John", role: "Camera Operator" },
      { id: 41, name: "Ravindah Kumar", role: "Sound Engineer" },
      { id: 12, name: "Abdul Mohammed", role: "Producer" },
      { id: 210, name: "Suleiman Mboma", role: "Switcher" },
      { id: 33, name: "Fatma Abdallah", role: "Presenter" },
    ],
    note: "Live studio event",
  },
  {
    id: 1,
    activity: "Adhuhuri Live",
    date: "2021-02-11",
    startTime: "13:00:00",
    endTime: "16:00:00",
    crew: [
      { id: 3, name: "Juma Ali", role: "Camera Operator" },
      { id: 45, name: "Ernesta John", role: "Camera Operator" },
      { id: 41, name: "Ravindah Kumar", role: "Sound Engineer" },
      { id: 12, name: "Abdul Mohammed", role: "Producer" },
      { id: 102, name: "Hekima Komba", role: "Switcher" },
      { id: 33, name: "Fatma Abdallah", role: "Presenter" },
    ],
    note: "Live studio event",
  },
  {
    id: 2,
    activity: "Alasiri Lounge",
    date: "2021-02-11",
    startTime: "16:00:00",
    endTime: "19:00:00",
    crew: [
      { id: 3, name: "Juma Ali", role: "Camera Operator" },
      { id: 45, name: "Ernesta John", role: "Camera Operator" },
      { id: 41, name: "Ravindah Kumar", role: "Sound Engineer" },
      { id: 12, name: "Abdul Mohammed", role: "Producer" },
      { id: 210, name: "Suleiman Mboma", role: "Switcher" },
      { id: 33, name: "Fatma Abdallah", role: "Presenter" },
    ],
    note: "Live studio event",
  },
  {
    id: 3,
    activity: "Habari",
    date: "2021-02-13",
    startTime: "20:00:00",
    endTime: "22:00:00",
    crew: [
      { id: 3, name: "Juma Ali", role: "Camera Operator" },
      { id: 45, name: "Ernesta John", role: "Camera Operator" },
      { id: 41, name: "Ravindah Kumar", role: "Sound Engineer" },
      { id: 12, name: "Abdul Mohammed", role: "Producer" },
      { id: 102, name: "Hekima Komba", role: "Switcher" },
      { id: 33, name: "Fatma Abdallah", role: "Presenter" },
    ],
    note: "Live studio event",
  },
];
//dummy assignments
const dummyAss = [];

//dummy resources
const dummyResources = [
  {
    id: "camera",
    name: "Camera Operators",
    expanded: true,
    children: [
      { id: "0", name: "Ali Juma" },
      { id: "1", name: "Ernesta John" },
      { id: "2", name: "Emmanuel Mbogo" },
      { id: "3", name: "Yahya Abdallah" },
      { id: "4", name: "Yusta Kalikawe" },
      { id: "5", name: "James Magongo" },
    ],
  },
  {
    id: "sound",
    name: "Sound Engineers",
    expanded: true,
    children: [
      { id: "1", name: "Ravinda Kumar" },
      { id: "2", name: "Jumanne Kasongo" },
      { id: "3", name: "Johnson Peter" },
      { id: "4", name: "Experius Mponda" },
    ],
  },
  {
    id: "producer",
    name: "Producers",
    expanded: true,
    children: [
      { id: "1", name: "Fatma Mmari" },
      { id: "2", name: "Albogast Thobias" },
    ],
  },
  {
    id: "presenter",
    name: "Presenters",
    expanded: true,
    children: [
      { id: "1", name: "Nurueli Samson" },
      { id: "2", name: "Zuhura Marijani" },
      { id: "3", name: "Neema Mushi" },
      { id: "4", name: "Edwin Paul" },
    ],
  },
  {
    id: "switcher",
    name: "Switchers",
    expanded: true,
    children: [
      { id: "1", name: "Oscar Mabele" },
      { id: "2", name: "Athumani Majamba" },
    ],
  },
  {
    id: "visual",
    name: "Visual Editors",
    expanded: true,
    children: [
      { id: "1", name: "Mohammed Bakari" },
      { id: "2", name: "Henri Mtawali" },
      { id: "1", name: "Eunice Kamala" },
      { id: "2", name: "Mwanaidi Mponzi" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical Engineers",
    expanded: true,
    children: [
      { id: 1, name: "Johnson John" },
      { id: 1, name: "Denis Mungereza" },
    ],
  },
  {
    id: "lighting",
    name: "Lighting Engineers",
    children: [
      { id: 1, name: "Adonis Alphonce" },
      { id: 1, name: "Bakari Juma" },
    ],
  },
];
//dummy activities
const activitiesData = [
  {
    id: 0,
    status: "Open",
    name: "JKT Oljoiro vs Azam Live Match",
    nature: "Unscheduled",
    department: "Sports",
    region: "Arusha",
    venue: "Chuga Stadium",
    date: "2021-02-13",
    startTime: "2021-02-10T6:00:00",
    endTime: "2021-02-12T18:00:00",
    resource: [
      {
        id: "camera",
        name: "Camera Operators",
        children: ["0", "2", "3", "4", "5", "6"],
      },
      {
        id: "sound",
        name: "Sound Engineers",
        children: ["1", "2"],
      },
      { id: "producer", name: "Producers", children: ["1"] },
      { id: "presenter", name: "Presenters", children: ["1", "2"] },
      { id: "switcher", name: "Switchers", children: ["1", "2"] },
      { id: "visual", name: "Visual Editors", children: ["1"] },
      { id: "electrical", name: "Electrical Engineers", children: [1] },
      { id: "lighting", name: "Lighting Engineers", children: [1] },
    ],
    note: "Great Match",
  },
  {
    id: 1,
    status: "Open",
    name: "Interview with President JP Magufuli",
    nature: "Unscheduled",
    department: "UTV",
    region: "Dar es Salaam",
    venue: "Ikulu",
    date: "2021-02-14",
    startTime: "2021-02-14T11:00:00",
    endTime: "2021-02-14T12:00:00",
    resource: [
      {
        id: "camera",
        name: "Camera Operators",
        children: ["0", "2", "3", "4", "5", "6"],
      },
      {
        id: "sound",
        name: "Sound Engineers",
        children: ["1", "2"],
      },
      { id: "producer", name: "Producers", children: ["1"] },
      { id: "presenter", name: "Presenters", children: ["1", "2"] },
      { id: "switcher", name: "Switchers", children: ["1", "2"] },
      { id: "visual", name: "Visual Editors", children: ["1"] },
      { id: "electrical", name: "Electrical Engineers", children: [1] },
      { id: "lighting", name: "Lighting Engineers", children: [1] },
    ],
    note: "Presidential Event",
  },
];
