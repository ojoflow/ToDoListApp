import { localSave } from './storageHandler';

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = capitalize(title);
    this.description = capitalize(description);
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  toggle() {
    this.completed === false ? this.completed = true : this.completed = false;
    localSave();
  }

  edit(property, newValue) {
    this[property] = newValue;
    localSave();
  }
}

export default Todo;