const form = document.getElementById('form');
const input = document.getElementById('input');
const listOfTasks = document.getElementById('task-ul');

const storedTask = JSON.parse(localStorage.getItem('todo'));

if (storedTask) {
  storedTask.forEach(task => addTask());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTask();
})

function addTask (task) {
  let taskInput = input.value;

  if (task) {
    taskInput = task.taskName;
  }

  if (taskInput) {
    const eachTask = document.createElement('li');

    if (task && task.completed) {
      eachTask.classList.add('completed');
    }

    eachTask.innerText = taskInput;

    eachTask.addEventListener('click', () => {
      eachTask.classList.toggle('completed');

      updateLS();
    })

    eachTask.addEventListener('contextmenu', (e)=> {
      e.preventDefault();

      eachTask.remove();
     })

    listOfTasks.appendChild(eachTask);

    input.value = '';

    updateLS();
  }
};

function updateLS() {
  const eachTask = document.querySelectorAll('li');

  const taskArray = [];

  eachTask.forEach((task) => {
    taskArray.push({
      taskName: task.innerText,

      completed: task.classList.contains('completed'),
    });
  });

  localStorage.setItem('todo', JSON.stringify(taskArray));
}



