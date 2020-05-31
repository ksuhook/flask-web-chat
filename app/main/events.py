from flask import session, request
from flask_socketio import emit, join_room, leave_room
from .. import socketio

users = {}

@socketio.on('joined', namespace='/chat')
def joined(message):
    """Sent by clients when they enter a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    join_room(room)
    emit('status', {'msg': session.get('name') + ' has entered the room.'}, room=room)


@socketio.on('text', namespace='/chat')
def text(message):
    """Sent by a client when the user entered a new message.
    The message is sent to all people in the room."""
    room = session.get('room')
    emit('message', {'msg': session.get('name') + ':' + message['msg']}, room=room)


@socketio.on('left', namespace='/chat')
def left(message):
    """Sent by clients when they leave a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    leave_room(room)
    emit('status', {'msg': session.get('name') + ' has left the room.'}, room=room)


@socketio.on('image-upload', namespace='/chat')
def image_upload(image):
    room = session.get('room')
    emit('send-image', {'img': image}, broadcast=True, room=room)


@socketio.on('name', namespace='/')
def receive_username(name):
    users[name] = request.sid
    print('Username added!')


@socketio.on('private_message', namespace='/private')
def private_message(payload):
    recipient_session_id = users[payload['name']]
    message = payload['message']
    emit('new_private_message', message, room=recipient_session_id)

