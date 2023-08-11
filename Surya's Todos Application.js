let todoItemsContainer = document.getElementById("todoItemsContainer");
let Add_button = document.getElementById("addtodo");
let save_todo_but_element = document.getElementById("savetodos");
//getting local storage todos and parsing todos
function getTodoListFromLocalStorage() {
    let stringified_todo = localStorage.getItem("List");
    let parsed_todo = JSON.parse(stringified_todo);
    if (parsed_todo === null) {
        return [];

    } else {
        return parsed_todo;
    }
}
let todo_text_list = getTodoListFromLocalStorage();
//declaring todo_text_list_elements 
let len = todo_text_list.length;
//saving todos in local storage
save_todo_but_element.onclick = function() {
    localStorage.setItem("List", JSON.stringify(todo_text_list));
};

function OnTodoStatusChange(unique_id_element, label_id_element, todo_id) {
    let check = document.getElementById(unique_id_element);
    let label = document.getElementById(label_id_element);
    /*
    if (check.checked === true) {
        label.classList.add("line");
    } else {
        label.classList.remove("line");
    }*/

    // toggele dom
    label.classList.toggle("line");

    let todo_object_index = todo_text_list.findIndex(function(each_item) {
        let each_todo_id = "todo" + each_item.unique_no;
        if (each_todo_id === todo_id) {
            return true;

        } else {
            return false;
        }
    });
    let todoObject = todo_text_list[todo_object_index];

    if (todoObject.is_Checked === true) {
        todoObject.is_Checked = false;
    } else {
        todoObject.is_Checked = true;
    }
}

function deleteTodoItem(todo_id) {
    let delete_todo = document.getElementById(todo_id);
    todoItemsContainer.removeChild(delete_todo);
    //deleting a todoo and find index of the todoo
    let todo_index_num = todo_text_list.findIndex(function(each_todo) {
        let todo_index = "todo" + each_todo.unique_no;
        if (todo_index === todo_id) {
            return true;
        } else {
            return false;
        }
    });
    todo_text_list.splice(todo_index_num, 1);
}

function create_and_add_todo(todo) {
    //create a unique input id 
    let unique_id_element = "checkbox" + todo.unique_no;
    //create a label element id
    let label_id_element = "label" + todo.unique_no;
    //create a todoo id 
    let todo_id = "todo" + todo.unique_no;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    //todoo id
    todoElement.id = todo_id;
    todoItemsContainer.appendChild(todoElement);
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    // input id
    inputElement.id = unique_id_element;
    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.is_Checked;
    //function onclick line
    inputElement.onclick = function() {
        OnTodoStatusChange(unique_id_element, label_id_element, todo_id);
    };
    /// 
    todoElement.appendChild(inputElement);
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    // label id 
    labelElement.id = label_id_element;

    labelElement.setAttribute("for", unique_id_element);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.is_Checked === true) {
        labelElement.classList.add("line");
    }
    labelContainer.appendChild(labelElement);
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    //function delete todoo
    deleteIcon.onclick = function() {
        deleteTodoItem(todo_id);
    };
    /// 
    deleteIconContainer.appendChild(deleteIcon);
}
for (let todo of todo_text_list) {
    create_and_add_todo(todo);
}

function Add_Todo() {
    let user_input = document.getElementById("todoUserInput");
    let user_goal = user_input.value;
    if (user_goal === "") {
        alert("Enter a Required Goal first");
        return;
    }
    len = len + 1;
    let new_todo = {
        text: user_goal,
        unique_no: len,
        is_Checked: false
    };
    todo_text_list.push(new_todo);
    //calling a main function
    create_and_add_todo(new_todo);
    user_input.value = "";
}
Add_button.onclick = function() {
    Add_Todo();
};