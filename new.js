document.addEventListener("DOMContentLoaded", function () {
  const taskList = document.getElementById("taskList");
  const taskInput = document.getElementById("taskInput");
  const itemsLeft = document.getElementById("itemsLeft");
  const clearCompletedBtn = document.getElementById("clearCompleted");
  const filterButtons = document.querySelectorAll(".filter-button");
  const taskForm = document.querySelector(".taskForm");

  let tasks = [];

  // Check if tasks exist in local storage and retrieve them
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }

  // Add new task
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(task);
      updateLocalStorage();
      renderTasks();
      taskInput.value = "";
    }
  });

  // Toggle task completion
  taskList.addEventListener("change", function (e) {
    const taskId = parseInt(e.target.dataset.taskId);
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = e.target.checked;
      updateLocalStorage();
      renderTasks();
    }
  });

  // Delete task
  taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-task")) {
      const taskId = parseInt(e.target.dataset.taskId);
      tasks = tasks.filter((task) => task.id !== taskId);
      updateLocalStorage();
      renderTasks();
    }
  });

  // Clear completed tasks
  clearCompletedBtn.addEventListener("click", function () {
    tasks = tasks.filter((task) => !task.completed);
    updateLocalStorage();
    renderTasks();
  });

  // Filter tasks
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;
      filterTasks(filter);
    });
  });

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    itemsLeft.textContent = getItemsLeftCount();

    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.dataset.taskId = task.id;
      listItem.innerHTML = `
         <label class="checkbox-container ${task.completed ? "completed" : ""}">
          <input type="checkbox" ${
            task.completed ? "checked" : ""
          } data-task-id="${task.id}">
          
          <span class="task-text ${task.completed ? "completed-text" : ""}">${
        task.text
      }</span>
        </label>
        <button class="delete-task" data-task-id="${task.id}">&times;</button>
      `;
      taskList.appendChild(listItem);
    });
    console.log(taskList);
  }

  // Filter tasks
  function filterTasks(filter) {
    const filteredTasks = tasks.filter((task) => {
      if (filter === "active") {
        return !task.completed;
      } else if (filter === "completed") {
        return task.completed;
      } else {
        return true; // 'all' filter
      }
    });
    renderFilteredTasks(filteredTasks);
  }

  // Render filtered tasks
  function renderFilteredTasks(filteredTasks) {
    taskList.innerHTML = "";
    filteredTasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.dataset.taskId = task.id;
      listItem.innerHTML = `
        <label class="checkbox-container ${task.completed ? "completed" : ""}">
          <input class="checkbox-list" type="checkbox" ${
            task.completed ? "checked" : ""
          } data-task-id="${task.id}">
          ${task.text}
          <button class="delete-task" data-task-id="${task.id}">&times;</button>
        </label>
        
      `;
      taskList.appendChild(listItem);
    });
  }

  // Get count of remaining tasks
  function getItemsLeftCount() {
    const remainingTasks = tasks.filter((task) => !task.completed);
    return `${
      remainingTasks.length
    } item${remainingTasks.length !== 1 ? "s" : ""} left`;
  }

  // Update local storage with tasks data
  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
