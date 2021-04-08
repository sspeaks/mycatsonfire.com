(function () {
    const table = document.querySelector('#commentTable');
    const form = document.querySelector("#myForm");

    function getComments() {
        table.innerHTML = '';
        // axios.get('https://mycatsonfire.azurewebsites.net/api/getcomments?code=evvfan5MMgcwDJmcRR9MxakjW2vxc68hdL5vtwaxaWpvibJQP0eBsg%3D%3D').then(body => {
        axios.get('/get-comments').then(body => {
            console.log(body);
            body && body.data && body.data.forEach(message => {
                console.log(message)
                const row = table.insertRow(-1);
                const nametd = row.insertCell(0);
                nametd.innerHTML = message.name;
                const dateTd = row.insertCell(1);
                dateTd.innerHTML = message.date;
                const messagetd = row.insertCell(2);
                messagetd.innerHTML = message.message;
            });
        });
    }
    getComments();
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const request = new XMLHttpRequest();
        request.open("POST", "/add-comment");
        const formData = new FormData(form)
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object);
        request.send(json);

        form.reset();

        setTimeout(() => getComments(), 5000);
        return false;
    });
})();