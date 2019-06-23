$(function(){
  function buildCreate(message){
    var html = `<div class="message">
                  <div class="up-message">
                    <div class="up-message__user-name" id="bottom_message">
                      ${message.name}
                    </div>
                    <div class="up-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="low-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>

                    <img class="lower-message__image" src="${message.image}">
    
                  </div>
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
      console.log("OK");
      var html = buildCreate(message);
      $('.messages').append(html)
      $('.form__submit').removeAttr("disabled");
      $('.messages').animate({scrollTop: $('#bottom_message').offset().top}, 500);
    })
    .fail(function(){
      console.log("NO");
      alert("メッセージか画像情報が入力されていません");
      $('.form__submit').removeAttr("disabled");
    })
  })
}); 