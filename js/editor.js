// js/editor.js

// Workspace en UI-elementen ophalen
const workspace = document.getElementById("workspace");
const propertiesPanel = document.getElementById("properties");
const addButton = document.getElementById("addButton");
const addLamp = document.getElementById("addLamp");

let selectedObject = null;

// Basisfunctie om object aan workspace toe te voegen
function createObject(type) {
  const el = document.createElement("div");
  el.classList.add("object");
  el.setAttribute("data-type", type);
  el.setAttribute("data-id", "obj-" + Date.now());
  el.textContent = type === "button" ? "Knop" : "Lamp";

  el.style.left = "100px";
  el.style.top = "100px";

  el.style.position = "absolute";
  el.style.cursor = "move";

  if (type === "lamp") {
    el.style.backgroundColor = "red";
    el.style.borderRadius = "50%";
    el.style.width = "50px";
    el.style.height = "50px";
    el.style.display = "flex";
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
  }

  makeDraggable(el);

  el.addEventListener("click", (e) => {
    e.stopPropagation();
    selectObject(el);
  });

  workspace.appendChild(el);
  selectObject(el);
}

function makeDraggable(el) {
  let offsetX, offsetY;
  
  el.addEventListener("mousedown", (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    function onMouseMove(e) {
      el.style.left = `${e.pageX - offsetX}px`;
      el.style.top = `${e.pageY - offsetY}px`;
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

function selectObject(el) {
  selectedObject = el;
  const type = el.getAttribute("data-type");
  const id = el.getAttribute("data-id");
  const name = el.textContent;

  propertiesPanel.innerHTML = `
    <h2>Eigenschappen</h2>
    <label>Naam:<br/>
      <input type="text" id="objectName" value="${name}" />
    </label>
    <br/><br/>
    <button id="deleteObject">Verwijder object</button>
  `;

  document.getElementById("objectName").addEventListener("input", (e) => {
    el.textContent = e.target.value;
  });

  document.getElementById("deleteObject").addEventListener("click", () => {
    el.remove();
    propertiesPanel.innerHTML = `<h2>Eigenschappen</h2><p>Selecteer een object om de eigenschappen te bewerken.</p>`;
  });
}

// Klik op lege workspace deselecteert alles
workspace.addEventListener("click", () => {
  selectedObject = null;
  propertiesPanel.innerHTML = `<h2>Eigenschappen</h2><p>Selecteer een object om de eigenschappen te bewerken.</p>`;
});

// Event listeners voor knoppen
addButton.addEventListener("click", () => createObject("button"));
addLamp.addEventListener("click", () => createObject("lamp"));
