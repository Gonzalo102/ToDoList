/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\nlet myProjects = JSON.parse(localStorage.getItem('projects')) || [];\n\nfunction createDefaultProject (){\n    if(myProjects=[]){\n        myProjects.push( new Project('Default Project'));\n    };\n}\n\nclass Todos {\n    constructor(title, description, dueDate, priority, checklist) {\n        this.title = title;\n        this.description = description;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.checklist = checklist;\n    }\n}\n\nclass Project {\n    constructor(name){\n        this.name = name;\n    }\n}\n\nconst addProjectButton = document.querySelector('.add-project-button');\nconst closeProjectButton = document.getElementById('close-project');\nconst submitProjectButton = document.getElementById('submit-project');\nconst projectList = document.querySelector('.project-list');\nconst deleteProjectButton = document.querySelectorAll('.delete-project');\n\naddProjectButton.addEventListener('click', showForm);\ncloseProjectButton.addEventListener('click', showForm);\nsubmitProjectButton.addEventListener('click', addProject);\nsubmitProjectButton.addEventListener('click', showForm);\nsubmitProjectButton.addEventListener('click', () => displayProjects(myProjects.length - 1));\n\ndeleteProjectButton.forEach(projectButton => projectButton.addEventListener('click', deleteProject));\n\nfunction showForm(){\n    const form = document.querySelector('.form');\n    form.classList.toggle(\"display\");\n}\n\nfunction addProject (){\n\n    const input1 = document.getElementById('project_name').value;\n    myProjects.push( new Project(input1));\n    localStorage.setItem('projects', JSON.stringify(myProjects));\n    console.log(myProjects);\n\n}\n\nfunction deleteProject (){\n    const ind = Number(this.getAttribute('data-index-project'));\n    console.log(ind);\n    \n    const parent = this.parentElement;\n    console.log(this.parentElement);\n    parent.parentElement.removeChild(parent);\n    if (ind > -1) {\n        myProjects.splice(ind, 1);\n\t}\n    localStorage.setItem('projects', JSON.stringify(myProjects));\n    console.log(myProjects);\n}\n\nfunction displayProjects(i){\n    const newDiv = document.createElement(\"div\");\n    const newProjectName = document.createElement(\"li\"); \n    const newDeleteButton = document.createElement(\"li\");\n\n    newDiv.classList.add(\"flex-project\");\n    newProjectName.textContent = myProjects[i].name; \n    newDeleteButton.addEventListener('click', deleteProject);\n    newDeleteButton.setAttribute('data-index-project', i);\n    newDeleteButton.textContent = \"x\";\n    newDeleteButton.classList.add('delete-project');\n    \n    newDiv.appendChild(newProjectName);\n    newDiv.appendChild(newDeleteButton);\n    projectList.appendChild(newDiv);\n  }\n\n  function displayProjectsInStorage(myProjects) {\n    for (let i = 0; i < myProjects.length; i++) {\n        displayProjects(i);\n    }\n}\n\ncreateDefaultProject ();\ndisplayProjectsInStorage(myProjects);\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;