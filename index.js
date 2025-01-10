// Código do carrossel de palavras
const palavras = document.querySelectorAll('.palavra');
let indiceAtual = 0;

function mostrarProximaPalavra() {
  palavras[indiceAtual].classList.remove('visivel');
  indiceAtual = (indiceAtual + 1) % palavras.length;
  palavras[indiceAtual].classList.add('visivel');
}

setInterval(mostrarProximaPalavra, 2000); // Altera a palavra a cada 2 segundos

// Código da lista de tarefas
const form = document.querySelector('#todo-form');
const taskTitleInput = document.querySelector('#task-title-input');
const todoListUl = document.querySelector('#todo-list');
let tasks = [];

function renderTaskOnHTML(taskTitle, done = false) {
    const li = document.createElement('li');
    
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = done;
    
    input.addEventListener('change', (evento) => {
        const liToToggle = evento.target.parentElement;
        const spanToggle = liToToggle.querySelector('span');
        const done = evento.target.checked;
        
        if (done) {
            spanToggle.style.textDecoration = 'line-through';
        } else {
            spanToggle.style.textDecoration = 'none';
        }
        
        tasks = tasks.map((task) => {
            if (task.title === spanToggle.textContent) {
                return {
                    title: task.title,
                    done: done
                };
            }
            return task;
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    const span = document.createElement('span');
    span.textContent = taskTitle;
    if (done) {
        span.style.textDecoration = 'line-through';
    }
    
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.addEventListener('click', (evento) => {
        const liToRemove = evento.target.parentElement;
        const titleToRemove = liToRemove.querySelector('span').textContent;
        tasks = tasks.filter((task) => task.title !== titleToRemove);
        liToRemove.remove();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);
    todoListUl.appendChild(li);
}

window.addEventListener('load', () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks');
    if (tasksOnLocalStorage) {
        tasks = JSON.parse(tasksOnLocalStorage);
        tasks.forEach((task) => {
            renderTaskOnHTML(task.title, task.done);
        });
    }
});

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const taskTitle = taskTitleInput.value;
    
    if (taskTitle.length < 3) {
        alert('O título deve conter 3 ou mais caracteres');
        return;
    }
    
    const newTask = {
        title: taskTitle,
        done: false
    };
    tasks.push(newTask);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    renderTaskOnHTML(taskTitle, false);
    
    taskTitleInput.value = '';
});
