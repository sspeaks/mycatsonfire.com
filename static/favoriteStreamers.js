const favStreamers = [
    "bloodfox610",
    "mainteam7",
    "One_Promise",
    "Brodock085",
    "day9tv",
    "xaryu"
];

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