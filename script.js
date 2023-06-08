window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const context = canvas.getContext("2d");

  canvas.width = 1024;
  canvas.height = 576;

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

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
      x: -15,
      y: -930,
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

  function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
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

    if (keys.w.pressed && lastKey === "w") background.position.y += 3;
    else if (keys.a.pressed && lastKey === "a") background.position.x += 3;
    else if (keys.s.pressed && lastKey === "s") background.position.y -= 3;
    else if (keys.d.pressed && lastKey === "d") background.position.x -= 3;
  }
  animate();
});

//island.onload = () => {};
