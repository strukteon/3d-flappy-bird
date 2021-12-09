let rotY = Number(localStorage.getItem("rotY"));
document.body.style.setProperty("--rot-y", `${rotY}deg`)
let rotZ = 0 //Number(localStorage.getItem("rotZ"));
document.body.style.setProperty("--rot-z", `${rotZ}deg`)
let zoom = -1;
document.body.style.setProperty("--zoom", `${zoom}`)
let steps = 10;
let lastMouseEvent;

let elems = {
    scene: document.getElementsByClassName("scene")[0],
}

elems.scene.onmousedown = event => lastMouseEvent = event;
elems.scene.onmouseup = () => lastMouseEvent = undefined;


elems.scene.onmousemove = event => {
    if (lastMouseEvent === undefined) return;
    let diff = {
        x: event.clientX - lastMouseEvent.clientX,
        y: event.clientY - lastMouseEvent.clientY,
    }
    lastMouseEvent = event;
    console.log(diff);

    rotY += diff.x;
    //rotZ -= diff.y;
    localStorage.setItem("rotY", `${rotY}`)
    localStorage.setItem("rotZ", `${rotZ}`)
    document.body.style.setProperty("--rot-y", `${rotY}deg`)
    //document.body.style.setProperty("--rot-z", `${rotZ}deg`)
}
