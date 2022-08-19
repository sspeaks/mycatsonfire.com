const ffmpeg = require("ffmpeg.js/ffmpeg-mp4.js");
(() => {
    let stdout = "";
    let stderr = "";
    // Print FFmpeg's version.
    ffmpeg({
        arguments: ["-version"],
        print: function (data) { stdout += data + "\n"; },
        printErr: function (data) { stderr += data + "\n"; },
        onExit: function (code) {
            console.log("Process exited with code " + code);
            console.log(stdout);
            console.log(stderr);
        },
    });

    const videoNode = document.querySelector('#ffmpeg-video');
    const inputNode = document.querySelector('#file');
    const startNode = document.querySelector('#start');
    const durNode = document.querySelector('#dur');
    const playClipButton = document.querySelector("#playClip");
    const submitButton = document.querySelector('#submit');

    let timeoutVal = null;
    let playingFile = null;

    let videoLoaded = false;
    let shouldUpdateStart = true;
    const conditionalShowPlayClipButton = () => (playClipButton.style.display != 'block' && videoLoaded && startNode.value && durNode.value) ? playClipButton.style.display = 'block' : '';

    // Setup time update listener
    function padNumber(num) {
        let str = (Math.round(num * 10) / 10) + "";
        const trimmed_string = str.includes('.') ? str.substring(0, str.indexOf('.')) : str;
        if (trimmed_string.length < 2) {
            str = "0" + str;
        }
        return str;
    }
    function onTimeUpdate(event) {
        if (videoLoaded && shouldUpdateStart) {
            const currentTime = event.srcElement.currentTime;

            const hours = Math.floor(currentTime / (60 * 60));
            const minutes = Math.floor(currentTime / 60) % 60;
            const seconds = currentTime % 60;

            const setVal = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`
            startNode.value = setVal;
        }
    }

    function showPlayClip(event) {
        event.preventDefault();
        event.stopPropagation();
        if (timeoutVal != null) {
            clearTimeout(timeoutVal);
            timeoutVal = null;
        }
        const startTimeString = startNode.value;
        const durString = durNode.value;

        if (!/\d+(\.\d+)?/.test(durString)) {
            alert(`Duration must be a number (with an optional decimal place). Found ${durString} instead`);
            return;
        }
        if (!/\d\d:\d\d:\d\d(\.\d+)?/.test(startTimeString)) {
            alert(`Start must be of the form HH:MM:SS with an optional decimal place on SS. Found ${startTimeString} instead`);
            return;
        }
        const matchVal = startTimeString.match(/(\d\d):(\d\d):(\d\d(?:\.\d)?)/)
        const currentTimeinSeconds = 3600 * parseFloat(matchVal[1]) + 60 * parseFloat(matchVal[2]) + parseFloat(matchVal[3]);
        videoNode.currentTime = currentTimeinSeconds;
        shouldUpdateStart = false;
        timeoutVal = setTimeout(() => {
            videoNode.pause();
            setTimeout(() => shouldUpdateStart = true, 0);
        }, parseFloat(durString) * 1000)
        videoNode.play();
    }

    startNode.addEventListener('input', conditionalShowPlayClipButton, false);
    durNode.addEventListener('input', conditionalShowPlayClipButton, false);
    playClipButton.addEventListener('click', showPlayClip, false);
    videoNode.addEventListener('timeupdate', onTimeUpdate, false);

    // Setup playback listener
    function playSelectedFile(event) {
        event.preventDefault();
        event.stopPropagation();
        const file = event.currentTarget.files[0]
        playingFile = file;
        videoNode.src = URL.createObjectURL(file);
        videoLoaded = true;
        videoNode.style.display = 'block';

        conditionalShowPlayClipButton()
    }
    inputNode.addEventListener('change', playSelectedFile, false);


    async function runFFmpeg() {
        const { name } = playingFile
        const targetName = "trimmed_" + name.substring(0, name.indexOf('.')) + ".mp3"
        await ffmpeg.load();
        ffmpeg.FS('writeFile', name, await fetchFile(playingFile));
        await ffmpeg.run('-ss', startNode.value, '-t', durNode.value, '-i', name, targetName);
        const data = ffmpeg.FS('readFile', targetName);
        videoNode.src = URL.createObjectURL(new Blob[data.buffer], { type: "audio/mp3" });
    }
    submitButton.addEventListener('click', runFFmpeg, false);
})()