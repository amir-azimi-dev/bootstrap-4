document.addEventListener("alpine:init", () => {
    Alpine.data("darkTheme", () => ({
        darkMode: localStorage.getItem("bs-theme") === "dark",

        init() {
            this.$watch("darkMode", value => {
                value ? localStorage.setItem("bs-theme", "dark") : localStorage.setItem("bs-theme", "light");
            })
        }
    }));

    Alpine.data("countdown", () => ({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",

        setCountdown(remindTime) {
            let remindDays = Math.round(remindTime / (24 * 60 * 60 * 1000));
            let remindHours = Math.floor(remindTime % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
            let remindMinutes = Math.floor(remindTime % (60 * 60 * 1000) / (60 * 1000));
            let remindSeconds = String(Math.floor(remindTime % (60 * 1000) / (1000))).padStart(2, "0");

            this.days = String(remindDays).padStart(2, "0");
            this.hours = String(remindHours).padStart(2, "0");
            this.minutes = String(remindMinutes).padStart(2, "0");
            this.seconds = String(remindSeconds).padStart(2, "0");
        },

        init() {
            let endDate = new Date(2023, 8, 10);
            let remindTime = endDate.getTime() - (new Date()).getTime();
            this.setCountdown(remindTime);

            let countDownInterval = setInterval(() => {
                remindTime = endDate.getTime() - (new Date()).getTime();
                if (remindTime <= 0) {
                    return clearInterval(countDownInterval);
                }
                this.setCountdown(remindTime);
            }, 1000);
        }
    }));
});

const typeWriter = new Typewriter("#typewriter", {
    loop: true,
    delay: 100,
});

typeWriter
    .start()
    .typeString("متن ساختگی با تولید نامفهوم")
    .pauseFor(500)
    .deleteAll()
    .typeString("متن ساختگی ...")
    .deleteAll()
    .pauseFor(500)

const map = L.map('map').setView([35.735975, 51.189967], 14);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([35.735975, 51.189967]).bindPopup("AmirWeb").addTo(map).openPopup();