"use strict";

window.addEventListener("load", () => {
  const projectName = document.querySelector("#project-name");
  const form = document.querySelector("#new-todo__form");
  const input = document.querySelector("#new-todo__input");
  const dateInput = document.querySelector("#new-todo__due-date");
  const formSelect = document.querySelector("#form-select");
  const todoContainer = document.querySelector("#todo-items__container");
  const inProgressContainer = document.querySelector(
    "#in-progress-items__container"
  );
  const completeContainer = document.querySelector(
    "#complete-items__container"
  );

  // When the project name is changed, add the name of the project to localStorage
  projectName.addEventListener("input", function () {
    localStorage.setItem("projectName", projectName.textContent);
  });

  // Pull the project name from localStorage and disply it in the h1
  const savedProjectName = localStorage.getItem("projectName");
  projectName.textContent = savedProjectName;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = input.value;
    const todo_el = document.createElement("div");
    todo_el.id = "todo_el";
    const todo_content = document.createElement("div");

    // Each todo item is assigned a unique date key when set in localStorage
    const key = Date.now();

    const dateValue = dateInput.value;
    const dateObj = new Date(dateValue);

    const locale = navigator.language;
    const options = {
      dateStyle: "short",
    };
    const formattedDate = dateObj.toLocaleDateString(locale, options);

    // Each value in LS is set to an object with a todo property whose value is the value of the todo input, a container property whose default value is 'default' and an isChecked property whose default value is false
    const value = {
      todo: todo,
      container: "default",
      isChecked: false,
      dueDate: formattedDate,
    };

    const date = dateInput.value;
    //console.log(date);

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";

    todo_content.appendChild(checkboxInput);

    const todo_input = document.createElement("input");
    todo_input.id = "todo-input";
    todo_input.type = "text";
    todo_input.value = todo;
    todo_input.setAttribute("readonly", "readonly");

    todo_content.appendChild(todo_input);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    editBtn.innerText = "EDIT";
    deleteBtn.innerHTML = "&times;";

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
    todo_content.appendChild(selectInput);
    todo_content.appendChild(deleteBtn);

    todo_el.appendChild(todo_content);

    // SELECT INPUT (on each todo item)
    selectInput.addEventListener("change", function () {
      if (selectInput.selectedIndex === 1) {
        todoContainer.appendChild(todo_el);
        todo_el.style.backgroundColor = "#cc0000";
        checkboxInput.checked = false;
        todo_input.style.textDecoration = "none";
        lsObj.container = "todoContainer";
        lsObj.isChecked = false;
        localStorage.setItem(key, JSON.stringify(lsObj));
      } else if (selectInput.selectedIndex === 2) {
        inProgressContainer.appendChild(todo_el);
        todo_el.style.backgroundColor = "#ffd800";
        checkboxInput.checked = false;
        todo_input.style.textDecoration = "none";
        lsObj.container = "inProgressContainer";
        lsObj.isChecked = false;
        localStorage.setItem(key, JSON.stringify(lsObj));
      } else if (selectInput.selectedIndex === 3) {
        completeContainer.appendChild(todo_el);
        todo_el.style.backgroundColor = "green";
        checkboxInput.checked = true;
        todo_input.style.textDecoration = "line-through";
        lsObj.container = "completeContainer";
        lsObj.isChecked = true;
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

    // If the todo input is not defined or the 'Select' option is selected when the 'Add Task' button is clicked, return. Else, add the todo to localStorage
    if (!todo || formSelect.options[formSelect.selectedIndex].value === "1") {
      return;
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }

    const lsObj = JSON.parse(localStorage.getItem(key));

    // If the checkbox is checked, apply a line-through to the todo text and set isChecked to true. If not, remove it and set isChecked to false.
    checkboxInput.addEventListener("change", function () {
      if (checkboxInput.checked) {
        completeContainer.appendChild(todo_el);
        todo_input.style.textDecoration = "line-through";
        todo_el.style.backgroundColor = "green";
        selectInput.selectedIndex = 3;
        lsObj.container = "completeContainer";
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
      todo_el.style.backgroundColor = "#cc0000";
      checkboxInput.checked = false;
      lsObj.container = "todoContainer";
      lsObj.isChecked = false;
      localStorage.setItem(key, JSON.stringify(lsObj));
    } else if (formSelect.options[formSelect.selectedIndex].value === "3") {
      inProgressContainer.appendChild(todo_el);
      todo_el.style.backgroundColor = "#ffd800";
      checkboxInput.checked = false;
      lsObj.container = "inProgressContainer";
      lsObj.isChecked = false;
      localStorage.setItem(key, JSON.stringify(lsObj));
    } else if (formSelect.options[formSelect.selectedIndex].value === "4") {
      completeContainer.appendChild(todo_el);
      todo_el.style.backgroundColor = "green";
      checkboxInput.checked = true;
      todo_input.style.textDecoration = "line-through";
      lsObj.container = "completeContainer";
      lsObj.isChecked = true;
      localStorage.setItem(key, JSON.stringify(lsObj));
    }

    // Set the selected value of each todo's select input to match the container it is initially placed in
    if (lsObj.container === "todoContainer") {
      selectInput.selectedIndex = 1;
      checkboxInput.checked = false;
    } else if (lsObj.container === "inProgressContainer") {
      selectInput.selectedIndex = 2;
      checkboxInput.checked = false;
    } else if (lsObj.container === "completeContainer") {
      selectInput.selectedIndex = 3;
      checkboxInput.checked = true;
    }

    const currentDate = new Date();
    const dueDate = new Date(dateValue);

    const dueDateEl = document.createElement("div");
    const daysLeft = document.createElement("div");

    const timeDiff = Math.abs(dueDate - currentDate);
    const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      //alert("Due today");
      dueDateEl.textContent = `${dueDate}`;
      daysLeft.textContent = `Due today`;
    } else {
      alert(`${diffDays} days left`);
    }

    if (date) {
      todo_el.appendChild(dueDateEl);
      todo_el.appendChild(daysLeft);
    }

    // Clear input after submit
    input.value = "";
  });

  // Loop over localstorage and create a todo item for each todo that has been saved
  for (let i = 0; i < localStorage.length; i++) {
    const lsKey = localStorage.key(i);

    // Exclude the key "projectName" when looping over localStorage
    if (lsKey !== "projectName") {
      const lsValue = JSON.parse(localStorage.getItem(lsKey));

      const savedCheckbox = document.createElement("input");
      savedCheckbox.type = "checkbox";
      savedCheckbox.id = "checkbox";

      const savedTodoEl = document.createElement("div");
      savedTodoEl.id = "todo_el";
      const savedTodoContent = document.createElement("div");
      const savedTodoInput = document.createElement("input");
      savedTodoInput.type = "text";
      savedTodoInput.id = "todo-input";
      savedTodoInput.value = lsValue.todo;
      savedTodoInput.setAttribute("readonly", "readonly");

      const savedTodoEdit = document.createElement("button");
      savedTodoEdit.classList.add("edit-btn");
      savedTodoEdit.innerText = "EDIT";
      const savedTodoDelete = document.createElement("button");
      savedTodoDelete.classList.add("delete-btn");
      savedTodoDelete.innerHTML = "&times;";

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

      // EDIT BUTTON(for todo items that persist after page refresh)
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

      // DELETE BUTTON(for todo items that persist after page refresh)
      savedTodoDelete.addEventListener("click", function () {
        savedTodoEl.parentNode.removeChild(savedTodoEl);
        localStorage.removeItem(lsKey);
      });

      // If the checkbox is checked in localStorage, render it and apply a line-through to the todo text. If not, uncheck and remove the line-through.
      if (lsValue.isChecked) {
        savedCheckbox.checked = true;
        savedTodoInput.style.textDecoration = "line-through";
      } else {
        savedCheckbox.checked = false;
        savedTodoInput.style.textDecoration = "none";
      }

      savedCheckbox.addEventListener("change", function () {
        if (savedCheckbox.checked) {
          completeContainer.appendChild(savedTodoEl);
          savedTodoEl.style.backgroundColor = "green";
          savedTodoInput.style.textDecoration = "line-through";
          savedSelectInput.selectedIndex = 3;
          lsValue.isChecked = true;
          lsValue.container = "completeContainer";
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
      savedTodoContent.appendChild(savedSelectInput);
      savedTodoContent.appendChild(savedTodoDelete);

      savedTodoEl.appendChild(savedTodoContent);

      if (lsValue.container === "todoContainer") {
        todoContainer.appendChild(savedTodoEl);
        savedTodoEl.style.backgroundColor = "#cc0000";
        savedTodoInput.style.textDecoration = "none";
        lsValue.isChecked = false;
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      } else if (lsValue.container === "inProgressContainer") {
        inProgressContainer.appendChild(savedTodoEl);
        savedTodoEl.style.backgroundColor = "#ffd800";
        savedTodoInput.style.textDecoration = "none";
        lsValue.isChecked = false;
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      } else if (lsValue.container === "completeContainer") {
        completeContainer.appendChild(savedTodoEl);
        savedTodoEl.style.backgroundColor = "green";
        localStorage.setItem(lsKey, JSON.stringify(lsValue));
      }

      savedSelectInput.addEventListener("change", function () {
        if (savedSelectInput.selectedIndex === 1) {
          todoContainer.appendChild(savedTodoEl);
          savedTodoEl.style.backgroundColor = "#cc0000";
          savedTodoInput.style.textDecoration = "none";
          savedCheckbox.checked = false;
          lsValue.container = "todoContainer";
          lsValue.isChecked = false;
          localStorage.setItem(lsKey, JSON.stringify(lsValue));
        } else if (savedSelectInput.selectedIndex === 2) {
          inProgressContainer.appendChild(savedTodoEl);
          savedTodoEl.style.backgroundColor = "#ffd800";
          savedTodoInput.style.textDecoration = "none";
          savedCheckbox.checked = false;
          lsValue.container = "inProgressContainer";
          lsValue.isChecked = false;
          localStorage.setItem(lsKey, JSON.stringify(lsValue));
        } else if (savedSelectInput.selectedIndex === 3) {
          completeContainer.appendChild(savedTodoEl);
          savedTodoEl.style.backgroundColor = "green";
          savedTodoInput.style.textDecoration = "line-through";
          savedCheckbox.checked = true;
          lsValue.container = "completeContainer";
          lsValue.isChecked = true;
          localStorage.setItem(lsKey, JSON.stringify(lsValue));
        }
      });

      // Set the selected value of each todo's select input to match the container it is currently in
      if (lsValue.container === "todoContainer") {
        savedSelectInput.selectedIndex = 1;
      } else if (lsValue.container === "inProgressContainer") {
        savedSelectInput.selectedIndex = 2;
      } else if (lsValue.container === "completeContainer") {
        savedSelectInput.selectedIndex = 3;
      }
    }
  }
});
