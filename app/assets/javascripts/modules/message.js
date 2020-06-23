$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =  `<div class="chat-message__box" data-message-id=${message.id}>
                    <div class="user-name__box">
                      <div class="user-name">
                      ${message.user_name}
                      </div>
                      <div class="date-box">
                      ${message.created_at}
                      </div>
                    </div>
                  <div class="messages">
                    <p class="Message__content">
                      ${message.content}
                    </p>
                  </div>
                  <img class="Message__image" src="${message.image}"></img>`;
      return html;
    } else {
      let html = `<div class="chat-message__box" data-message-id=${message.id}>
                    <div class="user-name__box">
                      <div class="user-name">
                        ${message.user_name}
                      </div>
                      <div class="date-box">
                        ${message.created_at}
                      </div>
                     </div>
                    </div>
                      <div class="messages">
                        <p class="Message__content">
                          ${message.content}
                        </p>
                        </div>`;
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function() {
         alert("メッセージ送信に失敗しました");
         $('.Form__submit').prop("disabled", false);
      });
    });
});