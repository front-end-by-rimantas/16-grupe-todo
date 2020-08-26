function Todo() {
    const states = ['idea', 'todo', 'in progress', 'done'];
    const KEY = 'todo';
    let taskList = [];
    if (localStorage.getItem(KEY)) {
        taskList = JSON.parse(localStorage.getItem(KEY));
    }

    const formDOM = document.querySelector('form');
    const formInputDOM = formDOM.querySelector('#task_title');
    const formButtonAddDOM = formDOM.querySelector('#btn_add');
    const todoListDOM = document.querySelector('.container.list');

    formButtonAddDOM.addEventListener('click', createTask);

    renderList();

    function createTask(e) {
        e.preventDefault();

        const task = {
            id: taskList.length + 1,
            title: formInputDOM.value,
            state: 0,
            visible: true
        }
        taskList.push(task);
        localStorage.setItem(KEY, JSON.stringify(taskList));

        renderTask(task);
    }

    function editTask() {
        console.log('EDIT...');
    }

    function deleteTask(taskID) {
        taskList[taskID - 1].visible = false;
        localStorage.setItem(KEY, JSON.stringify(taskList));
        todoListDOM.querySelector(`#task_${taskID}`).remove();
    }

    function renderList() {
        for (const item of taskList) {
            renderTask(item);
        }
    }

    function renderTask(data) {
        if (!data.visible) {
            return;
        }
        todoListDOM.insertAdjacentHTML('afterbegin', `
            <div id="task_${data.id}" class="item">
                <div class="number">${data.id}</div>
                <div class="title">${data.title}</div>
                <input type="text" value="${data.title}">
                <div class="states" data-state="${states[data.state]}">
                    <div class="state" data-state="idea">Idea</div>
                    <div class="state" data-state="todo">Todo</div>
                    <div class="state" data-state="in-progress">In progress</div>
                    <div class="state" data-state="done">Done</div>
                </div>
                <div class="actions">
                    <div class="option" data-option="save">Save</div>
                    <div class="option" data-option="cancel">Cancel</div>
                    <div class="option" data-option="edit">Edit</div>
                    <div class="option" data-option="delete">Delete</div>
                </div>
            </div>`);

        const taskDOM = todoListDOM.querySelector(`#task_${data.id}`);
        const deleteDOM = taskDOM.querySelector('[data-option="delete"]');

        deleteDOM.addEventListener('click', () => {
            deleteTask(data.id);
        })
    }
}

export { Todo };