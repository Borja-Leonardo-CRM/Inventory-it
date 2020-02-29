window.assignItems = axios.create({
  baseURL: "http://localhost:3000/assign"
});

let e;

// Refresh Currents Items

function refresh() {
  e = document.getElementById("refresh-item").name;
  axios.get(`/assign/${e}/refresh`).then(response => {
    document.getElementById("table-assign-1").style.display = "none";
    document.getElementById("table-assign-2").style.display = "block";
    createCells(response);
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
  console.log(item);
  axios
    .post(`/assign/newItem`, { item, e })
    .then(refresh())
    .catch(error => console.log("Oh No! Error is: ", error));
}

function createCells(response) {
  console.log(response.data.employee.equipmentsId);
  // Employee
  let data = response.data.employee.equipmentsId;
  let table = document.getElementsByClassName("refresh-cells")[0];
  let newContent = "";
  for (let i = 0; i < data.length; i++) {
    newContent += `<tr><td>${data[i]}</td></tr><button type="button" id="remove-item" onclick="remove()"
    style="background-color: red;" name="${data[i]}">ELIMINAR</button>`;
  }
  table.innerHTML = newContent;
}

// Remove Item

function remove() {
  e = document.getElementById("refresh-item").name;
  const item = event.target.name;
  axios
    .post(`/assign/removeItem`, { item, e })
    .then(refresh())
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
