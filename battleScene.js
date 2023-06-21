const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./GameAssets/battleBackground.png";
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleBackgroundImage,
});

const draggle = new Monster(monsters.Draggle);
const emby = new Monster(monsters.Emby);

const renderedSprites = [draggle, emby];

emby.attacks.forEach((attack) => {
  const button = document.createElement("button");
  button.innerHTML = attack.name;
  const attacksBox = document.querySelector("#attacksBox");
  attacksBox.append(button);
});

function animateBattle() {
  window.requestAnimationFrame(animateBattle);
  battleBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animateBattle();

const queue = [];

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

    queue.push(() => {
      draggle.attack({
        attackMove: attacks.Tackle,
        recipient: emby,
        renderedSprites,
      });
    });
  });
});

//Event listener for dialogueBox
dialogueBox.addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
