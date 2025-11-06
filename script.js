const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) li.classList.add('completed');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value) {
        todos.push({ text: todoInput.value, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
});

renderTodos();