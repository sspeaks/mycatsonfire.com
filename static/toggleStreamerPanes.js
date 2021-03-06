

(async function () {
    const panes = document.querySelectorAll('.streamer-pane');
    const watchHim = document.querySelector('#watch-him');

    const results = await Promise.all(favStreamers
        .map(async (streamer) => {
            const isLive = await axios.get(`/isActive/${streamer}`).then(response => response.data.isLive);
            return { streamer, isLive };
        }));

    const streamer = results.find(result => result.isLive)?.streamer;

    if (typeof (streamer) !== "undefined") {
        watchHim.innerHTML = watchHim.innerHTML.replace("Mainteam7", streamer);

        new Twitch.Embed("twitch-embed", {
            channel: streamer,
            layout: 'video',
            width: '90%',
            height: '90%',
            // only needed if your site is also embedded on embed.example.com and othersite.example.com 
            parent: ["mycatsonfire.com", "localhost"]
        });

        panes.forEach(pane => {
            pane.style.opacity = 1;
        });

        return;
    }
    panes.forEach(pane => {
        pane.style.display = "none";
    })

})();

// Temporary for now, just to test
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const sub = getCookie('subject');

if (sub) {
    const name = sub.match(/CN=(.*?),/)[1]
    document.querySelector('#subjectName').innerHTML = name;
}