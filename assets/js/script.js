// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

// init tasks array
let tasks = [];

//compare current date and task due date
function compareDates(dueDate) {
  if (dueDate.isTomorrow() || dueDate.isToday()) {
    return { cardBg: 'bg-warning', btnBorder: null };
  }
  if (dueDate.isSameOrBefore()) {
    return { cardBg: 'bg-danger text-white', btnBorder: 'border-white' };
  }
  return { cardBg: null, btnBorder: null };
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.floor(Math.random() * 100000).toString();
}

// Todo: create a function to create a task card
function createTaskCard({ id, taskTitle, taskDueDate, taskDescription }) {
  const newTaskCard = $(
    `<div class='card mb-3 draggable ${
      compareDates(taskDueDate).cardBg
    }' data-task='${id}'>`
  );
  newTaskCard.html(`<h4 class='card-header'>${taskTitle}</h4>
  <div class='card-body'>
    <p>${taskDescription}</p>
    <p>${taskDueDate.format('MM/DD/YYYY')}</p>
    <button class='btn btn-danger ${
      compareDates(taskDueDate).btnBorder
    }'>Delete</button>
  </div>
  `);
  return newTaskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards').html('');
  $('#in-progress-cards').html('');
  $('#done-cards').html('');

  tasks.forEach((task) => {
    if (task.status === 'to-do') {
      $('#todo-cards').append(createTaskCard(task));
    }
    if (task.status === 'in-progress') {
      $('#in-progress-cards').append(createTaskCard(task));
    }
    if (task.status === 'done') {
      $('#done-cards').append(createTaskCard(task));
    }
  });

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitle = $(event.target).find('input')[0].value;
  const taskDueDate = dayjs($(event.target).find('input')[1].value);
  const taskDescription = $(event.target).find('input')[2].value;
  const newTask = {
    id: generateTaskId(),
    taskTitle,
    taskDueDate,
    taskDescription,
    status: 'to-do',
  };
  tasks.push(newTask);
  renderTaskList();
  return newTask;
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable[0].dataset.task;

  const newStatus = event.target.id;
  console.log(newStatus);
  tasks.forEach((task) => {
    console.log(task.id, taskId);
    if (task.id === taskId) {
      console.log('here');
      task.status = newStatus;
    }
  });
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#taskForm').on('submit', handleAddTask);
  $(function () {
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
  });
});
