let myProjects = JSON.parse(localStorage.getItem('projects')) || [];
//iterar .myproject for each

class Todos {
    constructor(title, description, dueDate, done, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = false;
        this.priority = priority;
    }
}

class Project {
    constructor(name){
        this.name = name;
        this.tasks = [];
    }
}

function addTask() {
    const input1 = document.getElementById('todo_title').value;
    const input2 = document.getElementById('todo_description').value;
    const input3 = document.getElementById('todo_duedate').value;

    const ind = Number(this.getAttribute('data-index-submit-task'));
    console.log('Add Task Function: index for project:' + ind);
    myProjects[ind].tasks.push(new Todos(input1, input2, input3));
    console.log(myProjects);
    displayTasks(ind);
    localStorage.setItem('projects', JSON.stringify(myProjects));

}

function editTask () {
    console.log('editing task');

    console.log(this);
    console.log('displaying edit task');
    let i = Number(this.getAttribute('data-index-edit-task'));
    let ind = Number(this.getAttribute('data-index-edit-task-project'));
    
    const title = myProjects[ind].tasks[i].title;
    const description = myProjects[ind].tasks[i].description;
    const dueDate = myProjects[ind].tasks[i].dueDate;

    createEditForm(title, description, dueDate, ind, i);

}

//Edit Tasks
function renderEdit () {

    const input1 = document.getElementById('todo_title_edit').value;
    const input2 = document.getElementById('todo_description_edit').value;
    const input3 = document.getElementById('todo_duedate_edit').value;

    const ind = Number(this.getAttribute('data-index-submit-task-edit'));
    const i = Number(this.getAttribute('data-index-task-edit'));
    console.log('Edit Task Function: index for project:' + ind);
    myProjects[ind].tasks[i].title = input1;
    myProjects[ind].tasks[i].description = input2;
    myProjects[ind].tasks[i].dueDate = input3;
    console.log(myProjects);
    displayTasks(ind);
    localStorage.setItem('projects', JSON.stringify(myProjects));
}

//delete Task from DOM and Array
function deleteTask() {
    console.log(this);
    let i = Number(this.getAttribute('data-index-delete-task'));
    let ind = Number(this.getAttribute('data-index-delete-task-project'));
    myProjects[ind].tasks.splice(i, 1);
    console.log(myProjects);
    displayTasks(ind);
    innitTaskButtons (ind);
    localStorage.setItem('projects', JSON.stringify(myProjects));
}

function addProject (){

    const input1 = document.getElementById('project_name').value;
    myProjects.push( new Project(input1));
    localStorage.setItem('projects', JSON.stringify(myProjects));
    console.log(myProjects);
}

function deleteProject (){
    const ind = Number(this.getAttribute('data-index-project'));
    console.log(ind);
    
    const parent = this.parentElement.parentElement;
    parent.parentElement.removeChild(parent);
    if (ind > -1) {
        myProjects.splice(ind, 1);
	}
    localStorage.setItem('projects', JSON.stringify(myProjects));
    console.log(myProjects);
}

function createDefaultProject (){
    if(myProjects.length === 0){
        myProjects.push( new Project('Default Project'));
    };
}

function createDefaultTasks (){
    if(myProjects[0].tasks.length === 0){
        myProjects[0].tasks.push( new Todos('Hacer Bolso', 'Hacer el Bolso para Bariloche', '25/10/2021'));
    }
}

//DOM STUFF

const addProjectButton = document.querySelector('.add-project-button');
const closeProjectButton = document.getElementById('close-project');
const submitProjectButton = document.getElementById('submit-project');
const projectList = document.querySelector('.project-list');

//EVENT LISTENERS
addProjectButton.addEventListener('click', showForm);

closeProjectButton.addEventListener('click', showForm);
submitProjectButton.addEventListener('click', addProject);
submitProjectButton.addEventListener('click', showForm);
submitProjectButton.addEventListener('click', () => displayProjects(myProjects.length - 1));
submitProjectButton.addEventListener('click', () => displayProjectPreview(myProjects.length - 1));

