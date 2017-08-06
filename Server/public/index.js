var socket = io.connect('http://localhost:8124', {
    secure: true,
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttemps: 60
})
socket.on('message', function (data) {
    var html = "<li><strong>" + data.from + "</strong> - " + data.message + "</li>";
    $('.messages').append(html)
})
socket.on('new', (data) => {

    html = "<option>" + email + '</option>'
    $('#tolist').append(html);
})

socket.on('disc', (data) => {
    var html
})
function pressEvent(event) {
    
    if (event.keyCode == 13) {
        var email = $('#email').val();
        var html = "<li><strong>" + email + "</strong> - " + document.querySelector("#messageinput").value + "</li>";
        $('.messages').append(html)

        // send messge to the server
        var data = {
            from: email,
            dest: $("#to").val(),
            message: $('#messageinput').val()
        }
        socket.emit('message', data)

        // remote inputed value
        $('#messageinput').val('');
    }
}