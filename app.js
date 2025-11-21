const API_URL = "http://localhost:3000/tasks";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Obtener tareas (GET)
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="deleteTask(${task.id})">X</button>
        `;
        taskList.appendChild(li);
    });
}

// Agregar nueva tarea (POST)
async function addTask() {
    const title = taskInput.value.trim();
    if (!title) return alert("Escribe una tarea");

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    taskInput.value = "";
    loadTasks();
}

// Eliminar tarea (DELETE)
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    loadTasks();
}

addBtn.addEventListener("click", addTask);

// Cargar tareas al iniciar
loadTasks();
