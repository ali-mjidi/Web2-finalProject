// ----------------------------------------------------------------- inputs
const tasksList = document.querySelector(".tasks-list");
const taskAddForm = document.querySelector(".add-task");
const taskAddInput = document.querySelector(".add-task__input");
const taskAddBtn = document.querySelector(".add-task__btn");
let tasksArray;

if (localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
} else {
    tasksArray = new Array();
}

// ---------------------------------------------------------------- process
window.addEventListener("load", () => {
    tasksList.innerHTML = "";
    taskAddInput.value = "";

    if (tasksArray.length) {
        for (let task of tasksArray) {
            addTaskToListElement(task);
        }
    }
});

taskAddForm.addEventListener("submit", e => {
    e.preventDefault();
    const taskTitle = taskAddInput.value.trim();

    if (taskTitle) {
        taskAddInput.value = "";

        // tasksList.insertAdjacentHTML("afterbegin", createTaskElementHtml());

        // tasksList.prepend(createTaskElement(taskTitle))

        addTask(taskTitle);
    } else {
        alert("Please insert some task :)");
    }
});

// -------------------------------------------------------------- functions
function addTask(taskTitle) {
    addTaskToListElement(taskTitle);

    addTaskToLocalStorage(taskTitle);
}

function addTaskToListElement(taskTitle) {
    tasksList.prepend(createTaskElement(taskTitle));
}

function addTaskToLocalStorage(taskTitle) {
    tasksArray.push(taskTitle);

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function createTaskElementHtml(taskTitle = "test") {
    const task = `  <div class="task">
                        <input
                            type="checkbox"
                            name=""
                            class="task__complete-checkbox"
                        />

                        <span class="task__title">کار شماره اول</span>

                        <div class="task__options">
                            <span class="task__btn task__btn--delete"></span>
                            <span class="task__btn task__btn--edit"></span>
                        </div>
                    </div>`;

    return task;
}

function createTaskElement(taskTitle) {
    taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.classList.add("task__complete-checkbox");

    taskTitleElement = document.createElement("span");
    taskTitleElement.classList.add("task__title");
    taskTitleElement.innerText = taskTitle;

    taskOptions = document.createElement("div");
    taskOptions.classList.add("task__options");

    taskDeleteBtn = document.createElement("span");
    taskDeleteBtn.classList.add("task__btn", "task__btn--delete");

    taskEditBtn = document.createElement("span");
    taskEditBtn.classList.add("task__btn", "task__btn--edit");

    taskOptions.appendChild(taskDeleteBtn);
    taskOptions.appendChild(taskEditBtn);

    taskElement.appendChild(taskCheckbox);
    taskElement.appendChild(taskTitleElement);
    taskElement.appendChild(taskOptions);

    return taskElement;
}
