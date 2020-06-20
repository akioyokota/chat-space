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
                  </div>
                  <div class="messages">
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
                        <p class="Message__content"></p>
                          ${message.content}
                        </div>`;
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.chat-message__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});