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

// positions and normal direction vectors of tiles:
const tiles = {
    'face-a':           { pos: new Vector(0, 0, 100), normal: new Vector(0, 0, 1) },
    'face-b':           { pos: new Vector(50, 0, 50), normal: new Vector(1, 0, 0) },
    'face-b-mirrored':  { pos: new Vector(-50, 50, 50), normal: new Vector(-1, 0, 0) },
    'face-c':           { pos: new Vector(0, -25, 75), normal: new Vector(0, 0, 1) },
    // 'face-d':           { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-e':           { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-f':           { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-d-mirrored':  { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-e-mirrored':  { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-f-mirrored':  { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-g':           { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-h':           { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-i':           { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-j':           { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'face-top':         { pos: new Vector(50, 50, 50), normal: new Vector() },
    // 'button':           { pos: new Vector(50, 50, 50), normal: new Vector() },
}


function makeShading(light_position) {  // called in script.js
  const light_direction = (new Vector(0, 0, 0)).sub(light_position).getNormalized();
  console.log(light_direction);

  Object.entries(tiles)
    .map(([key, val]) => {
      // darkness: 1 = total darkness, 0 = medium, -1 = total brightness
      let darkness =
        val.normal
          .getNormalized()
          .getDotProductWith(light_direction.getNormalized()) /
        light_direction.getLength();
      darkness = (darkness + 1) / 2; // now: 1 = total darkness, 0.5 = medium, 0 = total brightness
      console.log(darkness);

      return {
        css_var: `--${key}-brightness`, // name of css variable
        brightness: 1 - darkness, // brightness from 0-1
      };
    })
    .forEach(({ css_var, brightness }) =>
      document.body.style.setProperty(css_var, brightness)
    );
}

makeShading(new Vector(0, 0, 0)); // init