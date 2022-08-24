// TODO: study ipc, ipcmain/ipcrenderer & ipcmainevent/ipcrendererevent
// TODO: init function
//TODO: read from db (DONE)
//TODO: come fare "quit" function che salva sul db?


////////////////Init////////////////////



////////////////EDIT MODE////////////////////

let editMode = false
const editModeBtn = document.querySelector('.edit-mode')
editModeBtn.addEventListener('click', () => editMode = !editMode)

//// ToDo CONTROLLER ////

const todoContainer = document.querySelector('.todo-container')

const todoBtn = document.querySelector('.add-todo--btn')
const todoText = document.querySelector('.add-todo--text')


todoBtn.addEventListener('click', (e) => createTodo(e))
todoContainer.addEventListener('click', (e) => handleTodo(e))

//// ToDo VIEW ////

function createTodo(e) {
    console.log(e)
    console.log(e.target)


    // fill the div (model--create-todo)

    const todoEl = document.createElement('div')
    todoEl.classList.add('todo', 'todo-box')
    const html = `
    <input type="text" readonly value="${todoText.value}" class="todo--text">
    <input type="checkbox" name="task-checkbox" id="checkbox">
    <button class="rm-todo">Remove</button>
    `
    todoEl.innerHTML = html

    // append todo to container (view--update-todos)

    todoText.value ? todoContainer.appendChild(todoEl) : alert('insert a todo')
    // other

}





///ToDo Model

function handleTodo(e) {
    // console.log(e);
    console.log(e.target.parentNode);

    const target = e.target

    // Rewrite TD function
    if (target.classList.contains('todo--text') && editMode) {
        target.removeAttribute('readonly')

        target.addEventListener('blur', () => target.setAttribute('readonly', 'true'))
    }
    // Remove TD function
    if (target.classList.contains('rm-todo')) target.parentNode.remove()
    // Check TD function
    if (target.checked) target.previousElementSibling.style.textDecoration = 'line-through'
    if (!target.checked && target.previousElementSibling) target.previousElementSibling.style.textDecoration = 'none'
}


////////////////DATABASE--save///////////

// Link: https://stackoverflow.com/questions/48284207/emit-custom-events-in-electron-app-from-main-to-renderer


const saveBtn = document.querySelector('.db-save')

saveBtn.addEventListener('click', () => {
    const html = todoContainer.innerHTML
    window.todoDB.saveDBtoFile(html)
})

////////////////DATABASE--save-on-quit///////////
// app.on('did-something', () => {
//     console.log('emit-hello')
// });
