const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //DOM Load Event
  document.addEventListener("DomContentLoaded", getTasks);

  //Add task event
  form.addEventListener("submit", addTask);

  //Remove task event
  taskList.addEventListener("click", removeTask);

  //Clear task event
  clearBtn.addEventListener("click", clearTasks);

  //filter task event
  filter.addEventListener("keyup", filterTask);
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Hello World");
  }

  // Create li element
  const li = document.createElement("li");

  // Add a class
  li.className = "collection-item";

  // Append child
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a link
  const link = document.createElement("a");

  // Add a class
  link.className = "delete-item secondary-content";

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to the li
  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInputInLocalStorage(taskInput.value);

  taskInput.value = "";

  //   console.log(li);

  e.preventDefault();
}

function storeTaskInputInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(task));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
