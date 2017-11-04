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
    alert('login not quite succesful yet '+ loginAccount.username + loginAccount.password)
//
    //the logic for password login goes here...

    //search for the user in the database
    //return the username and passowrd
    //compare the input password to stored password
    //if they match proceed to game
    //else return error

/*    $.get("/login", loginAccount, function(result){
      };
    })  */





  });//end of click event
});//end of document.ready