function handleFileSelect(ele){
    var file = ele.target.files[0];
    var fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
        var arrayBuffer = fileReader.result;
        socketControl.uploadImage({
            name: file.name,
            type: file.type,
            size: file.size,
            binary: arrayBuffer
         });
     }
}