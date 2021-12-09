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
