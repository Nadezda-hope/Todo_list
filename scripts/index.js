"use strict";

const countElement = document.querySelector('.footer__count');
const itemsContainer = document.querySelector('.tasks__list');
const addInput = document.querySelector('.add__field');
const addButton = document.querySelector('.add__button');
// что, с чем, когда
// что: вписать количество айтемов
// что с чем когда
// что - количесвто айтемов, с чем - с айтемами
function repaintTasksCount() {
  const itemsLength = itemsContainer.children.length;
  countElement.textContent = itemsLength;
}

function addTodo() {
  const value = addInput.value;
  
  const newTask = document.createElement('li');
  newTask.classList.add('tasks__item');

  const label = document.createElement('label');
  label.classList.add('tasks__label', 'field');

  const input = document.createElement('input');
  input.classList.add('tasks__input', 'visually-hidden');
  input.setAttribute('type', 'checkbox');

  const indicator = document.createElement('span');
  indicator.classList.add('tasks__indicator');

  const taskText = document.createElement('span');
  taskText.classList.add('tasks__text');
  taskText.textContent = value;

  const trash = document.createElement('span');
  trash.classList.add('tasks__trash');

  label.append(input, indicator, taskText, trash);
  newTask.append(label);
  itemsContainer.append(newTask);

  addInput.value = '';
}

addButton.addEventListener('click', addTodo);