let alltasks = [];
let form = document.querySelector(".taskForm");
let newtodo = document.getElementById("taskInput");
let checkbox = document.querySelector("#completedCheckbox");
const allButton = document.querySelector('[data-filter="all"]');
const activeButton = document.querySelector('[data-filter="active"]');
const completedButton = document.querySelector('[data-filter="completed"]');
const clearCompletedButton = document.querySelector("clearCompleted");

let completedCount = 0;
let activeCount = 0;

checkbox.addEventListener("click", () => {
  // console.log(checkbox.checked);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (newtodo.value !== "") {
    alltasks.push({
      task: newtodo.value,
      checked: checkbox.checked,
    });

    newtodo.value = "";
    checkbox.checked = false;

    renderTasks();

    console.log(alltasks);
    // let alltasks = [];
  }
});

function renderTasks() {
  let taskItems = document.querySelectorAll(".taskitem");

  taskItems.forEach((el) => el.remove());

  alltasks.forEach(({ task, checked }, index) => {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "itemcheckbox";
    checkbox.checked = checked;

    let taskContainer = document.createElement("div");
    taskContainer.className = "singletask";
    taskContainer.textContent = task;
    taskContainer.style.textDecoration = "none";
    if (checkbox.checked == true) {
      taskContainer.style.textDecoration = "line-through";
      completedCount++;
    } else {
      activeCount++; // Increment active count
    }
    checkbox.addEventListener("click", () => {
      if (taskContainer.style.textDecoration == "none") {
        taskContainer.style.textDecoration = "line-through";
      } else {
        taskContainer.style.textDecoration = "none";
      }
    });

    let taskitem = document.createElement("div");
    taskitem.className = "taskitem";

    taskitem.appendChild(checkbox);
    taskitem.appendChild(taskContainer);

    let alltasksContainer = document.querySelector(".adding-area");
    alltasksContainer.appendChild(taskitem);
  });
  updateItemsLeft();
}

// Function to toggle the completed status of a task
function toggleTaskStatus(event) {
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    const taskId = parseInt(event.target.parentNode.dataset.id);
    const task = alltasks.find((alltasks) => alltasks.id === taskId);
    if (task) {
      task.completed = event.target.checked;
      renderTasks();
    }
  }
}
function updateItemsLeft() {
  const itemsLeft = alltasks.length;
  const itemsLeftLabel = document.getElementById("itemsLeft");
  itemsLeftLabel.textContent = `${itemsLeft} item${
    itemsLeft !== 1 ? "s" : ""
  } left`;
}

function showAllTasks() {
  renderTasks(alltasks);
}

function showActiveTasks() {
  const activeTasks = alltasks
    .filter(({ checked }) => !checked)
    .map(({ task }) => task);
  renderTasks(activeTasks);
}

function showCompletedTasks() {
  const completedTasks = alltasks.filter(({ checked }) => checked);
  renderTasks(completedTasks);
}

function clearCompletedTasks() {
  alltasks = alltasks.filter(({ checked }) => !checked);
  renderTasks(alltasks);
}

allButton.addEventListener("click", showAllTasks);

activeButton.addEventListener("click", showActiveTasks);

completedButton.addEventListener("click", showCompletedTasks);

clearCompletedButton.addEventListener("click", clearCompletedTasks);

checkbox.forEach((checkbox) => {
  checkbox.addEventListener("change", toggleTaskStatus);
});
