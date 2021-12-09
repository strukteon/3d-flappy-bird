class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getDotProductWith(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  add(other) {
    return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  sub(other) {
    return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  getLength() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  getNormalized() {
    const factor = 1/this.getLength();
    return new Vector(this.x * factor, this.y * factor, this.z * factor);
  }
}

function toRad(degree) {
  return degree * Math.PI/180;
}

// positions and normal direction vectors of tiles:
const tiles = {
    'face-a':           { pos: new Vector(0, 0, 100), normal: new Vector(0, 0, 1) },
    'face-b':           { pos: new Vector(50, 0, 50), normal: new Vector(1, 0, 0) },
    'face-b-mirrored':  { pos: new Vector(-50, 50, 50), normal: new Vector(-1, 0, 0) },
    'face-c':           { pos: new Vector(0, -25, 75), normal: new Vector(0, -1, 0) },
    'face-d':           { pos: new Vector(92.5, -200, 42.5), normal: new Vector(1, 0, 0) },
    'face-e':           { pos: new Vector(82.5, -200, 17.5), normal: new Vector(1, 0, 0) },
    'face-f':           { pos: new Vector(75, -230, 25), normal: new Vector(1, 0, 0) },
    'face-d-mirrored':  { pos: new Vector(7.5, -200, 42.5), normal: new Vector(-1, 0, 0) },
    'face-e-mirrored':  { pos: new Vector(17.5, -200, 17.5), normal: new Vector(-1, 0, 0) },
    'face-f-mirrored':  { pos: new Vector(25, -230, 25), normal: new Vector(-1, 0, 0) },
    'face-g':           { pos: new Vector(0, -230, 50), normal: new Vector(0, 0, 1) },
    'face-h':           { pos: new Vector(0, -255, 25), normal: new Vector(0, -1, 0) },
    'face-i':           { pos: new Vector(0, -200, 42), normal: new Vector(Math.cos(toRad(4)), 0, 1) }, // 4 degrees
    'face-j':           { pos: new Vector(0, -210, 45), normal: new Vector(0, 1, 0) },
    'face-top':         { pos: new Vector(30, -34, 80), normal: new Vector(0, -1, 0) },
    // 'side-1':           { pos: new Vector(50, 50, -10), normal: new Vector() }, // is 'face-top' in button
    'side-2':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(2 * 360/8)), 0, Math.cos(toRad(2 * 360/8))) },
    'side-3':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(3 * 360/8)), 0, Math.cos(toRad(3 * 360/8))) },
    'side-4':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(4 * 360/8)), 0, Math.cos(toRad(4 * 360/8))) },
    'side-5':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(5 * 360/8)), 0, Math.cos(toRad(5 * 360/8))) },
    'side-6':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(6 * 360/8)), 0, Math.cos(toRad(6 * 360/8))) },
    'side-7':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(7 * 360/8)), 0, Math.cos(toRad(7 * 360/8))) },
    'side-8':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(8 * 360/8)), 0, Math.cos(toRad(8 * 360/8))) },
    'side-9':           { pos: new Vector(30, -34, 80), normal: new Vector(Math.sin(toRad(9 * 360/8)), 0, Math.cos(toRad(9 * 360/8))) },
}


function makeShading(light_position) { // called in script.js
  const light_direction = (new Vector(0, 0, 0)).sub(light_position).getNormalized(); // direction of sun light parallel to everything

  Object.entries(tiles)
    .map(([key, val]) => {
      // darkness: 1 = total darkness, 0 = medium, -1 = total brightness
      let darkness =
        val.normal
          .getNormalized()
          .getDotProductWith(light_direction.getNormalized()) /
        light_direction.getLength();
      darkness = (darkness + 1) / 2; // now: 1 = total darkness, 0.5 = medium, 0 = total brightness

      return {
        css_var: `--brightness-${key}`, // name of css variable
        brightness: Math.max(0.2, 1 - darkness), // brightness from 0-1, nut below 0.2
      };
    })
    .forEach(({ css_var, brightness }) =>
      document.body.style.setProperty(css_var, brightness)
    );
}