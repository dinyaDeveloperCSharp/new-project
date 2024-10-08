const addTaskForm = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const tasksContainer = document.getElementById("tasks");
const taskTemplate = document.getElementById("taskTemplate");

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskText = taskInput.value;
  if (taskText.trim() === "") return;

  const newTask = taskTemplate.content.cloneNode(true);
  newTask.querySelector(".taskText").textContent = taskText;

  const deleteBtn = newTask.querySelector(".deleteTask");
  deleteBtn.addEventListener("click", () => {
    tasksContainer.removeChild(deleteBtn.parentElement);
  });

  const taskTextElement = newTask.querySelector(".taskText");
  const check = newTask.querySelector(".checkbox");
  check.addEventListener("change", () => {
    if (check.checked) {
      taskTextElement.style.textDecoration = "line-through";
    } else {
      taskTextElement.style.textDecoration = "none";
    }
  });

  tasksContainer.appendChild(newTask);
  taskInput.value = "";

  const token = localStorage.getItem("JWT");

  addTaskToDatabase(taskText, "incomplete", token);
});

async function addTaskToDatabase(title, status, token) {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/tasks",
      {
        title: title,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      console.log("Task added to the database");
    } else {
      console.log("Failed to add task to the database");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
}
