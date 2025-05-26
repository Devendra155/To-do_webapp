let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    addedAt: new Date(),
    completedAt: null
  };

  tasks.push(task);
  taskInput.value = '';
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById('pendingList');
  const completedList = document.getElementById('completedList');

  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="task-top">
        <span>${task.text}</span>
        <div class="task-actions">
          ${!task.completed ? `<button onclick="completeTask(${task.id})">✔️</button>` : ''}
          <button onclick="editTask(${task.id})">✏️</button>
          <button onclick="deleteTask(${task.id})">🗑️</button>
        </div>
      </div>
      <div class="task-time">
        Added: ${task.addedAt.toLocaleString()}
        ${task.completedAt ? `<br>Completed: ${task.completedAt.toLocaleString()}` : ''}
      </div>
    `;

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    task.completedAt = new Date();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
      task.text = newText.trim();
      renderTasks();
    }
  }
}
