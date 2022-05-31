

function makeSideBar() {

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');
    sidebar.appendChild(projectContainer);

    const sidetab = document.createElement('div');
    sidetab.classList.add('sidetab');
    projectContainer.appendChild(sidetab);

        const h2 = document.createElement('h2');
        h2.classList.add('project');
        h2.innerText = 'Projects';
        sidetab.appendChild(h2);        
  
    
    const projectBox1 = document.createElement('div');
    projectBox1.classList.add('project-box');
    const projectText1 = document.createElement('div');
    projectText1.textContent = "Project 1";
    projectBox1.appendChild(projectText1);
    const spanContainer1 = document.createElement('span');
    projectBox1.appendChild(spanContainer1);
    const svgTrash = document.createElement('div');
    svgTrash.classList.add('trash-icon')
    spanContainer1.appendChild(svgTrash);
    sidebar.appendChild(projectBox1);

    const projectBox2 = document.createElement('div');
    projectBox2.classList.add('project-box');
    const projectText2 = document.createElement('div');
    projectText2.textContent = "Project 2";
    projectBox2.appendChild(projectText2);
    const spanContainer2 = document.createElement('span');
    const svgTrash2 = document.createElement('div');
    svgTrash2.classList.add('trash-icon');
    projectBox2.appendChild(projectText2);
    projectBox2.appendChild(spanContainer2);
    spanContainer2.appendChild(svgTrash2);
    sidebar.appendChild(projectBox2);

    const newProject = document.createElement('button');
    newProject.classList.add('new-project');
    newProject.textContent = 'NEW PROJECT';
    sidebar.appendChild(newProject);

    
    
    
    return sidebar;
}
function flexTask() {
    const flexTask = document.createElement('div');
    flexTask.classList.add("flex-task");
    return flexTask;
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

export {makeSideBar, dropDown, flexTask};