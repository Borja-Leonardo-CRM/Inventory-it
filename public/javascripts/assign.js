window.assignItems = axios.create({
  baseURL: "http://localhost:3000/assign"
});

let e;

addEventListener("load", noDefault());

// Refresh Currents Items

function refresh() {
  noDefault();
  e = document.getElementById("refresh-item").name;
  console.log(e);
  axios.get(`/assign/${e}/refresh`).then(response => {
    document.getElementById("table-assign-1").style.display = "none";
    document.getElementById("table-assign-2").style.display = "block";
    createCells(response);
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

function id() {
  e = document.getElementById("refresh-item").name;
}

function createCells(response) {
  console.log(response.data.employee.equipmentsId);
  let data = response.data.employee.equipmentsId;
  let table = document.getElementsByClassName("refresh-cells")[0];
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  let newContent = "";
  for (let i = 0; i < data.length; i++) {
    newContent += `<tr><td>${data[i]}</td></tr>`;
  }
  table.innerHTML = newContent;
}
