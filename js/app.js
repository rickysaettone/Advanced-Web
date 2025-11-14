document.getElementById("task-form").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("task-input");
  if (input.value.trim() === "") {
    alert("Task cannot be empty!");
    return;
  }
  const li = document.createElement("li");
  li.textContent = input.value;
  li.addEventListener("click", () => li.classList.toggle("completed"));
  document.getElementById("task-list").appendChild(li);
  input.value = "";
});

