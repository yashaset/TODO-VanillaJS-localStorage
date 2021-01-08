//define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//load all eventListeners
loadEventListeners();

function loadEventListeners() {
    //DOM loadEvent
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append to the li
        li.appendChild(document.createTextNode(task));
        //create new link
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //apppend link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    })
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add the Task');
    }

    //create li elem
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //apppend link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    //store in localStorage
    storeTaskInLocalStorage(taskInput.value);
    //clear the input
    taskInput.value = '';

    e.preventDefault();

}
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure you want to do this?')) {
            e.target.parentElement.parentElement.remove();

            //remove from Ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
    // taskList.innerHTML='';
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //clear from loc
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}