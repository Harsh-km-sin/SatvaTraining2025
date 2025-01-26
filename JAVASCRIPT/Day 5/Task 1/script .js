document.addEventListener("DOMContentLoaded", () => {

  Swal.fire('Hello, World!');

  const addTodoForm = document.getElementById("addTodoForm");
  const todoTableBody = document.getElementById("todoTableBody");
//   let todoCount = 0;
  let todoToDelete = null;

  const todoTitle = document.getElementById("todoTitle");
  const todoDescription = document.getElementById("todoDescription");

  let editingTodoId = null;

  function fetchTodos() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://dotnet9api.azurewebsites.net/todos", true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const todos = JSON.parse(xhr.responseText);
          todoTableBody.innerHTML = "";

          let serialNumber = 1;
          todos.forEach((todo) => {
            const row = document.createElement("tr");

            const numberCell = document.createElement("td");
            numberCell.textContent = serialNumber++;
            //numberCell.textContent = todo.id;
            row.appendChild(numberCell);

            const titleCell = document.createElement("td");
            titleCell.textContent = todo.title;
            row.appendChild(titleCell);

            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = todo.description;
            row.appendChild(descriptionCell);

            const completedCell = document.createElement("td");
            const toggleButton = document.createElement("button");
            toggleButton.classList.add(
              "btn",
              todo.isCompleted ? "btn-warning" : "btn-success",
              "btn-sm"
            );
            toggleButton.textContent = todo.isCompleted
              ? "Mark as Incomplete"
              : "Mark as Complete";

            toggleButton.onclick = () => {
              const updatedStatus = !todo.isCompleted;
              updateTodoStatus(todo.id, updatedStatus, toggleButton);
            };

            completedCell.appendChild(toggleButton);
            row.appendChild(completedCell);

            const actionsCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("btn", "btn-primary", "btn-sm", "mx-2", 'px-3');
            editButton.onclick = () => {
              openTodoModal(todo);
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("btn", "btn-danger", "btn-sm", "mx-2");
            deleteButton.onclick = () => {
              deleteTodo(todo.id);
            };

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);

            todoTableBody.appendChild(row);
          });
        } else {
          console.error("Error fetching todos:", xhr.statusText);
          showToast("Error fetching todos. Please try again.", "danger");
        }
      }
    };

    xhr.send();
  }

  function updateTodoStatus(todoId, updatedStatus, button) {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH",`https://dotnet9api.azurewebsites.net/todos/${todoId}`,true);
    xhr.setRequestHeader("Content-Type", "application/json");

    const updatedTodo = {
      isCompleted: updatedStatus,
    };

    xhr.onreadystatechange = function () {

      /* 0-> unsent 1-> opened 2-> headers received 3-> loading 4-> sent */
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("Todo status updated successfully:", xhr.responseText);

          fetchTodos();

          button.classList.toggle("btn-success", !updatedStatus);
          button.classList.toggle("btn-warning", updatedStatus);
          button.textContent = updatedStatus
            ? "Mark as Incomplete"
            : "Mark as Complete";

          showToast("Todo status updated successfully!", "success");
        } else {
          console.error("Error updating todo status:", xhr.statusText);
          showToast("Error updating todo status. Please try again.", "danger");
        }
      }
    };

    xhr.send(JSON.stringify(updatedTodo));
  }

  function openTodoModal(todo = null) {
    if (todo) {
      editingTodoId = todo.id;
      document.getElementById("todoTitle").value = todo.title;
      document.getElementById("todoDescription").value = todo.description;
      document.getElementById("addTodoModalLabel").textContent = "Edit Todo";
      document.getElementById("submitButton").textContent = "Save";
      document.getElementById("cancelButton").style.display = "inline-block";
    } else {
      editingTodoId = null;
      document.getElementById("todoTitle").value = "";
      document.getElementById("todoDescription").value = "";
      document.getElementById("addTodoModalLabel").textContent = "Add Todo";
      document.getElementById("submitButton").textContent = "Add";
      document.getElementById("cancelButton").style.display = "none";
    }

    const addTodoModal = new bootstrap.Modal(
      document.getElementById("addTodoModal")
    );
    addTodoModal.show();
    //doubt{
      // const addTodoModal = document.getElementById("addTodoModal");
    // // addTodoModal.classList.add("show");
    // addTodoModal.show();
    }
    
  

  // function deleteTodo(todoId) {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('DELETE', `https://dotnet9api.azurewebsites.net/todos/${todoId}`, true);

  //     xhr.onreadystatechange = function () {
  //         if (xhr.readyState === 4) {
  //             if (xhr.status >= 200 && xhr.status < 300) {
  //                 console.log('Todo deleted successfully:', xhr.responseText);
  //                 fetchTodos();
  //                 showToast('Todo deleted successfully!', 'success');
  //             } else {
  //                 console.error('Error deleting todo:', xhr.statusText);
  //                 showToast('Error deleting todo. Please try again.', 'danger');
  //             }
  //         }
  //     };

  //     xhr.send();
  // }

  function deleteTodo(todoId) {
    todoToDelete = todoId; 
    const deleteConfirmationModal = new bootstrap.Modal(
      document.getElementById("deleteConfirmationModal")
    );
    deleteConfirmationModal.show(); 
  }

  document
    .getElementById("confirmDeleteButton")
    .addEventListener("click", function () {
      if (todoToDelete !== null) {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "DELETE",
          `https://dotnet9api.azurewebsites.net/todos/${todoToDelete}`,
          true
        );

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              console.log("Todo deleted successfully:", xhr.responseText);
              fetchTodos(); 
              showToast("Todo deleted successfully!", "success");
            } else {
              console.error("Error deleting todo:", xhr.statusText);
              showToast("Error deleting todo. Please try again.", "danger");
            }
          }
        };

        xhr.send();
      }

      const deleteConfirmationModal = bootstrap.Modal.getInstance(
        document.getElementById("deleteConfirmationModal")
      );
      deleteConfirmationModal.hide();
    });


  function showToast(message, status) {
    const toastElement = document.createElement("div");
    toastElement.classList.add("toast", `bg-${status}`, "text-white");
    toastElement.style.position = "fixed";
    toastElement.style.top = "10px";
    toastElement.style.right = "10px";
    toastElement.innerHTML = `<div class="toast-body">${message}</div>`;
    document.body.appendChild(toastElement);

    setTimeout(() => {
      toastElement.classList.add("show");
      setTimeout(() => toastElement.remove(), 3000);
    }, 100);
  }

  addTodoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (addTodoForm.checkValidity()) {
      const todoData = {
        title: todoTitle.value.trim(),
        description: todoDescription.value.trim(),
      };

    //   const pattern = /^\S.*/;

    //   if (!pattern.test(description.value)) {
    //     e.preventDefault(); // Prevent form submission
    //     alert("Description cannot start with a space!");
    //     description.focus();
    // }

      const url = editingTodoId
        ? `https://dotnet9api.azurewebsites.net/todos/${editingTodoId}`
        : "https://dotnet9api.azurewebsites.net/todos";

      const method = editingTodoId ? "PATCH" : "POST";

      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(
              `Todo ${editingTodoId ? "updated" : "added"} successfully:`,
              xhr.responseText
            );
            showToast(
              `Todo ${editingTodoId ? "updated" : "added"} successfully!`,
              "success"
            );

            fetchTodos();

            addTodoForm.reset();
            addTodoForm.classList.remove("was-validated");
            const modal = bootstrap.Modal.getInstance(
              document.getElementById("addTodoModal")
            );
            modal.hide();
          } else {
            console.error("Error adding/editing todo:", xhr.statusText);
            showToast("Error adding/editing todo. Please try again.", "danger");
          }
        }
      };

      xhr.send(JSON.stringify(todoData));
    } else {
      addTodoForm.classList.add("was-validated");
    }
  });
  fetchTodos();
});
