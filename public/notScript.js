$(document).ready(function(){
    $('.modal').modal();

          // auto opens the modal on page load
    $("#modal-level").modal('open', getAvailableLevels());
  });