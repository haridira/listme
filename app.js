
// (function () {

// == MODEL SECTION ==

// === Model Section: Initial Data ===

// some constants
const STATUS_TEXT = '-- Updates --';
const HEADER1_TEXT = 'To-Do';
const HEADER2_TEXT = 'Due Date';
const HEADER3_TEXT = 'Remove';

// declare and initialize our default TODOS list
const TODOS = [{
    title: 'Better Call Saul with GF',
    dueDate: '2022-10-03',
    id: 'id001'
}, {
    title: 'Groceries from the Dollar Store',
    dueDate: '2022-01-24',
    id: 'id002'
}, {
    title: 'Salsa practice',
    dueDate: '2022-06-03',
    id: 'id003'
}];

// initialize (but do not declare yet) our todos
let todos;

// update status category
const statusCats = ['description', 'add', 'delete', 'reset', 'clear'];
const statusSelected = statusCats[0];

// === Reset Data ===

function resetTodos() {
    todos = TODOS;

    saveTodos();
}

// === Clear List ===

function clearList() {
    todos = [];

    saveTodos();
}

// === Create Data ===

function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();            // create and fill the id field for this new entry (for now assign it to a temporary variable called id, and THEN we assign that to todos.id)

    // push those values we fetched to the todos object
    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });

    saveTodos();
}

// === Delete Data ===

function removeTodo(idToDelete) {
    /*
    // done the suggested way I found online
        todos = todos.filter(function(todo) {
            // if the of the todo item maches the id of the HTML elemenet ..
            if (todo.id === idToDelete) {
                return false;
            } else {
                return true;
            }
        });
    */

    // below is how I opted to do it
    todos = todos.filter(item => {
        return item.id !== idToDelete;
    });

    saveTodos();
}

// === Save and Retreive Data===

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


function loadTodos() {
    // load the saved JSON file and convert it back into an object
    // do not update the todos yet, however - for now just save it to a variable
    const savedTodos = JSON.parse(localStorage.getItem('todos'));

    // check the loaded saved object whether it is indeed an array before updating the data: todos
    if (Array.isArray(savedTodos)) {
        todos = savedTodos;
    } else {
        todos = TODOS;
    }
}

// == VIEW SECTION ==

render();                                                           // render at the start


// the add-button
const addButton = document.getElementById('add-button');
const BUTTON_TEXT = 'Add To-Do';                                    // create a JS variable for the button text and fill the button with it
addButton.innerText = BUTTON_TEXT;

// the status bar
const statusBar = document.getElementById('status-bar');
statusBar.innerText = STATUS_TEXT;

// === The Render function, which includes creating new divs ===
// create the divs and fill them (this function is for display purposes and not actually updating any variables)
function render() {
    document.getElementById('table').innerHTML = '';                // reset the list content div


    tableHead = document.createElement('thead');                    // the first row section (that's why we do it BEFORE the loop)
    firstRow = document.createElement('tr');
    
    header1 = document.createElement('th');
    header1.className = "thead";
    header1.innerText = HEADER1_TEXT;
    header1.style = "width: 65%";
    firstRow.appendChild(header1);

    header2 = document.createElement('th');
    header2.className = "thead";
    header2.innerText = HEADER2_TEXT;
    header2.style = "width: 17%";
    firstRow.appendChild(header2);

    header3 = document.createElement('th');
    header3.className = "thead";
    header3.innerText = HEADER3_TEXT;
    header3.style = "width: 18%";
    firstRow.appendChild(header3);

    const todoList = document.getElementById('table');
    todoList.appendChild(firstRow);

    loadTodos();
    todos.forEach(todo => {                                         // traverse through the list to create and fill the divs
        
        row = document.createElement('tr');                         // create a new row

        const col1 = document.createElement('td');                  // create a col-1 cell
        col1.className = "tcell";
        row.appendChild(col1);
        col1.innerText = todo.title;                                // todo title in cell
        
        const col2 = document.createElement('td');                  // col-2 cell
        col2.className = "tcell";
        row.appendChild(col2);
        col2.innerText = todo.dueDate;                              // due date in cell

        const col3 = document.createElement('td');                  // col-3 cell for the delete button
        col3.className = "tcell";
        row.appendChild(col3);

        const deleteButton = document.createElement('button');      // create the delete button
        deleteButton.innerText = 'Delete';                          // .. and fill it with text
        deleteButton.className = "button";                          // assign to button class
        //deleteButton.style = 'margin-left: 12px';                 // .. give it some padding (left margin) (COMMENTED OUT because I'm now using table format)
        deleteButton.onclick = deleteToDo;                          // assign the onClick function to the Delete button
        deleteButton.id = todo.id;                                  // assign the delete button its id (we have already added an id in the database - now time to assign the same to the button HTML id so the two can be linked together this way)
        col3.appendChild(deleteButton);                             // add the button to the cell div

        const todoList = document.getElementById('table');
        todoList.appendChild(row);                                  // append the row to the table
    })
}

// shortly display short-lived update
// this is the last timer
let lastStatusUpdateTimer = null;
function displayShortLivedUpdate(statusSelected, titleAdded) {
    if (lastStatusUpdateTimer) 
        clearTimeout(lastStatusUpdateTimer);

    updateStatus(statusSelected, titleAdded);

    lastStatusUpdateTimer = setTimeout(() => {
        updateStatus(statusCats[0], titleAdded); 
     }, 5000);
}

// update status bar based on selected status
function updateStatus(statusSelected, titleAdded) {
    if (statusSelected === statusCats[0]) {                 // default (display "Updates" in the field)
        statusBar.innerText = STATUS_TEXT;
    } else if (statusSelected === statusCats[1]) {          // add
        statusBar.innerText = `"${titleAdded}" added!`;
    } else if (statusSelected === statusCats[2]) {          // delete
        statusBar.innerText = `"${titleAdded}" deleted!`;
    } else if (statusSelected === statusCats[3]) {          // reset
        statusBar.innerText = 'To-do list reset to original samples!';
    } else if (statusSelected === statusCats[4]) {          // clear
        statusBar.innerText = 'To-do list cleared!';
    } else {                                                // exception
        statusBar.innerText = 'Unexpected!';
    }
}

function clearTextBox() {
    const textbox = document.getElementById('todo-title');
    textbox.value = '';
}

// == CONTROLLER SECTION ==

// the reset function
function resetOnClick() {
    resetTodos();
    render();

    displayShortLivedUpdate(statusCats[3]);
}

// the clear function
function clearOnClick() {
    clearList();
    render();

    displayShortLivedUpdate(statusCats[4]);
}

// the add function
function addToDo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;                // get the item name from the input text box
    
    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;           // get the date from the date input field

    createTodo(title, dueDate);

    render();                                   // after we have already applied all the changes we want to the database, we "render" to update the view
    console.log(`${title} added!`);             // update in console
    displayShortLivedUpdate(statusCats[1], title);

    clearTextBox();
}

// delete button function
function deleteToDo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    console.log(`Entry with ID # ${idToDelete} deleted!`);                         // for testing only and can be safely deleted any time

    // get the element that HAS BEEN deleted and save it into a variable; we're doing this to use it in notifications
    let deletedTodo = todos.filter(item => {
        return item.id === idToDelete;
    });
    console.log(`"${deletedTodo[0].title}" deleted!`);                              // for testing only and can be safely deleted any time
    displayShortLivedUpdate(statusCats[2], deletedTodo[0].title);

    removeTodo(idToDelete);

    // after we have returned only the "true" values through the filter (i.e. not deleted) and thus updated our todos list, we render the list again
    render();

    clearTextBox();
}

// })();