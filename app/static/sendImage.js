<body>
    <div id="message-container"></div>
    <script>
        socket.on("send-image", function(data){
            appendImageMessage(data)
        })
    </script>
</body>