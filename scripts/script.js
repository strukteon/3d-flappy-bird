let rotY = -25;
let zoom = 1;
let steps = 10;
document.body.style.setProperty("--rot-y", `${rotY}deg`)
document.getElementById("btn-rot-left").onclick = () => {
    rotY -= steps;
    document.body.style.setProperty("--rot-y", `${rotY}deg`)
}
document.getElementById("btn-rot-right").onclick = () => {
    rotY += steps;
    document.body.style.setProperty("--rot-y", `${rotY}deg`)
}
document.getElementById("rotate").oninput = (event) => {
  rotY = event.target.value;
  document.body.style.setProperty("--rot-y", `${rotY}deg`);
};

document.getElementById("plus").onclick = () => {
     zoom -= steps * .01;
    document.body.style.setProperty("--zoom", `${zoom}`)
}
document.getElementById("minus").onclick = () => {
    zoom += steps * .01;
    document.body.style.setProperty("--zoom", `${zoom}`)
}

let debugMenuVisible = false;
let btnToggleDbgMenu = document.getElementById("show-dbg-menu");
btnToggleDbgMenu.onclick = () => {
    debugMenuVisible = ! debugMenuVisible;
    btnToggleDbgMenu.innerText = (debugMenuVisible ? "Hide" : "Show") + " Debug Menu";
    document.querySelector(".debug-menu").style.display = debugMenuVisible ? null : "none";
}

// shading stuff

let light_position = new Vector(200, -100, 0);
let is_pointlight = false;

function updateShading(light_position) {
  document.body.style.setProperty("--light_x", `${light_position.x}px`);
  document.body.style.setProperty("--light_y", `${light_position.y}px`);
  document.body.style.setProperty("--light_z", `${light_position.z}px`);
  makeShading(light_position, is_pointlight);
}

document.getElementById("light_x").oninput = (event) => {
    light_position.x = event.target.value;
    updateShading(light_position);
};

document.getElementById("light_y").oninput = (event) => {
    light_position.y = event.target.value;
    updateShading(light_position);
};

document.getElementById("light_z").oninput = (event) => {
    light_position.z = event.target.value;
    updateShading(light_position);
};

document.getElementById("is_pointlight").onchange = (event) => {
  is_pointlight = event.target.checked;
  updateShading(light_position);
};

document.getElementById("light_x").value = light_position.x;
document.getElementById("light_y").value = light_position.y;
document.getElementById("light_z").value = light_position.z;
document.getElementById("is_pointlight").checked = is_pointlight;

updateShading(light_position);