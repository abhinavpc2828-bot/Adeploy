// ============================================================
// STUDENT MODULE - LOCALSTORAGE VERSION (students.js)
// Handles Student State, Adding, Displaying, and Searching via localStorage
// ============================================================

// Load initial students from localStorage or fallback to default array
let Students = JSON.parse(localStorage.getItem("students")) || [
  {
    id: 1,
    First_Name: "Rahul",
    Last_Name: "Kumar",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { physics: 76, chemistry: 88, maths: 82 },

    parents: {
      father: {
        name: "Rajesh Kumar",
        phone: "9000000001",
        email: "rajesh.kumar@example.com",
        occupation: "Engineer",
      },
      mother: {
        name: "Sunita Kumar",
        phone: "9000000002",
        email: "sunita.kumar@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 204, Shree Apartments",
        area: "Kothrud",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411038",
      },
      emergency_contact: {
        name: "Rajesh Kumar",
        relation: "Father",
        phone: "9000000001",
      },
    },
  },

  {
    id: 2,
    First_Name: "Ramesh",
    Last_Name: "Babu",
    age: 19,
    admitted: 2020,
    current_STD: "4 year",
    marks: { maths: 91, physics: 85, chemistry: 79 },

    parents: {
      father: {
        name: "Suresh Babu",
        phone: "9000000003",
        email: "suresh.babu@example.com",
        occupation: "Businessman",
      },
      mother: {
        name: "Lakshmi Babu",
        phone: "9000000004",
        email: "lakshmi.babu@example.com",
        occupation: "Accountant",
      },
      address: {
        house: "House 18, Green Residency",
        area: "Viman Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411014",
      },
      emergency_contact: {
        name: "Suresh Babu",
        relation: "Father",
        phone: "9000000003",
      },
    },
  },

  {
    id: 3,
    First_Name: "Amit",
    Last_Name: "Sharma",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 76, physics: 81, chemistry: 73 },

    parents: {
      father: {
        name: "Vijay Sharma",
        phone: "9000000005",
        email: "vijay.sharma@example.com",
        occupation: "Bank Manager",
      },
      mother: {
        name: "Neeta Sharma",
        phone: "9000000006",
        email: "neeta.sharma@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "Flat 301, Sunrise Heights",
        area: "Baner",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411045",
      },
      emergency_contact: {
        name: "Vijay Sharma",
        relation: "Father",
        phone: "9000000005",
      },
    },
  },

  {
    id: 4,
    First_Name: "Sneha",
    Last_Name: "Patil",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 88, physics: 92, chemistry: 86 },

    parents: {
      father: {
        name: "Mahesh Patil",
        phone: "9000000007",
        email: "mahesh.patil@example.com",
        occupation: "Civil Engineer",
      },
      mother: {
        name: "Madhuri Patil",
        phone: "9000000008",
        email: "madhuri.patil@example.com",
        occupation: "Nurse",
      },
      address: {
        house: "House 42, Ganesh Nagar",
        area: "Wakad",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411057",
      },
      emergency_contact: {
        name: "Madhuri Patil",
        relation: "Mother",
        phone: "9000000008",
      },
    },
  },

  {
    id: 5,
    First_Name: "Rohan",
    Last_Name: "Deshmukh",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 69, physics: 74, chemistry: 81 },

    parents: {
      father: {
        name: "Prakash Deshmukh",
        phone: "9000000009",
        email: "prakash.deshmukh@example.com",
        occupation: "Government Employee",
      },
      mother: {
        name: "Rekha Deshmukh",
        phone: "9000000010",
        email: "rekha.deshmukh@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 105, Sai Enclave",
        area: "Akurdi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411035",
      },
      emergency_contact: {
        name: "Prakash Deshmukh",
        relation: "Father",
        phone: "9000000009",
      },
    },
  },

  {
    id: 6,
    First_Name: "Priya",
    Last_Name: "Joshi",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 94, physics: 89, chemistry: 91 },

    parents: {
      father: {
        name: "Anil Joshi",
        phone: "9000000011",
        email: "anil.joshi@example.com",
        occupation: "Doctor",
      },
      mother: {
        name: "Kiran Joshi",
        phone: "9000000012",
        email: "kiran.joshi@example.com",
        occupation: "Professor",
      },
      address: {
        house: "Flat 402, Lotus Residency",
        area: "Aundh",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411007",
      },
      emergency_contact: {
        name: "Anil Joshi",
        relation: "Father",
        phone: "9000000011",
      },
    },
  },

  {
    id: 7,
    First_Name: "Akash",
    Last_Name: "Kulkarni",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 71, physics: 78, chemistry: 75 },

    parents: {
      father: {
        name: "Dinesh Kulkarni",
        phone: "9000000013",
        email: "dinesh.kulkarni@example.com",
        occupation: "Software Developer",
      },
      mother: {
        name: "Asha Kulkarni",
        phone: "9000000014",
        email: "asha.kulkarni@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "House 27, Shivaji Nagar",
        area: "Shivaji Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411005",
      },
      emergency_contact: {
        name: "Dinesh Kulkarni",
        relation: "Father",
        phone: "9000000013",
      },
    },
  },

  {
    id: 8,
    First_Name: "Neha",
    Last_Name: "Shinde",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 87, physics: 83, chemistry: 90 },

    parents: {
      father: {
        name: "Santosh Shinde",
        phone: "9000000015",
        email: "santosh.shinde@example.com",
        occupation: "Business Owner",
      },
      mother: {
        name: "Sunita Shinde",
        phone: "9000000016",
        email: "sunita.shinde@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "Flat 208, Krishna Heights",
        area: "Pimpri",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411018",
      },
      emergency_contact: {
        name: "Santosh Shinde",
        relation: "Father",
        phone: "9000000015",
      },
    },
  },

  {
    id: 9,
    First_Name: "Vikas",
    Last_Name: "Jadhav",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 79, physics: 72, chemistry: 77 },

    parents: {
      father: {
        name: "Ramesh Jadhav",
        phone: "9000000017",
        email: "ramesh.jadhav@example.com",
        occupation: "Police Officer",
      },
      mother: {
        name: "Mina Jadhav",
        phone: "9000000018",
        email: "mina.jadhav@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 16, Shanti Nagar",
        area: "Bhosari",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411039",
      },
      emergency_contact: {
        name: "Ramesh Jadhav",
        relation: "Father",
        phone: "9000000017",
      },
    },
  },

  {
    id: 10,
    First_Name: "Pooja",
    Last_Name: "More",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 90, physics: 87, chemistry: 93 },

    parents: {
      father: {
        name: "Ganesh More",
        phone: "9000000019",
        email: "ganesh.more@example.com",
        occupation: "Electrician",
      },
      mother: {
        name: "Usha More",
        phone: "9000000020",
        email: "usha.more@example.com",
        occupation: "Tailor",
      },
      address: {
        house: "Flat 303, Om Residency",
        area: "Hadapsar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411028",
      },
      emergency_contact: {
        name: "Usha More",
        relation: "Mother",
        phone: "9000000020",
      },
    },
  },

  {
    id: 11,
    First_Name: "Sahil",
    Last_Name: "Pawar",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 68, physics: 70, chemistry: 74 },

    parents: {
      father: {
        name: "Nitin Pawar",
        phone: "9000000021",
        email: "nitin.pawar@example.com",
        occupation: "Driver",
      },
      mother: {
        name: "Savita Pawar",
        phone: "9000000022",
        email: "savita.pawar@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 51, Ganesh Colony",
        area: "Kondhwa",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411048",
      },
      emergency_contact: {
        name: "Nitin Pawar",
        relation: "Father",
        phone: "9000000021",
      },
    },
  },

  {
    id: 12,
    First_Name: "Anjali",
    Last_Name: "Chavan",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 96, physics: 91, chemistry: 89 },

    parents: {
      father: {
        name: "Vilas Chavan",
        phone: "9000000023",
        email: "vilas.chavan@example.com",
        occupation: "Businessman",
      },
      mother: {
        name: "Manisha Chavan",
        phone: "9000000024",
        email: "manisha.chavan@example.com",
        occupation: "Accountant",
      },
      address: {
        house: "Flat 601, Silver Heights",
        area: "Kharadi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411014",
      },
      emergency_contact: {
        name: "Vilas Chavan",
        relation: "Father",
        phone: "9000000023",
      },
    },
  },

  {
    id: 13,
    First_Name: "Karan",
    Last_Name: "Mehta",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 84, physics: 79, chemistry: 88 },

    parents: {
      father: {
        name: "Rajiv Mehta",
        phone: "9000000025",
        email: "rajiv.mehta@example.com",
        occupation: "Chartered Accountant",
      },
      mother: {
        name: "Poonam Mehta",
        phone: "9000000026",
        email: "poonam.mehta@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 205, Pearl Residency",
        area: "Kalyani Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411006",
      },
      emergency_contact: {
        name: "Rajiv Mehta",
        relation: "Father",
        phone: "9000000025",
      },
    },
  },

  {
    id: 14,
    First_Name: "Kavita",
    Last_Name: "Desai",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 92, physics: 86, chemistry: 90 },

    parents: {
      father: {
        name: "Mohan Desai",
        phone: "9000000027",
        email: "mohan.desai@example.com",
        occupation: "Architect",
      },
      mother: {
        name: "Smita Desai",
        phone: "9000000028",
        email: "smita.desai@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 11, Anand Park",
        area: "Pashan",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411021",
      },
      emergency_contact: {
        name: "Mohan Desai",
        relation: "Father",
        phone: "9000000027",
      },
    },
  },

  {
    id: 15,
    First_Name: "Arjun",
    Last_Name: "Singh",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 73, physics: 82, chemistry: 76 },

    parents: {
      father: {
        name: "Rakesh Singh",
        phone: "9000000029",
        email: "rakesh.singh@example.com",
        occupation: "Army Officer",
      },
      mother: {
        name: "Kavita Singh",
        phone: "9000000030",
        email: "kavita.singh@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 104, Defence Colony",
        area: "Dhanori",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411015",
      },
      emergency_contact: {
        name: "Rakesh Singh",
        relation: "Father",
        phone: "9000000029",
      },
    },
  },

  {
    id: 16,
    First_Name: "Meera",
    Last_Name: "Nair",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 89, physics: 94, chemistry: 87 },

    parents: {
      father: {
        name: "Suresh Nair",
        phone: "9000000031",
        email: "suresh.nair@example.com",
        occupation: "Professor",
      },
      mother: {
        name: "Anita Nair",
        phone: "9000000032",
        email: "anita.nair@example.com",
        occupation: "Doctor",
      },
      address: {
        house: "Flat 307, Lake View Apartments",
        area: "Bavdhan",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411021",
      },
      emergency_contact: {
        name: "Anita Nair",
        relation: "Mother",
        phone: "9000000032",
      },
    },
  },

  {
    id: 17,
    First_Name: "Aditya",
    Last_Name: "Verma",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 78, physics: 75, chemistry: 83 },

    parents: {
      father: {
        name: "Manoj Verma",
        phone: "9000000033",
        email: "manoj.verma@example.com",
        occupation: "Manager",
      },
      mother: {
        name: "Rekha Verma",
        phone: "9000000034",
        email: "rekha.verma@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 32, Sai Nagar",
        area: "Nigdi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411044",
      },
      emergency_contact: {
        name: "Manoj Verma",
        relation: "Father",
        phone: "9000000033",
      },
    },
  },

  {
    id: 18,
    First_Name: "Simran",
    Last_Name: "Kaur",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 95, physics: 90, chemistry: 92 },

    parents: {
      father: {
        name: "Harpreet Singh",
        phone: "9000000035",
        email: "harpreet.singh@example.com",
        occupation: "Businessman",
      },
      mother: {
        name: "Jaspreet Kaur",
        phone: "9000000036",
        email: "jaspreet.kaur@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 502, Royal Residency",
        area: "Pimple Saudagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411027",
      },
      emergency_contact: {
        name: "Harpreet Singh",
        relation: "Father",
        phone: "9000000035",
      },
    },
  },

  {
    id: 19,
    First_Name: "Nikhil",
    Last_Name: "Rane",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 67, physics: 73, chemistry: 71 },

    parents: {
      father: {
        name: "Milind Rane",
        phone: "9000000037",
        email: "milind.rane@example.com",
        occupation: "Bank Employee",
      },
      mother: {
        name: "Vaishali Rane",
        phone: "9000000038",
        email: "vaishali.rane@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 23, Ganesh Park",
        area: "Chinchwad",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411033",
      },
      emergency_contact: {
        name: "Milind Rane",
        relation: "Father",
        phone: "9000000037",
      },
    },
  },

  {
    id: 20,
    First_Name: "Isha",
    Last_Name: "Gupta",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 91, physics: 88, chemistry: 94 },

    parents: {
      father: {
        name: "Amit Gupta",
        phone: "9000000039",
        email: "amit.gupta@example.com",
        occupation: "Software Engineer",
      },
      mother: {
        name: "Renu Gupta",
        phone: "9000000040",
        email: "renu.gupta@example.com",
        occupation: "Lecturer",
      },
      address: {
        house: "Flat 403, Orchid Heights",
        area: "Magarpatta",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411013",
      },
      emergency_contact: {
        name: "Amit Gupta",
        relation: "Father",
        phone: "9000000039",
      },
    },
  },

  {
    id: 21,
    First_Name: "Manish",
    Last_Name: "Yadav",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 72, physics: 77, chemistry: 80 },

    parents: {
      father: {
        name: "Ramesh Yadav",
        phone: "9000000041",
        email: "ramesh.yadav@example.com",
        occupation: "Contractor",
      },
      mother: {
        name: "Sarla Yadav",
        phone: "9000000042",
        email: "sarla.yadav@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 74, Shivaji Colony",
        area: "Moshi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "412105",
      },
      emergency_contact: {
        name: "Ramesh Yadav",
        relation: "Father",
        phone: "9000000041",
      },
    },
  },

  {
    id: 22,
    First_Name: "Riya",
    Last_Name: "Malhotra",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 88, physics: 91, chemistry: 85 },

    parents: {
      father: {
        name: "Sanjay Malhotra",
        phone: "9000000043",
        email: "sanjay.malhotra@example.com",
        occupation: "Business Owner",
      },
      mother: {
        name: "Nisha Malhotra",
        phone: "9000000044",
        email: "nisha.malhotra@example.com",
        occupation: "Designer",
      },
      address: {
        house: "Flat 602, Maple Residency",
        area: "Koregaon Park",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
      },
      emergency_contact: {
        name: "Sanjay Malhotra",
        relation: "Father",
        phone: "9000000043",
      },
    },
  },

  {
    id: 23,
    First_Name: "Varun",
    Last_Name: "Joshi",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 81, physics: 69, chemistry: 78 },

    parents: {
      father: {
        name: "Pravin Joshi",
        phone: "9000000045",
        email: "pravin.joshi@example.com",
        occupation: "Sales Manager",
      },
      mother: {
        name: "Rita Joshi",
        phone: "9000000046",
        email: "rita.joshi@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 19, Shree Nagar",
        area: "Warje",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411052",
      },
      emergency_contact: {
        name: "Pravin Joshi",
        relation: "Father",
        phone: "9000000045",
      },
    },
  },

  {
    id: 24,
    First_Name: "Ayesha",
    Last_Name: "Khan",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 93, physics: 87, chemistry: 91 },

    parents: {
      father: {
        name: "Imran Khan",
        phone: "9000000047",
        email: "imran.khan@example.com",
        occupation: "Doctor",
      },
      mother: {
        name: "Farah Khan",
        phone: "9000000048",
        email: "farah.khan@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 206, Rose Apartments",
        area: "Camp",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
      },
      emergency_contact: {
        name: "Imran Khan",
        relation: "Father",
        phone: "9000000047",
      },
    },
  },

  {
    id: 25,
    First_Name: "Harsh",
    Last_Name: "Shah",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 75, physics: 80, chemistry: 72 },

    parents: {
      father: {
        name: "Mukesh Shah",
        phone: "9000000049",
        email: "mukesh.shah@example.com",
        occupation: "Accountant",
      },
      mother: {
        name: "Hema Shah",
        phone: "9000000050",
        email: "hema.shah@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "Flat 305, Galaxy Residency",
        area: "Bopodi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411003",
      },
      emergency_contact: {
        name: "Mukesh Shah",
        relation: "Father",
        phone: "9000000049",
      },
    },
  },

  {
    id: 26,
    First_Name: "Nisha",
    Last_Name: "Bhosale",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 97, physics: 93, chemistry: 95 },

    parents: {
      father: {
        name: "Shankar Bhosale",
        phone: "9000000051",
        email: "shankar.bhosale@example.com",
        occupation: "Government Officer",
      },
      mother: {
        name: "Sushma Bhosale",
        phone: "9000000052",
        email: "sushma.bhosale@example.com",
        occupation: "Nurse",
      },
      address: {
        house: "House 88, Sai Colony",
        area: "Lohegaon",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411047",
      },
      emergency_contact: {
        name: "Sushma Bhosale",
        relation: "Mother",
        phone: "9000000052",
      },
    },
  },

  {
    id: 27,
    First_Name: "Yash",
    Last_Name: "Thakur",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 70, physics: 76, chemistry: 79 },

    parents: {
      father: {
        name: "Rajendra Thakur",
        phone: "9000000053",
        email: "rajendra.thakur@example.com",
        occupation: "Transport Manager",
      },
      mother: {
        name: "Meena Thakur",
        phone: "9000000054",
        email: "meena.thakur@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "Flat 107, Green Valley",
        area: "Tingre Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411032",
      },
      emergency_contact: {
        name: "Rajendra Thakur",
        relation: "Father",
        phone: "9000000053",
      },
    },
  },

  {
    id: 28,
    First_Name: "Tanvi",
    Last_Name: "Pawar",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 86, physics: 89, chemistry: 92 },

    parents: {
      father: {
        name: "Sudhir Pawar",
        phone: "9000000055",
        email: "sudhir.pawar@example.com",
        occupation: "Engineer",
      },
      mother: {
        name: "Alka Pawar",
        phone: "9000000056",
        email: "alka.pawar@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 409, Crystal Residency",
        area: "Pimple Nilakh",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411027",
      },
      emergency_contact: {
        name: "Sudhir Pawar",
        relation: "Father",
        phone: "9000000055",
      },
    },
  },

  {
    id: 29,
    First_Name: "Omkar",
    Last_Name: "Kadam",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 82, physics: 71, chemistry: 75 },

    parents: {
      father: {
        name: "Prakash Kadam",
        phone: "9000000057",
        email: "prakash.kadam@example.com",
        occupation: "Technician",
      },
      mother: {
        name: "Vandana Kadam",
        phone: "9000000058",
        email: "vandana.kadam@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 63, Datta Nagar",
        area: "Ravet",
        city: "Pune",
        state: "Maharashtra",
        pincode: "412101",
      },
      emergency_contact: {
        name: "Prakash Kadam",
        relation: "Father",
        phone: "9000000057",
      },
    },
  },

  {
    id: 30,
    First_Name: "Snehal",
    Last_Name: "Gawande",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 90, physics: 95, chemistry: 88 },

    parents: {
      father: {
        name: "Ravindra Gawande",
        phone: "9000000059",
        email: "ravindra.gawande@example.com",
        occupation: "Businessman",
      },
      mother: {
        name: "Shobha Gawande",
        phone: "9000000060",
        email: "shobha.gawande@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 503, Emerald Heights",
        area: "Balewadi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411045",
      },
      emergency_contact: {
        name: "Ravindra Gawande",
        relation: "Father",
        phone: "9000000059",
      },
    },
  },

  {
    id: 31,
    First_Name: "Rohit",
    Last_Name: "Mane",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 77, physics: 84, chemistry: 70 },

    parents: {
      father: {
        name: "Sunil Mane",
        phone: "9000000061",
        email: "sunil.mane@example.com",
        occupation: "Supervisor",
      },
      mother: {
        name: "Lata Mane",
        phone: "9000000062",
        email: "lata.mane@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 29, Ganesh Nagar",
        area: "Pimpri",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411018",
      },
      emergency_contact: {
        name: "Sunil Mane",
        relation: "Father",
        phone: "9000000061",
      },
    },
  },

  {
    id: 32,
    First_Name: "Pallavi",
    Last_Name: "Jagtap",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 94, physics: 92, chemistry: 89 },

    parents: {
      father: {
        name: "Madhav Jagtap",
        phone: "9000000063",
        email: "madhav.jagtap@example.com",
        occupation: "Teacher",
      },
      mother: {
        name: "Sunanda Jagtap",
        phone: "9000000064",
        email: "sunanda.jagtap@example.com",
        occupation: "Clerk",
      },
      address: {
        house: "Flat 201, Sai Darshan",
        area: "Sinhagad Road",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411041",
      },
      emergency_contact: {
        name: "Madhav Jagtap",
        relation: "Father",
        phone: "9000000063",
      },
    },
  },

  {
    id: 33,
    First_Name: "Sanket",
    Last_Name: "Wagh",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 69, physics: 78, chemistry: 74 },

    parents: {
      father: {
        name: "Ashok Wagh",
        phone: "9000000065",
        email: "ashok.wagh@example.com",
        occupation: "Farmer",
      },
      mother: {
        name: "Sunita Wagh",
        phone: "9000000066",
        email: "sunita.wagh@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 14, Shriram Nagar",
        area: "Dhankawadi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411043",
      },
      emergency_contact: {
        name: "Ashok Wagh",
        relation: "Father",
        phone: "9000000065",
      },
    },
  },

  {
    id: 34,
    First_Name: "Shreya",
    Last_Name: "Patil",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 87, physics: 90, chemistry: 93 },

    parents: {
      father: {
        name: "Vijay Patil",
        phone: "9000000067",
        email: "vijay.patil@example.com",
        occupation: "Civil Engineer",
      },
      mother: {
        name: "Neelam Patil",
        phone: "9000000068",
        email: "neelam.patil@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 304, Blue Orchid",
        area: "Pashan",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411021",
      },
      emergency_contact: {
        name: "Vijay Patil",
        relation: "Father",
        phone: "9000000067",
      },
    },
  },

  {
    id: 35,
    First_Name: "Tejas",
    Last_Name: "Chavan",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 80, physics: 74, chemistry: 81 },

    parents: {
      father: {
        name: "Deepak Chavan",
        phone: "9000000069",
        email: "deepak.chavan@example.com",
        occupation: "Mechanic",
      },
      mother: {
        name: "Surekha Chavan",
        phone: "9000000070",
        email: "surekha.chavan@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 37, Sai Colony",
        area: "Dapodi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411012",
      },
      emergency_contact: {
        name: "Deepak Chavan",
        relation: "Father",
        phone: "9000000069",
      },
    },
  },

  {
    id: 36,
    First_Name: "Mansi",
    Last_Name: "More",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 91, physics: 89, chemistry: 96 },

    parents: {
      father: {
        name: "Vishal More",
        phone: "9000000071",
        email: "vishal.more@example.com",
        occupation: "IT Consultant",
      },
      mother: {
        name: "Rupali More",
        phone: "9000000072",
        email: "rupali.more@example.com",
        occupation: "Professor",
      },
      address: {
        house: "Flat 702, Sunflower Residency",
        area: "Kharadi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411014",
      },
      emergency_contact: {
        name: "Vishal More",
        relation: "Father",
        phone: "9000000071",
      },
    },
  },

  {
    id: 37,
    First_Name: "Pranav",
    Last_Name: "Kulkarni",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 74, physics: 81, chemistry: 77 },

    parents: {
      father: {
        name: "Sachin Kulkarni",
        phone: "9000000073",
        email: "sachin.kulkarni@example.com",
        occupation: "Software Engineer",
      },
      mother: {
        name: "Archana Kulkarni",
        phone: "9000000074",
        email: "archana.kulkarni@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 403, Green Meadows",
        area: "Karve Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411052",
      },
      emergency_contact: {
        name: "Sachin Kulkarni",
        relation: "Father",
        phone: "9000000073",
      },
    },
  },

  {
    id: 38,
    First_Name: "Anushka",
    Last_Name: "Sane",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 96, physics: 94, chemistry: 91 },

    parents: {
      father: {
        name: "Nitin Sane",
        phone: "9000000075",
        email: "nitin.sane@example.com",
        occupation: "Businessman",
      },
      mother: {
        name: "Madhavi Sane",
        phone: "9000000076",
        email: "madhavi.sane@example.com",
        occupation: "Doctor",
      },
      address: {
        house: "Flat 505, Park View",
        area: "Aundh",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411007",
      },
      emergency_contact: {
        name: "Madhavi Sane",
        relation: "Mother",
        phone: "9000000076",
      },
    },
  },

  {
    id: 39,
    First_Name: "Akshay",
    Last_Name: "Pawar",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 83, physics: 72, chemistry: 79 },

    parents: {
      father: {
        name: "Shivaji Pawar",
        phone: "9000000077",
        email: "shivaji.pawar@example.com",
        occupation: "Contractor",
      },
      mother: {
        name: "Shaila Pawar",
        phone: "9000000078",
        email: "shaila.pawar@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 45, Shanti Park",
        area: "Wakad",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411057",
      },
      emergency_contact: {
        name: "Shivaji Pawar",
        relation: "Father",
        phone: "9000000077",
      },
    },
  },

  {
    id: 40,
    First_Name: "Komal",
    Last_Name: "Shinde",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 89, physics: 86, chemistry: 94 },

    parents: {
      father: {
        name: "Ramesh Shinde",
        phone: "9000000079",
        email: "ramesh.shinde@example.com",
        occupation: "Accountant",
      },
      mother: {
        name: "Anita Shinde",
        phone: "9000000080",
        email: "anita.shinde@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 302, Royal Heights",
        area: "Viman Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411014",
      },
      emergency_contact: {
        name: "Ramesh Shinde",
        relation: "Father",
        phone: "9000000079",
      },
    },
  },

  {
    id: 41,
    First_Name: "Saurabh",
    Last_Name: "Borkar",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 71, physics: 79, chemistry: 73 },

    parents: {
      father: {
        name: "Ravindra Borkar",
        phone: "9000000081",
        email: "ravindra.borkar@example.com",
        occupation: "Government Employee",
      },
      mother: {
        name: "Sunita Borkar",
        phone: "9000000082",
        email: "sunita.borkar@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 22, Ganesh Nagar",
        area: "Mundhwa",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411036",
      },
      emergency_contact: {
        name: "Ravindra Borkar",
        relation: "Father",
        phone: "9000000081",
      },
    },
  },

  {
    id: 42,
    First_Name: "Priti",
    Last_Name: "Kamble",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 93, physics: 90, chemistry: 87 },

    parents: {
      father: {
        name: "Prakash Kamble",
        phone: "9000000083",
        email: "prakash.kamble@example.com",
        occupation: "Clerk",
      },
      mother: {
        name: "Meena Kamble",
        phone: "9000000084",
        email: "meena.kamble@example.com",
        occupation: "Nurse",
      },
      address: {
        house: "Flat 205, Sai Residency",
        area: "Kondhwa",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411048",
      },
      emergency_contact: {
        name: "Meena Kamble",
        relation: "Mother",
        phone: "9000000084",
      },
    },
  },

  {
    id: 43,
    First_Name: "Vivek",
    Last_Name: "Deshmukh",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 76, physics: 83, chemistry: 80 },

    parents: {
      father: {
        name: "Rajendra Deshmukh",
        phone: "9000000085",
        email: "rajendra.deshmukh@example.com",
        occupation: "Engineer",
      },
      mother: {
        name: "Sunita Deshmukh",
        phone: "9000000086",
        email: "sunita.deshmukh@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "House 58, Shivaji Nagar",
        area: "Shivaji Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411005",
      },
      emergency_contact: {
        name: "Rajendra Deshmukh",
        relation: "Father",
        phone: "9000000085",
      },
    },
  },

  {
    id: 44,
    First_Name: "Aarti",
    Last_Name: "Nikam",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 92, physics: 88, chemistry: 95 },

    parents: {
      father: {
        name: "Sunil Nikam",
        phone: "9000000087",
        email: "sunil.nikam@example.com",
        occupation: "Business Owner",
      },
      mother: {
        name: "Jyoti Nikam",
        phone: "9000000088",
        email: "jyoti.nikam@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "Flat 401, Silver Oak",
        area: "Baner",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411045",
      },
      emergency_contact: {
        name: "Sunil Nikam",
        relation: "Father",
        phone: "9000000087",
      },
    },
  },

  {
    id: 45,
    First_Name: "Ritesh",
    Last_Name: "Salunkhe",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 68, physics: 75, chemistry: 82 },

    parents: {
      father: {
        name: "Vasant Salunkhe",
        phone: "9000000089",
        email: "vasant.salunkhe@example.com",
        occupation: "Farmer",
      },
      mother: {
        name: "Nirmala Salunkhe",
        phone: "9000000090",
        email: "nirmala.salunkhe@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 17, Laxmi Nagar",
        area: "Bhosari",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411039",
      },
      emergency_contact: {
        name: "Vasant Salunkhe",
        relation: "Father",
        phone: "9000000089",
      },
    },
  },

  {
    id: 46,
    First_Name: "Divya",
    Last_Name: "Kadam",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 90, physics: 93, chemistry: 89 },

    parents: {
      father: {
        name: "Mahendra Kadam",
        phone: "9000000091",
        email: "mahendra.kadam@example.com",
        occupation: "Manager",
      },
      mother: {
        name: "Seema Kadam",
        phone: "9000000092",
        email: "seema.kadam@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 603, Sunshine Apartments",
        area: "Kharadi",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411014",
      },
      emergency_contact: {
        name: "Mahendra Kadam",
        relation: "Father",
        phone: "9000000091",
      },
    },
  },

  {
    id: 47,
    First_Name: "Atharva",
    Last_Name: "Joshi",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 79, physics: 77, chemistry: 85 },

    parents: {
      father: {
        name: "Sandeep Joshi",
        phone: "9000000093",
        email: "sandeep.joshi@example.com",
        occupation: "Software Developer",
      },
      mother: {
        name: "Pallavi Joshi",
        phone: "9000000094",
        email: "pallavi.joshi@example.com",
        occupation: "Accountant",
      },
      address: {
        house: "Flat 208, Hill View Residency",
        area: "Kothrud",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411038",
      },
      emergency_contact: {
        name: "Sandeep Joshi",
        relation: "Father",
        phone: "9000000093",
      },
    },
  },

  {
    id: 48,
    First_Name: "Sakshi",
    Last_Name: "Mhatre",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 95, physics: 91, chemistry: 93 },

    parents: {
      father: {
        name: "Pradeep Mhatre",
        phone: "9000000095",
        email: "pradeep.mhatre@example.com",
        occupation: "Architect",
      },
      mother: {
        name: "Rekha Mhatre",
        phone: "9000000096",
        email: "rekha.mhatre@example.com",
        occupation: "Teacher",
      },
      address: {
        house: "Flat 506, Bluebell Residency",
        area: "Wakad",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411057",
      },
      emergency_contact: {
        name: "Pradeep Mhatre",
        relation: "Father",
        phone: "9000000095",
      },
    },
  },

  {
    id: 49,
    First_Name: "Abhishek",
    Last_Name: "Gaikwad",
    age: 18,
    admitted: 2021,
    current_STD: "1st Year",
    marks: { maths: 73, physics: 80, chemistry: 76 },

    parents: {
      father: {
        name: "Dattatray Gaikwad",
        phone: "9000000097",
        email: "dattatray.gaikwad@example.com",
        occupation: "Government Employee",
      },
      mother: {
        name: "Mangal Gaikwad",
        phone: "9000000098",
        email: "mangal.gaikwad@example.com",
        occupation: "Homemaker",
      },
      address: {
        house: "House 39, Ganesh Colony",
        area: "Hadapsar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411028",
      },
      emergency_contact: {
        name: "Dattatray Gaikwad",
        relation: "Father",
        phone: "9000000097",
      },
    },
  },

  {
    id: 50,
    First_Name: "Shruti",
    Last_Name: "Raut",
    age: 19,
    admitted: 2020,
    current_STD: "2nd Year",
    marks: { maths: 98, physics: 94, chemistry: 96 },

    parents: {
      father: {
        name: "Ashish Raut",
        phone: "9000000099",
        email: "ashish.raut@example.com",
        occupation: "Businessman",
      },
      mother: {
        name: "Swati Raut",
        phone: "9000000100",
        email: "swati.raut@example.com",
        occupation: "Professor",
      },
      address: {
        house: "Flat 701, Royal Palm Residency",
        area: "Viman Nagar",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411014",
      },
      emergency_contact: {
        name: "Ashish Raut",
        relation: "Father",
        phone: "9000000099",
      },
    },
  },
];

