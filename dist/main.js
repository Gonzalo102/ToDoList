/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ () => {
        eval(
          'let myProjects = JSON.parse(localStorage.getItem(\'projects\')) || [];\n//iterar .myproject for each\n\nclass Todos {\n    constructor(title, description, dueDate, done, priority) {\n        this.title = title;\n        this.description = description;\n        this.dueDate = dueDate;\n        this.done = false;\n        this.priority = priority;\n    }\n}\n\nclass Project {\n    constructor(name){\n        this.name = name;\n        this.tasks = [];\n    }\n}\n\nfunction addTask(e) {\n    e.preventDefault()\n\n    const input1 = document.getElementById(\'todo_title\').value;\n    const input2 = document.getElementById(\'todo_description\').value;\n    const input3 = document.getElementById(\'todo_duedate\').value;\n\n    const ind = Number(this.getAttribute(\'data-index-submit-task\'));\n    myProjects[ind].tasks.push(new Todos(input1, input2, input3));\n    displayTasks(ind);\n    localStorage.setItem(\'projects\', JSON.stringify(myProjects));\n\n}\n\nfunction editTask () {\n\n    let i = Number(this.getAttribute(\'data-index-edit-task\'));\n    let ind = Number(this.getAttribute(\'data-index-edit-task-project\'));\n    \n    const title = myProjects[ind].tasks[i].title;\n    const description = myProjects[ind].tasks[i].description;\n    const dueDate = myProjects[ind].tasks[i].dueDate;\n\n    createEditForm(title, description, dueDate, ind, i);\n\n}\n\n//Edit Tasks\nfunction renderEdit () {\n\n    const input1 = document.getElementById(\'todo_title_edit\').value;\n    const input2 = document.getElementById(\'todo_description_edit\').value;\n    const input3 = document.getElementById(\'todo_duedate_edit\').value;\n\n    const ind = Number(this.getAttribute(\'data-index-submit-task-edit\'));\n    const i = Number(this.getAttribute(\'data-index-task-edit\'));\n    myProjects[ind].tasks[i].title = input1;\n    myProjects[ind].tasks[i].description = input2;\n    myProjects[ind].tasks[i].dueDate = input3;\n    displayTasks(ind);\n    localStorage.setItem(\'projects\', JSON.stringify(myProjects));\n}\n\n//delete Task from DOM and Array\nfunction deleteTask() {\n    let i = Number(this.getAttribute(\'data-index-delete-task\'));\n    let ind = Number(this.getAttribute(\'data-index-delete-task-project\'));\n    myProjects[ind].tasks.splice(i, 1);\n    displayTasks(ind);\n    innitTaskButtons (ind);\n    localStorage.setItem(\'projects\', JSON.stringify(myProjects));\n}\n\nfunction addProject (){\n\n    const input1 = document.getElementById(\'project_name\').value;\n    myProjects.push( new Project(input1));\n    localStorage.setItem(\'projects\', JSON.stringify(myProjects));\n}\n\nfunction deleteProject (){\n    const ind = Number(this.getAttribute(\'data-index-project\'));\n    \n    const parent = this.parentElement.parentElement;\n    parent.parentElement.removeChild(parent);\n    if (ind > -1) {\n        myProjects.splice(ind, 1);\n\t}\n    localStorage.setItem(\'projects\', JSON.stringify(myProjects));\n}\n\nfunction createDefaultProject (){\n    if(myProjects.length === 0){\n        myProjects.push( new Project(\'Default Project\'));\n    };\n}\n\nfunction createDefaultTasks (){\n    if(myProjects[0].tasks.length === 0){\n        myProjects[0].tasks.push( new Todos(\'Pack my Bag for my trip to Barcelona\', \'Pack my bag for my trip to Barcelona\', \'25/10/2021\'));\n    }\n}\n\n//DOM STUFF\n\nconst addProjectButton = document.querySelector(\'.add-project-button\');\nconst closeProjectButton = document.getElementById(\'close-project\');\nconst submitProjectButton = document.getElementById(\'submit-project\');\nconst projectList = document.querySelector(\'.project-list\');\n\n//EVENT LISTENERS\naddProjectButton.addEventListener(\'click\', showForm);\n\ncloseProjectButton.addEventListener(\'click\', showForm);\nsubmitProjectButton.addEventListener(\'click\', addProject);\nsubmitProjectButton.addEventListener(\'click\', showForm);\nsubmitProjectButton.addEventListener(\'click\', () => displayProjects(myProjects.length - 1));\nsubmitProjectButton.addEventListener(\'click\', () => displayProjectPreview(myProjects.length - 1));\nwindow.addEventListener(\'keydown\', handleKeyDownProjectForm)\n\n\nfunction innitTaskButtons (ind) {\n    const taskDeleteButtons = document.querySelectorAll(\'.delete-icon\');\n    taskDeleteButtons.forEach((taskButton)=>taskButton.addEventListener(\'click\', deleteTask));\n    const addNewTaskButton = document.querySelector(\'.add-task-button\');\n    addNewTaskButton.addEventListener(\'click\', () => showTodoForm(ind));\n    const taskInfoButtons = document.querySelectorAll(\'.info-icon\');\n    taskInfoButtons.forEach((taskButton)=>taskButton.addEventListener(\'click\', displayInfoTask));\n    const tasksList = document.querySelector(\'.tasks\');\n    tasksList.addEventListener(\'click\', toggleDone);\n    const taskEditButtons = document.querySelectorAll(\'#edit-icon-id\');\n    taskEditButtons.forEach((taskButton)=>taskButton.addEventListener(\'click\', editTask));\n}\n\nfunction innitEditButtons(){\n    const submitEditButton = document.getElementById(\'submit-edit\');\n    submitEditButton.addEventListener(\'click\', hideEditForm);\n    submitEditButton.addEventListener(\'click\', renderEdit);\n    const closeEditButton = document.getElementById(\'close-edit\');\n    closeEditButton.addEventListener(\'click\', hideEditForm);\n}\n\n//keyboard Support\n\nfunction handleKeyDownProjectForm (e) {\n    const form = document.querySelector(\'.form\');\n    if (form.className == "form display" || e.key !== \'Enter\') return\n    e.preventDefault()\n    addProject()\n    showForm()\n    displayProjects(myProjects.length - 1)\n    displayProjectPreview(myProjects.length - 1)\n}\n\nfunction hideEditForm (){\n    const formEdit = document.querySelector(\'.form-edit\');\n    formEdit.classList.toggle("display");\n}\n\nfunction innitFormButtons (ind){\n\n    const closeTodoButton = document.getElementById(\'close-todo\');\n    const submitTodoForm = document.querySelector(\'.form-todo\');\n\n    submitTodoForm.addEventListener(\'submit\', addTask);\n    submitTodoForm.addEventListener(\'submit\', removeTodoForm);\n    submitTodoForm.addEventListener(\'submit\', displayTasks(ind));\n    closeTodoButton.addEventListener(\'click\', removeTodoForm);\n\n}\n\nfunction innitFormInfoButtons (){\n    const closeInfoButton = document.getElementById(\'close-info\');\n    closeInfoButton.addEventListener(\'click\', hideInfoForm);\n}\n\nfunction creteInfoForm(title, description, dueDate) {\n    const formInfo = document.querySelector(\'.form-info\');\n    const container = document.querySelector(\'.container\');\n\n    formInfo.innerHTML = `\n    <form action="">\n    <ul>\n        <li>\n            <label class="Info-title" for="name">Title:</label>\n            <label> ${title} </label>\n        </li>\n        <li>\n            <label class="Todo-description" for="name">Description:</label>\n            <label> ${description} </label>\n        </li>\n        <li>\n            <label class="Todo-duedate" for="name">Duedate:</label>\n            <label> ${dueDate} </label>\n        </li>\n        <div>\n            <li>\n                <button type="button" id="close-info">X</button>\n            </li>\n        </div>\n    </ul>`\n\n    innitFormInfoButtons();\n\n    formInfo.classList.toggle("display");\n    container.className = "container is-blurred";\n}\n\nfunction showTodoForm(ind) {\n    const formTodo = document.querySelector(\'.form-todo-container\');\n\n    formTodo.innerHTML = `\n    <form class="form-todo" action="" data-index-submit-task="${ind}">\n        <ul>\n            <li>\n                <label class="Todo-title" for="name">Title:</label>\n                <input class="Todo-input" type="text" id="todo_title">\n            </li>\n            <li>\n                <label class="Todo-description" for="name">Description:</label>\n                <input class="Todo-input" type="text" id="todo_description">\n            </li>\n            <li>\n                <label class="Todo-duedate" for="name">Duedate:</label>\n                <input class="Todo-input" type="date" id="todo_duedate">\n            </li>\n            <div class="form-buttons">\n                <li>\n                    <button type="submit" id="submit-todo" >Add</button>\n                </li>\n                <li>\n                    <button type="button" id="close-todo">Close</button>\n                </li>\n            </div>\n        </ul>\n    </form>`\n\n    innitFormButtons(ind);\n}\n\n\nfunction createEditForm(title, description, Duedate, ind, i){\n    //creating edit Form\n    const formEdit = document.querySelector(\'.form-edit\');\n    formEdit.classList.toggle("display");\n\n    formEdit.innerHTML = `\n    <form action="">\n    <ul>\n        <li>\n            <label class="Todo-title" for="name">Title:</label>\n            <input value="${title}" class="Todo-input" type="text" id="todo_title_edit">\n        </li>\n        <li>\n            <label class="Todo-description" for="name">Description:</label>\n            <input value="${description}" class="Todo-input" type="text" id="todo_description_edit">\n        </li>\n        <li>\n            <label class="Todo-duedate" for="name">Duedate:</label>\n            <input value="${Duedate}" class="Todo-input" type="text" id="todo_duedate_edit">\n        </li>\n        <div class="form-buttons">\n            <li>\n                <button data-index-task-edit="${i}" data-index-submit-task-edit="${ind}" type="button" id="submit-edit"> Edit </button>\n            </li>\n            <li>\n                <button type="button" id="close-edit"> Close </button>\n            </li>\n        </div>\n    </ul>`\n\ninnitEditButtons();\n\n}\n\nfunction displayProjects(i){\n    const newDiv = document.createElement("div");\n    const nameDiv = document.createElement("div");\n    const buttonsDiv = document.createElement("div");\n    const newProjectName = document.createElement("li"); \n    const newEditButton = document.createElement("img");\n    const newDeleteButton = document.createElement("li");\n\n    newDiv.classList.add("flex-project");\n    newProjectName.textContent = myProjects[i].name; \n    newProjectName.setAttribute(\'data-index-project-name\', i);\n    newEditButton.src = \'images/edit.svg\';\n    newEditButton.classList.add(\'edit-icon\');\n    newEditButton.setAttribute(\'data-index-project-edit\', i);\n    newDeleteButton.addEventListener(\'click\', deleteProject);\n    newDeleteButton.setAttribute(\'data-index-project\', i);\n    newDeleteButton.textContent = "x";\n    newDeleteButton.classList.add(\'delete-project\');\n    buttonsDiv.classList.add(\'flex-buttons-div\');\n\n    newProjectName.addEventListener(\'click\', displayProjectPreview);\n    newEditButton.addEventListener(\'click\', createEditProjectNameForm);\n    newDeleteButton.addEventListener(\'click\', () => displayProjectPreview(myProjects.length - 1));\n    \n    nameDiv.appendChild(newProjectName);\n    buttonsDiv.appendChild(newEditButton);\n    buttonsDiv.appendChild(newDeleteButton);\n    newDiv.appendChild(nameDiv);\n    newDiv.appendChild(buttonsDiv);\n    projectList.appendChild(newDiv);\n}\n\nfunction createEditProjectNameForm () {\n    const ind = Number(this.getAttribute(\'data-index-project-edit\'));\n    const newForm = document.querySelector(\'.form-edit-project\');\n    newForm.classList.toggle(\'display\');\n    newForm.innerHTML =         `\n    <form class="form-project" action="">\n    <ul>\n        <li>\n            <input type="text" id="todo_title_edit_project">\n        </li>\n        <div class="form-buttons">\n            <li>\n                <button type="button" id="submit-project-name" data-index-submit-project-name="${ind}"> Change Name</button>\n            </li>\n            <li>\n                <button type="button" id="close-project-name"> Close </button>\n            </li>\n        </div>\n    </ul>`\n\n    innitProjectForms();\n}\n\nfunction innitProjectForms () {\n    const submitProjectName = document.getElementById(\'submit-project-name\');\n    submitProjectName.addEventListener(\'click\', editProjectName);\n    submitProjectName.addEventListener(\'click\', hideEditProjectForm);\n    \n    const closeProjectName = document.getElementById(\'close-project-name\');\n    closeProjectName.addEventListener(\'click\', hideEditProjectForm);\n}\n\nfunction editProjectName () {\n    const ind = Number(this.getAttribute(\'data-index-submit-project-name\'));\n    const input1 = document.getElementById(\'todo_title_edit_project\').value;\n    myProjects[ind].name = input1;\n    updateProjectName(ind);\n    localStorage.setItem(\'projects\', JSON.stringify(myProjects));\n}\n\nfunction updateProjectName (ind){\n\n    const projectName = document.querySelectorAll(\'[data-index-project-name]\');\n    const arrayProjects = Array.from(projectName);\n    arrayProjects[ind].innerHTML = myProjects[ind].name;\n    displayProjectPreview(ind);\n}\n\nfunction displayProjectPreview(i){\n    \n    let ind = i;\n    try {ind = Number(this.getAttribute(\'data-index-project-name\'));\n    } catch (error) {\n        \n    }\n    const projectTitle = document.querySelector(\'.project-title\');\n    projectTitle.innerHTML = myProjects[ind].name;\n\n    displayTasks(ind);\n    createAddTasksButton(ind);\n    innitTaskButtons(ind);\n}\n\nfunction displayLastAddedProject(i){\n    \n}\n\nfunction createAddTasksButton(ind){\n    const buttonDiv = document.querySelector(\'.button-task\')\n    buttonDiv.innerHTML = `<button class="add-task-button" data-index-add-task-button="${ind}">+</button>`\n}\n\nfunction displayProjectsInStorage(myProjects) {\n\n    for (let i = 0; i < myProjects.length; i++) {\n        displayProjects(i);\n    }\n}\n\nfunction displayTasks(ind) {\n\n    const tasksList = document.querySelector(\'.tasks\');\n    tasksList.innerHTML = myProjects[ind].tasks.map((task, i) => {\n\n    return `\n    <li> \n     <div class="task-due-date">       \n         <input type="checkbox" id="task${i}" ${task.done ? \'checked\' : \'\'}>\n         <label for="task${i}" data-project="${ind}" data-index="${i}"> ${task.title} </label>\n         <i class="due-date">${task.dueDate}</i> \n         <img data-index-info-task-project="${ind}" data-index-info-task="${i}" class="info-icon" src="images/info-icon.jpg" alt="">\n         <img data-index-edit-task-project="${ind}" data-index-edit-task="${i}" class="edit-icon" id="edit-icon-id" src="images/edit.svg" alt="">\n         <img data-index-delete-task-project="${ind}" data-index-delete-task="${i}" class="delete-icon" src="images/delete.svg" alt="">\n     </div>\n     </li>`\n    }).join(\'\');\n\n    innitTaskButtons(ind);\n}\n\n\nfunction displayInfoTask() {\n    let i = Number(this.getAttribute(\'data-index-info-task\'));\n    let ind = Number(this.getAttribute(\'data-index-info-task-project\'));\n    \n    const title = myProjects[ind].tasks[i].title;\n    const description = myProjects[ind].tasks[i].description;\n    const dueDate = myProjects[ind].tasks[i].dueDate\n\n    creteInfoForm(title, description, dueDate);\n}\n\nfunction hideInfoForm() {\n    const formInfo = document.querySelector(\'.form-info\');\n    formInfo.classList.toggle("display");\n    const container = document.querySelector(\'.container\');\n    container.className = "container";\n}\n\nfunction hideEditProjectForm () {\n    const newForm = document.querySelector(\'.form-edit-project\');\n    newForm.innerHTML = \'\';\n    newForm.classList.toggle("display");\n}\n\nfunction showForm(){\n    const form = document.querySelector(\'.form\');\n    form.classList.toggle("display");\n}\n\nfunction removeTodoForm(e) {\n    e.preventDefault()\n    \n    const formTodo = document.querySelector(\'.form-todo-container\');\n    formTodo.innerHTML = \'\';\n}\n\n\nfunction toggleDone(e) {\n    if (!e.target.matches(\'label\')) return; // skip this unless it\'s a label\n    const el = e.target;\n    const index = el.dataset.index;\n    const ind = el.dataset.project;\n    myProjects[ind].tasks[index].done = !myProjects[ind].tasks[index].done;\n    localStorage.setItem(\'projects\', JSON.stringify(myProjects));\n  }\n\nfunction setInitialTitle (){\n    const projectTitle = document.querySelector(\'.project-title\');\n    projectTitle.innerHTML = myProjects[0].name;\n}\n\ncreateAddTasksButton(0);\ncreateDefaultProject();\ncreateDefaultTasks();\ndisplayTasks(0);\ndisplayProjectsInStorage(myProjects);\nsetInitialTitle ();\n\n\n\n//# sourceURL=webpack://todolist/./src/index.js?'
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = {};
  /******/ __webpack_modules__["./src/index.js"]();
  /******/
  /******/
})();
