module.exports = function(state){
    return function winner(){
      state.player.body.velocity.y = 0;
      state.player.body.velocity.x = 0;
      state.camerafollow.body.velocity.x = 0;
      state.music.stop();
      $("#victory").css("display", "block");
    };
};