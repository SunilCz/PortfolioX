let soundPlayer = {
    button: document.getElementById("sound-play-button"), // The ON/OFF button
    cloud: document.getElementById("sound-cloud"), // The cloud image
    audio: new Audio("./memrbt.mp3"), // The audio element

    setEvents: function () {
        this.button.addEventListener("click", this.toggleMusic.bind(this));
    },

    toggleMusic: function () {
        if (this.audio.paused) {
            this.playSound();
        } else {
            this.stopSound();
        }
    },

    playSound: function () {
        this.audio.play();
        this.button.classList.remove("red-colored");
        this.button.classList.add("blue-colored");
        this.button.innerHTML = "ON";
        this.cloud.classList.remove("red-colored");
        this.cloud.classList.add("blue-colored");
    },

    stopSound: function () {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.button.classList.remove("blue-colored");
        this.button.classList.add("red-colored");
        this.button.innerHTML = "OFF";
        this.cloud.classList.remove("blue-colored");
        this.cloud.classList.add("red-colored");
    },
};

soundPlayer.setEvents();
