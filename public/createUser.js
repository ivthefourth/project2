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
    method: 'PATCH',
    data: {
      token: localStorage.getItem('jwtoken')
    }
  })
}

function deleteAccount(){
  $.ajax('/delete', {
    type: 'DELETE',
    data: {
      token: localStorage.getItem('jwtoken')
    }
  })
  .done(function(res){
    if(!res.error){
      logOut();
    }
    else{
      //handle error
    }
  });
}

function createAccount(data, callback){
  $.ajax('/account', {
    type: 'POST',
    data: data
  })
  .done(callback);
}

function unlockLevel(levelName, callback){
  $.ajax('/unlock-level', {
    type: 'POST',
    data: {
      levelName: levelName, 
      token: localStorage.getItem('jwtoken')
    }
  })
  .done(callback);
}

function getAvailableLevels(callback){
  $.get(`/available-levels?token=${localStorage.getItem('jwtoken')}`)
  .done(callback);
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
    //console.log('Input Data: ' + newAccount);

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
  setTimeout(() => $('#starwars-text').addClass('moving'), 500);

  $('#delete').on("click", function(){
    //event.preventDefault();

    deleteAccount();
    console.log("account deleted")
  });
});//end of document.ready
