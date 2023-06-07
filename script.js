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

window.addEventListener("load", function () {
  context.drawImage(island, -15, -930);
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
});

//island.onload = () => {};
