import './style.css';
import {makeSideBar,dropDown, flexTask} from './sidebar';

//import function for main task list area
const main = document.querySelector('main');

/** MAIN FUNCTIONALITIY */
(function createDOM() {
    main.appendChild(makeSideBar());
    main.appendChild(flexTask());
    dropDown();
})()