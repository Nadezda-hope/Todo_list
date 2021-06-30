"use strict";

const addButton = document.querySelector('.add__button');
const template = document.querySelector('#template-task').content.querySelector('.item');
const wrapper = document.querySelector('.tasks__list');
const addInput = document.querySelector('.add__input');
const clearButton = document.querySelector('.footer__clear-button');

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

const container = new TodoList();

dataCards.forEach(str => {
  const todo = new Todo(str);
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

    this.closeButton.removeEventListener('click', () => {
      this._popupContetElement.classList.add('popup--closed');
    });
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
    this.addButtonElement.classList.add('add__button--edit');
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

class DeleteItem {
  constructor(button) {
    this.deleteButton = button;
  }

  remove() {
    this.deleteButton.closest('.tasks__item').remove(); 
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

  if (evt.target.classList.contains('item__trash')) {
    const delItem = new DeleteItem(evt.target);
    delItem.remove();
    container.countTodo();
  }
});

class ClearAll {
  constructor() {
    this.tasksList = document.querySelector('.tasks__list');
  }

  removeAll() {
    this.tasksList.innerHTML = '';
  }
}

clearButton.addEventListener('click', () => {
  const delItems = new ClearAll();
  delItems.removeAll();
})
