"use strict";

const addButton = document.querySelector('.add__button');
const template = document.querySelector('#template-task').content.querySelector('.item');
const wrapper = document.querySelector('.tasks__list');
const addInput = document.querySelector('.add__input');

const dataCards = [
  'Buy a new gaming laptop', 
  'Complete a previous task', 
  'Create video for YouTube', 
  'Create a new portfolio site'
];

class Todo {
  constructor(text) {
    this.text = text;
    this.templateTask = document.querySelector('#template-task').content.querySelector('.item');
  }

  render() {
    const taskItem = this.templateTask.cloneNode(true);
    const textField = taskItem.querySelector('.item__text');
    textField.textContent = this.text;

    return taskItem;
  }
};

class TodoList {
  constructor() {
    this.containerElement = document.querySelector('.tasks__list');
    this.countElement = document.querySelector('.footer__count');
  }

  addTodo(newTodo) {
    this.containerElement.append(newTodo);
    this.countTodo();
  }

  countTodo() {
    this.countElement.textContent = this.containerElement.children.length;
  }
};

dataCards.forEach(str => {
  const todo = new Todo(str);
  const container = new TodoList();
  const todoElement = todo.render();
  container.addTodo(todoElement);
  container.countTodo();
});

class AddForm {
  constructor() {
    this._prepareElements();
    this._makeEventListeners();
  }
  
  _prepareElements() {
    this.templateElement = document.querySelector('#template-form').content.querySelector('.add__form');  
    this.formElement = this.templateElement.cloneNode(true);
    this.addInputElement = this.formElement.querySelector('.add__input');
    this.addButtonElement = this.formElement.querySelector('.add__button');  
  }

  render() {
    return this.formElement;
  }

  _makeEventListeners() {
    this.addButtonElement.addEventListener('click', (e) => this._handleSubmit(e));
  }
  
  _handleSubmit(e) {
    e.preventDefault();
    const value = this.addInputElement.value;
    if (this.doOnAdd) {
      this.doOnAdd(value);
    }
    this.addInputElement.value = '';
  }

  whatToDoOnAdd(fn) {
    this.doOnAdd = fn;
  }
};

const newForm = new AddForm();
const formContainer = new TodoList();

document.querySelector('.add').append(newForm.render());

newForm.whatToDoOnAdd((todoText) => {
  const todo = new Todo(todoText).render();
  formContainer.addTodo(todo);    
});
  
class Popup {
  constructor() {
    this._popupContetElement = document.querySelector('.popup');
    this._containerElement = document.querySelector('.popup__content');
    this.closeButton = document.querySelector('.popup__close');
    this.tasksList = document.querySelector('.tasks__list').children;
    this._handlerCloseButton();
  }
  
  _setContent(content) { 
    this._containerElement.innerHTML = '';
    this._containerElement.append(content);
  }
  
  open(content) {
    this._popupContetElement.classList.remove('popup--closed');
    this._setContent(content);
  }

  _handlerCloseButton() {
    this.closeButton.addEventListener('click', () => {
      this._popupContetElement.classList.add('popup--closed');
    });

    this._popupContetElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') && !evt.target.classList.contains('popup__window')) {
        this._popupContetElement.classList.add('popup--closed');
      }
    })
    
    window.addEventListener('keydown', (evt) => {
      if (evt.code === 'Escape') {
        this._popupContetElement.classList.add('popup--closed');
      }
    })
  }
  
  close() {
    this._popupContetElement.classList.add('popup--closed');
  }
}
  
class EditForm {
  constructor() {
    this._prepareElements();
    this._makeEventListeners();
  }
  
  _prepareElements() {
    this.templateElement = document.querySelector('#template-form').content.querySelector('.add__form');  
    this.formElement = this.templateElement.cloneNode(true);
    this.addInputElement = this.formElement.querySelector('.add__input');
    this.addButtonElement = this.formElement.querySelector('.add__button');  
    this.addButtonElement.textContent = 'v';
  }

