document.addEventListener("DOMContentLoaded", () => {
    const spotifySection = document.getElementById("spotifycontent");

    fetch("/spotifyjam")
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                spotifySection.innerHTML = `
                    Ready to vibe with some awesome tunes? Click <a href="${data.url}">here</a> to join the jam and let the music take over!
                `;
            } else if (data.err) {
                spotifySection.innerHTML = `
                    Spotify Jam sessions only available and up to date during our raids on Wednesday and Thursday evening.
                `;
            } else {
                spotifySection.innerHTML = `
                    Spotify Jam sessions only available and up to date during our raids on Wednesday and Thursday evening.
                `;
            }
        })
        .catch(() => {
            spotifySection.innerHTML = `
                Spotify Jam sessions only available and up to date during our raids on Wednesday and Thursday evening.
            `;
        });
});
