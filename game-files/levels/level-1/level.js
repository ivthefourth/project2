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
  defaults.loadSprites(game);

  //change to match your map
  game.load.tilemap('level1', 'game-files/levels/level-1/test_level.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'game-files/images/scifi.png');
  /////////////

}

var map;
var layer;

function create() {

  //change to match your map
  map = game.add.tilemap('level1');
  map.addTilesetImage('scifi', 'tiles');
  layer = map.createLayer('Tile Layer 1');
  layer.resizeWorld();
  ////////////

   window.state = defaults.createInit(game);
   defaults.createCollisions(map, succumbToDeath(state));

}

function update() {

   game.physics.arcade.collide(state.player, layer);

   defaults.updateInit(game, state, succumbToDeath(state));
}