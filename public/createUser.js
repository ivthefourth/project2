function logIn(data){
  $.ajax('/login', {
    type: 'POST',
    data: data
  })
  .done(function(response){
    if (response.token) {
      localStorage.setItem('jwtoken', response.token);
      window.location = `/level-select?token=${response.token}`;
    }
  });
}

function logOut(){
  localStorage.removeItem('jwtoken');
  window.location = '/';
}

function addDeath(){
  $.ajax('/add-death', {
    method: 'POST',
    data: {
      token: localStorage.getItem('jwtoken')
    }
  })
}

$(document).ready(function(){

  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  $('.btn-flat').on('click', function(){
    event.preventDefault();

    var newAccount = {
      username: $('#usernameCreate').val().trim(),
      password: $('#passwordCreate').val().trim()
    };  
    console.log('Input Data: ' + newAccount);

    $.post("/account", newAccount, function(result){
      console.log("post result: " + result);
    });
  });

  $('#login').on("click", function(){
    event.preventDefault();

    var loginAccount = {
      username: $('#usernameLogin').val().trim(),
      password: $('#passwordLogin').val().trim()
    };
    logIn(loginAccount);
  });//end of click event
});//end of document.ready