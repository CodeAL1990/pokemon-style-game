const audio = {
  map: new Howl({
    src: "./audio/map.wav",
    html5: true,
    volume: 0.5,
  }),
  initBattle: new Howl({
    src: "./audio/initBattle.wav",
    html5: true,
    volume: 0.3,
  }),
  battle: new Howl({
    src: "./audio/battle.mp3",
    html5: true,
    volume: 0.4,
  }),
  tackleHit: new Howl({
    src: "./audio/tackleHit.wav",
    html5: true,
    volume: 0.3,
  }),
  fireballHit: new Howl({
    src: "./audio/fireballHit.wav",
    html5: true,
    volume: 0.3,
  }),
  initFireball: new Howl({
    src: "./audio/initFireball.wav",
    volume: 0.3,
  }),
  victory: new Howl({
    src: "./audio/victory.wav",
    volume: 0.5,
  }),
};
