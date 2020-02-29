const mongoose = require("mongoose");

const Employee = require("../models/Employees");
const Equipments = require("../models/Equipments");

const DB_NAME = "invetory-db";

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

Employee.collection.drop();
Equipments.collection.drop();

const employees = [
  {
    name: "Leonardo Di Caprio",
    department: "Law",
    equipmentsId: [200, 233]
  },
  {
    name: "George Clooney",
    department: "Marketing",
    equipmentsId: [332, 211]
  },
  {
    name: "Keanu Reeves",
    department: "IT",
    equipmentsId: [233, 55]
  },
  {
    name: "Antonio Banderas",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Anthony Hopkins",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Inga G. Leon",
    department: "Financial",
    equipmentsId: []
  },
  {
    name: "Brady H. Vang",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Ferris S. Gaines",
    department: "Human Resourses",
    equipmentsId: []
  },
  {
    name: "Robert W. Watts",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "Cain Z. Cooper",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "Abraham Z. Gordon",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Gloria W. Gentry",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Fredericka B. Black",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Lacota H. Roach",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Quon G. Ewing",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Unity J. Vazquez",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Deanna D. Burnett",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Hedley L. Wise",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Wendy K. Barlow",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Deborah U. Mccormick",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Byron N. Hawkins",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Hunter U. Webb",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Victor L. Byers",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Quynn N. Frank",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Brooke F. Ratliff",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Darryl Q. Moses",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Hannah A. Kaufman",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Kaye O. Olson",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "Uriah Y. Walsh",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "Riley B. Webb",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Keaton U. Higgins",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Daria Y. Patterson",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Noel H. Carpenter",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Illiana J. Doyle",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Rebekah M. Dorsey",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Hu I. Reyes",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Brenden H. Schultz",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "Martina N. Mack",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Ezekiel P. Jimenez",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Bethany S. Mcneil",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Neville S. Guerra",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "Candice O. Colon",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Alyssa R. Gaines",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Elizabeth T. Dillard",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Arthur M. Mullins",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Julie D. Parrish",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Jillian T. Harrison",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Michelle U. Hoffman",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "Zeph X. Pugh",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Gisela M. Mathis",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Leilani R. Mcfarland",
    department: "Engineering",
    equipmentsId: []
  },
  {
    name: "Phillip M. Maxwell",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Anika V. Vaughan",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Simone T. Hudson",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Beau J. Booth",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Jasmine W. Frank",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Matthew I. Rodriguez",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Gareth H. Newman",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Noah I. Camacho",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Silas U. Hughes",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Winifred U. Faulkner",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Brandon R. Andrews",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Micah T. Burch",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Maris X. Melendez",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Porter C. Noel",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Darrel I. Oneil",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Gavin Q. Ortiz",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Avram R. Mccray",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Cody T. Griffith",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Quentin P. Tillman",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Merritt J. Haley",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Haviva A. Ramos",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Charles T. Landry",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Mercedes T. Cochran",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Xerxes P. Webb",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Zia Y. Morse",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Martina A. Quinn",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Ariel O. Weeks",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Thane R. Faulkner",
    department: "Public Relationship",
    equipmentsId: []
  },
  {
    name: "Lisandra W. Clayton",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Linus R. Joseph",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Cruz X. Little",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Ferris N. Ruiz",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Quon N. Ford",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Xander I. Short",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Owen V. Chandler",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Kay Z. Howell",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Leilani A. Wolf",
    department: "Human Resources",
    equipmentsId: []
  },
  {
    name: "Matthew H. Henry",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Phillip B. Atkinson",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Bell S. Frazier",
    department: "Human Resources",
    equipmentsId: []
  },
  {
    name: "Wade F. Parrish",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Julian F. Townsend",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Noelani V. Ratliff",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Rachel L. Rivas",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Nerea P. James",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Patricia F. Zamora",
    department: "Human Resources",
    equipmentsId: []
  },
  {
    name: "Cara E. Gonzales",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Martena I. Nunez",
    department: "Human Resources",
    equipmentsId: []
  },
  {
    name: "Patrick V. Powers",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Lucy C. Buchanan",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Basia L. Farley",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Charles S. Morrow",
    department: "Administration",
    equipmentsId: []
  },
  {
    name: "Ivy W. Coffey",
    department: "Human Resources",
    equipmentsId: []
  },
  {
    name: "Wyatt Q. Ramos",
    department: "Administration",
    equipmentsId: []
  }
].map((e, i) => ({ ...e, identity: i }));

Employee.create(employees, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${employees.length} employees`);
  // mongoose.connection.close();
});

// SEED EQUIPMENT

const equipments = [
  {
    name: "Monitor 20'",
    model: "DELL",
    stock: 30,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Mouse'",
    model: "DELL",
    stock: 30,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Phone terminal",
    model: "CISCO",
    stock: 30,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Headphones",
    model: "Jabra",
    stock: 30,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Keyboard",
    model: "DELL",
    stock: 30,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  }
].map((e, i) => ({ ...e, reference: i }));

Equipments.create(equipments, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${equipments.length} equipments`);
  // mongoose.connection.close();
});
