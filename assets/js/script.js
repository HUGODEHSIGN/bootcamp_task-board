// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem('tasks'));
let nextId = JSON.parse(localStorage.getItem('nextId'));

// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Todo: create a function to create a task card
function createTaskCard({ taskTitle, taskDueDate, taskDescription }) {
  const newTaskCard = $(`<div class='card text-white bg-primary mb-3'>`);
  newTaskCard.html(`<h4 class='card-header'>${taskTitle}</h4>
  <div class='card-body'>
  <p>${taskDescription}</p>
  <p>${taskDueDate}</p>
  <button class='btn btn-danger'>Delete</button>
  </div>
  `);
  $('#todo-cards').append(newTaskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitle = $(event.target).find('input')[0].value;
  const taskDueDate = $(event.target).find('input')[1].value;
  const taskDescription = $(event.target).find('input')[2].value;
  const newTask = {
    taskTitle,
    taskDueDate,
    taskDescription,
  };
  createTaskCard(newTask);
  return newTask;
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#taskForm').on('submit', handleAddTask);
});
