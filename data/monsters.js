const monsters = {
  Emby: {
    position: {
      x: 280,
      y: 325,
    },
    image: {
      src: "./GameAssets/embySprite.png",
    },
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    isEnemy: false,
    name: "Emby",
    attacks: [attacks.Tackle, attacks.Fireball],
  },
  Draggle: {
    position: {
      x: 800,
      y: 100,
    },
    image: {
      src: "./GameAssets/draggleSprite.png",
    },
    frames: {
      max: 4,
      hold: 30,
    },
    animate: true,
    isEnemy: true,
    name: "Draggle",
    attacks: [attacks.Tackle, attacks.Fireball],
  },
};