// ============================================================
// 1. UPDATE STUDENT COUNTER BADGE
// ============================================================
function updateTotalStudentCount() {
  const totalElem = document.getElementById("total_Student_numberDisp");
  if (totalElem) {
    totalElem.textContent = Students.length;
    localStorage.setItem("totalStudents", Students.length);
  }
}

// Update count when DOM is ready or immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", updateTotalStudentCount);
} else {
  updateTotalStudentCount();
}

// ============================================================
// 2. ADD NEW STUDENT (localStorage)
// ============================================================
function new_Student_add() {
  const input_new_student_Name = document
    .getElementById("student_name")
    .value.trim()
    .toLowerCase();

  if (!input_new_student_Name) {
    showStatus("Please enter student name.", "error", "student");
    return;
  }

  const nameParts = input_new_student_Name.split(" ");
  const first_name =
    nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
  const last_name =
    nameParts.slice(1).join(" ").charAt(0).toUpperCase() +
    nameParts.slice(1).join(" ").slice(1).toLowerCase();

  const input_new_student_admitted = Number(
    document.getElementById("Y_o_Addmmited").value,
  );
  const input_new_student_age = Number(
    document.getElementById("student_age").value,
  );

  // --- Validation (#8) ---
  if (
    !input_new_student_age ||
    input_new_student_age < 3 ||
    input_new_student_age > 100
  ) {
    showStatus("Please enter a valid age (3 - 100).", "error", "student");
    return;
  }
  if (
    !input_new_student_admitted ||
    input_new_student_admitted < 2000 ||
    input_new_student_admitted > new Date().getFullYear()
  ) {
    showStatus(
      `Please enter a valid admission year (2000 – ${new Date().getFullYear()}).`,
      "error",
      "student",
    );
    return;
  }

  const current_year = 2026 - input_new_student_admitted;
  let current_year_status =
    current_year === 0 ? "1st Year" : `${current_year + 1} Year`;

  // Safe ID: derive max existing ID to avoid collisions on reload (#1)
  const nextId =
    Students.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0) + 1;

  // Push new student into Students array
  Students.push({
    id: nextId,
    First_Name: first_name,
    Last_Name: last_name,
    age: input_new_student_age,
    admitted: input_new_student_admitted,
    current_STD: current_year_status,
    marks: {},
  });

  // Save to localStorage
  localStorage.setItem("students", JSON.stringify(Students));
  updateTotalStudentCount();

  showStatus(
    `New Student ${first_name} ${last_name} is successfully added`,
    "success",
    "student",
  );

  // Clear inputs
  document.getElementById("student_name").value = "";
  document.getElementById("student_age").value = "";
  document.getElementById("Y_o_Addmmited").value = "";
}

