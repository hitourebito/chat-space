$(function() {

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').empty();
    $('#user-search-result').append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    $('#user-search-result').empty();
    $('#user-search-result').append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();
    //確認用console.log
    console.log(input);
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("該当するユーザーはいません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
  $("#user-search-result").on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(e){
    e.preventDefault;
    //確認用console.log
    console.log("OK");
  });
});
