

var game = new Phaser.Game(800, 800, Phaser.AUTO, '', { 
   preload: preload, 
   create: create, 
   update: update
});

function preload() {
   game.stage.backgroundColor = '#85b5e1';

   game.load.baseURL = '/';

   game.load.image('player', 'game-files/images/phaser-dude.png');

   game.load.tilemap('test', 'game-files/levels/level-1/test2.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('tiles', 'game-files/images/sheet1.png');
}

var map;
var layer;

function create() {

   game.physics.startSystem(Phaser.Physics.ARCADE);

   map = game.add.tilemap('test');
    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('test2', 'tiles');
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('Tile Layer 1');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();
   player = game.add.sprite(100, 200, 'player');

    map.setCollisionBetween(1, 10);
    map.setTileIndexCallback(13, () => {console.log('DIE')});

   game.physics.enable(player);

   player.body.collideWorldBounds = true;
   player.body.gravity.y = 1000;

   cursors = game.input.keyboard.createCursorKeys();
   jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   jumpButton.onDown.add(( ) => 
     {
         player.body.gravity.y = -player.body.gravity.y;
     }
   )


    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

function update() {

   game.physics.arcade.TILE_BIAS = 40;
   game.physics.arcade.collide(player, layer);

   if(Math.abs(player.body.velocity.x) !== 0){
      player.body.velocity.x -= Math.sign(player.body.velocity.x)*25
   }

   if (cursors.left.isDown && player.body.velocity.x > -250)
   {
      player.body.velocity.x += -50;
   }
   else if (cursors.right.isDown && player.body.velocity.x < 250)
   {
      player.body.velocity.x += 50;
   }
   if(jumpButton.isDown && Math.sign(player.body.velocity.y) != Math.sign(player.body.gravity.y)){
      player.body.velocity.y += Math.sign(player.body.gravity.y)*25; 
   }
}