function innitTaskButtons (ind) {
    const taskDeleteButtons = document.querySelectorAll('.delete-icon');
    taskDeleteButtons.forEach((taskButton)=>taskButton.addEventListener('click', deleteTask));
    const addNewTaskButton = document.querySelector('.add-task-button');
    addNewTaskButton.addEventListener('click', () => showTodoForm(ind));
    const taskInfoButtons = document.querySelectorAll('.info-icon');
    taskInfoButtons.forEach((taskButton)=>taskButton.addEventListener('click', displayInfoTask));
    const tasksList = document.querySelector('.tasks');
    tasksList.addEventListener('click', toggleDone);
    const taskEditButtons = document.querySelectorAll('#edit-icon-id');
    taskEditButtons.forEach((taskButton)=>taskButton.addEventListener('click', editTask));
}

function innitEditButtons(){
    const submitEditButton = document.getElementById('submit-edit');
    submitEditButton.addEventListener('click', hideEditForm);
    submitEditButton.addEventListener('click', renderEdit);
    const closeEditButton = document.getElementById('close-edit');
    closeEditButton.addEventListener('click', hideEditForm);
}

function hideEditForm (){
    console.log('hide edit form');
    const formEdit = document.querySelector('.form-edit');
    formEdit.classList.toggle("display");
}

function innitFormButtons (ind){

    console.log('inniting form buttons');
    const closeTodoButton = document.getElementById('close-todo');
    const submitTodoButton = document.getElementById('submit-todo');

    submitTodoButton.addEventListener('click', addTask);
    closeTodoButton.addEventListener('click', () => removeTodoForm());
    submitTodoButton.addEventListener('click', () => removeTodoForm());
    submitTodoButton.addEventListener('click', displayTasks(ind));
}

function innitFormInfoButtons (){
    const closeInfoButton = document.getElementById('close-info');
    closeInfoButton.addEventListener('click', hideInfoForm);
}

function creteInfoForm(title, description, dueDate) {
    const formInfo = document.querySelector('.form-info');
    const container = document.querySelector('.container');

    formInfo.innerHTML = `
    <form action="info-form">
    <ul>
        <li>
            <label class="Info-title" for="name">Title:</label>
            <label> ${title} </label>
        </li>
        <li>
            <label class="Todo-description" for="name">Description:</label>
            <label> ${description} </label>
        </li>
        <li>
            <label class="Todo-duedate" for="name">Duedate:</label>
            <label> ${dueDate} </label>
        </li>
        <div>
            <li>
                <button type="button" id="close-info">X</button>
            </li>
        </div>
    </ul>`

    innitFormInfoButtons();

    formInfo.classList.toggle("display");
    container.className = "container is-blurred";
}

function showTodoForm(ind) {
    const formTodo = document.querySelector('.form-todo-container');

    console.log("Abriendo Formulario Todo");

    formTodo.innerHTML = `
    <form class="form-todo" action="todo-form">
    <ul>
        <li>
            <label class="Todo-title" for="name">Title:</label>
            <input class="Todo-input" type="text" id="todo_title">
        </li>
        <li>
            <label class="Todo-description" for="name">Description:</label>
            <input class="Todo-input" type="text" id="todo_description">
        </li>
        <li>
            <label class="Todo-duedate" for="name">Duedate:</label>
            <input class="Todo-input" type="text" id="todo_duedate">
        </li>
        <div class="form-buttons">
            <li>
                <button type="button" id="submit-todo" data-index-submit-task="${ind}">Add</button>
            </li>
            <li>
                <button type="button" id="close-todo">Close</button>
            </li>
        </div>
    </ul>`

    innitFormButtons(ind);
}


