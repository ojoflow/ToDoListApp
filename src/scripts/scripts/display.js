import projectList from './projectList';
import capitalize from '../helpers/capitalize';
import { format, parseISO } from 'date-fns';

function clearTodos() {
    const todoListContainer = document.getElementById('todo-list-container');
    todoListContainer.innerText = '';
  }
  
  function displayAddTodo(project) {
    const todoListUl = document.getElementById('todo-list-ul')
    const inputContainer = makeElement('div', 'input-container', ['input-container']);
    const titleInput = makeElement('input', 'title-input', ['title-input']);
    titleInput.placeholder = 'Title'
    titleInput.maxLength = '20'
    const descriptionInput = makeElement('textarea', 'description-input', ['description-input']);
    descriptionInput.placeholder = 'Description'
    const priorityInput = makeElement('select', 'priority-input', ['priority-input']);
    let lowPriority = makeElement('option', 'low-priority', ['priority'], 'Low');
    let mediumPriority = makeElement('option', 'medium-priority', ['priority'], 'Medium');
    let highPriority = makeElement('option', 'high-priority', ['priority'], 'High');
    priorityInput.append(lowPriority, mediumPriority, highPriority);
    const dateInput = makeElement('input', 'date-input', ['date-input']);
    dateInput.type = 'date';
    dateInput.value = format(new Date(), 'yyyy-MM-dd');
    inputContainer.append(titleInput, descriptionInput, priorityInput, dateInput);
    const addTodoButton = makeElement('button', 'new-todo-button', ['new-todo-button', 'nice-button', 'add-todo-button'], 'Add Todo');
    addTodoButton.addEventListener('click', () => {
      if (!titleInput.value || !dateInput.value) return;
      project.addTodo(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value.toLowerCase());
    });
    inputContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') project.addTodo(titleInput.value, descriptionInput.value, dateInput.value, priorityInput.value.toLowerCase());
    });
    const cancelButton = makeElement('button', 'cancel-button', ['nice-button'], 'Cancel');
    cancelButton.addEventListener('click', () => {
      todoListUl.removeChild(container);
      const newTodoButton = makeElement('button', 'new-todo-button', ['new-todo-button', 'nice-button'], 'New Todo');
      newTodoButton.addEventListener('click', () => {
        todoListUl.removeChild(newTodoButton);
        displayAddTodo(project);
      });
      todoListUl.append(newTodoButton);
    });
    const buttonContainer = makeElement('div', 'button-container', ['button-container']);
    buttonContainer.append(addTodoButton, cancelButton);
  
    const container = makeElement('div', 'add-todo-container', ['add-todo-container']);
    container.append(inputContainer, buttonContainer);
    todoListUl.append(container);
  }
  
  function displayEditTodo(todoLi, todo, project) {
    const inputContainer = makeElement('div', 'input-container', ['input-container']);
    const titleInput = makeElement('input', 'title-input', ['title-input']);
    titleInput.value = todo.title;
    titleInput.maxLength = '20'
    const descriptionInput = makeElement('textarea', 'description-input', ['description-input'], todo.description);
    const priorityInput = makeElement('select', 'priority-input', ['priority-input']);
    let lowPriority = makeElement('option', 'low-priority', ['priority'], 'Low');
    let mediumPriority = makeElement('option', 'medium-priority', ['priority'], 'Medium');
    let highPriority = makeElement('option', 'high-priority', ['priority'], 'High');
    priorityInput.append(lowPriority, mediumPriority, highPriority);
    for(let i, j = 0; i = priorityInput.options[j]; j++) { //This for-loop makes sure the previously selected priority is the default when the Todo Edit is opened.
      if(i.value === capitalize(todo.priority)) {
          priorityInput.selectedIndex = j;
          break;
      }
    }
    const dateInput = makeElement('input', 'date-input', ['date-input']);
    dateInput.type = 'date';
    // dateInput.value = todo.dueDate;
    inputContainer.append(titleInput, descriptionInput, priorityInput, dateInput);
    const editTodoButton = makeElement('button', 'edit-todo-button', ['new-todo-button', 'nice-button', 'add-todo-button'], 'Edit Todo');
    const applyEdit = () => {
      if(!titleInput.value) return;
      todo.edit('title', titleInput.value);
      todo.edit('description', descriptionInput.value);
      todo.edit('priority', priorityInput.value.toLowerCase());
      if (dateInput.value !== '') todo.edit('dueDate', dateInput.value);
      displayTodos(project);
    }
    editTodoButton.addEventListener('click', applyEdit);
    inputContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyEdit();
    });
    const container = makeElement('div', 'add-todo-container', ['add-todo-container']);
    const cancelButton = makeElement('button', 'cancel-button', ['nice-button'], 'Cancel');
    cancelButton.addEventListener('click', () => displayTodos(project));
    const buttonContainer = makeElement('div', 'button-container', ['button-container']);
    buttonContainer.append(editTodoButton, cancelButton);
    container.append(inputContainer, buttonContainer);
    todoLi.after(container);
  }
  
  function displayTodos(project) {
    const todoListContainer = document.getElementById('todo-list-container');
    todoListContainer.innerText = '';
  
    const heading = makeElement('h2', project.title, ['project-title'], project.title); //Project title builder
    heading.addEventListener('click', () => { //To seamlessly edit titles in-line, replace the title with an identical text-input
      const projectTitleInput = makeElement('input', 'project-title', ['project-title-input']);
      projectTitleInput.value = project.title;
      projectTitleInput.maxLength = 25;
      projectTitleInput.addEventListener('blur', () => project.editTitle(projectTitleInput.value));
      projectTitleInput.addEventListener('keydown', (e) => { 
        if (e.key === 'Enter') project.editTitle(projectTitleInput.value);
      });
      heading.replaceWith(projectTitleInput);
      projectTitleInput.focus();
    });
  
    const { todoList } = project;
    const todoListUl = makeElement('ul', 'todo-list-ul', ['todo-list']);
    const todoListLength = todoList.length;
    for (let i = 0; i < todoListLength; i++) { //To-Do list builder
      const completedStatus = todoList[i].completed ? 'completed' : 'not-completed';
      const todoLi = makeElement('li', `todo-${i}`, ['todo-li']);
      const checkBox = makeElement('div', '', ['checkbox', completedStatus, todoList[i].priority]);
      const todoTitle = makeElement('div', '', ['todo-title', completedStatus], todoList[i].title);
      const todoEndContainer = makeElement('div', '', ['todo-end-container']);
      const todoDate = makeElement('div', '', ['todo-date', completedStatus], format(parseISO(todoList[i].dueDate), 'MM/dd/yyyy'));
      const todoDeleteButton = makeElement('span', null, ['invisible', 'material-symbols-outlined'], 'delete');
      todoDeleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        project.deleteTodo(i);
      });
      todoEndContainer.append(todoDate, todoDeleteButton);
      checkBox.addEventListener('click', () => {
        todoList[i].toggle();
        displayTodos(project);
      });
      todoLi.append(checkBox, todoTitle, todoEndContainer);
      todoLi.addEventListener('click', function handler() {
        displayEditTodo(todoLi, todoList[i], project)
        this.removeEventListener('click', handler);
      });
      todoLi.addEventListener('mouseenter', () => todoDeleteButton.classList.toggle('invisible'));
      todoLi.addEventListener('mouseleave', () => todoDeleteButton.classList.toggle('invisible'));
      todoListUl.appendChild(todoLi);
    }
  
    const newTodoButton = makeElement('button', 'new-todo-button', ['new-todo-button', 'nice-button'], 'New Todo');
    newTodoButton.addEventListener('click', () => {
      todoListUl.removeChild(newTodoButton);
      displayAddTodo(project);
    });
  
    todoListUl.append(newTodoButton)
    todoListContainer.append(heading, todoListUl);
  }
  
  function displayAddProject() {
    const projectSidebar = document.getElementById('project-sidebar');
    const container = makeElement('div', 'add-project-container', ['add-project-container']);
    const projectInput = makeElement('input', 'project-input', ['project-input']);
    const addProjectButton = makeElement('button', 'add-project-button', ['add-project-button', 'nice-button'], 'Add Project');
    const reset = () => {
      projectSidebar.removeChild(container);
      const newProjectButton = makeElement('button', 'new-project-button', ['new-project-button', 'nice-button'], 'New Project');
      newProjectButton.addEventListener('click', () => {
        projectSidebar.removeChild(newProjectButton);
        displayAddProject();
      });
      projectSidebar.appendChild(newProjectButton);
    }
    addProjectButton.addEventListener('click', () => {
      if (!projectInput.value) return;
      projectList.addProject(projectInput.value);
      reset();
    });
    const cancelButton = makeElement('button', 'cancel-project-button', ['nice-button'], 'Cancel');
    cancelButton.addEventListener('click', reset);
    const buttonContainer = makeElement('div', 'button-container', ['button-container']);
    buttonContainer.append(addProjectButton, cancelButton);
    container.append(projectInput, buttonContainer);
    projectSidebar.appendChild(container);
  }
  
  function displayProjects() {
    const projectListContainer = document.getElementById('project-list-container');
    projectListContainer.innerText = '';
  
    const projectListLength = projectList.length;
    for (let i = 0; i < projectListLength; i++) {
      const projectContainer = makeElement('div', null, ['project-container']);
      const project = makeElement('button', null, ['project-list-item'], projectList[i].title);
      project.addEventListener('click', () => {
        projectList[i].todoList = projectList[i].todoList.filter(todo => todo.completed === false); //Remove any completed todos ONLY when changing projects
        displayTodos(projectList[i]);
      });
  
      const deleteProjectButton = makeElement('span', null, ['invisible', 'material-symbols-outlined'], 'delete');
      deleteProjectButton.addEventListener('click', () => {
        const currentProject = document.querySelector('.project-title');
        if (currentProject !== null) {
          if (currentProject.id === projectList[i].title) {
            clearTodos();
          }
        }
        projectList.deleteProject(i);
      });
      projectContainer.addEventListener('mouseenter', () => deleteProjectButton.classList.toggle('invisible'));
      projectContainer.addEventListener('mouseleave', () => deleteProjectButton.classList.toggle('invisible'));
      projectContainer.append(project, deleteProjectButton);
      projectListContainer.appendChild(projectContainer);
    }
  }
  
  export {
    displayAddProject,
    displayProjects,
    displayTodos,
  };