const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./GameAssets/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

let draggle;
let emby;
let renderedSprites;
let battleAnimationId;
let queue;

function initBattle() {
  const userInterface = document.querySelector("#userInterface");
  userInterface.style.display = "block";

  const dialogueBox = document.querySelector("#dialogueBox");
  dialogueBox.style.display = "none";

  const enemyHealthBar = document.querySelector("#enemyHealthBar");
  enemyHealthBar.style.width = "100%";

  const playerHealthBar = document.querySelector("#playerHealthBar");
  playerHealthBar.style.width = "100%";

  const attacksBox = document.querySelector("#attacksBox");
  attacksBox.replaceChildren();

  draggle = new Monster(monsters.Draggle);
  emby = new Monster(monsters.Emby);
  renderedSprites = [draggle, emby];
  queue = [];

  emby.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    const attacksBox = document.querySelector("#attacksBox");
    attacksBox.append(button);
  });

  //Event listeners for buttons (attack)
  const allBtns = document.querySelectorAll("button");
  allBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      emby.attack({
        attackMove: selectedAttack,
        recipient: draggle,
        renderedSprites,
      });

      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint();
        });

        queue.push(() => {
          //fade back to black
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId);
              animate();
              const userInterface = document.querySelector("#userInterface");
              userInterface.style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              battle.initiated = false;
              audio.map.play();
            },
          });
        });
      }
      //draggle or enemy attacks
      const randomAttack =
        draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];

      queue.push(() => {
        draggle.attack({
          attackMove: randomAttack,
          recipient: emby,
          renderedSprites,
        });

        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint();
          });

          queue.push(() => {
            //fade back to black
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                const userInterface = document.querySelector("#userInterface");
                userInterface.style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                battle.initiated = false;
                audio.map.play();
              },
            });
          });
        }
      });
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      const attackType = document.querySelector("#attackType");
      attackType.innerHTML = selectedAttack.type;
      attackType.style.color = selectedAttack.color;
    });
  });
}

function animateBattle() {
  battleAnimationId = window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  //console.log(battleAnimationId);

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animate();
//initBattle();
//animateBattle();

//Event listener for dialogueBox
dialogueBox.addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
