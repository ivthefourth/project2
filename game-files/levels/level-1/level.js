function succumbToDeath(){
   console.log('DIE');
}

game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { 
   preload: preload, 
   create: create, 
   update: update
});

function preload() {
   game.stage.backgroundColor = '#85b5e1';

   game.load.baseURL = '/';

   game.load.image('player', 'game-files/images/snitch-avatar.png');

   game.load.tilemap('test', 'game-files/levels/level-1/test_level.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('tiles', 'game-files/images/scifi.png');
}

var map;
var layer;

function create() {

   game.physics.startSystem(Phaser.Physics.ARCADE);

   map = game.add.tilemap('test');
    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('scifi', 'tiles');
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('Tile Layer 1');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();
   player = game.add.sprite(100, 616, 'player');

   camerafollow = game.add.sprite(game.camera.width/2.5,200);

    map.setCollisionBetween(1, 20);
    map.setCollisionBetween(25, 36);
    map.setCollisionBetween(39, 56);
    map.setTileIndexCallback([
      103, 105, 106, 108, 113, 114, 115, 120, 121, 122,
      125, 126, 127, 128, 131, 132, 133, 134, 135, 136,
      139, 140, 141, 142
   ], succumbToDeath);

   game.physics.enable(player);
   game.physics.enable(camerafollow);

   player.body.collideWorldBounds = true;
   player.body.gravity.y = 1000;

   cursors = game.input.keyboard.createCursorKeys();
   jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   jumpButton.onDown.add(( ) => 
     {
         player.body.gravity.y = -player.body.gravity.y;
     }
   )


    game.camera.follow(camerafollow, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

function update() {

   game.physics.arcade.TILE_BIAS = 40;
   game.physics.arcade.collide(player, layer);

   if(player.x + player.width * 0.75 < game.camera.x){
    succumbToDeath();
   }


  if (player.body.velocity.x < 500)
   {
      player.body.velocity.x += 50;
   }
  if (camerafollow.body.velocity.x < 500)
   {
      camerafollow.body.velocity.x += 50;
   }
   //camerafollow.y = player.y
   camerafollow.y = game.camera.height/2;
   if(camerafollow.x > game.world.width - (game.camera.width/2)){
    camerafollow.body.velocity.x = 0;
   }


   // if(Math.abs(player.body.velocity.x) !== 0){
   //    player.body.velocity.x -= Math.sign(player.body.velocity.x)*25
   // }

   // if (cursors.left.isDown && player.body.velocity.x > -500)
   // {
   //    player.body.velocity.x += -50;
   // }
   // else if (cursors.right.isDown && player.body.velocity.x < 500)
   // {
   //    player.body.velocity.x += 50;
   // }

   if(jumpButton.isDown && Math.sign(player.body.velocity.y) != Math.sign(player.body.gravity.y)){
      player.body.velocity.y += Math.sign(player.body.gravity.y)*25; 
   }
}