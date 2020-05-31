$(document).ready(function() {
    socket1 = io.connect('http://' + document.domain + ':' + location.port + '/private')

    $('#send_username').on('click', function() {
        socket1.emit('name', $('#name').val());
    });

    $('#send_private_message').on('click', function() {
        var recipient = $('#send_to_username').val();
        var message_to_send = $('#private_message').val();

        private_socket.emit('private_message', {'name' : recipient, 'message' : message_to_send});
    });

    private_socket.on('new_private_message', function(msg) {
        alert(msg);
    });


});