/*
===============================================================================
;   Title: ToDo List - 2022
;   Author: Tyler Potts
;   Modified by: Eric McCool
;   Description: A todo list web app stored locally.
;   Works cited: Build a todo list app in HTML, CSS, & JavaScript with local 
;                storage in 2022 | JavaScript for beginners,
;                W3Schools - JS, DOM, HTML, CSS Reference.
===============================================================================
*/

// add an on load event function when the page loads for the first time
// todos is a global variable used throughout all the functions
// with or without 'var' makes it global
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    // querySelector returns the first child element with the (css selector)
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form'); 
    // local storage is a window object that stores key:value pairs in the browser
    const username = localStorage.getItem('username') || '';
    // set the username
    nameInput.value = username;
    // target gets the element that triggered the event (e is the event)
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e=> {
        e.preventDefault();

        // define what a todo object is with an object constructor
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // add the todo to todos JSON object with the push method
        todos.push(todo);
        // convert it into JSON format (key:value) with stringify
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
})
// create the DisplayTodos function
function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = "";
    // create the loop to go through the todos using the todo function
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')
        // assign elements from the DOM as constants
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        // this was commented out in index after the css file was completed
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        // determine if it is business or personal
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }// end if/else
        
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        // label the todo action buttons
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        // append each const to the last child of each html element
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }
        // create the onclick function for the radio button 'done' status
        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            // if checked, add it to done. if unchecked, remove it from done
            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }// end if/else done 

            DisplayTodos();
            
        })// end the on click e function

        // the edit button function passing the e function to this function
        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();

            })// end the on click function passing e as the argument
        })// end the edit button function

        // the delete button function passing the e function to this function
        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })// end the delete button function

    })// end the forEach / else loop and todo function
}// end the display todos function