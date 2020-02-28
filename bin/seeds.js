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
    department: "CEO",
    equipmentsId: []
  }
].map((e, i) => ({ ...e, identity: i }));

Employee.create(employees, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${employees.length} employees`);
  mongoose.connection.close();
});

const equipments = [
  {
    name: "Monitor 20'",
    model: "DELL",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Keyboard'",
    model: "DELL",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Mouse'",
    model: "DELL",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Phone terminal",
    model: "CISCO",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  },
  {
    name: "Headphones",
    model: "Jabra",
    stock: 50,
    url:
      "https://www.amazon.es/gp/browse.html?node=937994031&ref_=nav_em_T1_0_4_13_3__des"
  }
].map((e, i) => ({ ...e, reference: i }));

Equipments.create(equipments, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${equipments.length} equipments`);
  mongoose.connection.close();
});
