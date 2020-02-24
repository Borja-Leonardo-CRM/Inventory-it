window.assignItems = axios.create({
  baseURL: "http://localhost:3000/assign"
});

let e;

// Refresh Currents Items

function refresh() {
  e = document.getElementById("refresh-item").name;
  console.log(e);
  axios
    .get(`http://localhost:3000/assign/${e}/assign`)
    .then(response => console.log("Ahí va"));
}

// document.addEventListener("click", e) = e => {
//  e.getElementById("refresh-item").name
//   const id = e;
//   console.log("e");
//   axios.post("http://localhost:3000/assign/id/assign");
// };

// When the WALL-E button is clicked
function assign() {
  e = document.getElementById("refresh-item").name;
  const item = event.target.name;
  console.log(item);
  axios
    .post(`http://localhost:3000/assign/${e}/assign`, { item, e })
    .then(refresh())
    .catch(error => console.log("Oh No! Error is: ", error));
}

function id() {
  e = document.getElementById("refresh-item").name;
}
//   getElementById("refresh-item").name;

// debugger;
// console.log(item);
