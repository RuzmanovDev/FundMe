/*globals*/

$('.open-conversation').on('click', function (e) {
    var infoElement = $(this);
    var textarea = $('#messageToSend');
    var ul = $('#messages-list').html('');
    textarea.attr('identification', infoElement.attr('identification'))
    var body = {
        username: infoElement.attr('data-username')
    };

    requester.postJSON('/messages/texts', body, '')
        .then((result) => {
            appendTexts(result.texts)
        })
});

//bgSuccessDark(data-userid=conversation.user.id, data-username=conversation.user.username)
//                        ul(id="messages-list")

function appendTexts(texts) {
    if (!texts) {
        return;
    }
    var ul = $('#messages-list');
    texts.forEach(text => {
        ul.append(buildMessage(text.owner, text.date, text.text));
    })
}

function buildMessage(owner, date, text) {
    return `<li>
            <strong>${owner}</strong>
    <p>
        <span>${date}</span>
      
    </p>
    <p>
       
       ${text}
    </p>
               
           </li>`
}

$('#send-message').on('click', function (e) {
    var identification = $('#messageToSend').attr('identification');
    var text = $('#messageToSend').val();

    if (!identification) {
        return;
    }
    var body = {
        identification,
        text
    }

    requester.putJSON('/messages', body, '')
        .then((text) => {
            appendTexts([text])
            $('#messageToSend').val('')
        })

});
