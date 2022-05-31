import Project from './project';
import { displayProjects, displayTodos } from './display';
import { localSave } from './storageHandler';

let projectList = [];

projectList.addProject = (title) => {
  projectList.push(new Project(title));
  displayProjects(projectList);
  displayTodos(projectList[projectList.length - 1]); //display the new project when it is made
  localSave();
};

projectList.deleteProject = (position) => {
  projectList.splice(position, 1);
  displayProjects(projectList);
  localSave();
};

export default projectList;