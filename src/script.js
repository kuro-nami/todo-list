const inputField = document.querySelector("#input-box");
const addButton = document.querySelector("#add-button");
const ul = document.querySelector("ul");

addButton.onclick = createTask;

function createTask() {
  if (inputField.value === "") {
    alert("Enter a valid task bro!😩");
    return;
  }

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

  // Creating the task text (move this above circleToCheck)
  const h1Created = document.createElement("h1");
  h1Created.className = "text-xl";
  h1Created.textContent = inputField.value;
  spanCreated.appendChild(h1Created);

  //onclick svgs visibility
  function circleToCheck() {
    circleCreated.classList.toggle("hidden");
    checkCreated.classList.toggle("hidden");
    h1Created.style.textDecoration = "line-through";
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

  // Clear input field
  inputField.value = "";
}

function deleteTask(li) {
  li.remove();
}
