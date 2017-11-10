const createGame = require('../../src/create-game');
const defaults = require('../../src/defaults');
const succumbToDeath = require('../../src/succumb-to-death');

window.game = createGame({ 
   preload: preload, 
   create: create, 
   update: update
});

function preload() {
  defaults.preloadInit(game);
  game.load.image('player', 'game-files/images/predatormask.png');
  game.load.image('playerDead', 'game-files/images/predatormaskdead.png');
  game.load.image('playerFriend', 'game-files/images/lilo.png');
  // defaults.loadAudio(game);

  //change to match your map
  game.load.tilemap('level1', 'game-files/levels/level-1/firstlevel.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'game-files/images/scifi.png');  
  game.load.image('tiles2', 'game-files/images/natural/natural-elements-small.png');
  game.load.image('tiles3', 'game-files/images/natural/natural-tileSmall.png');
  /////////////


}

var map;
var layer;

function create() {

  //change to match your map
  map = game.add.tilemap('level1');
  map.addTilesetImage('scifi', 'tiles');
  map.addTilesetImage('natural-elements-small', 'tiles2');
  map.addTilesetImage('natural-tileSmall', 'tiles3');
  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();
   ////////////
<<<<<<< HEAD


  window.state = defaults.createInit(game, {playerStartingX: 100, playerStartingY: 416});
  defaults.createCollisions(map, succumbToDeath(state));
  // defaults.playMusic(game, state);
=======

   window.state = defaults.createInit(game, {playerStartingX: 100, playerStartingY: 416});
   defaults.createCollisions(map, succumbToDeath(state));
  defaults.playMusic(game, state);

>>>>>>> master

}

function update() {

   game.physics.arcade.collide(state.player, layer);

<<<<<<< HEAD
   defaults.updateInit(game, state, succumbToDeath(state));
=======
   defaults.updateInit(game, state, succumbToDeath(state), function(){
     unlockLevel('Level 2');
     youwin(state, 2)();
   });
>>>>>>> master
}

