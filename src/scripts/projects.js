// import {dropDown} from './utility'

function makeSideBar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    
    const project = document.createElement('div');
    project.classList.add('project-container');
    sidebar.appendChild(project);

    const sidetab = document.createElement('div');
    sidetab.classList.add('sidetab');
    project.appendChild(sidetab);

        const h2 = document.createElement('h2');
        h2.classList.add('project');
        h2.innerText = '> Projects';
        sidetab.appendChild(h2);        
        const plus = document.createElement('button');
        plus.classList.add('plus');
        plus.innerText = '+';
        sidetab.appendChild(plus);

    const projectdropdown = document.createElement('projectdropdown');
    projectdropdown.classList.add('projectdropdown');
    project.appendChild(projectdropdown);

        const ul = document.createElement('ul');
        projectdropdown.appendChild(ul);

        const li1 = document.createElement('li');
        li1.innerText = 'Daily';
        ul.appendChild(li1);

        const li2 = document.createElement('li');
        li2.innerText = 'Secret';
        ul.appendChild(li2);

    const completedsidetab = document.createElement('div');
    completedsidetab.classList.add('sidetab' ,'completed');
    project.appendChild(completedsidetab);
    
    const completeflex = document.createElement('div');
    completeflex.classList.add('completed-flex');
    completedsidetab.appendChild(completeflex);
    
    const h2Three = document.createElement('h2');
   
    completeflex.appendChild(h2Three);
   
    h2Three.innerHTML = `<div class="calendar"></div>Completed`
    
    
    
    return sidebar;
}
function dropDown() {
    const drop = document.querySelector('.project');
    console.log(drop);
    const menuContent = document.querySelector('.projectdropdown');  
 
    drop.addEventListener('click',()=>{
        if(menuContent.style.display===""){
        menuContent.style.display="block";
        drop.innerText = ` v Projects`;
        } else {
        menuContent.style.display="";
        drop.innerHTML = `> Projects`;
        }
    })
}
// function addSideBarToMain(){
//     const main = document.querySelector('main');
//     main.appendChild(makeSideBar());
//     dropDown();
//     console.log(dropDown());
//     console.log(main);
// }
export {makeSideBar, dropDown};