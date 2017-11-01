

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
   game.stage.backgroundColor = '#85b5e1';

   game.load.baseURL = '/';

   game.load.image('player', 'game-files/images/phaser-dude.png');
}

function create() {

   player = game.add.sprite(100, 200, 'player');

   game.physics.arcade.enable(player);

   player.body.collideWorldBounds = true;
   player.body.gravity.y = 1000;

   cursors = game.input.keyboard.createCursorKeys();
   jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   jumpButton.onDown.add(( ) => 
     {
         player.body.gravity.y = -player.body.gravity.y;
     }
   )
}

function update() {

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