// ============================================================
// 3. DISPLAY ALL STUDENTS IN TABLE
// ============================================================
function student_Disp_data() {
  const studentTable = document.getElementById("studentTable");

  let table = `
    <table border="2">
      <tr>
        <th>Roll Number</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Admitted</th>
        <th>Current Std</th>
      </tr>
  `;

  Students.forEach(function (student) {
    table += `
      <tr>
        <td>${student.id}</td>
        <td>${student.First_Name}</td>
        <td>${student.Last_Name}</td>
        <td>${student.age}</td>
        <td>${student.admitted}</td>
        <td>${student.current_STD}</td>
      </tr>
    `;
  });

  table += `</table>`;
  studentTable.innerHTML = table;
}

// ============================================================
// 4. SEARCH STUDENTS (localStorage)
// ============================================================
function search_Box() {
  const studentTable = document.getElementById("studentTable");
  const search_using_roll = document.getElementById("search_using_roll");
  let search_Value = document.getElementById("search_Box").value.trim();

  // SEARCH BY ROLL NUMBER
  if (search_using_roll && search_using_roll.checked) {
    if (search_Value === "") {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Enter Roll Number...</p>
        </div>
      `;
      return;
    }

    const rollNumber = Number(search_Value);
    const result = Students.filter(function (student) {
      return student.id === rollNumber;
    });

    if (result.length === 0) {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Student Not Found...</p>
          
        </div>
      `;
      return;
    }

    renderStudentTable(result);
  }

  // DEFAULT SEARCH (NAME OR NUMBER)
  else {
    if (search_Value === "") {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Search student using Name or Roll Number(till ${Students.length}) ...</p>
        </div>
      `;
      return;
    }

    const searchLower = search_Value.toLowerCase();
    let result;

    if (!isNaN(search_Value)) {
      result = Students.filter(function (student) {
        return String(student.id) === search_Value;
      });
    } else {
      result = Students.filter(function (student) {
        return (
          student.First_Name.toLowerCase().includes(searchLower) ||
          student.Last_Name.toLowerCase().includes(searchLower)
        );
      });
    }

    if (result.length === 0) {
      studentTable.innerHTML = `
        <div class="coming-soon">
          <p>Student Not Found...</p>
        </div>
      `;
      return;
    }

    renderStudentTable(result);
  }
}

// Helper: Render table rows for search
function renderStudentTable(studentList) {
  const studentTable = document.getElementById("studentTable");
  let table = `
    <table border="2">
      <tr>
        <th>Roll Number</th>
        <th>Name</th>
        <th>Age</th>
        <th>Admitted</th>
        <th>Current Std</th>
      </tr>
  `;

  studentList.forEach(function (student) {
    table += `
      <tr>
        <td>${student.id}</td>
        <td>${student.First_Name} ${student.Last_Name}</td>
        <td>${student.age}</td>
        <td>${student.admitted}</td>
        <td>${student.current_STD}</td>
      </tr>
    `;
  });

  table += `</table>`;
  studentTable.innerHTML = table;
}
