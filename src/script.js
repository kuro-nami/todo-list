const inputField = document.querySelector("#input-box");
const addButton = document.querySelector("#add-button");
const ul = document.querySelector("ul");

addButton.onclick = createTask;

// Add event listener to input field for 'Enter' key
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    createTask(); // Call the createTask function
  }
});

function createTask() {
  if (inputField.value === "") {
    alert("Enter a valid task bro!😩");
  } else {
    const task = {
      text: inputField.value,
      checked: false,
    };
    addTaskToDOM(task);
    saveData();
    inputField.value = "";
  }
}

function addTaskToDOM(task) {
  // Creating li element and appending to ul
  const liCreated = document.createElement("li");
  liCreated.className = "my-4 the-ul-li";
  ul.appendChild(liCreated);

  // Creating the div and appending to li
  const divCreated = document.createElement("div");
  divCreated.className = "flex items-center justify-between";
  liCreated.appendChild(divCreated);

  // Creating the span and appending to div
  const spanCreated = document.createElement("span");
  spanCreated.className = "flex items-center gap-2";
  divCreated.appendChild(spanCreated);

  // Creating the circle icon
  const circleCreated = document.createElement("img");
  circleCreated.src = "./src/assets/circle-mark.svg";
  circleCreated.className = "w-6 cursor-pointer hover:opacity-60";
  spanCreated.appendChild(circleCreated);

  // Creating the checked icon
  const checkCreated = document.createElement("img");
  checkCreated.src = "./src/assets/check-mark.svg";
  checkCreated.className = "w-6 cursor-pointer hover:opacity-60 hidden";
  spanCreated.appendChild(checkCreated);

  // Creating the task text
  const h1Created = document.createElement("h1");
  h1Created.className = "text-xl";
  h1Created.textContent = task.text;
  spanCreated.appendChild(h1Created);

  // Set the checked state if true
  if (task.checked) {
    circleCreated.classList.add("hidden");
    checkCreated.classList.remove("hidden");
    h1Created.style.textDecoration = "line-through";
  }

  // onclick svgs visibility
  function circleToCheck() {
    circleCreated.classList.toggle("hidden");
    checkCreated.classList.toggle("hidden");
    h1Created.style.textDecoration =
      h1Created.style.textDecoration === "line-through" ? "" : "line-through";
    task.checked = !task.checked; // Toggle checked state
    saveData(); // Save updated state
  }

  // Add onclick to both icons
  circleCreated.addEventListener("click", circleToCheck);
  checkCreated.addEventListener("click", circleToCheck);

  // Creating the x icon for deleting
  const xCreated = document.createElement("img");
  xCreated.src = "./src/assets/x-mark.svg";
  xCreated.className = "w-4 cursor-pointer hover:opacity-60";
  xCreated.onclick = () => deleteTask(liCreated);
  divCreated.appendChild(xCreated);
}

function deleteTask(li) {
  li.remove();
  saveData();
}

// Local storage
function saveData() {
  const tasks = [];
  ul.querySelectorAll("li").forEach((li) => {
    const taskText = li.querySelector("h1").textContent;
    const checked = li
      .querySelector('img[src*="check-mark"]')
      .classList.contains("hidden")
      ? false
      : true;
    tasks.push({ text: taskText, checked: checked });
  });
  localStorage.setItem("UL_DATA", JSON.stringify(tasks));
}

function showData() {
  const storedData = localStorage.getItem("UL_DATA");
  if (storedData) {
    const tasks = JSON.parse(storedData);
    tasks.forEach((task) => {
      addTaskToDOM(task);
    });
  }
}

// Load tasks when the page loads
window.onload = showData;
