function makeSideBar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    
    const project = document.createElement('div');
    project.classList.add('project-container');
    sidebar.appendChild(project);

    const sidetab = document.createElement('div');
    sidetab.classList.add('sidetab', 'projects');
    project.appendChild(sidetab)

        const h2 = document.createElement('h2');
        h2.innerText = '> Projects';
        sidetab.appendChild(h2);

        const h2Too = document.createElement('h2');
        h2Too.innerText = '+';
        sidetab.appendChild(h2Too);

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
    // const calendar = document.createElement('div');
    // calendar.classList.add('calendar');
    completeflex.appendChild(h2Three);
    // h2Three.appendChild(calendar);
    // h2Three.innerText = 'Completed';
    h2Three.innerHTML = `<div class="calendar"></div>Completed`
    
    return sidebar;
}
export {makeSideBar};