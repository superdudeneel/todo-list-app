function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    const ul = document.querySelector('#taskList');

    if (taskText === "") return;
  
    const li = document.createElement("li");
    li.textContent = taskText;
    ul.append(li);
    li.setAttribute('class', 'list-items');
    li.setAttribute('draggable', 'true');
    

    li.addEventListener("click", () => {
      li.classList.toggle("done");
    });
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => li.remove();
  
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
    input.value = "";
  }



  const list = document.querySelector('#taskList');
  let draggingItem = null;

  list.addEventListener('dragstart', (e) => {
    draggingItem = e.target;
    e.target.setAttribute('class', 'dragging');

  });

  list.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.list-items').forEach(item => item.classList.remove('over'));
    draggingItem = null;
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingOverItem = getDragAfterElement(list, e.clientY);

    // Remove .over from all items
    document.querySelectorAll('.list-items').forEach(item => item.classList.remove('over'));

    if (draggingOverItem) {
      draggingOverItem.setAttribute('class', 'over'); // Add .over to the hovered item
      list.insertBefore(draggingItem, draggingOverItem);
    } else {
      list.appendChild(draggingItem); // Append to the end if no item below
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.list-items:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }


  
