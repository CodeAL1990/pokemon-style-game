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

  const island = new Image();
  island.src = "./GameAssets/pokemonStyleGame.png";

  const playerImage = new Image();
  playerImage.src = "./GameAssets/playerDown.png";

  class Sprite {
    constructor({ position, velocity, island }) {
      this.position = position;
      this.island = island;
    }

    draw() {
      context.drawImage(this.island, this.position.x, this.position.y);
    }
  }

  const background = new Sprite({
    position: {
      x: offset.x,
      y: offset.y,
    },
    island: island,
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

  const testBoundary = new Boundary({
    position: {
      x: 400,
      y: 400,
    },
  });

  function animate() {
    background.draw();
    /* boundaries.forEach((boundary) => {
      boundary.draw();
    }); */
    testBoundary.draw();
    context.drawImage(
      playerImage,
      0,
      0,
      playerImage.width * 0.25,
      playerImage.height,
      canvas.width * 0.5 - playerImage.width * 0.125,
      canvas.height * 0.5 - playerImage.height * 0.25,
      playerImage.width * 0.25,
      playerImage.height
    );

    if (keys.w.pressed && lastKey === "w") {
      background.position.y += 3;
      testBoundary.position.y += 3;
    } else if (keys.a.pressed && lastKey === "a") background.position.x += 3;
    else if (keys.s.pressed && lastKey === "s") background.position.y -= 3;
    else if (keys.d.pressed && lastKey === "d") background.position.x -= 3;
    window.requestAnimationFrame(animate);
  }

  animate();
});

//island.onload = () => {};
