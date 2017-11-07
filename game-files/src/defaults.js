function propOrDefault(prop, defaultValue){
   if(prop == undefined){
      return defaultValue;
   }
   return prop;
}

function restart(game) {
   // reset player position
   $("#death").css("display", "none");
   game.state.restart();
}

module.exports = {
   preloadInit(game){
      game.stage.backgroundColor = '#85b5e1';
      game.load.baseURL = '/';

      $(document).ready(function(){
          // calls restart game function
        $("#restart").click(restart.bind(null, game));
        // calls main menu function
        $("#menu").click(function(){
          window.location = "/";
        });  
      });
   },
   loadSprites(game){
      game.load.image('player', 'game-files/images/snitch-avatar.png');
      game.load.image('playerDead', 'game-files/images/snitch-avatar-dead.png');
   },
   loadAudio(game){
      game.load.audio('soundtrack', 'game-files/audio/FallingOrgan.mp3');
   },
   createInit(game, options = {}){
      const cameraStartingX = propOrDefault(options.cameraStartingX, game.camera.width/2.5),
         cameraStartingY = propOrDefault(options.cameraStartingY, 200),
         gravity = propOrDefault(options.gravity, 1000),
         playerStartingX = propOrDefault(options.playerStartingX, 100),
         playerStartingY = propOrDefault(options.playerStartingY, 616),
         topVelocityX = propOrDefault(options.topVelocityX, 500),
         accelerationX = propOrDefault(options.accelerationX, 50),
         moveVertical = propOrDefault(options.moveVertical, false);

      game.physics.startSystem(Phaser.Physics.ARCADE);

      const state = {};
      state.defaults = {
         cameraStartingX,
         cameraStartingY,
         gravity,
         playerStartingX,
         playerStartingY,
         topVelocityX,
         accelerationX,
         moveVertical
      }

      state.dead = false;

      state.player = game.add.sprite(playerStartingX, playerStartingY, 'player');
      state.player.anchor.setTo(0.5,0.5);
      game.physics.enable(state.player);
      state.player.body.gravity.y = gravity

      state.playerDead = game.add.sprite(playerStartingX, playerStartingY, 'playerDead');
      state.playerDead.visible = false;  
      state.playerDead.anchor.setTo(0.5,0.5);

      state.camerafollow = game.add.sprite(cameraStartingX, cameraStartingY);
      game.physics.enable(state.camerafollow);
      

      state.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      state.jumpButton.onDown.add(function(){
         if(state.dead) return;
         state.player.body.gravity.y = -state.player.body.gravity.y;
         state.player.scale.y *= -1;
      });

      game.camera.follow(state.camerafollow, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
      game.physics.arcade.TILE_BIAS = 40;

      return state;
   },
   playMusic(game, state){
      /////Play Music Soundtrack/////
      state.music = game.add.audio('soundtrack');
      state.music.play();
   },
   createCollisions(map, trapCollisionCallback){
      map.setCollisionBetween(1, 20);
      map.setCollisionBetween(25, 36);
      map.setCollisionBetween(39, 56);
      map.setTileIndexCallback([
         103, 105, 106, 108, 113, 114, 115, 120, 121, 122,
         125, 126, 127, 128, 131, 132, 133, 134, 135, 136,
         139, 140, 141, 142
      ], trapCollisionCallback);
   },
   updateInit(game, state, trapCollisionCallback){
      var player = state.player;
      var camerafollow = state.camerafollow;
      var camera = game.camera;

      //kill player if they go off screen top, bottom, or left
      if(player.x + player.width * 0.25 < camera.x){
         trapCollisionCallback();
      }
      else if(player.y - player.height * 0.25 > camera.y + camera.height){
         trapCollisionCallback();
      }
      else if(player.y + player.height * 0.25 < camera.y){
         trapCollisionCallback();
      }


      if(state.dead){
         player.body.velocity.y = 0;
      }
      else{

         if (player.body.velocity.x < state.defaults.topVelocityX){
            player.body.velocity.x += state.defaults.accelerationX;
         }
         if (camerafollow.body.velocity.x < state.defaults.topVelocityX){
            camerafollow.body.velocity.x += state.defaults.accelerationX;
         }

         if(state.jumpButton.isDown && Math.sign(player.body.velocity.y) != Math.sign(player.body.gravity.y)){
            player.body.velocity.y += Math.sign(player.body.gravity.y) * 25; 
         }
      }


      if(state.defaults.moveVertical){
         camerafollow.y = player.y
      }
      if(camerafollow.x > game.world.width - (camera.width/2)){
         camerafollow.body.velocity.x = 0;
      }
   }
}