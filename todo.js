let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDom(task) {
    const li = document.createElement('li');
    li.innerHTML = `
     
     <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} data-id="12" class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <img src="bin.svg" class="delete" data-id="${task.id}" />   
     `;

    taskList.append(li);
}

function renderList() {
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
    }

}

function toogleTask(taskId) {

    let task = tasks.filter(function (task) {
        return task.id === taskId;
    });

    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task Toggle Successfully!");
        return;
    } else {
        showNotification("Task Toggle not Successfully!");
    }
}

function deleteTask(taskId) {

    let newTask = tasks.filter(function (task) {
        return task.id != taskId;
    });

    tasks = newTask;
    renderList();
    showNotification("Task Deleted Suceesfully");
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        showNotification("Task Added Suceesfully");
        renderList();
        return;
    } else {
        showNotification("Task No Added Suceesfully");
    }

}

function showNotification(text) {
    alert(text);
}


function handleInputKeyPress(e) {
    if (e.key === 'Enter') {
        let inpValue = e.target.value;

        if (!inpValue) {
            showNotification("Input value should not be blank")
        }
        else {
            console.log(inpValue);
            const task = {
                text: inpValue,
                id: Date.now().toString(),
                done: false
            }
            e.target.value = '';
            addTask(task);
        }
    }
}

function handleClickListener(e) {

    let target = e.target;
    console.log("target HEre : ----" + target.className);
    if (target.className === 'delete') {
        let taskid = target.dataset.id;
        console.log(taskid);
        deleteTask(taskid);
        return;

    } else if (target.className === 'custom-checkbox') {
        let taskid = target.id;
        toogleTask(taskid);
        return;
    }

}

(function initalizeApp() {
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', handleClickListener);
})();
