let todos=[]
function addTodo(){
    const inputElement = document.querySelector("#todo");
    const taskTitle = inputElement.value.trim();
    if (taskTitle === "") {
        alert("Todo cannot be empty");
        return;
    }
    todos.push({
        title: taskTitle
    });
    inputElement.value = "";
    render();
}
function deleteFirstTodo(){
    if(todos.length===0){
        alert("No todos to delete");
        return;
    }
    todos.splice(0,1)
    render();
}
function deleteLastTodo(){
    if(todos.length===0){
        alert("No todos to delete");
        return;
    }
    todos.splice(todos.length-1,1)
    render();
}
function deleteTodo(index){
    todos.splice(index,1)
    render();
}

function editTodo(index){
    const todoElement= document.querySelector(`#todo-${index}`);
    const h1 = todoElement.querySelector("h1");
    
    const newTitle=document.createElement("input");
    newTitle.type= "text";
    newTitle.value=todos[index].title;

    todoElement.replaceChild(newTitle,h1);
    
    const editButton= todoElement.querySelector("#editButton");
    editButton.innerHTML="Save";
    editButton.onclick= () =>saveEdit(index, newTitle);    

}

function saveEdit(index, newTitle){
    const updatedValue = newTitle.value.trim(); // Trim whitespace;
    if (updatedValue === "") {
        alert("Todo cannot be empty");
        return;
    }
    todos[index].title= updatedValue;
    render();
}
function createTodoComponent(todo, index){
    const list= document.createElement("div");
    list.id=`todo-${index}`;
    list.style.display="flex";
    list.style.justifyContent="space-evenly";

    const h1= document.createElement("h1");
    h1.innerHTML = todo.title;
    h1.style.fontFamily="cursive";

    const checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.onchange=()=>{
    if (checkbox.checked){
        h1.style.textDecoration="line-through"
    }
    }

    const editButton = document.createElement("button");
    editButton.innerHTML= "Edit";
    editButton.id="editButton";
    editButton.setAttribute("onclick","editTodo("+index+")");
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML= "Delete"
    console.log(index);
    deleteButton.setAttribute("onclick","deleteTodo("+index+")");
    
    list.appendChild(checkbox);
    list.appendChild(h1);
    list.appendChild(editButton);
    list.appendChild(deleteButton);
   
    return list;
}
function render (){
    const todolistElement=document.querySelector("#todolist");
    todolistElement.innerHTML= "";
    for(let i=0; i<todos.length; i++)
        {
         const element= createTodoComponent(todos[i],i);
         todolistElement.appendChild(element);
    }
}