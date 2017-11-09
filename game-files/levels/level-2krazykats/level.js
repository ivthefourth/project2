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
  // defaults.loadSprites(game);

  game.load.image('player', 'game-files/images/predatormask.png');
  game.load.image('playerDead', 'game-files/images/predatormaskdead.png');
  game.load.image('player', 'game-files/images/lilo.png');


  //change to match your map
  game.load.tilemap('level1', 'game-files/levels/level-2krazykats/firstlevel.json', null, Phaser.Tilemap.TILED_JSON);
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

   window.state = defaults.createInit(game, {playerStartingX: 100, playerStartingY: 416});
   defaults.createCollisions(map, succumbToDeath(state));


}

function update() {

   game.physics.arcade.collide(state.player, layer);

   defaults.updateInit(game, state, succumbToDeath(state));
}



