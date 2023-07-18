// Get required elements from the DOM
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const itemsLeft = document.getElementById("itemsLeft");
const filterButtons = document.querySelectorAll(".filter-button");
const clearCompletedButton = document.getElementById("clearCompleted");
const completedCheckbox = document.getElementById("completedCheckbox");

let tasks = [];

// Add event listeners
taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", toggleTaskStatus);
filterButtons.forEach((button) =>
  button.addEventListener("click", applyFilter)
);
clearCompletedButton.addEventListener("click", clearCompletedTasks);
completedCheckbox.addEventListener("change", toggleAllTasks);

// Function to add a new task
function addTask(event) {
  event.preventDefault(); // Prevent form submission

  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = "";
  }
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);

    if (task.completed) {
      taskItem.classList.add("completed");
    }

    taskList.appendChild(taskItem);
  });

  updateItemsLeft();
  applyFilter();
}

// Function to toggle the completed status of a task
function toggleTaskStatus(event) {
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    const taskId = parseInt(event.target.parentNode.dataset.id);
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = event.target.checked;
      renderTasks();
    }
  }
}

// Function to apply the selected filter
function applyFilter() {
  const filter = document.querySelector(".filter-button.active").dataset.filter;

  switch (filter) {
    case "all":
      taskList
        .querySelectorAll("li")
        .forEach((taskItem) => (taskItem.style.display = "flex"));
      break;
    case "active":
      taskList.querySelectorAll("li").forEach((taskItem) => {
        taskItem.style.display = taskItem.classList.contains("completed")
          ? "none"
          : "flex";
      });
      break;
    case "completed":
      taskList.querySelectorAll("li").forEach((taskItem) => {
        taskItem.style.display = taskItem.classList.contains("completed")
          ? "flex"
          : "none";
      });
      break;
  }
}

// Function to clear completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

// Function to update the "items left" counter
function updateItemsLeft() {
  const count = tasks.filter((task) => !task.completed).length;
  itemsLeft.textContent =
    count === 1 ? `${count} item left` : `${count} items left`;
}

// Function to toggle all tasks' completion status
function toggleAllTasks() {
  const completed = completedCheckbox.checked;
  tasks.forEach((task) => {
    task.completed = completed;
  });
  renderTasks();
}

// Initialize the app
renderTasks();
