const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
//console.log(gsap);

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}

console.log(battleZonesMap);

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

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

console.log(battleZones);

const image = new Image();
image.src = "./GameAssets/pokemonStyleGame.png";

const foregroundImage = new Image();
foregroundImage.src = "./GameAssets/foregroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src = "./GameAssets/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./GameAssets/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./GameAssets/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./GameAssets/playerRight.png";

const player = new Sprite({
  position: {
    x: canvas.width * 0.5 - 192 * 0.125,
    y: canvas.height * 0.55 - 68 * 0.5,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10,
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage,
  },
});
console.log(player);

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
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

const movables = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  );
}

const battle = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });

  player.draw();
  foreground.draw();

  let moving = true;
  player.animate = false;

  //console.log(animationId);
  if (battle.initiated) return;
  //Activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > player.width * player.height * 0.5 &&
        Math.random() < 0.01
      ) {
        console.log("Battle occurs");
        //deactivate current animation loop
        window.cancelAnimationFrame(animationId);

        audio.map.stop();
        audio.initBattle.play();
        audio.battle.play();

        battle.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                //activate new animation loop
                initBattle();
                animateBattle();
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }
  }

  //inputs
  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up;

    for (let i = 0; i < boundaries.length; i++) {
      //collision detection for w
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left;

    for (let i = 0; i < boundaries.length; i++) {
      //collision detection for a
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.image = player.sprites.down;

    for (let i = 0; i < boundaries.length; i++) {
      //collision detection for s
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right;

    for (let i = 0; i < boundaries.length; i++) {
      //collision detection for d
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}

audio.map.play();
/* let clicked = false;
addEventListener("click", () => {
  if (!clicked) {
    audio.map.play();
    clicked = true;
  }
}); */