function createEditForm(title, description, Duedate, ind, i){
    //creating edit Form
    const formEdit = document.querySelector('.form-edit');
    formEdit.classList.toggle("display");

    formEdit.innerHTML = `
    <form action="info-edit">
    <ul>
        <li>
            <label class="Todo-title" for="name">Title:</label>
            <input value="${title}" class="Todo-input" type="text" id="todo_title_edit">
        </li>
        <li>
            <label class="Todo-description" for="name">Description:</label>
            <input value="${description}" class="Todo-input" type="text" id="todo_description_edit">
        </li>
        <li>
            <label class="Todo-duedate" for="name">Duedate:</label>
            <input value="${Duedate}" class="Todo-input" type="text" id="todo_duedate_edit">
        </li>
        <div class="form-buttons">
            <li>
                <button data-index-task-edit="${i}" data-index-submit-task-edit="${ind}" type="button" id="submit-edit"> Edit </button>
            </li>
            <li>
                <button type="button" id="close-edit"> Close </button>
            </li>
        </div>
    </ul>`

innitEditButtons();

}

function displayProjects(i){
    const newDiv = document.createElement("div");
    const nameDiv = document.createElement("div");
    const buttonsDiv = document.createElement("div");
    const newProjectName = document.createElement("li"); 
    const newEditButton = document.createElement("img");
    const newDeleteButton = document.createElement("li");

    newDiv.classList.add("flex-project");
    newProjectName.textContent = myProjects[i].name; 
    newProjectName.setAttribute('data-index-project-name', i);
    newEditButton.src = 'images/edit.svg';
    newEditButton.classList.add('edit-icon');
    newEditButton.setAttribute('data-index-project-edit', i);
    newDeleteButton.addEventListener('click', deleteProject);
    newDeleteButton.setAttribute('data-index-project', i);
    newDeleteButton.textContent = "x";
    newDeleteButton.classList.add('delete-project');
    buttonsDiv.classList.add('flex-buttons-div');

    newProjectName.addEventListener('click', displayProjectPreview);
    newEditButton.addEventListener('click', createEditProjectNameForm);
    newDeleteButton.addEventListener('click', () => displayProjectPreview(myProjects.length - 1));
    
    nameDiv.appendChild(newProjectName);
    buttonsDiv.appendChild(newEditButton);
    buttonsDiv.appendChild(newDeleteButton);
    newDiv.appendChild(nameDiv);
    newDiv.appendChild(buttonsDiv);
    projectList.appendChild(newDiv);
}

function createEditProjectNameForm () {
    const ind = Number(this.getAttribute('data-index-project-edit'));
    console.log('Creating Form');
    const newForm = document.querySelector('.form-edit-project');
    newForm.classList.toggle('display');
    console.log('createEditProjectNameForm Index' + ind);
    newForm.innerHTML =         `
    <form class="form-project" action="form-project">
    <ul>
        <li>
            <input type="text" id="todo_title_edit_project">
        </li>
        <div class="form-buttons">
            <li>
                <button type="button" id="submit-project-name" data-index-submit-project-name="${ind}"> Change Name</button>
            </li>
            <li>
                <button type="button" id="close-project-name"> Close </button>
            </li>
        </div>
    </ul>`

    innitProjectForms();
}

function innitProjectForms () {
    const submitProjectName = document.getElementById('submit-project-name');
    submitProjectName.addEventListener('click', editProjectName);
    submitProjectName.addEventListener('click', hideEditProjectForm);
    const closeProjectName = document.getElementById('close-project-name');
    closeProjectName.addEventListener('click', hideEditProjectForm);
}

function editProjectName () {
    const ind = Number(this.getAttribute('data-index-submit-project-name'));
    const input1 = document.getElementById('todo_title_edit_project').value;
    myProjects[ind].name = input1;
    updateProjectName(ind);
    localStorage.setItem('projects', JSON.stringify(myProjects));
}

function updateProjectName (ind){

    const projectName = document.querySelectorAll('[data-index-project-name]');
    const arrayProjects = Array.from(projectName);
    console.log(Array.from(projectName));
    console.log('index parameter' + ind);
    arrayProjects[ind].innerHTML = myProjects[ind].name;
    displayProjectPreview(ind);
}

