// ----------------------------------------------------------------- inputs
const tasksListElement = document.querySelector(".tasks-list");
const taskAddForm = document.querySelector(".add-task");
const taskAddInput = document.querySelector(".add-task__input");
const taskAddBtn = document.querySelector(".add-task__btn");
let tasksArray;

// checks that local storage is empty or not
if (localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
} else {
    tasksArray = new Array();
}

// --------------------------------------------------- expression functions
const addTaskToListElement = taskTitle =>
    tasksListElement.prepend(createTaskElement(taskTitle));

const saveToLocalStorage = () =>
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

// ---------------------------------------------------------------- process
window.addEventListener("load", () => {
    // reset todo-list elements on page load
    tasksListElement.innerHTML = "";
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

        // if i want to use createTaskElementHtml() function i should work this way
        // tasksListElement.insertAdjacentHTML("afterbegin", createTaskElementHtml());
        // tasksListElement.prepend(createTaskElement(taskTitle))

        // but because i choose createTaskElement() function this is the way
        addTask(taskTitle);
    } else {
        alert("Please insert some task :)");
    }
});

tasksListElement.addEventListener("click", e => {
    if (e.target.classList.contains("task__btn--delete")) {
        const taskElement = e.target.parentElement.parentElement;
        const taskTitle = taskElement.children[1].innerText;

        tasksArray.splice(tasksArray.indexOf(taskTitle), 1);
        taskElement.remove();

        saveToLocalStorage();
    }
});

// -------------------------------------------------------------- functions
function addTask(taskTitle) {
    addTaskToListElement(taskTitle);

    tasksArray.push(taskTitle);

    saveToLocalStorage();
}

// this function creates a string of task element then we should add text to html
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

// this function creates element with js and add it to html 
// (i choose this way except the other one)
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
