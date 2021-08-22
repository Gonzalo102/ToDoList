
let myProjects = JSON.parse(localStorage.getItem('projects')) || [];

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

function addTask(){

    const input1 = document.getElementById('todo_title').value;
    const input2 = document.getElementById('todo_description').value;
    const input3 = document.getElementById('todo_duedate').value;

    console.log('input1 value:' + input1);
    const ind = Number(this.getAttribute('data-index-submit-task'));
    console.log('index for project:' + ind);
    myProjects[ind].tasks.push(new Todos(input1, input2, input3));
    console.log(myProjects);
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
    
    const parent = this.parentElement;
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
const deleteProjectButton = document.querySelectorAll('.delete-project');



//EVENT LISTENERS
addProjectButton.addEventListener('click', showForm);
closeProjectButton.addEventListener('click', showForm);
submitProjectButton.addEventListener('click', addProject);
submitProjectButton.addEventListener('click', showForm);
submitProjectButton.addEventListener('click', () => displayProjects(myProjects.length - 1));


function innitTaskButtons (ind) {
    const taskDeleteButtons = document.querySelectorAll('.delete-icon');
    taskDeleteButtons.forEach((taskButton)=>taskButton.addEventListener('click', deleteTask));
    const addNewTaskButton = document.querySelector('.add-task-button');
    addNewTaskButton.addEventListener('click', () => showTodoForm(ind));
    const taskInfoButtons = document.querySelectorAll('.info-icon');
    taskInfoButtons.forEach((taskButton)=>taskButton.addEventListener('click', displayInfoTask));
    const tasksList = document.querySelector('.tasks');
    tasksList.addEventListener('click', toggleDone);
}

function innitFormButtons (ind){
    const closeTodoButton = document.getElementById('close-todo');
    const submitTodoButton = document.getElementById('submit-todo');

    closeTodoButton.addEventListener('click', () => showTodoForm(ind));
    submitTodoButton.addEventListener('click', () => showTodoForm(ind));
    submitTodoButton.addEventListener('click', addTask);
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
    const formTodo = document.querySelector('.form-todo');

    formTodo.innerHTML = `
    <form action="todo-form">
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

    formTodo.classList.toggle("display");
}

function displayProjects(i){
    const newDiv = document.createElement("div");
    const newProjectName = document.createElement("li"); 
    const newDeleteButton = document.createElement("li");

    newDiv.classList.add("flex-project");
    newProjectName.textContent = myProjects[i].name; 
    newProjectName.setAttribute('data-index-project-name', i);
    newDeleteButton.addEventListener('click', deleteProject);
    newDeleteButton.setAttribute('data-index-project', i);
    newDeleteButton.textContent = "x";
    newDeleteButton.classList.add('delete-project');

    newProjectName.addEventListener('click', displayProjectPreview);
    
    newDiv.appendChild(newProjectName);
    newDiv.appendChild(newDeleteButton);
    projectList.appendChild(newDiv);
}

function displayProjectPreview(){
    const ind = Number(this.getAttribute('data-index-project-name'));
    const projectTitle = document.querySelector('.project-title');
    projectTitle.innerHTML = myProjects[ind].name;

    displayTasks(ind);
    createAddTasksButton(ind);
    innitTaskButtons(ind);
  
}

function createAddTasksButton(ind){
    const buttonDiv = document.querySelector('.button-task')
    buttonDiv.innerHTML = `<button class="add-task-button" data-index-add-task-button="${ind}">+ Add New Task</button>`
}

function displayProjectsInStorage(myProjects) {
    for (let i = 0; i < myProjects.length; i++) {
        displayProjects(i);
        console.log(myProjects.length);
    }
}

function displayTasks(ind) {

    console.log('index variable:' + ind);
    const tasksList = document.querySelector('.tasks');
    tasksList.innerHTML = myProjects[ind].tasks.map((task, i) => {

    return `
    <li> 
     <div class="task-due-date">       
         <input type="checkbox" id="task${i}" ${task.done ? 'checked' : ''}>
         <label for="task${i}" data-project="${ind}" data-index="${i}"> ${task.title} </label>
         <i class="due-date">${task.dueDate}</i> 
         <img data-index-info-task-project="${ind}" data-index-info-task="${i}" class="info-icon" src="images/info-icon.jpg" alt="">
         <img class="edit-icon" src="images/edit.svg" alt="">
         <img data-index-delete-task-project="${ind}" data-index-delete-task="${i}" class="delete-icon" src="images/delete.svg" alt="">
     </div>
     </li>`
    }).join('');

    innitTaskButtons(ind);
}

function toggleDone(e) {
    console.log('callit');
    if (!e.target.matches('label')) return; // skip this unless it's an input
    const el = e.target;
    console.log(el);
    const index = el.dataset.index;
    const ind = el.dataset.project;
    console.log(index);
    console.log(ind);
    myProjects[ind].tasks[index].done = !myProjects[ind].tasks[index].done;
    //items[index].done = !items[index].done;
    //localStorage.setItem('items', JSON.stringify(items));
    //populateList(items, itemsList);
  }


function displayInfoTask() {
    console.log(this);
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

function showForm(){
    const form = document.querySelector('.form');
    form.classList.toggle("display");
}

createAddTasksButton(0);
displayTasks(0);
createDefaultProject();
createDefaultTasks();
displayProjectsInStorage(myProjects);
