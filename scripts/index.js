"use strict";

const countElement = document.querySelector('.footer__count');
const itemsContainer = document.querySelector('.tasks__list');
const addInput = document.querySelector('.add__input');
const addButton = document.querySelector('.add__button');
const addForm = document.querySelector('.add__form');
const templateTask = document.querySelector('#template-task').content.querySelector('.item');
const footerCount = document.querySelector('.footer__count');
const clearButton = document.querySelector('.footer__clear-button');
let editTarget = null;

function clearAll() {
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    item.remove();
  });

  changeCountOfTasks();
}

clearButton.addEventListener('click', clearAll);

function deleteTask(evt) {
  evt.target.closest('.item').remove();
  changeCountOfTasks();
}

document.addEventListener('click', evt => {
  const itemCheckbox = document.querySelectorAll('.item__indicator');

  if (evt.target.classList.contains('item__trash')) {
    return deleteTask(evt);
  }

  itemCheckbox.forEach(item => {
    if (evt.target.classList.contains('item__indicator')) {
      evt.target.classList.toggle('item__indicator--checked');
    }
  })

  if (evt.target.classList.contains('item__text')) {
    if (editTarget === null) {
      editTarget = evt.target;
      addInput.value = evt.target.textContent;
      addButton.textContent = 'v';
      evt.target.style.backgroundColor = '#FFFACD';
    }
  }
});

function createTodo(data) {
  const taskItem = templateTask.cloneNode(true);
  taskItem.querySelector('.item__text').textContent = data;

  return taskItem;
}

function addTask(evt) {
  evt.preventDefault();
  const itemText = document.querySelector('.item__text')
  let value = addInput.value;

  if (editTarget) {
    editTarget = null;
    itemText.textContent = value;
    addButton.textContent = '+';
    itemText.style.backgroundColor = '#f7f7f7';
  } else {
    itemsContainer.appendChild(createTodo(value));
    changeCountOfTasks();
  }

  addInput.value = '';
}

addForm.addEventListener('submit', addTask);

// 

const initialCards = [
  'Buy a new gaming laptop', 
  'Complete a previous task', 
  'Create video for YouTube', 
  'Create a new portfolio site'
];

function renderTasks(arr) {
  arr.forEach(item => {
    itemsContainer.appendChild(createTodo(item));
  });
}

renderTasks(initialCards);

//
function createNewTask(str) {  
  itemsContainer.appendChild(createTodo(str)); 
  changeCountOfTasks();
}

createNewTask('я сделяль');

function changeCountOfTasks() {
  const itemLenght = itemsContainer.children.length;
  footerCount.textContent = itemLenght;
}


