const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(e)
{
    //Prevent from submit
    e.preventDefault();
    //div make
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    saveLocalTodos(todoInput.value);
    //Check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    //Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(e)
{
    const item = e.target;
    //delete todo
    if(item.classList[0] === "trash-btn")
    {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function()
        {
            todo.remove();
        });
    }

    //check 
    if(item.classList[0] === "check-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e)
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo)
{
    //Check if todos are saved allready
    let todos;
    if (localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos()
{
    //Check if todos are saved allready
    let todos;
    if (localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo)
    {
        //div make
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton);
        //Trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo)
{
    //Check if todos are saved allready
    let todos;
    if (localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //remove the local todos from storage
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

