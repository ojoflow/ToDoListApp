import './style.css';
import {makeSideBar,dropDown} from './projects';
//import function for main task list area
const content = document.querySelector('.content');

function makeHeader() {
    const header = document.createElement('header');
    header.innerText = 'TO-DO List';
    return header;
}
function makeMain() {
    const main = document.createElement('main');
    main.appendChild(makeSideBar());
    return main;
}
/** MAIN FUNCTIONALITIY */
(function createTodo() {
    content.appendChild(makeHeader());
    content.appendChild(makeMain());
    dropDown();
})()