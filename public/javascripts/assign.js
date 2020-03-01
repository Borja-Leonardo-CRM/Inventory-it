// window.assignItems = axios.create({
//   baseURL: "http://localhost:3000/assign"
// });

let e;

window.addEventListener("load", refresh());

// Refresh Currents Items

function refresh() {
  e = document.getElementById("refresh-item").name;
  axios.get(`/assign/${e}/refresh`).then(response => {
    // document.getElementById("table-assign-1").style.display = "none";
    // document.getElementById("table-assign-2").style.display = "block";
    createCells(response);
    // location.reload();
    console.log(("El response ->", response));
  });
}

// No default function of button
function noDefault() {
  document
    .getElementById("assign-item")
    .addEventListener("click", function(event) {
      event.preventDefault();
    });
}

// Assign Item
function assign() {
  e = document.getElementById("refresh-item").name;
  const item = event.target.name;
  axios
    .post(`/assign/newItem`, { item, e })
    .then(response => {
      console.log(response), refresh();
    })
    .catch(error => console.log("Oh No! Error is: ", error));
}

function createCells(response) {
  console.log(response.data.employee.equipmentsId);
  // Employee
  let idEmployee = response.data.employee._id;
  let data = response.data.employee.equipmentsId;
  let dataEquipment = response.data.equipment;
  console.log(dataEquipment);
  let newContent = "";
  let assignedContent = "";
  // for (let i = 0; i < data.length; i++) {
  //   newContent += `<tr><td>${data[i]}</td></tr><button type="button" id="remove-item" onclick="remove()"
  //   style="background-color: red;" name="${data[i]}">ELIMINAR</button>`;
  // }
  let listAssigned = document.getElementsByClassName("list-assigned")[0];
  let listAssignDo = document.getElementsByClassName("list-assign-do")[0];
  for (let i = 0; i < data.length; i++) {
    newContent += `<li><a href="/equipments/${data[i]._id}">${data[i].name} - ${data[i].reference}<a> <button type="button" onclick="remove()" id="remove-idem" name="${idEmployee}" title="${data[i]._id}"> X </button></li>`;
  }

  for (let i = 0; i < dataEquipment.length; i++) {
    assignedContent += `<li><a href="/equipments/${dataEquipment[i]._id}"> Nombre : ${dataEquipment[i].name} Stock: ${dataEquipment[i].stock}<a><button type="button" id="assign-item" onclick="assign()"
    style="background-color: green;" name="${dataEquipment[i].reference}">ASIGNAR</button></li>`;
  }

  listAssigned.innerHTML = newContent;
  listAssignDo.innerHTML = assignedContent;
}

// Remove Item

function remove() {
  // e = document.getElementById("remove-item").name; // Employee ID
  const item = event.target.title;
  e = event.target.name;
  console.log("Id de Item", item, e);
  axios
    .post(`/assign/removeItem`, { item, e })
    .then(response => {
      console.log(e), refresh();
    })
    .catch(error => console.log("Oh No! Error is: ", error));
}

// // Update Stock

function stock() {
  const item = event.target.name;
  axios
    .post(`/assign/stock`, { item })
    .then(response => updateStock(response))
    .catch(error => console.log("Oh No! Error is: ", error));
}

function updateStock(obj) {
  const reference = obj.data[0].reference;
  const stock = obj.data[0]["stock"];
  const line = document.getElementById(`stock-${reference}`);
  console.log(reference);
  console.log(line);
  line.innerText = stock;
}
