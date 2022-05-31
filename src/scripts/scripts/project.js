import Todo from './todo';
import { displayTodos, displayProjects } from './display';
import { localSave } from './storage';

class Project {
  constructor(title) {
    this.title = capitalize(title);
    this.todoList = [];
  }

  editTitle(newTitle) { 
    this.title = newTitle;
    displayProjects();
    localSave();
  }

  addTodo(title, description, dueDate, priority) {
    this.todoList.push(new Todo(title, description, dueDate, priority));
    displayTodos(this);
    localSave();
  }

  deleteTodo(position) {
    this.todoList.splice(position, 1);
    displayTodos(this);
    localSave();
  }
}

export default Project;