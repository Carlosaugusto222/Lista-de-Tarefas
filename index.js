const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');
let tasks = [];

// Função para renderizar uma tarefa no HTML
function renderTaskOnHTML(taskTitle, done = false) {
    const li = document.createElement('li');
    
    // Criar checkbox
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = done;
    
    // Adicionar evento ao checkbox
    input.addEventListener('change', (evento) => {
        const liToToggle = evento.target.parentElement;
        const spanToggle = liToToggle.querySelector('span');
        const done = evento.target.checked;
        
        // Atualizar estilo
        if (done) {
            spanToggle.style.textDecoration = 'line-through';
        } else {
            spanToggle.style.textDecoration = 'none';
        }
        
        // Atualizar estado no array tasks
        tasks = tasks.map((task) => {
            if (task.title === spanToggle.textContent) {
                return {
                    title: task.title,
                    done: done
                };
            }
            return task;
        });
        
        // Salvar no localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    // Criar span com o título
    const span = document.createElement('span');
    span.textContent = taskTitle;
    if (done) {
        span.style.textDecoration = 'line-through';
    }
    
    // Criar botão de deletar
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', (evento) => {
        const liToRemove = evento.target.parentElement;
        const titleToRemove = liToRemove.querySelector('span').textContent;
        tasks = tasks.filter((task) => task.title !== titleToRemove);
        liToRemove.remove();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    // Montar e adicionar o li
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    todoListUl.appendChild(li);
}

// Carregar tarefas do localStorage quando a página carregar
window.addEventListener('load', () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks');
    if (tasksOnLocalStorage) {
        tasks = JSON.parse(tasksOnLocalStorage);
        tasks.forEach((task) => {
            renderTaskOnHTML(task.title, task.done);
        });
    }
});

// Adicionar nova tarefa
form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const taskTitle = taskTitleInput.value;
    
    if (taskTitle.length < 3) {
        alert('Task title must be at least 3 characters long');
        return;
    }
    
    // Adicionar nova tarefa ao array
    const newTask = {
        title: taskTitle,
        done: false
    };
    tasks.push(newTask);
    
    // Salvar no localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Renderizar na tela
    renderTaskOnHTML(taskTitle, false);
    
    // Limpar input
    taskTitleInput.value = '';
});