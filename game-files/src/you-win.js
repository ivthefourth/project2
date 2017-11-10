module.exports = function(state, nextLevel){
    return function winner(){
      state.player.body.velocity.y = 0;
      state.player.body.velocity.x = 0;
      state.camerafollow.body.velocity.x = 0;
      state.music.stop();
      $("#victory").css("display", "block");
      $('#next').click(function(){
         window.location = `/levels/${nextLevel}?token=${localStorage.getItem('jwtoken')}`
      })
    };
};