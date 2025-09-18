// read out the value set in the settings form
function setSettings() {
    var time = document.querySelector('input[name="time"]:checked').value;
    localStorage.setItem('time', time);
}
function loadSettings() {
    var time = localStorage.getItem('time');
    if (time) {
        document.querySelector('input[name="time"][value="' + time + '"]').checked = true;
    }
}