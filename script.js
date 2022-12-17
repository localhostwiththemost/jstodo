window.addEventListener("load", () => {
  const form = document.querySelector("#new-todo__form");
  const input = document.querySelector("#new-todo__input");
  const formSelect = document.querySelector("#form-select");
  const todoContainer = document.querySelector("#todo-items__container");
  const inProgressContainer = document.querySelector(
    "#in-progress-items__container"
  );
  const completeContainer = document.querySelector(
    "#complete-items__container"
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = input.value;
    const todo_el = document.createElement("div");
    todo_el.id = "todo_el";
    const todo_content = document.createElement("div");

    // Each todo item is assigned a unique date key when set in localStorage
    const key = Date.now();

    // Each value in LS is set to an object with a todo property whose value is the value of the todo input, a container property whose default value is 'todoContainer' and an isChecked property whose default value is false
    const value = {
      todo: todo,
      container: "todoContainer",
      isChecked: false,
    };

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";

    todo_content.appendChild(checkboxInput);

    const todo_input = document.createElement("input");
    todo_input.type = "text";
    todo_input.value = todo;
    todo_input.setAttribute("readonly", "readonly");

    todo_content.appendChild(todo_input);

    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.innerText = "EDIT";
    deleteBtn.innerText = "DELETE";

    const selectInput = document.createElement("select");
    selectInput.id = "select-input";

    const option1 = document.createElement("option");
    option1.value = "1";
    option1.text = "Status";

    const option2 = document.createElement("option");
    option2.value = "2";
    option2.text = "Todo";

    const option3 = document.createElement("option");
    option3.value = "3";
    option3.text = "In Progress";

    const option4 = document.createElement("option");
    option4.value = "4";
    option4.text = "Complete";

    selectInput.appendChild(option1);
    selectInput.appendChild(option2);
    selectInput.appendChild(option3);
    selectInput.appendChild(option4);

    todo_content.appendChild(editBtn);
    todo_content.appendChild(deleteBtn);
    todo_content.appendChild(selectInput);

    todo_el.appendChild(todo_content);

    // SELECT INPUT (on each todo item)
    selectInput.addEventListener("change", function () {
      if (selectInput.selectedIndex === 1) {
        todoContainer.appendChild(todo_el);
        lsObj.container = "todoContainer";
        localStorage.setItem(key, JSON.stringify(lsObj));
      } else if (selectInput.selectedIndex === 2) {
        inProgressContainer.appendChild(todo_el);
        lsObj.container = "inProgressContainer";
        localStorage.setItem(key, JSON.stringify(lsObj));
      } else if (selectInput.selectedIndex === 3) {
        completeContainer.appendChild(todo_el);
        lsObj.container = "completeContainer";
        localStorage.setItem(key, JSON.stringify(lsObj));
      }
    });

    // EDIT BUTTON
    editBtn.addEventListener("click", function () {
      if (editBtn.innerText.toLowerCase() === "edit") {
        editBtn.innerText = "SAVE";
        todo_input.removeAttribute("readonly");
        todo_input.focus();
      } else {
        editBtn.innerText = "EDIT";
        todo_input.setAttribute("readonly", "readonly");
      }
    });

    // When the value of the todo item is changed, set its value in localStorage
    todo_input.addEventListener("change", (e) => {
      const lsObj = JSON.parse(localStorage.getItem(key));
      lsObj.todo = e.target.value;
      localStorage.setItem(key, JSON.stringify(lsObj));
    });

    // DELETE BUTTON
    deleteBtn.addEventListener("click", function () {
      if (todoContainer.contains(todo_el)) {
        todoContainer.removeChild(todo_el);
        localStorage.removeItem(key);
      } else if (inProgressContainer.contains(todo_el)) {
        inProgressContainer.removeChild(todo_el);
        localStorage.removeItem(key);
      } else if (completeContainer.contains(todo_el)) {
        completeContainer.removeChild(todo_el);
        localStorage.removeItem(key);
      }
    });

    if (!todo) {
      return;
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }

    const lsObj = JSON.parse(localStorage.getItem(key));

    // If the checkbox is checked, apply a line-through to the todo text and set isChecked to true. If not, remove it and set isChecked to false.
    checkboxInput.addEventListener("change", function () {
      if (checkboxInput.checked) {
        todo_input.style.textDecoration = "line-through";
        lsObj.isChecked = true;
        localStorage.setItem(key, JSON.stringify(lsObj));
      } else {
        todo_input.style.textDecoration = "none";
        lsObj.isChecked = false;
        localStorage.setItem(key, JSON.stringify(lsObj));
      }
    });

    // if the todo input value is defined add the todo element to the appropriate container
    if (!todo) {
      alert("Task must not be empty");
    } else if (formSelect.options[formSelect.selectedIndex].value === "2") {
      todoContainer.appendChild(todo_el);
      lsObj.container = "todoContainer";
      localStorage.setItem(key, JSON.stringify(lsObj));
    } else if (formSelect.options[formSelect.selectedIndex].value === "3") {
      inProgressContainer.appendChild(todo_el);
      lsObj.container = "inProgressContainer";
      localStorage.setItem(key, JSON.stringify(lsObj));
    } else if (formSelect.options[formSelect.selectedIndex].value === "4") {
      completeContainer.appendChild(todo_el);
      lsObj.container = "completeContainer";
      localStorage.setItem(key, JSON.stringify(lsObj));
    }
  });

  // Loop over localstorage and create a todo item for each todo that has been saved
  for (let i = 0; i < localStorage.length; i++) {
    const lsKey = localStorage.key(i);
    const lsValue = JSON.parse(localStorage.getItem(lsKey));

    const savedCheckbox = document.createElement("input");
    savedCheckbox.type = "checkbox";

    const savedTodoEl = document.createElement("div");
    const savedTodoContent = document.createElement("div");
    const savedTodoInput = document.createElement("input");
    savedTodoInput.type = "text";
    savedTodoInput.value = lsValue.todo;
    savedTodoInput.setAttribute("readonly", "readonly");

    const savedTodoEdit = document.createElement("button");
    savedTodoEdit.innerText = "EDIT";
    const savedTodoDelete = document.createElement("button");
    savedTodoDelete.innerText = "DELETE";

    const savedSelectInput = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value = "1";
    option1.text = "Status";

    const option2 = document.createElement("option");
    option2.value = "2";
    option2.text = "Todo";

    const option3 = document.createElement("option");
    option3.value = "3";
    option3.text = "In Progress";

    const option4 = document.createElement("option");
    option4.value = "4";
    option4.text = "Complete";

    savedSelectInput.appendChild(option1);
    savedSelectInput.appendChild(option2);
    savedSelectInput.appendChild(option3);
    savedSelectInput.appendChild(option4);

    savedTodoEdit.addEventListener("click", function () {
      if (savedTodoEdit.innerText.toLowerCase() === "edit") {
        savedTodoEdit.innerText = "SAVE";
        savedTodoInput.removeAttribute("readonly");
        savedTodoInput.focus();
      } else {
        savedTodoEdit.innerText = "EDIT";
        savedTodoInput.setAttribute("readonly", "readonly");
      }
    });

    savedTodoInput.addEventListener("change", (e) => {
      lsValue.todo = e.target.value;
      localStorage.setItem(lsKey, JSON.stringify(lsValue));
    });

    savedTodoDelete.addEventListener("click", function () {
      savedTodoEl.parentNode.removeChild(savedTodoEl);
      localStorage.removeItem(lsKey);
    });

    // If the checkbox is checked in localStorage, render it and apply a line-through to the todo text. If not, uncheck and remove the line-through.
    if (lsValue.isChecked) {
      savedCheckbox.checked = true;
      savedTodoInput.style.textDecoration = "line-through";
    }

    savedCheckbox.addEventListener("change", function () {
      if (savedCheckbox.checked) {
        savedTodoInput.style.textDecoration = "line-through";
        lsValue.isChecked = true;
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      } else {
        savedTodoInput.style.textDecoration = "none";
        lsValue.isChecked = false;
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      }
    });

    savedTodoContent.appendChild(savedCheckbox);
    savedTodoContent.appendChild(savedTodoInput);
    savedTodoContent.appendChild(savedTodoEdit);
    savedTodoContent.appendChild(savedTodoDelete);
    savedTodoContent.appendChild(savedSelectInput);

    savedTodoEl.appendChild(savedTodoContent);

    if (lsValue.container === "todoContainer") {
      todoContainer.appendChild(savedTodoEl);
    } else if (lsValue.container === "inProgressContainer") {
      inProgressContainer.appendChild(savedTodoEl);
    } else if (lsValue.container === "completeContainer") {
      completeContainer.appendChild(savedTodoEl);
    }

    savedSelectInput.addEventListener("change", function () {
      if (savedSelectInput.selectedIndex === 1) {
        todoContainer.appendChild(savedTodoEl);
        lsValue.container = "todoContainer";
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      } else if (savedSelectInput.selectedIndex === 2) {
        inProgressContainer.appendChild(savedTodoEl);
        lsValue.container = "inProgressContainer";
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      } else if (savedSelectInput.selectedIndex === 3) {
        completeContainer.appendChild(savedTodoEl);
        lsValue.container = "completeContainer";
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      }
    });
  }
});
