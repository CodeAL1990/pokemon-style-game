window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 576;

  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
  }

  class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
      this.position = position;
      this.width = 48;
      this.height = 48;
    }

    draw() {
      context.fillStyle = "red";
      context.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  const boundaries = [];
  const offset = {
    x: -15,
    y: -930,
  };

  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 1025)
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y,
            },
          })
        );
    });
  });

  const image = new Image();
  image.src = "./GameAssets/pokemonStyleGame.png";

  const playerImage = new Image();
  playerImage.src = "./GameAssets/playerDown.png";

  class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
      this.position = position;
      this.image = image;
      this.frames = frames;

      this.image.onload = () => {
        this.width = this.image.width / this.frames.max;
        this.height = this.image.height;
      };
    }

    draw() {
      context.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  const player = new Sprite({
    position: {
      x: canvas.width * 0.5 - 192 * 0.125,
      y: canvas.height * 0.5 - 68 * 0.5,
    },
    image: playerImage,
    frames: {
      max: 4,
    },
  });

  const background = new Sprite({
    position: {
      x: offset.x,
      y: offset.y,
    },
    image: image,
  });

  const keys = {
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  };

  let lastKey;
  window.addEventListener("keydown", (e) => {
    //console.log(e.key);
    switch (e.key) {
      case "w":
        keys.w.pressed = true;
        lastKey = "w";
        break;

      case "a":
        keys.a.pressed = true;
        lastKey = "a";
        break;

      case "s":
        keys.s.pressed = true;
        lastKey = "s";
        break;

      case "d":
        keys.d.pressed = true;
        lastKey = "d";
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "w":
        keys.w.pressed = false;
        break;

      case "a":
        keys.a.pressed = false;
        break;

      case "s":
        keys.s.pressed = false;
        break;

      case "d":
        keys.d.pressed = false;
        break;
    }
  });

  const movables = [background, ...boundaries];

  function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    );
  }

  function animate() {
    background.draw();
    boundaries.forEach((boundary) => {
      boundary.draw();

      //collision detection
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: boundary,
        })
      ) {
        console.log("colliding");
      }
    });

    player.draw();

    //inputs
    if (keys.w.pressed && lastKey === "w") {
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
    } else if (keys.a.pressed && lastKey === "a") {
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
    } else if (keys.s.pressed && lastKey === "s") {
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
    } else if (keys.d.pressed && lastKey === "d") {
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
    }
    window.requestAnimationFrame(animate);
  }

  animate();
});

//island.onload = () => {};
