

class SubmitData {
    constructor(uri, textInputs, fileInputs) {
        // Create a form element that accepts mp3 files
        this.form = document.createElement('form');
        this.form.setAttribute('method', 'post');
        this.form.setAttribute('action', uri);
        this.form.setAttribute('enctype', 'multipart/form-data');
        this.form.style.display = 'none';
        textInputs.forEach(input => this.addInput(this.createTextInput(input.name, input.value)));
        fileInputs.forEach(input => this.addInput(this.createFileInput(input.name, input.value)));
    }

    createTextInput(name, value) {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', name);
        input.setAttribute('value', value);
        return input;
    }
    // add a file input to the form
    createFileInput(name, dataTransferContainer) {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('name', name);
        input.setAttribute('accept', 'audio/mpeg');
        input.files = dataTransferContainer.files;
        return input;
    }
    // Add input element to this.form
    addInput(input) {
        this.form.appendChild(input);
    }
    // submit this.form
    submit() {
        // Add form to document
        document.body.appendChild(this.form);
        this.form.submit();
        // Remove form from document
        document.body.removeChild(this.form);
    }
}

function downloadFile(blob, filename) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}