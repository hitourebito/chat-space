$(function(){
  function buildCreate(message){
    var html = `<div class="message">
                  <div class="up-message">
                    <div class="up-message__user-name">
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
                    
                    <img src=${message.image} alt="">

                  </div>
                </div>`
    return html;
  }

  function buildHTML(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";

    var html = `<div class="message" data-message-id="${message.id}"> 
                  <div class="up-message">
                    <div class="up-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="up-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="low-meesage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
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
      var html = buildCreate(message);
      $('.messages').append(html);
      $('.form__submit').removeAttr("disabled");
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight}, 500);
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージか画像情報が入力されていません");
      $('.form__submit').removeAttr("disabled");
    })

    //自動更新ここから
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.message:last').data("message-id");
        $.ajax({ 
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {last_id: last_message_id}
        })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
     }
    };
    setInterval(reloadMessages, 5000);
  });
}); 