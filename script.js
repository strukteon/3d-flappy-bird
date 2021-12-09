let rotY = -45;
let zoom = 1;
let steps = 10;
document.getElementById("left").onclick = () => {
    rotY -= steps;
    document.body.style.setProperty("--rot-y", `${rotY}deg`)
}
document.getElementById("right").onclick = () => {
    rotY += steps;
    document.body.style.setProperty("--rot-y", `${rotY}deg`)
    console.log(rotY)
}

document.getElementById("plus").onclick = () => {
     zoom -= steps * .01;
    document.body.style.setProperty("--zoom", `${zoom}`)
}
document.getElementById("minus").onclick = () => {
    zoom += steps * .01;
    document.body.style.setProperty("--zoom", `${zoom}`)
    console.log(rotY)
}

// shading stuff

let light_position = new Vector(200, -100, 0);

function updateShading(light_position) {
  document.body.style.setProperty("--light_x", `${light_position.x}px`);
  document.body.style.setProperty("--light_y", `${light_position.y}px`);
  document.body.style.setProperty("--light_z", `${light_position.z}px`);
  makeShading(light_position);
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

document.getElementById("light_x").value = light_position.x;
document.getElementById("light_y").value = light_position.y;
document.getElementById("light_z").value = light_position.z;

updateShading(light_position);