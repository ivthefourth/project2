module.exports = function(state){
    return function succumbToDeath(){
      if(!state.dead){
        state.dead = true;
        state.playerDead.x = state.player.x;
        state.playerDead.y = state.player.y;
        state.player.visible = false;
        state.playerDead.visible = true;
        state.player.body.velocity.x = 0;
        state.camerafollow.body.velocity.x = 0;
        $("#death").css("display", "block");
      }
  }
}
