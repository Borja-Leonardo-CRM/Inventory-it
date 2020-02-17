const mongoose = require('mongoose');

const Employee = require('../models/Employees');
//const Equipments = require('../models/Equipments');

const DB_NAME = 'invetory-db';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

Employee.collection.drop();
//Equipments.collection.drop();

const employees = [{
    name: "Leonardo Di Caprio",
    department: "Law",
    equipmentsId: []
  },
  {
    name: "George Clooney",
    department: "Marketing",
    equipmentsId: [],
  },
  {
    name: "Keanu Reeves",
    department: "IT",
    equipmentsId: [],
  },
  {
    name: "Antonio Banderas",
    department: "Finantial",
    equipmentsId: [],
  },
  {
    name: "Anthony Hopkins",
    department: "CEO",
    equipmentsId: [],
  }
]

Employee.create(employees, err => {
  if (err) {
    throw err;
  }
  console.log(`Created ${employees.length} employees`);
  mongoose.connection.close();
});