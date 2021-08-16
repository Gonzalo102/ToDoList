
let myProjects = JSON.parse(localStorage.getItem('projects')) || [];

function createDefaultProject (){
    if(myProjects=[]){
        myProjects.push( new Project('Default Project'));
    };
}

class Todos {
    constructor(title, description, dueDate, priority, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checklist = checklist;
    }
}

class Project {
    constructor(name){
        this.name = name;
    }
}

const addProjectButton = document.querySelector('.add-project-button');
const closeProjectButton = document.getElementById('close-project');
const submitProjectButton = document.getElementById('submit-project');
const projectList = document.querySelector('.project-list');
const deleteProjectButton = document.querySelectorAll('.delete-project');

addProjectButton.addEventListener('click', showForm);
closeProjectButton.addEventListener('click', showForm);
submitProjectButton.addEventListener('click', addProject);
submitProjectButton.addEventListener('click', showForm);
submitProjectButton.addEventListener('click', () => displayProjects(myProjects.length - 1));

deleteProjectButton.forEach(projectButton => projectButton.addEventListener('click', deleteProject));

function showForm(){
    const form = document.querySelector('.form');
    form.classList.toggle("display");
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
    console.log(this.parentElement);
    parent.parentElement.removeChild(parent);
    if (ind > -1) {
        myProjects.splice(ind, 1);
	}
    localStorage.setItem('projects', JSON.stringify(myProjects));
    console.log(myProjects);
}

function displayProjects(i){
    const newDiv = document.createElement("div");
    const newProjectName = document.createElement("li"); 
    const newDeleteButton = document.createElement("li");

    newDiv.classList.add("flex-project");
    newProjectName.textContent = myProjects[i].name; 
    newDeleteButton.addEventListener('click', deleteProject);
    newDeleteButton.setAttribute('data-index-project', i);
    newDeleteButton.textContent = "x";
    newDeleteButton.classList.add('delete-project');
    
    newDiv.appendChild(newProjectName);
    newDiv.appendChild(newDeleteButton);
    projectList.appendChild(newDiv);
  }

  function displayProjectsInStorage(myProjects) {
    for (let i = 0; i < myProjects.length; i++) {
        displayProjects(i);
    }
}

createDefaultProject ();
displayProjectsInStorage(myProjects);