function appendImageMessage(data) {
    var messageContainer = document.getElementById('message-container');
    messageContainer.appendChild(createImageMessageDOM(data))
}

function createImageMessageDOM(data) {
    var img = document.createElement("img");
    var str = String.fromCharCode.apply(null, new Uint8Array(data.binary));
    img.src = 'data:image/jpg;base64,' + btoa(str);
    img.style.width = '100%';
}