function displayProjectPreview(i){
    
    let ind = i;
    try {ind = Number(this.getAttribute('data-index-project-name'));
    } catch (error) {
        console.log(error);
    }
    console.log('ind' + ind);
    const projectTitle = document.querySelector('.project-title');
    projectTitle.innerHTML = myProjects[ind].name;

    console.log('displaying Project Preview');

    displayTasks(ind);
    createAddTasksButton(ind);
    innitTaskButtons(ind);
}

function displayLastAddedProject(i){
    
}

function createAddTasksButton(ind){
    const buttonDiv = document.querySelector('.button-task')
    buttonDiv.innerHTML = `<button class="add-task-button" data-index-add-task-button="${ind}">+ Add New Task</button>`
}

function displayProjectsInStorage(myProjects) {

    for (let i = 0; i < myProjects.length; i++) {
        displayProjects(i);
    }
    console.log('Projects lenght: ' + myProjects.length);
}

function displayTasks(ind) {

    console.log('Display Tasks index variable:' + ind);
    const tasksList = document.querySelector('.tasks');
    tasksList.innerHTML = myProjects[ind].tasks.map((task, i) => {
        console.log('amount of task in Project:' + i);

    return `
    <li> 
     <div class="task-due-date">       
         <input type="checkbox" id="task${i}" ${task.done ? 'checked' : ''}>
         <label for="task${i}" data-project="${ind}" data-index="${i}"> ${task.title} </label>
         <i class="due-date">${task.dueDate}</i> 
         <img data-index-info-task-project="${ind}" data-index-info-task="${i}" class="info-icon" src="images/info-icon.jpg" alt="">
         <img data-index-edit-task-project="${ind}" data-index-edit-task="${i}" class="edit-icon" id="edit-icon-id" src="images/edit.svg" alt="">
         <img data-index-delete-task-project="${ind}" data-index-delete-task="${i}" class="delete-icon" src="images/delete.svg" alt="">
     </div>
     </li>`
    }).join('');

    innitTaskButtons(ind);
}


function displayInfoTask() {
    console.log(this);
    console.log('displaying info task');
    let i = Number(this.getAttribute('data-index-info-task'));
    let ind = Number(this.getAttribute('data-index-info-task-project'));
    
    const title = myProjects[ind].tasks[i].title;
    const description = myProjects[ind].tasks[i].description;
    const dueDate = myProjects[ind].tasks[i].dueDate

    creteInfoForm(title, description, dueDate);
}

function hideInfoForm() {
    const formInfo = document.querySelector('.form-info');
    formInfo.classList.toggle("display");
    const container = document.querySelector('.container');
    container.className = "container";
}

function hideEditProjectForm () {
    const newForm = document.querySelector('.form-edit-project');
    newForm.innerHTML = '';
    newForm.classList.toggle("display");
}

function showForm(){
    const form = document.querySelector('.form');
    form.classList.toggle("display");
}

function removeTodoForm() {
    const formTodo = document.querySelector('.form-todo-container');
    formTodo.innerHTML = '';
}


function toggleDone(e) {
    if (!e.target.matches('label')) return; // skip this unless it's a label
    const el = e.target;
    console.log(el);
    const index = el.dataset.index;
    const ind = el.dataset.project;
    console.log('Index Task:' + index);
    console.log('Index Project:' + ind);
    myProjects[ind].tasks[index].done = !myProjects[ind].tasks[index].done;
    localStorage.setItem('projects', JSON.stringify(myProjects));
  }

function setInitialTitle (){
    const projectTitle = document.querySelector('.project-title');
    projectTitle.innerHTML = myProjects[0].name;
}

createAddTasksButton(0);
createDefaultProject();
createDefaultTasks();
displayTasks(0);
displayProjectsInStorage(myProjects);
setInitialTitle ();

