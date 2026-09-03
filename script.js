let tasks = JSON.parse(localStorage.getItem('student_tasks')) || [];
let currentFilter = 'all';

function saveAndRender() {
  localStorage.setItem('student_tasks', JSON.stringify(tasks));
  renderTasks(currentFilter);
}

function addTask() {
  const text = document.getElementById('taskInput').value.trim();
  const category = document.getElementById('taskCategory').value;
  const date = document.getElementById('taskDate').value;
  if (!text) return;

  tasks.push({ id: Date.now(), text, category, date, done: false });
  document.getElementById('taskInput').value = '';
  document.getElementById('taskDate').value = '';
  saveAndRender();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? {...t, done: !t.done} : t);
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRender();
}

function filterTasks(cat, btn) {
  currentFilter = cat;
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderTasks(cat);
}

function renderTasks(cat) {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  
  const filtered = cat === 'all' ? tasks : tasks.filter(t => t.category === cat);
  filtered.forEach(t => {
    const li = document.createElement('li');
    li.className = `${t.category} ${t.done ? 'done' : ''}`;
    const formattedDate = t.date ? ` (${t.date.split('-').reverse().join('/')})` : '';
    li.innerHTML = `
      <div>
        <span class="badge ${t.category}">${t.category === 'escolar' ? 'Escola' : 'Dia a Dia'}</span>
        <span>${t.text}${formattedDate}</span>
      </div>
      <div class="actions">
        <button onclick="toggleTask(${t.id})">${t.done ? 'Desfazer' : 'Concluir'}</button>
        <button class="btn-del" onclick="deleteTask(${t.id})">X</button>
      </div>
    `;
    list.appendChild(li);
  });
}

renderTasks('all');
