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
  
// class AddForm {
//   constructor() {
//     this._prepareElements();
//     this._makeEventListeners();
//   }
  
//   _prepareElements() {
//     this.templateElement = document.querySelector('#template-form').content.querySelector('.add__form');  
//     this.formElement = this.templateElement.cloneNode(true);
//     this.addInputElement = this.form.querySelector('.add__input');
//     this.addButtonElement = this.form.querySelector('.add__button');  
//     this.formContainer = document.querySelector('.add');
//   }
  
//   render() {
//     this.formContainer.append(this.formElement);
//   }

//   _makeEventListeners() {
//     this.addButtonElement.addEventListener('click', (e) => this._handleSubmit(e));
//   }
  
//   _handleSubmit(e) {
//     e.preventDefault();
//     const value = this.addInputElement.value;
//     if (this.doOnAdd) {
//       this.doOnAdd(value);
//     }
//     this.addInputElement.value = '';
//   }

//   whatToDoOnAdd(fn) {
//     this.doOnAdd = fn;
//   }
// };

const container = new TodoList();
// const newForm = new AddForm();
// newForm.render();

// newForm.whatToDoOnAdd((todoText) => {
//   const todo = new Todo(todoText).render();
//   container.addTodo(todo);    
// });

class Popup {
  constructor() {
    this.containerElement = document.querySelector('.popup');
    this.addInputElement = document.querySelector('.add__input');
    this.addButtonElement = document.querySelector('.add__button');
    this.closeButton = document.querySelector('.popup__close');
    this._handlerCloseButton();
    this._handlerOpenPopup();
  }

  setContent() { 
    const value = this.addInputElement.value; 

    if (this.renderFn) {
      this.renderFn(value);
    }

    this.addInputElement.value = '';
  }

  renderList(func) {
    this.renderFn = func;
  }

  _handlerOpenPopup() {
    this.addButtonElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.containerElement.classList.remove('popup--closed');
      this.setContent();
    });
  }

  // open() {
  //   this.containerElement.classList.remove('popup--closed')
  // }

  _handlerCloseButton() {
    this.closeButton.addEventListener('click', () => {
      this.containerElement.classList.add('popup--closed');
    })
  }

  // close() {
  //   this.containerElement.classList.add('popup--closed');
  // }
}

const popup = new Popup();

popup.renderList((value) => {
  const popupEl = new Todo(value).render();
  container.addTodo(popupEl);
});

// в классе формы сделать метод render, который будет создавать и возвращать разметку формы
// использовать этот метод, чтобы отрендерить форму(из html её убрать)











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