  setText(text) {
    this.addInputElement.value = text;
  }

  render() {
    return this.formElement;
  }

  _makeEventListeners() {
    this.formElement.addEventListener('submit', (e) => this._handleSubmit(e));
  }
  
  _handleSubmit(e) {
    e.preventDefault();
    const value = this.addInputElement.value;
    if (this.doOnAdd) {
      this.doOnAdd(value);
    }
    this.addInputElement.value = '';
  }

  whatToDoOnSubmit(fn) {
    this.doOnAdd = fn;
  }
}

const tasksList = document.querySelector('.tasks__list');
const popup = new Popup();

tasksList.addEventListener('click', evt => {
  if (evt.target.classList.contains('item__edit')) {
    const editForm = new EditForm();
    const itemText = evt.target.previousElementSibling;
    editForm.setText(itemText.textContent);
    popup.open(editForm.render());

    editForm.whatToDoOnSubmit((value) => {
      itemText.textContent = value;
      popup.close();
    })
  }
});












// const countElement = document.querySelector('.footer__count');
// const itemsContainer = document.querySelector('.tasks__list');
// const addInput = document.querySelector('.add__input');
// const addButton = document.querySelector('.add__button');
// const addForm = document.querySelector('.add__form');
// const templateTask = document.querySelector('#template-task').content.querySelector('.item');
// const footerCount = document.querySelector('.footer__count');
// const clearButton = document.querySelector('.footer__clear-button');
// let editTarget = null;
// const textFields = document.querySelectorAll('.item__text');

// function clearAll() {
//   const items = document.querySelectorAll('.item');

//   items.forEach(item => {
//     item.remove();
//   });

//   changeCountOfTasks();
// }

// clearButton.addEventListener('click', clearAll);

// function deleteTask(evt) {
//   evt.target.closest('.item').remove();
//   changeCountOfTasks();
// }

// document.addEventListener('click', evt => {
//   const itemCheckbox = document.querySelectorAll('.item__indicator');

//   if (evt.target.classList.contains('item__trash')) {
//     return deleteTask(evt);
//   }

//   itemCheckbox.forEach(item => {
//     if (evt.target === item) {
//       item.classList.toggle('item__indicator--active');
//     }
//   })

//   if (evt.target.classList.contains('item__text')) {
//     if (editTarget === null) {
//       editTarget = evt.target;
//       addInput.value = editTarget.textContent;
//       addButton.textContent = 'V';
//       editTarget.classList.add('item__text--active');
//     }
//   }
// });

// function createTodo(data) {
  // const taskItem = templateTask.cloneNode(true);
  // taskItem.querySelector('.item__text').textContent = data;

  // return taskItem;
// }

// function addTask(evt) {
//   evt.preventDefault();
//   let value = addInput.value;
  
//   if (editTarget) {
//     editTarget.textContent = value;
//     addButton.textContent = '+';
//     editTarget.classList.remove('item__text--active');
//     editTarget = null;
//   } else {
//     itemsContainer.appendChild(createTodo(value));
//     changeCountOfTasks();
//   }

//   addInput.value = '';
// }

// addForm.addEventListener('submit', addTask);

// // 

// const initialCards = [
//   'Buy a new gaming laptop', 
//   'Complete a previous task', 
//   'Create video for YouTube', 
//   'Create a new portfolio site'
// ];

// function renderTasks(arr) {
//   arr.forEach(item => {
//     itemsContainer.appendChild(createTodo(item));
//   });
// }

// renderTasks(initialCards);

// //
// function createNewTask(str) {  
//   itemsContainer.appendChild(createTodo(str)); 
//   changeCountOfTasks();
// }

// createNewTask('я сделяль');

// function changeCountOfTasks() {
//   const itemLenght = itemsContainer.children.length;
//   footerCount.textContent = itemLenght;
// }
