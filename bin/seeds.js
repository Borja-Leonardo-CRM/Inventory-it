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
    equipmentsId: []
  },
  {
    name: "George Clooney",
    department: "Marketing",
    equipmentsId: []
  },
  {
    name: "Keanu Reeves",
    department: "IT",
    equipmentsId: []
  },
  {
    name: "Antonio Banderas",
    department: "Finantial",
    equipmentsId: []
  },
  {
    name: "Anthony Hopkins",
    department: "CEO",
    equipmentsId: []
  }
];

Employee.create(employees, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${employees.length} employees`);
  mongoose.connection.close();
});

const equipments = [
  {
    reference: "210",
    name: "Monitor 20'",
    model: "DELL",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    reference: "120",
    name: "Keyboard'",
    model: "DELL",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    reference: "230",
    name: "Mouse'",
    model: "DELL",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    reference: "56",
    name: "Phone terminal",
    model: "CISCO",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    reference: "65AB",
    name: "Headphones",
    model: "Jabra",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  }
];

Equipments.create(equipments, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${equipments.length} equipments`);
  mongoose.connection.close();
});
