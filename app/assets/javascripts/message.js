$(function(){
  function buildCreate(message){
    var html = `<div class="low-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
    
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax ({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildCreate(message);
      $('.messages').append(html)
      $('.form__submit').removeAttr("disabled");
    })
    .fail(function(){
      alert("メッセージか画像情報が入力されていません");
      $('.form__submit').removeAttr("disabled");
    })
  })
}); 