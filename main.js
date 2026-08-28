/* ==========================================================================
   BIRTHDAY WEBSITE
   FULL JAVASCRIPT
   Every secret now produces a noticeable webpage effect.

   REMOVED:
   - Fast-mouse sparkle secret
   - Mouse-leaving / "stop leaving me" ghost secret
========================================================================== */


/* ==========================================================================
   SECRET EFFECT STYLES
========================================================================== */

(function installSecretEffectStyles() {
    const style = document.createElement("style");

    style.textContent = `
        .secret-page-flash {
            position: fixed;
            inset: 0;
            z-index: 29990;
            pointer-events: none;
            opacity: 0;
            transition: opacity .25s ease;
        }

        .secret-page-flash.visible {
            opacity: 1;
        }

        .secret-badge {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(.7);
            z-index: 30000;
            padding: 18px 26px;
            border: 1px solid rgba(255,255,255,.35);
            border-radius: 16px;
            background: rgba(4,10,14,.94);
            color: #fff;
            font-family: "DM Mono", monospace;
            font-size: .8rem;
            letter-spacing: .12em;
            text-align: center;
            box-shadow: 0 20px 70px rgba(0,0,0,.45);
            opacity: 0;
            pointer-events: none;
            transition: opacity .35s ease, transform .35s ease;
        }

        .secret-badge.visible {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .secret-ripple {
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid currentColor;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(1);
            z-index: 29995;
            pointer-events: none;
            animation: secretRipple 1s ease-out forwards;
        }

        @keyframes secretRipple {
            to {
                width: 500px;
                height: 500px;
                opacity: 0;
            }
        }

        .secret-scanline {
            position: fixed;
            left: 0;
            top: -10px;
            width: 100%;
            height: 4px;
            z-index: 29998;
            pointer-events: none;
            background: linear-gradient(
                90deg,
                transparent,
                currentColor,
                transparent
            );
            box-shadow: 0 0 25px currentColor;
            animation: secretScanline 1.3s linear forwards;
        }

        @keyframes secretScanline {
            to {
                transform: translateY(110vh);
                opacity: 0;
            }
        }

        .secret-glitch {
            animation: secretGlitch .65s steps(2, end);
        }

        @keyframes secretGlitch {
            0% {
                transform: translateX(0);
                filter: none;
            }

            20% {
                transform: translateX(-5px);
                filter: hue-rotate(70deg);
            }

            40% {
                transform: translateX(5px);
                filter: invert(.12);
            }

            60% {
                transform: translateX(-4px);
                filter: hue-rotate(-70deg);
            }

            80% {
                transform: translateX(3px);
                filter: saturate(2);
            }

            100% {
                transform: translateX(0);
                filter: none;
            }
        }

        .secret-chromatic {
            animation: secretChromatic .8s ease;
        }

        @keyframes secretChromatic {
            0%,100% {
                filter: none;
            }

            25% {
                filter: saturate(2) hue-rotate(35deg);
            }

            50% {
                filter: saturate(1.7) hue-rotate(-35deg);
            }

            75% {
                filter: saturate(2) hue-rotate(70deg);
            }
        }

        .secret-shockwave {
            position: fixed;
            inset: 0;
            z-index: 29980;
            pointer-events: none;
            background:
                radial-gradient(
                    circle,
                    rgba(255,255,255,.22),
                    transparent 12%,
                    rgba(255,255,255,.04) 13%,
                    transparent 38%
                );
            animation: shockwave 1s ease-out forwards;
        }

        @keyframes shockwave {
            from {
                opacity: 1;
                transform: scale(.1);
            }

            to {
                opacity: 0;
                transform: scale(2.6);
            }
        }

        .secret-star {
            position: fixed;
            z-index: 29999;
            pointer-events: none;
            animation: secretStar 1.2s ease-out forwards;
        }

        @keyframes secretStar {
            0% {
                opacity: 1;
                transform: scale(.5) rotate(0deg);
            }

            100% {
                opacity: 0;
                transform:
                    translate(
                        calc(var(--sx) * 100px),
                        calc(var(--sy) * 100px)
                    )
                    scale(.1)
                    rotate(360deg);
            }
        }

        .cinema-bars-secret {
            position: fixed;
            left: 0;
            width: 100%;
            height: 10vh;
            background: #000;
            z-index: 29950;
            pointer-events: none;
            transform: scaleY(0);
            transition: transform .6s ease;
        }

        .cinema-bars-secret.top {
            top: 0;
            transform-origin: top;
        }

        .cinema-bars-secret.bottom {
            bottom: 0;
            transform-origin: bottom;
        }

        .cinema-bars-secret.visible {
            transform: scaleY(1);
        }

        .secret-letterbox {
            transform: scale(.985);
            filter: brightness(.83) contrast(1.08) saturate(.82);
            transition: .8s ease;
        }

        .arcade-secret-active {
            animation: arcadeSecretActive .8s ease;
        }

        @keyframes arcadeSecretActive {
            0%,100% {
                filter: none;
            }

            25% {
                filter: saturate(1.6) contrast(1.15);
            }

            50% {
                filter: brightness(1.2) saturate(1.8);
            }

            75% {
                filter: contrast(1.3);
            }
        }

        .birthday-debug-grid {
            position: fixed;
            inset: 0;
            z-index: 29940;
            pointer-events: none;
            opacity: 0;
            transition: opacity .4s ease;
            background:
                linear-gradient(
                    rgba(79,255,232,.05) 1px,
                    transparent 1px
                ),
                linear-gradient(
                    90deg,
                    rgba(79,255,232,.05) 1px,
                    transparent 1px
                );
            background-size: 35px 35px;
        }

        .birthday-debug-grid.visible {
            opacity: 1;
        }

        .secret-spotlight {
            position: fixed;
            inset: 0;
            z-index: 29900;
            pointer-events: none;
            background:
                radial-gradient(
                    circle at var(--spot-x,50%) var(--spot-y,50%),
                    transparent 0,
                    transparent 12%,
                    rgba(0,0,0,.56) 45%,
                    rgba(0,0,0,.82) 100%
                );
            opacity: 0;
            transition: opacity .5s ease;
        }

        .secret-spotlight.visible {
            opacity: 1;
        }

        .secret-target-highlight {
            position: relative;
            z-index: 29910 !important;
            transform: scale(1.02);
            transition: transform .5s ease;
        }

        .secret-installation {
            position: absolute;
            right: 16px;
            top: 14px;
            padding: 5px 9px;
            border-radius: 999px;
            background: rgba(0,0,0,.08);
            border: 1px solid rgba(0,0,0,.2);
            font: .58rem "DM Mono", monospace;
            letter-spacing: .08em;
            color: #061517;
            opacity: 0;
            transform: translateY(-5px);
            transition: .4s ease;
        }

        .secret-installation.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .corner-coordinate-secret {
            position: fixed;
            left: 12px;
            top: 12px;
            z-index: 29999;
            padding: 10px 12px;
            background: rgba(5,15,19,.92);
            border: 1px solid rgba(79,255,232,.25);
            border-radius: 10px;
            color: #4fffe8;
            font: .65rem/1.6 "DM Mono", monospace;
            opacity: 0;
            transform: translateY(-8px);
            transition: .4s ease;
            pointer-events: none;
        }

        .corner-coordinate-secret.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .memory-fragment-secret {
            position: fixed;
            left: 50%;
            top: 50%;
            z-index: 29990;
            transform: translate(-50%,-50%) scale(.85);
            width: min(500px,calc(100% - 40px));
            padding: 28px;
            border-radius: 18px;
            background: rgba(5,15,19,.96);
            border: 1px solid rgba(79,255,232,.3);
            color: #4fffe8;
            font: .8rem/1.8 "DM Mono", monospace;
            text-align: center;
            opacity: 0;
            transition: .5s ease;
            pointer-events: none;
        }

        .memory-fragment-secret.visible {
            opacity: 1;
            transform: translate(-50%,-50%) scale(1);
        }
    `;

    document.head.appendChild(style);
})();


/* ==========================================================================
   COUNTDOWN
========================================================================== */

const lockScreen =
    document.getElementById("birthday-lock-screen");

const countdownDays =
    document.getElementById("countdown-days");

const countdownHours =
    document.getElementById("countdown-hours");

const countdownMinutes =
    document.getElementById("countdown-minutes");

const countdownSeconds =
    document.getElementById("countdown-seconds");

const countdownStatus =
    document.getElementById("countdown-status");

let birthdayCountdownInterval = null;


/* ==========================================================================
   IST TIME
========================================================================== */

function getIndiaDateParts() {
    const formatter =
        new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        });

    const parts =
        formatter.formatToParts(new Date());

    const values = {};

    parts.forEach(function (part) {
        if (part.type !== "literal") {
            values[part.type] =
                part.value;
        }
    });

    return {
        year: Number(values.year),
        month: Number(values.month),
        day: Number(values.day),
        hour: Number(values.hour),
        minute: Number(values.minute),
        second: Number(values.second)
    };
}


/* ==========================================================================
   BIRTHDAY TARGET
========================================================================== */

function getBirthdayTarget() {
    const india =
        getIndiaDateParts();

    let target =
        new Date(
            Date.UTC(
                india.year,
                7,
                28,
                18,
                30,
                0,
                0
            )
        );

    if (
        india.month === 8 &&
        india.day >= 29
    ) {
        target =
            new Date(
                Date.UTC(
                    india.year + 1,
                    7,
                    28,
                    18,
                    30,
                    0,
                    0
                )
            );
    }

    return target;
}

function isBirthdayToday() {
    const india =
        getIndiaDateParts();

    return (
        india.month === 8 &&
        india.day === 29
    );
}

function formatNumber(number) {
    return String(number).padStart(2, "0");
}


/* ==========================================================================
   COUNTDOWN EFFECTS
========================================================================== */

let countdownEffectStage =
    "normal";

let tenMinutePartyStarted =
    false;

let oneMinutePartyStarted =
    false;

function resetCountdownEffectClasses() {
    document.body.classList.remove(
        "countdown-normal",
        "countdown-3-hours",
        "countdown-2-hours",
        "countdown-1-hour",
        "countdown-30-minutes",
        "countdown-10-minutes",
        "countdown-1-minute"
    );
}

function updateCountdownEffects(totalSeconds) {
    let newStage = "normal";

    if (totalSeconds <= 60) {
        newStage = "1-minute";
    } else if (totalSeconds <= 600) {
        newStage = "10-minutes";
    } else if (totalSeconds <= 1800) {
        newStage = "30-minutes";
    } else if (totalSeconds <= 3600) {
        newStage = "1-hour";
    } else if (totalSeconds <= 7200) {
        newStage = "2-hours";
    } else if (totalSeconds <= 10800) {
        newStage = "3-hours";
    }

    if (
        newStage !==
        countdownEffectStage
    ) {
        countdownEffectStage =
            newStage;

        resetCountdownEffectClasses();

        document.body.classList.add(
            "countdown-" + newStage
        );
    }

    if (
        totalSeconds <= 600 &&
        !tenMinutePartyStarted
    ) {
        tenMinutePartyStarted = true;
        triggerTenMinuteParty();
    }

    if (
        totalSeconds <= 60 &&
        !oneMinutePartyStarted
    ) {
        oneMinutePartyStarted = true;
        triggerOneMinuteParty();
    }
}


/* ==========================================================================
   UPDATE COUNTDOWN
========================================================================== */

function updateBirthdayCountdown() {
    if (!lockScreen) {
        return;
    }

    if (isBirthdayToday()) {
        unlockBirthdayWebsite();
        return;
    }

    const difference =
        getBirthdayTarget().getTime() -
        Date.now();

    if (difference <= 0) {
        unlockBirthdayWebsite();
        return;
    }

    const totalSeconds =
        Math.floor(
            difference / 1000
        );

    const days =
        Math.floor(
            totalSeconds / 86400
        );

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    if (countdownDays) {
        countdownDays.textContent =
            formatNumber(days);
    }

    if (countdownHours) {
        countdownHours.textContent =
            formatNumber(hours);
    }

    if (countdownMinutes) {
        countdownMinutes.textContent =
            formatNumber(minutes);
    }

    if (countdownSeconds) {
        countdownSeconds.textContent =
            formatNumber(seconds);
    }

    if (countdownStatus) {
        countdownStatus.textContent =
            "SYSTEM LOCKED";
    }

    updateCountdownEffects(
        totalSeconds
    );
}


/* ==========================================================================
   UNLOCK
========================================================================== */

function unlockBirthdayWebsite() {
    if (birthdayCountdownInterval) {
        clearInterval(
            birthdayCountdownInterval
        );

        birthdayCountdownInterval =
            null;
    }

    resetCountdownEffectClasses();

    document.body.classList.remove(
        "birthday-locked"
    );

    document.body.classList.add(
        "birthday-unlocked"
    );

    if (countdownStatus) {
        countdownStatus.textContent =
            "ACCESS GRANTED";
    }

    setTimeout(function () {
        if (lockScreen) {
            lockScreen.remove();
        }
    }, 2200);
}

function initializeBirthdayLock() {
    if (isBirthdayToday()) {
        document.body.classList.add(
            "birthday-unlocked"
        );

        if (countdownStatus) {
            countdownStatus.textContent =
                "ACCESS GRANTED";
        }

        setTimeout(function () {
            if (lockScreen) {
                lockScreen.remove();
            }
        }, 2200);

        return;
    }

    document.body.classList.add(
        "birthday-locked"
    );

    updateBirthdayCountdown();

    birthdayCountdownInterval =
        setInterval(
            updateBirthdayCountdown,
            1000
        );
}

initializeBirthdayLock();


/* ==========================================================================
   HELPERS
========================================================================== */

function isUnlocked() {
    return document.body.classList.contains(
        "birthday-unlocked"
    );
}

function flashPage(
    color = "rgba(79,255,232,.18)",
    duration = 500
) {
    const flash =
        document.createElement("div");

    flash.className =
        "secret-page-flash";

    flash.style.background =
        color;

    document.body.appendChild(
        flash
    );

    requestAnimationFrame(function () {
        flash.classList.add("visible");
    });

    setTimeout(function () {
        flash.classList.remove(
            "visible"
        );
    }, duration / 2);

    setTimeout(function () {
        flash.remove();
    }, duration);
}

function showSecretBadge(
    text,
    duration = 1800
) {
    const badge =
        document.createElement("div");

    badge.className =
        "secret-badge";

    badge.textContent =
        text;

    document.body.appendChild(
        badge
    );

    requestAnimationFrame(function () {
        badge.classList.add(
            "visible"
        );
    });

    setTimeout(function () {
        badge.classList.remove(
            "visible"
        );
    }, duration);

    setTimeout(function () {
        badge.remove();
    }, duration + 400);
}

function createRipple(
    x,
    y,
    color = "#4fffe8"
) {
    const ripple =
        document.createElement(
            "div"
        );

    ripple.className =
        "secret-ripple";

    ripple.style.left =
        x + "px";

    ripple.style.top =
        y + "px";

    ripple.style.color =
        color;

    document.body.appendChild(
        ripple
    );

    setTimeout(function () {
        ripple.remove();
    }, 1100);
}

function createScanline(
    color = "#4fffe8"
) {
    const scan =
        document.createElement(
            "div"
        );

    scan.className =
        "secret-scanline";

    scan.style.color =
        color;

    document.body.appendChild(
        scan
    );

    setTimeout(function () {
        scan.remove();
    }, 1400);
}

function glitchElement(element) {
    if (!element) {
        return;
    }

    element.classList.remove(
        "secret-glitch"
    );

    void element.offsetWidth;

    element.classList.add(
        "secret-glitch"
    );

    setTimeout(function () {
        element.classList.remove(
            "secret-glitch"
        );
    }, 700);
}

function chromaticPage() {
    document.body.classList.remove(
        "secret-chromatic"
    );

    void document.body.offsetWidth;

    document.body.classList.add(
        "secret-chromatic"
    );

    setTimeout(function () {
        document.body.classList.remove(
            "secret-chromatic"
        );
    }, 850);
}

function shockwave() {
    const wave =
        document.createElement(
            "div"
        );

    wave.className =
        "secret-shockwave";

    document.body.appendChild(
        wave
    );

    setTimeout(function () {
        wave.remove();
    }, 1100);
}

function starBurst(
    x,
    y,
    symbols = [
        "✦",
        "✧",
        "✨",
        "★"
    ]
) {
    for (
        let i = 0;
        i < 12;
        i++
    ) {
        const star =
            document.createElement(
                "div"
            );

        star.className =
            "secret-star";

        star.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                        symbols.length
                )
            ];

        star.style.left =
            x + "px";

        star.style.top =
            y + "px";

        star.style.fontSize =
            10 +
            Math.random() *
                18 +
            "px";

        star.style.setProperty(
            "--sx",
            Math.random() * 2 - 1
        );

        star.style.setProperty(
            "--sy",
            Math.random() * 2 - 1
        );

        document.body.appendChild(
            star
        );

        setTimeout(function () {
            star.remove();
        }, 1300);
    }
}

function spotlightElement(
    element,
    duration = 2600
) {
    if (!element) {
        return;
    }

    const rect =
        element.getBoundingClientRect();

    const spotlight =
        document.createElement(
            "div"
        );

    spotlight.className =
        "secret-spotlight";

    spotlight.style.setProperty(
        "--spot-x",
        rect.left +
            rect.width / 2 +
            "px"
    );

    spotlight.style.setProperty(
        "--spot-y",
        rect.top +
            rect.height / 2 +
            "px"
    );

    document.body.appendChild(
        spotlight
    );

    element.classList.add(
        "secret-target-highlight"
    );

    requestAnimationFrame(
        function () {
            spotlight.classList.add(
                "visible"
            );
        }
    );

    setTimeout(function () {
        spotlight.classList.remove(
            "visible"
        );

        element.classList.remove(
            "secret-target-highlight"
        );
    }, duration);

    setTimeout(function () {
        spotlight.remove();
    }, duration + 600);
}

function pageGlow(
    element,
    duration = 1500
) {
    if (!element) {
        return;
    }

    element.classList.remove(
        "secret-glow-pulse"
    );

    void element.offsetWidth;

    element.classList.add(
        "secret-glow-pulse"
    );

    setTimeout(function () {
        element.classList.remove(
            "secret-glow-pulse"
        );
    }, duration);
}


/* ==========================================================================
   THEME
========================================================================== */

const themeSwitch =
    document.getElementById(
        "theme-switch"
    );

const themeSwitchText =
    document.getElementById(
        "theme-switch-text"
    );

const themeIcon =
    document.getElementById(
        "theme-icon"
    );

function updateThemeButton() {
    const pinkMode =
        document.body.classList.contains(
            "theme-pink"
        );

    if (themeSwitchText) {
        themeSwitchText.textContent =
            pinkMode
                ? "PINK MODE"
                : "BLUE MODE";
    }

    if (themeIcon) {
        themeIcon.textContent =
            pinkMode
                ? "🌸"
                : "🌲";
    }

    if (themeSwitch) {
        themeSwitch.setAttribute(
            "aria-label",
            pinkMode
                ? "Switch to blue theme"
                : "Switch to pink theme"
        );
    }
}

function toggleTheme() {
    document.body.classList.toggle(
        "theme-pink"
    );

    const pinkMode =
        document.body.classList.contains(
            "theme-pink"
        );

    localStorage.setItem(
        "birthday-theme",
        pinkMode
            ? "pink"
            : "blue"
    );

    updateThemeButton();

    flashPage(
        pinkMode
            ? "rgba(255,111,174,.18)"
            : "rgba(79,255,232,.16)",
        600
    );
}

if (themeSwitch) {
    themeSwitch.addEventListener(
        "click",
        toggleTheme
    );
}

if (
    localStorage.getItem(
        "birthday-theme"
    ) === "pink"
) {
    document.body.classList.add(
        "theme-pink"
    );
}

updateThemeButton();


/* ==========================================================================
   COUNTDOWN PARTIES
========================================================================== */

function triggerTenMinuteParty() {
    if (
        typeof confetti !==
        "function"
    ) {
        return;
    }

    flashPage(
        "rgba(186,255,106,.18)",
        900
    );

    confetti({
        particleCount: 180,
        spread: 160,
        startVelocity: 55,
        gravity: 0.8,
        ticks: 300,
        origin: {
            x: 0.5,
            y: 0.65
        }
    });

    let bursts = 0;

    const interval =
        setInterval(
            function () {
                confetti({
                    particleCount: 18,
                    spread: 100,
                    startVelocity: 35,
                    gravity: 0.8,
                    origin: {
                        x:
                            Math.random() *
                            0.35,
                        y: 0.9
                    }
                });

                confetti({
                    particleCount: 18,
                    spread: 100,
                    startVelocity: 35,
                    gravity: 0.8,
                    origin: {
                        x:
                            0.65 +
                            Math.random() *
                                0.35,
                        y: 0.9
                    }
                });

                bursts++;

                if (bursts >= 15) {
                    clearInterval(
                        interval
                    );
                }
            },
            450
        );
}

function triggerOneMinuteParty() {
    flashPage(
        "rgba(79,255,232,.2)",
        1000
    );

    shockwave();

    if (
        typeof confetti ===
        "function"
    ) {
        confetti({
            particleCount: 350,
            spread: 180,
            startVelocity: 70,
            gravity: 0.75,
            ticks: 400,
            origin: {
                x: 0.5,
                y: 0.6
            }
        });

        confetti({
            particleCount: 150,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            gravity: 0.8,
            origin: {
                x: 0,
                y: 1
            }
        });

        confetti({
            particleCount: 150,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            gravity: 0.8,
            origin: {
                x: 1,
                y: 1
            }
        });
    }

    startCountdownPartyObjects();
}

function startCountdownPartyObjects() {
    let count = 0;

    const interval =
        setInterval(
            function () {
                createCountdownPartyObject();

                count++;

                if (count >= 45) {
                    clearInterval(
                        interval
                    );
                }
            },
            250
        );
}

function createCountdownPartyObject() {
    const object =
        document.createElement(
            "div"
        );

    object.className =
        "countdown-party-object";

    if (
        Math.random() <
        0.55
    ) {
        object.classList.add(
            "countdown-balloon"
        );

        object.textContent =
            "🎈";
    } else {
        object.classList.add(
            "countdown-cake"
        );

        object.textContent =
            Math.random() <
            0.5
                ? "🎂"
                : "🧁";
    }

    object.style.left =
        Math.random() *
            100 +
        "vw";

    object.style.animationDuration =
        3 +
        Math.random() *
            3 +
        "s";

    document.body.appendChild(
        object
    );

    setTimeout(function () {
        object.remove();
    }, 7000);
}


/* ==========================================================================
   AUDIO
========================================================================== */

const clickAudio =
    document.getElementById(
        "click-audio"
    );

const backgroundAudio =
    document.getElementById(
        "background-audio"
    );

const bdayAudio =
    document.getElementById(
        "bday-audio"
    );

const danceAudio =
    document.getElementById(
        "dance-audio"
    );

const muteBtn =
    document.getElementById(
        "mute-toggle"
    );

let audioStarted = false;
let isMuted = false;

function playClick() {
    if (
        !isUnlocked() ||
        !clickAudio
    ) {
        return;
    }

    clickAudio.currentTime =
        0;

    clickAudio
        .play()
        .catch(
            function () {}
        );
}

function startBackgroundAudio() {
    if (
        !isUnlocked() ||
        audioStarted ||
        !backgroundAudio
    ) {
        return;
    }

    audioStarted = true;

    backgroundAudio.loop =
        true;

    backgroundAudio
        .play()
        .catch(
            function () {}
        );
}

document.addEventListener(
    "click",
    startBackgroundAudio
);

if (danceAudio) {
    danceAudio.addEventListener(
        "ended",
        function () {
            if (!backgroundAudio) {
                return;
            }

            backgroundAudio.currentTime =
                0;

            backgroundAudio
                .play()
                .catch(
                    function () {}
                );
        }
    );
}

if (bdayAudio) {
    bdayAudio.addEventListener(
        "ended",
        function () {
            if (!backgroundAudio) {
                return;
            }

            backgroundAudio.currentTime =
                0;

            backgroundAudio
                .play()
                .catch(
                    function () {}
                );
        }
    );
}

if (muteBtn) {
    muteBtn.addEventListener(
        "click",
        function () {
            isMuted =
                !isMuted;

            [
                backgroundAudio,
                bdayAudio,
                danceAudio,
                clickAudio
            ].forEach(
                function (audio) {
                    if (audio) {
                        audio.muted =
                            isMuted;
                    }
                }
            );

            muteBtn.textContent =
                isMuted
                    ? "🔇"
                    : "🔊";
        }
    );
}


/* ==========================================================================
   PAGE REFERENCES
========================================================================== */

const blackOut =
    document.querySelector(
        ".black-screen"
    );

const foodButtons =
    document.querySelectorAll(
        ".food-button"
    );

const affordtext =
    document.getElementById(
        "afford-text"
    );

const chat =
    document.getElementById(
        "msg-card"
    );

const nextMsg =
    document.getElementById(
        "nextMessage"
    );

const shopButtons =
    document.querySelectorAll(
        ".shop-button"
    );

const shopaffordtext =
    document.getElementById(
        "shop-afford-text"
    );

const pageContent =
    document.getElementById(
        "page-content"
    );

const scrollProgress =
    document.getElementById(
        "scroll-progress"
    );

const avignaToast =
    document.getElementById(
        "avigna-toast"
    );

const secretLogo =
    document.getElementById(
        "secret-logo"
    );


/* ==========================================================================
   GAME VARIABLES
========================================================================== */

let money = 0;
let hungerPercent = 0;

let msgIndex = 0;

let boughtConvo = false;
let boughtMsg = false;
let boughtBlur = false;

let doblur = true;
let movieModeOn = false;

let foodBought = 0;
let warningGiven = false;
let foodieEndingTriggered =
    false;

let confettiStarted =
    false;


/* ==========================================================================
   TOAST
========================================================================== */

function showAvignaToast(message) {
    if (!avignaToast) {
        return;
    }

    clearTimeout(
        avignaToastTimeout
    );

    avignaToast.textContent =
        message;

    avignaToast.classList.add(
        "show"
    );

    avignaToastTimeout =
        setTimeout(
            function () {
                avignaToast.classList.remove(
                    "show"
                );
            },
            2600
        );
}

let avignaToastTimeout =
    null;

function showSecretToast(message) {
    showAvignaToast(
        "🔐 " + message
    );
}


/* ==========================================================================
   PAGE FILTER
========================================================================== */

let discoModeOn = false;
let rainbowModeOn = false;
let rainbowInterval =
    null;

function updatePageFilter() {
    if (!pageContent) {
        return;
    }

    const filters = [];

    if (doblur) {
        filters.push(
            `blur(${hungerPercent / 65}px)`
        );
    }

    if (movieModeOn) {
        filters.push(
            "grayscale(0.6)",
            "sepia(0.3)"
        );
    }

    if (rainbowModeOn) {
        filters.push(
            "hue-rotate(var(--rainbow-hue, 0deg))",
            "saturate(1.6)"
        );
    }

    pageContent.style.filter =
        filters.join(" ");
}


/* ==========================================================================
   MONEY
========================================================================== */

function refreshMoneyDisplay() {
    const display =
        document.getElementById(
            "display-money"
        );

    if (display) {
        display.textContent =
            "Money: $" +
            money;
    }

    if (affordtext) {
        affordtext.innerHTML =
            `<p>Money: $${money}</p>`;
    }

    if (shopaffordtext) {
        shopaffordtext.innerHTML =
            `<p>Money: $${money}</p>`;
    }
}

function updatemoney() {
    if (!isUnlocked()) {
        return;
    }

    money += 25;

    refreshMoneyDisplay();
}

function reducemoney(price) {
    money =
        Math.max(
            0,
            money - price
        );

    refreshMoneyDisplay();
}


/* ==========================================================================
   HUNGER
========================================================================== */

function refreshHungerDisplay() {
    const bar =
        document.querySelector(
            ".hunger-bar"
        );

    const label =
        document.querySelector(
            ".hunger-percentage"
        );

    if (bar) {
        bar.innerHTML =
            `<span style="width:${hungerPercent}%"></span>`;
    }

    if (label) {
        label.textContent =
            hungerPercent +
            "%";
    }
}

function hungerUpdate() {
    if (!isUnlocked()) {
        return;
    }

    if (
        hungerPercent <
        100
    ) {
        hungerPercent++;
    }

    refreshHungerDisplay();
    updatePageFilter();
}

const hungerInterval =
    setInterval(
        hungerUpdate,
        1000
    );

setInterval(
    updatemoney,
    1000
);


/* ==========================================================================
   SCROLL PROGRESS
========================================================================== */

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const scrollTop =
        window.scrollY ||
        document.documentElement
            .scrollTop;

    const documentHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;

    const percent =
        documentHeight > 0
            ? (
                scrollTop /
                documentHeight
            ) * 100
            : 0;

    scrollProgress.style.width =
        percent + "%";
}

window.addEventListener(
    "scroll",
    updateScrollProgress
);

window.addEventListener(
    "resize",
    updateScrollProgress
);

updateScrollProgress();


/* ==========================================================================
   TAB TITLE
========================================================================== */

const originalTitle =
    document.title;

document.addEventListener(
    "visibilitychange",
    function () {
        if (
            document.hidden
        ) {
            document.title =
                "come back pleamseee 🥺";
        } else {
            document.title =
                originalTitle;
        }
    }
);


/* ==========================================================================
   CHAT
========================================================================== */

const messages = [
    {
        name: "Neerav",
        text: "Hailoooo"
    },
    {
        name: "Avigna",
        text: "helloo"
    },
    {
        name: "Neerav",
        text: "Well there wasn't really any secret, it was a scam...500$ gone..."
    },
    {
        name: "Avigna",
        text: "fck u"
    },
    {
        name: "Neerav",
        text: "areeeee using such language on ur bday, so uncivilised"
    },
    {
        name: "Avigna",
        text: "......"
    },
    {
        name: "Neerav",
        text: "acha acha, happy birthday, eat some aloo, be better"
    },
    {
        name: "Avigna",
        text: "Thanksss"
    },
    {
        name: "Neerav",
        text: "btw there is a secret...but u will not get it, it is something u need to guess"
    },
    {
        name: "Avigna",
        text: "ki baje....bol naaaa"
    },
    {
        name: "Neerav",
        text: "😜😜😜😜 nahii"
    }
];

if (nextMsg) {
    nextMsg.addEventListener(
        "click",
        function () {
            playClick();

            if (!boughtConvo) {
                return;
            }

            if (
                msgIndex >=
                messages.length
            ) {
                return;
            }

            if (!chat) {
                return;
            }

            const message =
                messages[
                    msgIndex
                ];

            const p =
                document.createElement(
                    "p"
                );

            p.className =
                "messages";

            p.innerHTML =
                `<strong>${message.name}:</strong> ${message.text}`;

            chat.appendChild(p);

            msgIndex++;

            pageGlow(
                p,
                900
            );
        }
    );
}


/* ==========================================================================
   FOOD
========================================================================== */

foodButtons.forEach(
    function (button) {
        button.addEventListener(
            "click",
            function () {
                const price =
                    Number(
                        button.dataset.price
                    );

                const saturation =
                    Number(
                        button.dataset.saturation
                    );

                playClick();

                if (
                    money <
                        price ||
                    foodieEndingTriggered
                ) {
                    return;
                }

                reducemoney(price);

                foodBought++;

                hungerPercent -=
                    saturation;

                if (
                    hungerPercent <
                    0
                ) {
                    hungerPercent =
                        0;
                }

                refreshHungerDisplay();
                updatePageFilter();

                pageGlow(
                    button.closest(
                        ".food-card"
                    ),
                    700
                );

                if (
                    foodBought > 45 &&
                    !warningGiven
                ) {
                    warningGiven =
                        true;

                    alert(
                        "Stomach is about to burst, take it easy bhai"
                    );
                }

                if (
                    foodBought >=
                    25
                ) {
                    activateFoodieEnding();
                }
            }
        );
    }
);


/* ==========================================================================
   FOODIE ENDING
========================================================================== */

function activateFoodieEnding() {
    if (
        foodieEndingTriggered
    ) {
        return;
    }

    foodieEndingTriggered =
        true;

    clearInterval(
        hungerInterval
    );

    if (blackOut) {
        blackOut.classList.add(
            "black-out"
        );
    }

    flashPage(
        "rgba(255,60,60,.22)",
        800
    );

    const ending =
        document.createElement(
            "div"
        );

    ending.className =
        "foodie-ending-text";

    ending.innerHTML = `
        <div class="foodie-header">
            🚑 FOODIE EMERGENCY 🚑
        </div>

        <p>
            So… you ate
            <strong><em>everything.</em></strong>
        </p>

        <p>
            At first, it was fine.
            You ate one thing, then another,
            and honestly nobody judged you.
        </p>

        <p>
            But then you kept eating.
        </p>

        <p>
            Pizza? Gone.<br>
            Burger? Gone.<br>
            Momos? Absolutely demolished.
        </p>

        <p>
            Aur phir bhi ruk nahi rahi thi sali. 💀
        </p>

        <p>
            Itna khaya sala restaurant bankrupt ho gaya,
            koi sharam hai.
        </p>

        <p>
            Now... paramedics have appeared.
        </p>

        <p>
            They looked at u... they looked at the
            restaurant owner... and sighed.
        </p>

        <p>
            They put u in the ambulance...
            it couldn't move...
        </p>

        <p>
            sala tanki hai.
        </p>

        <p>
            The doctors were shipped to ur location
            but it was too late....
        </p>

        <p>
            <strong><em>
                SECRET ENDING UNLOCKED 💀
            </em></strong>
        </p>

        <p>
            Now restart and next time...
        </p>

        <p>
            please eat a little less.
        </p>

        <p>
            It's a bit concerning.
        </p>
    `;

    document.body.appendChild(
        ending
    );

    createRestartButton();
}


/* ==========================================================================
   RESTART
========================================================================== */

function createRestartButton() {
    if (
        document.querySelector(
            ".restart-button"
        )
    ) {
        return;
    }

    const button =
        document.createElement(
            "button"
        );

    button.className =
        "restart-button";

    button.textContent =
        "Restart Website";

    button.addEventListener(
        "click",
        function () {
            location.reload();
        }
    );

    document.body.appendChild(
        button
    );
}


/* ==========================================================================
   SHOP
========================================================================== */

shopButtons.forEach(
    function (button) {
        button.addEventListener(
            "click",
            function () {
                playClick();

                const price =
                    Number(
                        button.dataset.price
                    );

                const unlock =
                    button.dataset.unlock;

                if (
                    (
                        unlock ===
                            "conversation" &&
                        boughtConvo
                    ) ||
                    (
                        unlock ===
                            "message" &&
                        boughtMsg
                    ) ||
                    (
                        unlock ===
                            "blur" &&
                        boughtBlur
                    )
                ) {
                    return;
                }

                if (
                    money <
                    price
                ) {
                    pageGlow(
                        button,
                        800
                    );

                    showAvignaToast(
                        "💸 not enough money."
                    );

                    return;
                }

                reducemoney(price);

                if (
                    unlock ===
                    "conversation"
                ) {
                    boughtConvo =
                        true;

                    const icon =
                        document.getElementById(
                            "locked-chat"
                        );

                    if (icon) {
                        icon.textContent =
                            "🔓";
                    }
                }

                if (
                    unlock ===
                    "message"
                ) {
                    boughtMsg =
                        true;

                    const message =
                        document.getElementById(
                            "message"
                        );

                    const locked =
                        document.getElementById(
                            "locked-message"
                        );

                    if (message) {
                        message.classList.add(
                            "message-animation"
                        );

                        message.style.opacity =
                            "1";
                    }

                    if (locked) {
                        locked.textContent =
                            "🔓";
                    }
                }

                if (
                    unlock ===
                    "blur"
                ) {
                    doblur =
                        false;

                    boughtBlur =
                        true;

                    clearInterval(
                        hungerInterval
                    );

                    updatePageFilter();
                }

                button.textContent =
                    "Bought";

                button.style.background =
                    "black";

                activateShopInstalled(
                    button
                );

                refreshMoneyDisplay();

                checkGiftUnlock();

                flashPage(
                    "rgba(79,255,232,.08)",
                    450
                );
            }
        );
    }
);

function activateShopInstalled(button) {
    if (!button) {
        return;
    }

    const option =
        button.closest(
            ".shop-option"
        );

    if (!option) {
        return;
    }

    option.classList.add(
        "secret-border"
    );

    let badge =
        option.querySelector(
            ".secret-installation"
        );

    if (!badge) {
        badge =
            document.createElement(
                "div"
            );

        badge.className =
            "secret-installation";

        badge.textContent =
            "✓ INSTALLED";

        option.appendChild(
            badge
        );
    }

    requestAnimationFrame(
        function () {
            badge.classList.add(
                "visible"
            );
        }
    );
}

function checkGiftUnlock() {
    if (
        boughtConvo &&
        boughtMsg &&
        boughtBlur
    ) {
        const lockedNotice =
            document.getElementById(
                "gift-locked-notice"
            );

        const giftSection =
            document.getElementById(
                "gift-section"
            );

        if (lockedNotice) {
            lockedNotice.style.display =
                "none";
        }

        if (giftSection) {
            giftSection.style.display =
                "block";

            activateGiftSystem();
        }
    }
}


/* ==========================================================================
   GIFT SYSTEM
========================================================================== */

function activateGiftSystem() {
    const giftSection =
        document.querySelector(
            ".gift-section"
        );

    const giftCard =
        document.querySelector(
            ".gift-card"
        );

    if (
        !giftSection ||
        !giftCard
    ) {
        return;
    }

    pageGlow(
        giftSection,
        1400
    );

    const line =
        document.createElement(
            "div"
        );

    line.style.width =
        "min(500px,90%)";

    line.style.height =
        "2px";

    line.style.marginTop =
        "20px";

    line.style.background =
        "linear-gradient(90deg,transparent,#000,transparent)";

    line.style.transform =
        "scaleX(0)";

    line.style.transition =
        "transform 1s ease";

    giftCard.appendChild(
        line
    );

    requestAnimationFrame(
        function () {
            line.style.transform =
                "scaleX(1)";
        }
    );

    setTimeout(
        function () {
            line.remove();
        },
        2500
    );
}


/* ==========================================================================
   FINAL GIFT
========================================================================== */

const bdayBtn =
    document.querySelector(
        ".gift-button"
    );

if (bdayBtn) {
    bdayBtn.addEventListener(
        "click",
        function () {
            if (!pageContent) {
                return;
            }

            pageContent.classList.add(
                "gift-layout"
            );

            pageContent.style.filter =
                "none";

            pageContent.innerHTML = `
                <h2 class="section-header white appear">
                    Gift Unlocked 🎁
                </h2>

                <img
                    src="image/Screenshot 2026-08-19 181429.png"
                    alt="Birthday cake"
                    class="appear"
                >

                <p class="white appear">
                    The audacity for u to ask more
                    after all this btw... sighhh
                </p>
            `;

            playClick();

            flashPage(
                "rgba(255,255,255,.18)",
                700
            );

            shockwave();

            if (backgroundAudio) {
                backgroundAudio.pause();
            }

            if (bdayAudio) {
                bdayAudio.currentTime =
                    0;

                bdayAudio.volume =
                    1;

                bdayAudio
                    .play()
                    .catch(
                        function () {}
                    );
            }

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

            createRestartButton();
        }
    );
}


/* ==========================================================================
   FINAL GIFT CONFETTI
========================================================================== */

const confettiBtn =
    document.getElementById(
        "confettiBtn"
    );

if (confettiBtn) {
    confettiBtn.addEventListener(
        "click",
        function () {
            if (
                confettiStarted ||
                typeof confetti !==
                    "function"
            ) {
                return;
            }

            confettiStarted =
                true;

            const canvas =
                document.createElement(
                    "canvas"
                );

            canvas.className =
                "gift-confetti-canvas";

            if (pageContent) {
                pageContent.appendChild(
                    canvas
                );
            }

            function sizeCanvas() {
                canvas.width =
                    window.innerWidth;

                canvas.height =
                    window.innerHeight;
            }

            sizeCanvas();

            window.addEventListener(
                "resize",
                sizeCanvas
            );

            const giftConfetti =
                confetti.create(
                    canvas,
                    {
                        resize: true,
                        useWorker: true
                    }
                );

            function shoot() {
                giftConfetti({
                    particleCount: 10,
                    angle: 60,
                    spread: 50,
                    startVelocity: 80,
                    gravity: 0.8,
                    ticks: 250,
                    origin: {
                        x: 0,
                        y: 1
                    }
                });

                giftConfetti({
                    particleCount: 10,
                    angle: 120,
                    spread: 50,
                    startVelocity: 80,
                    gravity: 0.8,
                    ticks: 250,
                    origin: {
                        x: 1,
                        y: 1
                    }
                });
            }

            shoot();

            setInterval(
                shoot,
                100
            );
        }
    );
}


/* ==========================================================================
   HOBBY EASTER EGGS
========================================================================== */

const HOBBY_CLICKS_TO_UNLOCK =
    10;

function setupHobbyEasterEgg(
    selector,
    threshold,
    callback
) {
    const card =
        document.querySelector(
            selector
        );

    if (!card) {
        return;
    }

    let count = 0;

    card.addEventListener(
        "click",
        function () {
            count++;

            playClick();

            pageGlow(
                card,
                300
            );

            if (
                count <
                threshold
            ) {
                return;
            }

            count = 0;

            callback(card);
        }
    );
}


/* ==========================================================================
   DANCE
========================================================================== */

setupHobbyEasterEgg(
    ".dance",
    10,
    function (card) {
        card.classList.add(
            "dance-mode"
        );

        flashPage(
            "rgba(255,111,174,.14)",
            500
        );

        if (
            !card.querySelector(
                ".dance-label"
            )
        ) {
            const label =
                document.createElement(
                    "p"
                );

            label.className =
                "hobby-unlock-text dance-label";

            label.textContent =
                "SHE'S GOT THE MOVES 💃";

            card.appendChild(
                label
            );
        }

        if (backgroundAudio) {
            backgroundAudio.pause();
        }

        if (danceAudio) {
            danceAudio.currentTime =
                0;

            danceAudio
                .play()
                .catch(
                    function () {}
                );
        }

        starBurst(
            innerWidth / 2,
            innerHeight / 2,
            [
                "💃",
                "✨",
                "⭐",
                "💚"
            ]
        );

        if (
            typeof confetti ===
            "function"
        ) {
            let bursts = 0;

            const burst =
                setInterval(
                    function () {
                        confetti({
                            particleCount: 6,
                            spread: 100,
                            startVelocity: 35,
                            origin: {
                                x:
                                    Math.random() *
                                        0.4 +
                                    0.3,
                                y: 0.7
                            }
                        });

                        bursts++;

                        if (
                            bursts >
                            15
                        ) {
                            clearInterval(
                                burst
                            );
                        }
                    },
                    150
                );
        }

        setTimeout(
            function () {
                card.classList.remove(
                    "dance-mode"
                );
            },
            10000
        );
    }
);


/* ==========================================================================
   MOVIES
========================================================================== */

setupHobbyEasterEgg(
    ".movies",
    10,
    function (card) {
        if (
            document.querySelector(
                ".movie-overlay"
            )
        ) {
            return;
        }

        const overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "movie-overlay";

        overlay.innerHTML =
            '<span class="movie-countdown">3</span>';

        document.body.appendChild(
            overlay
        );

        const countdownEl =
            overlay.querySelector(
                ".movie-countdown"
            );

        let count = 3;

        const timer =
            setInterval(
                function () {
                    count--;

                    if (
                        count >
                        0
                    ) {
                        countdownEl.textContent =
                            count;
                    } else if (
                        count ===
                        0
                    ) {
                        countdownEl.textContent =
                            "CINEMA 🎬";
                    } else {
                        clearInterval(
                            timer
                        );

                        overlay.remove();

                        movieModeOn =
                            true;

                        updatePageFilter();

                        activateCinemaPresentation();
                    }
                },
                1000
            );

        if (
            !card.querySelector(
                ".movies-label"
            )
        ) {
            const label =
                document.createElement(
                    "p"
                );

            label.className =
                "hobby-unlock-text movies-label";

            label.textContent =
                '"one movie" — the biggest lie she tells 🎬';

            card.appendChild(
                label
            );
        }
    }
);

function activateCinemaPresentation() {
    if (
        document.querySelector(
            ".cinema-bars-secret"
        )
    ) {
        return;
    }

    const top =
        document.createElement(
            "div"
        );

    top.className =
        "cinema-bars-secret top";

    const bottom =
        document.createElement(
            "div"
        );

    bottom.className =
        "cinema-bars-secret bottom";

    document.body.appendChild(
        top
    );

    document.body.appendChild(
        bottom
    );

    if (pageContent) {
        pageContent.classList.add(
            "secret-letterbox"
        );
    }

    requestAnimationFrame(
        function () {
            top.classList.add(
                "visible"
            );

            bottom.classList.add(
                "visible"
            );
        }
    );

    setTimeout(
        function () {
            top.classList.remove(
                "visible"
            );

            bottom.classList.remove(
                "visible"
            );

            if (pageContent) {
                pageContent.classList.remove(
                    "secret-letterbox"
                );
            }
        },
        9000
    );

    setTimeout(
        function () {
            top.remove();
            bottom.remove();
        },
        9800
    );

    showAvignaToast(
        "🎬 CINEMA MODE"
    );
}


/* ==========================================================================
   BOOKS
========================================================================== */

setupHobbyEasterEgg(
    ".books",
    10,
    function (card) {
        card.classList.add(
            "book-mode"
        );

        if (
            !card.querySelector(
                ".books-label"
            )
        ) {
            const label =
                document.createElement(
                    "p"
                );

            label.className =
                "hobby-unlock-text books-label";

            label.textContent =
                '"just one more chapter" — famous last words 📖';

            card.appendChild(
                label
            );
        }

        spotlightElement(
            card,
            1800
        );

        showBirthdayPoem();
    }
);


/* ==========================================================================
   BIRTHDAY POEM
========================================================================== */

function showBirthdayPoem() {
    if (
        document.querySelector(
            ".poem-overlay"
        )
    ) {
        return;
    }

    const page =
        document.querySelector(
            "#page-content"
        );

    if (!page) {
        return;
    }

    page.classList.add(
        "page-fade-out"
    );

    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "poem-overlay";

    overlay.innerHTML = `
        <div class="poem-text">

            <p>
                Today,
                <br><br>

                In the dead of night, fireworks blossom like tiny stars.
                <br>

                Seated on the garden soil, the seasons turn without notice.
            </p>

            <p>
                In this garden of life, another flower blooms
                <br>

                With stories both radiant and dreary.
            </p>

            <p>
                The flowers, with their beauty and grime,
                <br>

                are reflections of our actions over time.
            </p>

            <p>
                The sound of laughter and muffled cries
                <br>

                breathe a soul into one's life.
            </p>

            <p>
                Under the winds of change and time
                <br>

                Mountains erode, rivers run dry, and yet—the flowers remain,
                <br>

                quietly unchanged.
            </p>

            <p>
                And so, between the silence and noise, we remain
                <br>

                not forever, but nurturing a flower while we still can,
                <br>

                forever immortalizing ourselves, in the panels of time.
            </p>

        </div>

        <button class="button poem-return-button">
            ← Back to the page
        </button>
    `;

    document.body.appendChild(
        overlay
    );

    setTimeout(
        function () {
            overlay.classList.add(
                "visible"
            );
        },
        100
    );

    overlay
        .querySelector(
            ".poem-return-button"
        )
        .addEventListener(
            "click",
            function () {
                playClick();

                overlay.classList.remove(
                    "visible"
                );

                setTimeout(
                    function () {
                        overlay.remove();

                        page.classList.remove(
                            "page-fade-out"
                        );
                    },
                    1000
                );
            }
        );
}


/* ==========================================================================
   FLOATING CAKES
========================================================================== */

function spawnFloatingCakes() {
    for (
        let i = 0;
        i < 18;
        i++
    ) {
        const cake =
            document.createElement(
                "div"
            );

        cake.className =
            "floating-cake";

        cake.textContent =
            "🎂";

        cake.style.left =
            Math.random() *
                100 +
            "vw";

        cake.style.animationDuration =
            3 +
            Math.random() *
                3 +
            "s";

        cake.style.fontSize =
            1.5 +
            Math.random() *
                2 +
            "rem";

        document.body.appendChild(
            cake
        );

        setTimeout(
            function () {
                cake.remove();
            },
            7000
        );
    }

    flashPage(
        "rgba(186,255,106,.12)",
        500
    );

    showSecretToast(
        "cake mode activated"
    );
}


/* ==========================================================================
   MATRIX
========================================================================== */

function spawnMatrixRain() {
    if (
        document.querySelector(
            ".matrix-rain-canvas"
        )
    ) {
        return;
    }

    showAvignaToast(
        "💊 Wake up..."
    );

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.className =
        "matrix-rain-canvas";

    Object.assign(
        canvas.style,
        {
            position: "fixed",
            inset: "0",
            width: "100vw",
            height: "100vh",
            zIndex: "29960",
            pointerEvents: "none",
            opacity: "0",
            transition:
                "opacity .5s ease"
        }
    );

    document.body.appendChild(
        canvas
    );

    const ctx =
        canvas.getContext(
            "2d"
        );

    function size() {
        canvas.width =
            innerWidth;

        canvas.height =
            innerHeight;
    }

    size();

    const glyphs =
        "アイウエオカキクケコ01アヴィグナ";

    const fontSize = 18;

    const drops =
        new Array(
            Math.ceil(
                canvas.width /
                    fontSize
            )
        ).fill(1);

    requestAnimationFrame(
        function () {
            canvas.style.opacity =
                "1";
        }
    );

    let frames = 0;

    const timer =
        setInterval(
            function () {
                ctx.fillStyle =
                    "rgba(2,6,8,.18)";

                ctx.fillRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                ctx.fillStyle =
                    "#4fffb0";

                ctx.font =
                    fontSize +
                    "px monospace";

                for (
                    let i = 0;
                    i < drops.length;
                    i++
                ) {
                    const glyph =
                        glyphs[
                            Math.floor(
                                Math.random() *
                                    glyphs.length
                            )
                        ];

                    ctx.fillText(
                        glyph,
                        i *
                            fontSize,
                        drops[i] *
                            fontSize
                    );

                    if (
                        drops[i] *
                            fontSize >
                            canvas.height &&
                        Math.random() >
                            0.975
                    ) {
                        drops[i] = 0;
                    }

                    drops[i]++;
                }

                frames++;

                if (
                    frames >=
                    420
                ) {
                    clearInterval(
                        timer
                    );

                    canvas.style.opacity =
                        "0";

                    setTimeout(
                        function () {
                            canvas.remove();
                        },
                        700
                    );
                }
            },
            40
        );
}


/* ==========================================================================
   DISCO
========================================================================== */

function activateDiscoMode() {
    if (discoModeOn) {
        return;
    }

    discoModeOn = true;

    showAvignaToast(
        "🪩 DISCO MODE ENGAGED"
    );

    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "disco-overlay";

    Object.assign(
        overlay.style,
        {
            position: "fixed",
            inset: "0",
            zIndex: "29955",
            pointerEvents: "none",
            mixBlendMode: "overlay",
            opacity: "0.55",
            transition:
                "background .15s linear"
        }
    );

    document.body.appendChild(
        overlay
    );

    const colors = [
        "#ff3d9a",
        "#ffd93d",
        "#3dfff0",
        "#7b3dff",
        "#3dff6a",
        "#ff3d3d"
    ];

    let index = 0;

    const timer =
        setInterval(
            function () {
                overlay.style.background =
                    colors[
                        index %
                            colors.length
                    ];

                index++;

                chromaticPage();
            },
            160
        );

    setTimeout(
        function () {
            clearInterval(
                timer
            );

            overlay.remove();

            discoModeOn =
                false;
        },
        6000
    );
}


/* ==========================================================================
   RAINBOW
========================================================================== */

function activateRainbowMode() {
    if (rainbowModeOn) {
        return;
    }

    rainbowModeOn =
        true;

    showAvignaToast(
        "🌈 RAINBOW MODE ON"
    );

    let hue = 0;

    rainbowInterval =
        setInterval(
            function () {
                hue =
                    (hue + 6) %
                    360;

                if (pageContent) {
                    pageContent.style.setProperty(
                        "--rainbow-hue",
                        hue +
                            "deg"
                    );
                }

                updatePageFilter();
            },
            40
        );

    setTimeout(
        function () {
            clearInterval(
                rainbowInterval
            );

            rainbowModeOn =
                false;

            if (pageContent) {
                pageContent.style.removeProperty(
                    "--rainbow-hue"
                );
            }

            updatePageFilter();
        },
        8000
    );
}


/* ==========================================================================
   FLIP
========================================================================== */

function activatePageFlip() {
    if (!pageContent) {
        return;
    }

    pageContent.style.transition =
        "transform 1s ease-in-out";

    pageContent.style.transform =
        "rotate(180deg)";

    showAvignaToast(
        "🙃 who allowed you to touch the keyboard"
    );

    setTimeout(
        function () {
            pageContent.style.transform =
                "rotate(0deg)";
        },
        2200
    );
}


/* ==========================================================================
   DEBUG HUD
========================================================================== */

let debugHudInterval =
    null;

function toggleDebugHud() {
    const existing =
        document.querySelector(
            ".debug-hud"
        );

    const grid =
        document.querySelector(
            ".birthday-debug-grid"
        );

    if (existing) {
        clearInterval(
            debugHudInterval
        );

        existing.remove();

        if (grid) {
            grid.classList.remove(
                "visible"
            );

            setTimeout(
                function () {
                    grid.remove();
                },
                400
            );
        }

        return;
    }

    showAvignaToast(
        "🧪 debug hud online"
    );

    const newGrid =
        document.createElement(
            "div"
        );

    newGrid.className =
        "birthday-debug-grid";

    document.body.appendChild(
        newGrid
    );

    requestAnimationFrame(
        function () {
            newGrid.classList.add(
                "visible"
            );
        }
    );

    const hud =
        document.createElement(
            "div"
        );

    hud.className =
        "debug-hud";

    Object.assign(
        hud.style,
        {
            position: "fixed",
            bottom: "18px",
            left: "18px",
            zIndex: "30000",
            background:
                "rgba(5,15,19,.94)",
            border:
                "1px solid rgba(79,255,232,.35)",
            borderRadius: "12px",
            padding: "12px 16px",
            fontFamily:
                "'DM Mono',monospace",
            fontSize: ".72rem",
            color: "#4fffe8",
            lineHeight: "1.6",
            cursor: "pointer",
            backdropFilter:
                "blur(10px)"
        }
    );

    function render() {
        hud.innerHTML =
            "MONEY: $" +
            money +
            "<br>" +

            "HUNGER: " +
            hungerPercent +
            "%<br>" +

            "FOOD BOUGHT: " +
            foodBought +
            "<br>" +

            "CONVO: " +
            (
                boughtConvo
                    ? "UNLOCKED"
                    : "LOCKED"
            ) +
            "<br>" +

            "MESSAGE: " +
            (
                boughtMsg
                    ? "UNLOCKED"
                    : "LOCKED"
            ) +
            "<br>" +

            "BLUR REMOVED: " +
            (
                boughtBlur
                    ? "YES"
                    : "NO"
            );
    }

    render();

    debugHudInterval =
        setInterval(
            render,
            1000
        );

    hud.addEventListener(
        "click",
        function () {
            clearInterval(
                debugHudInterval
            );

            hud.remove();

            newGrid.classList.remove(
                "visible"
            );

            setTimeout(
                function () {
                    newGrid.remove();
                },
                400
            );
        }
    );

    document.body.appendChild(
        hud
    );
}


/* ==========================================================================
   TYPING SECRETS
========================================================================== */

const typingSecrets = {
    avigna: {
        messages: [
            "Yoooo. you found the secret. congrats.",
            "Aloo",
            "U know u are pretty narcissistic man",
            "Alrrr we get it okay, this website is for u",
            "Stop typing, and explore my work dummy"
        ],

        action: function (
            message
        ) {
            showAvignaToast(
                message
            );

            chromaticPage();

            createScanline(
                "#ff8cd9"
            );

            starBurst(
                innerWidth / 2,
                innerHeight / 2,
                [
                    "💗",
                    "✨",
                    "💚"
                ]
            );
        }
    },

    secret: {
        messages: [
            "🚨 YOU FOUND A SECRET SECRET",
            "This secret was hidden from Avigna.",
            "Neerav definitely spent too much time making this.",
            "There is absolutely nothing useful here.",
            "Congratulations. You wasted your time professionally."
        ],

        action: function (
            message
        ) {
            showSecretToast(
                message
            );

            flashPage(
                "rgba(123,91,255,.2)",
                700
            );

            chromaticPage();

            createScanline(
                "#b58cff"
            );
        }
    },

    cake: {
        action:
            spawnFloatingCakes
    },

    matrix: {
        action:
            spawnMatrixRain
    },

    disco: {
        action:
            activateDiscoMode
    },

    rainbow: {
        action:
            activateRainbowMode
    },

    flip: {
        action:
            activatePageFlip
    },

    debug: {
        action:
            toggleDebugHud
    },

    banana: {
        action:
            function () {
                showAvignaToast(
                    "🍌 banana rain"
                );

                spawnEmojiRain(
                    ["🍌"],
                    22,
                    4
                );

                flashPage(
                    "rgba(255,216,107,.14)",
                    500
                );
            }
    },

    cat: {
        action:
            function () {
                showAvignaToast(
                    "🐱 meow. that's all. meow."
                );

                spawnEmojiRain(
                    [
                        "🐱",
                        "🐈",
                        "🐈‍⬛"
                    ],
                    18,
                    4.5
                );

                chromaticPage();
            }
    },

    pizza: {
        action:
            function () {
                showAvignaToast(
                    "🍕 the pizza has been summoned."
                );

                const pizza =
                    document.createElement(
                        "div"
                    );

                pizza.textContent =
                    "🍕";

                Object.assign(
                    pizza.style,
                    {
                        position: "fixed",
                        top: "45%",
                        left: "-120px",
                        fontSize: "5rem",
                        zIndex: "30000",
                        pointerEvents: "none",
                        transition:
                            "transform 2.4s linear, opacity 2.4s linear"
                    }
                );

                document.body.appendChild(
                    pizza
                );

                requestAnimationFrame(
                    function () {
                        pizza.style.transform =
                            "translateX(calc(100vw + 200px)) rotate(1080deg)";
                    }
                );

                setTimeout(
                    function () {
                        pizza.style.opacity =
                            "0";
                    },
                    2000
                );

                setTimeout(
                    function () {
                        pizza.remove();
                    },
                    2600
                );

                pageGlow(
                    document.querySelector(
                        ".eat-section"
                    ),
                    1600
                );
            }
    },

    boom: {
        action:
            function () {
                showAvignaToast(
                    "💥 uh oh."
                );

                const overlay =
                    document.createElement(
                        "div"
                    );

                overlay.className =
                    "screen-crack-overlay";

                overlay.innerHTML = `
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 400 800"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                            stroke="rgba(255,255,255,.55)"
                            stroke-width="1.4"
                            fill="none"
                        >
                            <path d="
                                M200 400 L120 120
                                M200 400 L280 90
                                M200 400 L60 300
                                M200 400 L340 260
                                M200 400 L150 620
                                M200 400 L260 680
                                M200 400 L40 520
                                M200 400 L370 480
                            "/>

                            <path d="
                                M120 120 L95 60
                                M280 90 L320 40
                                M60 300 L10 260
                                M150 620 L100 700
                                M260 680 L300 760
                            "/>
                        </g>
                    </svg>
                `;

                document.body.appendChild(
                    overlay
                );

                requestAnimationFrame(
                    function () {
                        overlay.classList.add(
                            "visible"
                        );
                    }
                );

                document.body.classList.add(
                    "screen-shake"
                );

                flashPage(
                    "rgba(255,255,255,.2)",
                    300
                );

                shockwave();

                setTimeout(
                    function () {
                        document.body.classList.remove(
                            "screen-shake"
                        );
                    },
                    400
                );

                setTimeout(
                    function () {
                        overlay.classList.remove(
                            "visible"
                        );

                        setTimeout(
                            function () {
                                overlay.remove();
                            },
                            300
                        );
                    },
                    2200
                );
            }
    },

    yolo: {
        action:
            function () {
                if (pageContent) {
                    pageGlow(
                        pageContent,
                        1200
                    );
                }

                showAvignaToast(
                    "🎉 YOLO."
                );
            }
    },

    trail: {
        action:
            activateTrailMode
    },

    invert: {
        action:
            triggerInvertFlash
    }
};

let typedBuffer = "";

const MAX_TYPED_BUFFER =
    30;

document.addEventListener(
    "keydown",
    function (event) {
        if (
            !isUnlocked() ||
            event.key.length !==
                1
        ) {
            return;
        }

        typedBuffer +=
            event.key.toLowerCase();

        if (
            typedBuffer.length >
            MAX_TYPED_BUFFER
        ) {
            typedBuffer =
                typedBuffer.slice(
                    -MAX_TYPED_BUFFER
                );
        }

        const words =
            Object.keys(
                typingSecrets
            );

        for (
            let i = 0;
            i < words.length;
            i++
        ) {
            const word =
                words[i];

            if (
                typedBuffer.endsWith(
                    word
                )
            ) {
                const secret =
                    typingSecrets[
                        word
                    ];

                if (
                    secret.messages
                ) {
                    const message =
                        secret.messages[
                            Math.floor(
                                Math.random() *
                                    secret.messages.length
                            )
                        ];

                    secret.action(
                        message
                    );
                } else {
                    secret.action();
                }

                typedBuffer = "";

                break;
            }
        }
    }
);


/* ==========================================================================
   TRAIL MODE
========================================================================== */

let trailModeActive =
    false;

let trailMouseHandler =
    null;

function activateTrailMode() {
    if (trailModeActive) {
        return;
    }

    trailModeActive =
        true;

    showAvignaToast(
        "✨ trail mode on. wiggle your mouse."
    );

    const trailEmojis = [
        "✨",
        "💫",
        "⭐",
        "🌟"
    ];

    trailMouseHandler =
        function (event) {
            if (
                Math.random() >
                0.35
            ) {
                return;
            }

            const trail =
                document.createElement(
                    "div"
                );

            trail.className =
                "mouse-trail-emoji";

            trail.textContent =
                trailEmojis[
                    Math.floor(
                        Math.random() *
                            trailEmojis.length
                    )
                ];

            trail.style.left =
                event.clientX +
                "px";

            trail.style.top =
                event.clientY +
                "px";

            document.body.appendChild(
                trail
            );

            setTimeout(
                function () {
                    trail.remove();
                },
                900
            );
        };

    document.addEventListener(
        "mousemove",
        trailMouseHandler
    );

    flashPage(
        "rgba(186,255,106,.1)",
        500
    );

    setTimeout(
        function () {
            document.removeEventListener(
                "mousemove",
                trailMouseHandler
            );

            trailModeActive =
                false;
        },
        8000
    );
}


/* ==========================================================================
   INVERT
========================================================================== */

function triggerInvertFlash() {
    showAvignaToast(
        "🙃 everything you know is wrong. for 3 seconds."
    );

    document.body.classList.remove(
        "invert-flash"
    );

    void document.body.offsetWidth;

    document.body.classList.add(
        "invert-flash"
    );

    shockwave();

    setTimeout(
        function () {
            document.body.classList.remove(
                "invert-flash"
            );
        },
        3000
    );
}


/* ==========================================================================
   KONAMI
========================================================================== */

const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
];

let konamiIndex = 0;

document.addEventListener(
    "keydown",
    function (event) {
        if (!isUnlocked()) {
            return;
        }

        const key =
            event.key.length === 1
                ? event.key.toLowerCase()
                : event.key;

        if (
            key ===
            konamiCode[
                konamiIndex
            ]
        ) {
            konamiIndex++;

            if (
                konamiIndex ===
                konamiCode.length
            ) {
                konamiIndex = 0;

                activateKonamiCode();
            }
        } else {
            konamiIndex =
                key ===
                konamiCode[0]
                    ? 1
                    : 0;
        }
    }
);

function activateKonamiCode() {
    showAvignaToast(
        "🎮 KONAMI CODE ACTIVATED. YOU CHEATED."
    );

    document.body.classList.add(
        "arcade-secret-active"
    );

    const grid =
        document.createElement(
            "div"
        );

    grid.className =
        "birthday-debug-grid";

    document.body.appendChild(
        grid
    );

    requestAnimationFrame(
        function () {
            grid.classList.add(
                "visible"
            );
        }
    );

    showSecretBadge(
        "AVIGNA ARCADE MODE",
        3200
    );

    createScanline(
        "#ff8cd9"
    );

    createScanline(
        "#4fffe8"
    );

    flashPage(
        "rgba(123,61,255,.13)",
        700
    );

    if (
        typeof confetti ===
        "function"
    ) {
        confetti({
            particleCount: 220,
            spread: 180,
            startVelocity: 65,
            gravity: 0.75,
            origin: {
                x: 0.5,
                y: 0.5
            }
        });
    }

    setTimeout(
        function () {
            document.body.classList.remove(
                "arcade-secret-active"
            );

            grid.classList.remove(
                "visible"
            );

            setTimeout(
                function () {
                    grid.remove();
                },
                400
            );
        },
        8000
    );
}


/* ==========================================================================
   IDLE
========================================================================== */

const IDLE_TIME =
    20000;

const idleMessages = [
    "👀 You still there?",
    "Bro... you haven't touched anything in a while.",
    "The website is getting lonely.",
    "Psst... there are secrets hidden here.",
    "Try clicking around. You might find something.",
    "Avigna would probably have found a secret by now.",
    "You're really just gonna stare at the website?"
];

const jackpotMessages = [
    "🎰 JACKPOT. you win absolutely nothing, but congrats.",
    "🎰 rare idle event triggered. tell no one.",
    "🎰 you've been idle long enough to earn a fake trophy 🏆"
];

let idleTimer = null;
let idleNudgeCount = 0;

function resetIdleTimer() {
    if (!isUnlocked()) {
        return;
    }

    clearTimeout(
        idleTimer
    );

    idleTimer =
        setTimeout(
            showIdleNudge,
            IDLE_TIME
        );
}

function showIdleNudge() {
    if (!isUnlocked()) {
        return;
    }

    if (
        Math.random() <
        0.08
    ) {
        showAvignaToast(
            jackpotMessages[
                Math.floor(
                    Math.random() *
                        jackpotMessages.length
                )
            ]
        );

        flashPage(
            "rgba(255,215,80,.16)",
            600
        );

        starBurst(
            innerWidth / 2,
            innerHeight / 3,
            [
                "🎰",
                "✨",
                "🏆"
            ]
        );

        if (
            typeof confetti ===
            "function"
        ) {
            confetti({
                particleCount: 60,
                spread: 90,
                startVelocity: 35,
                origin: {
                    x: 0.5,
                    y: 0.3
                }
            });
        }
    } else {
        showAvignaToast(
            idleMessages[
                idleNudgeCount %
                    idleMessages.length
            ]
        );

        pageGlow(
            pageContent,
            1000
        );
    }

    idleNudgeCount++;

    resetIdleTimer();
}

[
    "mousemove",
    "mousedown",
    "keydown",
    "scroll",
    "touchstart"
].forEach(
    function (eventName) {
        document.addEventListener(
            eventName,
            resetIdleTimer,
            { passive: true }
        );
    }
);

resetIdleTimer();


/* ==========================================================================
   LOGO
========================================================================== */

if (secretLogo) {
    let logoClicks = 0;
    let logoClickTimer =
        null;

    secretLogo.addEventListener(
        "click",
        function () {
            logoClicks++;

            playClick();

            clearTimeout(
                logoClickTimer
            );

            logoClickTimer =
                setTimeout(
                    function () {
                        logoClicks = 0;
                    },
                    1200
                );

            if (
                logoClicks >=
                5
            ) {
                logoClicks = 0;

                showAvignaToast(
                    "🤫 You found the CEO button."
                );

                flashPage(
                    "rgba(79,255,232,.15)",
                    500
                );

                secretLogo.animate(
                    [
                        {
                            transform:
                                "rotate(0) scale(1)"
                        },
                        {
                            transform:
                                "rotate(-15deg) scale(1.3)"
                        },
                        {
                            transform:
                                "rotate(15deg) scale(1.3)"
                        },
                        {
                            transform:
                                "rotate(0) scale(1)"
                        }
                    ],
                    {
                        duration: 600,
                        easing:
                            "ease-in-out"
                    }
                );

                starBurst(
                    60,
                    40,
                    [
                        "👑",
                        "✨",
                        "🔐"
                    ]
                );
            }
        }
    );

    let pressTimer = null;

    secretLogo.addEventListener(
        "mousedown",
        function () {
            pressTimer =
                setTimeout(
                    triggerRootAccessSecret,
                    2000
                );
        }
    );

    function cancelPress() {
        clearTimeout(
            pressTimer
        );
    }

    secretLogo.addEventListener(
        "mouseup",
        cancelPress
    );

    secretLogo.addEventListener(
        "mouseleave",
        cancelPress
    );

    secretLogo.addEventListener(
        "touchend",
        cancelPress
    );
}

function triggerRootAccessSecret() {
    showAvignaToast(
        "🔓 root access granted. nothing happens though."
    );

    flashPage(
        "rgba(79,255,232,.2)",
        900
    );

    createScanline(
        "#4fffe8"
    );

    showSecretBadge(
        "ROOT ACCESS GRANTED",
        2200
    );

    document.body.classList.add(
        "secret-glitch"
    );

    setTimeout(
        function () {
            document.body.classList.remove(
                "secret-glitch"
            );
        },
        700
    );
}


/* ==========================================================================
   RIGHT CLICK
========================================================================== */

document.addEventListener(
    "contextmenu",
    function (event) {
        if (!isUnlocked()) {
            return;
        }

        event.preventDefault();

        const messages = [
            "🖱️ nice try. no context menu for you.",
            "sneaky. there's nothing under here.",
            "you right clicked. bold move.",
            "inspect element won't save you either."
        ];

        showAvignaToast(
            messages[
                Math.floor(
                    Math.random() *
                        messages.length
                )
            ]
        );

        createRipple(
            event.clientX,
            event.clientY,
            "#4fffe8"
        );

        showSecretBadge(
            "ACCESS DENIED",
            900
        );
    }
);


/* ==========================================================================
   DOUBLE CLICK QUOTE
========================================================================== */

const quoteSection =
    document.querySelector(
        ".trust-text"
    );

if (quoteSection) {
    quoteSection.addEventListener(
        "dblclick",
        function (event) {
            playClick();

            showAvignaToast(
                "📖 diary entry detected."
            );

            spotlightElement(
                quoteSection,
                2200
            );

            createRipple(
                event.clientX,
                event.clientY,
                "#16a86b"
            );

            if (
                typeof confetti ===
                "function"
            ) {
                confetti({
                    particleCount: 90,
                    spread: 100,
                    startVelocity: 45,
                    origin: {
                        x:
                            event.clientX /
                            innerWidth,
                        y:
                            event.clientY /
                            innerHeight
                    }
                });
            }
        }
    );
}


/* ==========================================================================
   STAT COMBO
========================================================================== */

const statBars =
    document.querySelectorAll(
        ".stats .stat"
    );

let statComboIndex = 0;

statBars.forEach(
    function (
        statEl,
        index
    ) {
        statEl.style.cursor =
            "pointer";

        statEl.addEventListener(
            "click",
            function () {
                playClick();

                pageGlow(
                    statEl,
                    300
                );

                if (
                    index ===
                    statComboIndex
                ) {
                    statComboIndex++;

                    if (
                        statComboIndex ===
                        statBars.length
                    ) {
                        statComboIndex =
                            0;

                        showAvignaToast(
                            "📊 you actually read the stats in order. impressive."
                        );

                        spotlightElement(
                            document.querySelector(
                                ".stats"
                            ),
                            1800
                        );

                        createScanline(
                            "#4fffe8"
                        );

                        if (
                            typeof confetti ===
                            "function"
                        ) {
                            confetti({
                                particleCount: 80,
                                spread: 90,
                                startVelocity: 40,
                                origin: {
                                    x: 0.5,
                                    y: 0.4
                                }
                            });
                        }
                    }
                } else {
                    statComboIndex =
                        index === 0
                            ? 1
                            : 0;
                }
            }
        );
    }
);


/* ==========================================================================
   SHAKE TO PARTY
========================================================================== */

let lastShakeTime = 0;

let lastAcceleration = {
    x: 0,
    y: 0,
    z: 0
};

const SHAKE_THRESHOLD =
    18;

function handleDeviceMotion(
    event
) {
    const acceleration =
        event.accelerationIncludingGravity;

    if (!acceleration) {
        return;
    }

    const deltaX =
        Math.abs(
            acceleration.x -
                lastAcceleration.x
        );

    const deltaY =
        Math.abs(
            acceleration.y -
                lastAcceleration.y
        );

    const deltaZ =
        Math.abs(
            acceleration.z -
                lastAcceleration.z
        );

    lastAcceleration = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
    };

    const total =
        deltaX +
        deltaY +
        deltaZ;

    const now =
        Date.now();

    if (
        total >
            SHAKE_THRESHOLD &&
        now -
            lastShakeTime >
            2000 &&
        isUnlocked()
    ) {
        lastShakeTime =
            now;

        showAvignaToast(
            "📱 shake detected."
        );

        shockwave();

        flashPage(
            "rgba(79,255,232,.16)",
            500
        );

        if (
            typeof confetti ===
            "function"
        ) {
            confetti({
                particleCount: 120,
                spread: 140,
                startVelocity: 50,
                origin: {
                    x: 0.5,
                    y: 0.5
                }
            });
        }
    }
}

function enableShakeDetection() {
    if (
        typeof DeviceMotionEvent ===
        "undefined"
    ) {
        return;
    }

    if (
        typeof DeviceMotionEvent.requestPermission ===
        "function"
    ) {
        document.addEventListener(
            "click",
            function requestMotionOnce() {
                DeviceMotionEvent
                    .requestPermission()
                    .then(
                        function (
                            state
                        ) {
                            if (
                                state ===
                                "granted"
                            ) {
                                window.addEventListener(
                                    "devicemotion",
                                    handleDeviceMotion
                                );
                            }
                        }
                    )
                    .catch(
                        function () {}
                    );

                document.removeEventListener(
                    "click",
                    requestMotionOnce
                );
            },
            {
                once: true
            }
        );
    } else {
        window.addEventListener(
            "devicemotion",
            handleDeviceMotion
        );
    }
}

enableShakeDetection();


/* ==========================================================================
   MESSAGE POSTSCRIPT
========================================================================== */

(function setupMessagePostscript() {
    const messageEl =
        document.getElementById(
            "message"
        );

    if (!messageEl) {
        return;
    }

    let clicks = 0;
    let added = false;

    messageEl.addEventListener(
        "click",
        function () {
            if (!boughtMsg) {
                return;
            }

            playClick();

            clicks++;

            pageGlow(
                messageEl,
                350
            );

            if (
                clicks <
                    6 ||
                added
            ) {
                return;
            }

            added = true;

            messageEl.classList.add(
                "message-corrupted"
            );

            setTimeout(
                function () {
                    messageEl.classList.remove(
                        "message-corrupted"
                    );

                    const ps =
                        document.createElement(
                            "span"
                        );

                    ps.className =
                        "message-ps";

                    ps.textContent =
                        "P.S. -- if you're reading this after clicking the message six times, you have too much free time, and I respect that. Go outside though. Maybe.";

                    messageEl.appendChild(
                        ps
                    );

                    requestAnimationFrame(
                        function () {
                            ps.classList.add(
                                "visible"
                            );
                        }
                    );

                    showAvignaToast(
                        "📝 you found the postscript."
                    );
                },
                700
            );
        }
    );
})();


/* ==========================================================================
   HERO NAME
========================================================================== */

(function setupHeroNameSecret() {
    const heroName =
        document.querySelector(
            ".hero-title span:nth-child(3)"
        );

    if (!heroName) {
        return;
    }

    let clicks = 0;
    let timer = null;

    heroName.addEventListener(
        "click",
        function () {
            playClick();

            clicks++;

            clearTimeout(
                timer
            );

            timer =
                setTimeout(
                    function () {
                        clicks = 0;
                    },
                    700
                );

            if (
                clicks <
                3
            ) {
                return;
            }

            clicks = 0;

            showAvignaToast(
                "💗 aww ok fine, you're kind of great too."
            );

            const hero =
                document.querySelector(
                    ".hero"
                );

            if (hero) {
                pageGlow(
                    hero,
                    2000
                );
            }

            starBurst(
                innerWidth / 2,
                innerHeight / 3,
                [
                    "💚",
                    "💗",
                    "✨",
                    "💫"
                ]
            );

            for (
                let i = 0;
                i < 14;
                i++
            ) {
                const heart =
                    document.createElement(
                        "div"
                    );

                heart.className =
                    "floating-heart";

                heart.textContent =
                    i % 2 === 0
                        ? "💚"
                        : "💗";

                heart.style.left =
                    Math.random() *
                        100 +
                    "vw";

                document.body.appendChild(
                    heart
                );

                setTimeout(
                    function () {
                        heart.remove();
                    },
                    6000
                );
            }
        }
    );
})();


/* ==========================================================================
   MONEY ATM
========================================================================== */

(function setupMoneyATM() {
    const display =
        document.getElementById(
            "display-money"
        );

    if (!display) {
        return;
    }

    let clicks = 0;
    let timer = null;
    let cooldown = false;

    display.addEventListener(
        "click",
        function (event) {
            if (cooldown) {
                showAvignaToast(
                    "🏧 ATM is out of cash. try again later."
                );

                return;
            }

            playClick();

            clicks++;

            createRipple(
                event.clientX,
                event.clientY,
                "#baff6a"
            );

            clearTimeout(
                timer
            );

            timer =
                setTimeout(
                    function () {
                        clicks = 0;
                    },
                    2500
                );

            if (
                clicks <
                8
            ) {
                return;
            }

            clicks = 0;
            cooldown = true;

            money += 200;

            refreshMoneyDisplay();

            showAvignaToast(
                "🏧 hidden ATM found. +$200. don't tell the shop."
            );

            display.classList.add(
                "money-glitch"
            );

            const rect =
                display.getBoundingClientRect();

            const float =
                document.createElement(
                    "div"
                );

            float.className =
                "money-float-secret";

            float.textContent =
                "+$200";

            float.style.left =
                rect.left +
                rect.width / 2 +
                "px";

            float.style.top =
                rect.top +
                "px";

            document.body.appendChild(
                float
            );

            setTimeout(
                function () {
                    float.remove();

                    display.classList.remove(
                        "money-glitch"
                    );
                },
                1400
            );

            if (
                typeof confetti ===
                "function"
            ) {
                confetti({
                    particleCount: 40,
                    spread: 70,
                    startVelocity: 30,
                    origin: {
                        x: 0.85,
                        y: 0.08
                    }
                });
            }

            setTimeout(
                function () {
                    cooldown = false;
                },
                30000
            );
        }
    );
})();


/* ==========================================================================
   QUOTE MARK
========================================================================== */

(function setupQuoteMarkSecret() {
    const quoteMark =
        document.querySelector(
            ".quote-mark"
        );

    const quoteMaker =
        document.querySelector(
            ".quote-maker"
        );

    if (
        !quoteMark ||
        !quoteMaker
    ) {
        return;
    }

    let clicks = 0;
    let revealed = false;

    quoteMark.addEventListener(
        "click",
        function () {
            playClick();

            clicks++;

            pageGlow(
                quoteMark,
                350
            );

            if (
                clicks <
                    4 ||
                revealed
            ) {
                return;
            }

            revealed = true;

            const secretLine =
                document.createElement(
                    "span"
                );

            secretLine.className =
                "quote-secret-line";

            secretLine.textContent =
                "(the diary never actually got a second entry. typical.)";

            quoteMaker.insertAdjacentElement(
                "afterend",
                secretLine
            );

            requestAnimationFrame(
                function () {
                    secretLine.classList.add(
                        "visible"
                    );
                }
            );

            showAvignaToast(
                "💬 the quote had a footnote all along."
            );

            spotlightElement(
                quoteMark,
                2200
            );
        }
    );
})();


/* ==========================================================================
   GIFT TAUNTS
========================================================================== */

(function setupGiftTaunts() {
    const lockedNotice =
        document.getElementById(
            "gift-locked-notice"
        );

    if (!lockedNotice) {
        return;
    }

    const taunts = [
        "🔒 nope.",
        "🔒 still nope.",
        "🔒 the shop is right above you, genius.",
        "🔒 clicking harder does not unlock it.",
        "🔒 buy the three things. that's it. that's the trick.",
        "🔒 I'm not going to stop saying nope."
    ];

    let index = 0;

    lockedNotice.addEventListener(
        "click",
        function () {
            if (
                boughtConvo &&
                boughtMsg &&
                boughtBlur
            ) {
                return;
            }

            playClick();

            lockedNotice.classList.remove(
                "gift-taunt-shake"
            );

            void lockedNotice.offsetWidth;

            lockedNotice.classList.add(
                "gift-taunt-shake"
            );

            showAvignaToast(
                taunts[
                    index %
                        taunts.length
                ]
            );

            pageGlow(
                lockedNotice,
                600
            );

            index++;
        }
    );
})();


/* ==========================================================================
   HUNGER CHEAT
========================================================================== */

(function setupHungerCheat() {
    const hungerBar =
        document.querySelector(
            ".hunger-bar"
        );

    if (!hungerBar) {
        return;
    }

    let clicks = 0;

    hungerBar.addEventListener(
        "click",
        function () {
            if (!isUnlocked()) {
                return;
            }

            playClick();

            clicks++;

            pageGlow(
                hungerBar,
                250
            );

            if (
                clicks <
                5
            ) {
                return;
            }

            clicks = 0;

            const old =
                hungerPercent;

            hungerPercent =
                0;

            refreshHungerDisplay();
            updatePageFilter();

            showAvignaToast(
                "🍽️ cheat activated: hunger reset. shh."
            );

            activateHungerDrain(
                old
            );

            spawnEmojiRain(
                [
                    "🍕",
                    "🍔",
                    "🥟",
                    "🥢"
                ],
                10,
                3
            );
        }
    );
})();

function activateHungerDrain(
    oldValue = 20
) {
    const bar =
        document.querySelector(
            ".hunger-bar"
        );

    if (!bar) {
        return;
    }

    bar.classList.add(
        "hunger-draining"
    );

    let value =
        Math.max(
            0,
            oldValue
        );

    const timer =
        setInterval(
            function () {
                value -= 5;

                hungerPercent =
                    Math.max(
                        0,
                        value
                    );

                refreshHungerDisplay();
                updatePageFilter();

                if (
                    value <=
                    0
                ) {
                    clearInterval(
                        timer
                    );
                }
            },
            50
        );

    setTimeout(
        function () {
            bar.classList.remove(
                "hunger-draining"
            );
        },
        1000
    );
}


/* ==========================================================================
   FOOD CARD BONUS
========================================================================== */

(function setupFoodCardBonus() {
    document
        .querySelectorAll(
            ".food-card"
        )
        .forEach(
            function (card) {
                let clicks = 0;
                let claimed =
                    false;

                card.addEventListener(
                    "click",
                    function (
                        event
                    ) {
                        if (
                            event.target.closest(
                                ".food-button"
                            ) ||
                            claimed
                        ) {
                            return;
                        }

                        playClick();

                        clicks++;

                        if (
                            clicks <
                            4
                        ) {
                            return;
                        }

                        claimed =
                            true;

                        money +=
                            30;

                        refreshMoneyDisplay();

                        card.classList.add(
                            "bonus-glow"
                        );

                        showAvignaToast(
                            "👨‍🍳 chef's special found. +$30."
                        );

                        pageGlow(
                            card,
                            1400
                        );

                        starBurst(
                            card.getBoundingClientRect()
                                .left +
                                card.offsetWidth /
                                    2,
                            card.getBoundingClientRect()
                                .top +
                                card.offsetHeight /
                                    2,
                            [
                                "💰",
                                "🍴",
                                "✨"
                            ]
                        );
                    }
                );
            }
        );
})();


/* ==========================================================================
   FOOD SECTION DOUBLE CLICK
========================================================================== */

(function setupFoodSectionSecret() {
    const section =
        document.querySelector(
            ".eat-section"
        );

    if (!section) {
        return;
    }

    section.addEventListener(
        "dblclick",
        function (event) {
            if (
                event.target.closest(
                    ".food-card"
                )
            ) {
                return;
            }

            playClick();

            showAvignaToast(
                "🍜 food storm summoned."
            );

            pageGlow(
                section,
                1200
            );

            spawnEmojiRain(
                [
                    "🍕",
                    "🍔",
                    "🥟",
                    "🍜",
                    "🧋"
                ],
                16,
                3.5
            );
        }
    );
})();


/* ==========================================================================
   EMOJI RAIN
========================================================================== */

function spawnEmojiRain(
    emojiList,
    count,
    duration
) {
    for (
        let i = 0;
        i < count;
        i++
    ) {
        const drop =
            document.createElement(
                "div"
            );

        drop.className =
            "rain-emoji";

        drop.textContent =
            emojiList[
                Math.floor(
                    Math.random() *
                        emojiList.length
                )
            ];

        drop.style.left =
            Math.random() *
                100 +
            "vw";

        drop.style.animationDuration =
            duration +
            Math.random() *
                2 +
            "s";

        drop.style.fontSize =
            1.4 +
            Math.random() *
                1.8 +
            "rem";

        document.body.appendChild(
            drop
        );

        setTimeout(
            function () {
                drop.remove();
            },
            (duration + 3) *
                1000
        );
    }
}


/* ==========================================================================
   MYSTERY MODE
========================================================================== */

(function setupMysteryMode() {
    if (!themeIcon) {
        return;
    }

    let clicks = 0;
    let timer = null;

    themeIcon.addEventListener(
        "click",
        function (event) {
            clicks++;

            clearTimeout(
                timer
            );

            timer =
                setTimeout(
                    function () {
                        clicks = 0;
                    },
                    1800
                );

            if (
                clicks <
                7
            ) {
                return;
            }

            clicks = 0;

            event.stopPropagation();

            showAvignaToast(
                "🕶️ MYSTERY MODE. don't ask questions."
            );

            document.body.style.filter =
                "grayscale(1) invert(1)";

            showSecretBadge(
                "MYSTERY MODE",
                1800
            );

            setTimeout(
                function () {
                    document.body.style.filter =
                        "none";
                },
                2000
            );
        },
        true
    );
})();


/* ==========================================================================
   EYEBROW SECRET
========================================================================== */

(function setupEyebrowSecret() {
    const eyebrow =
        document.querySelector(
            ".eyebrow"
        );

    if (!eyebrow) {
        return;
    }

    const roasts = [
        "( ok she's actually pretty cool, don't tell her I said that )",
        "( this website took longer than her attention span usually lasts )",
        "( certified: 1 (one) certified goofball )",
        "( no refunds on this birthday, sorry )"
    ];

    let clicks = 0;
    let timer = null;

    eyebrow.addEventListener(
        "click",
        function () {
            clicks++;

            playClick();

            clearTimeout(
                timer
            );

            timer =
                setTimeout(
                    function () {
                        clicks = 0;
                    },
                    700
                );

            if (
                clicks <
                3
            ) {
                return;
            }

            clicks = 0;

            showAvignaToast(
                roasts[
                    Math.floor(
                        Math.random() *
                            roasts.length
                    )
                ]
            );

            glitchElement(
                eyebrow
            );

            createScanline(
                "#4fffe8"
            );
        }
    );
})();


/* ==========================================================================
   JUDGEMENT LONG PRESS
========================================================================== */

(function setupJudgementLongPress() {
    const stats =
        document.querySelectorAll(
            ".stats .stat"
        );

    const judgement =
        stats[
            stats.length -
                1
        ];

    if (!judgement) {
        return;
    }

    let timer = null;

    function start() {
        timer =
            setTimeout(
                function () {
                    const tooltip =
                        document.createElement(
                            "span"
                        );

                    tooltip.className =
                        "roast-tooltip visible";

                    tooltip.textContent =
                        "( peer reviewed by Neerav, who is extremely biased )";

                    judgement.appendChild(
                        tooltip
                    );

                    showAvignaToast(
                        "⚖️ the judgement stat had a footnote."
                    );

                    spotlightElement(
                        judgement,
                        2000
                    );
                },
                1800
            );
    }

    function cancel() {
        clearTimeout(
            timer
        );
    }

    judgement.addEventListener(
        "mousedown",
        start
    );

    judgement.addEventListener(
        "touchstart",
        start,
        {
            passive: true
        }
    );

    judgement.addEventListener(
        "mouseup",
        cancel
    );

    judgement.addEventListener(
        "mouseleave",
        cancel
    );

    judgement.addEventListener(
        "touchend",
        cancel
    );
})();


/* ==========================================================================
   MUTE PRANK
========================================================================== */

(function setupMutePrank() {
    if (!muteBtn) {
        return;
    }

    let clicks = 0;
    let timer = null;

    muteBtn.addEventListener(
        "click",
        function () {
            clicks++;

            clearTimeout(
                timer
            );

            timer =
                setTimeout(
                    function () {
                        clicks = 0;
                    },
                    2000
                );

            if (
                clicks <
                10
            ) {
                return;
            }

            clicks = 0;

            showAvignaToast(
                "🦠 VIRUS DETECTED. relax, it's fake."
            );

            document.body.classList.add(
                "screen-shake"
            );

            document.body.classList.add(
                "secret-chromatic"
            );

            showSecretBadge(
                "VIRUS DETECTED",
                1100
            );

            setTimeout(
                function () {
                    document.body.classList.remove(
                        "screen-shake"
                    );

                    document.body.classList.remove(
                        "secret-chromatic"
                    );
                },
                900
            );
        }
    );
})();


/* ==========================================================================
   SHOP DESCRIPTION
========================================================================== */

(function setupShopDescriptionSecret() {
    const paragraphs =
        document.querySelectorAll(
            ".shop-option p"
        );

    const paragraph =
        paragraphs[1];

    if (!paragraph) {
        return;
    }

    let clicks = 0;

    paragraph.style.cursor =
        "help";

    paragraph.addEventListener(
        "click",
        function () {
            playClick();

            clicks++;

            if (
                clicks <
                3
            ) {
                return;
            }

            clicks = 0;

            showAvignaToast(
                "🌫️ the blur was never a bug. it was a feature. probably."
            );

            spotlightElement(
                paragraph,
                1800
            );
        }
    );
})();


/* ==========================================================================
   UNDRAGGABLE HERO
========================================================================== */

(function setupUndraggableHero() {
    const heroTitle =
        document.querySelector(
            ".hero-title"
        );

    if (!heroTitle) {
        return;
    }

    heroTitle.draggable =
        true;

    heroTitle.addEventListener(
        "dragstart",
        function (event) {
            event.preventDefault();

            showAvignaToast(
                "📌 nice try, can't drag this away either."
            );

            glitchElement(
                heroTitle
            );

            createRipple(
                innerWidth / 2,
                innerHeight / 3,
                "#baff6a"
            );
        }
    );
})();


/* ==========================================================================
   FAKE LOADING START
========================================================================== */

(function setupFakeLoadingStart() {
    const startButton =
        document.querySelector(
            'a[href="#about"].button'
        );

    if (!startButton) {
        return;
    }

    let timer = null;

    const lines = [
        "Calculating goofiness levels...",
        "Politely asking judgement to cooperate...",
        "Loading 1 (one) friendship...",
        "Compressing 500+ inside jokes...",
        "Almost there, unlike her deadlines..."
    ];

    function startPress() {
        timer =
            setTimeout(
                function () {
                    playClick();

                    const overlay =
                        document.createElement(
                            "div"
                        );

                    overlay.className =
                        "fake-loading-overlay";

                    overlay.innerHTML = `
                        <div>
                            INITIALIZING BIRTHDAY.EXE
                        </div>

                        <div class="fake-loading-bar-track">
                            <div class="fake-loading-bar-fill"></div>
                        </div>

                        <div class="fake-loading-line"></div>
                    `;

                    document.body.appendChild(
                        overlay
                    );

                    const fill =
                        overlay.querySelector(
                            ".fake-loading-bar-fill"
                        );

                    const line =
                        overlay.querySelector(
                            ".fake-loading-line"
                        );

                    let progress = 0;
                    let lineIndex = 0;

                    line.textContent =
                        lines[0];

                    const interval =
                        setInterval(
                            function () {
                                progress +=
                                    8 +
                                    Math.random() *
                                        10;

                                progress =
                                    Math.min(
                                        progress,
                                        100
                                    );

                                fill.style.width =
                                    progress +
                                    "%";

                                const expected =
                                    Math.floor(
                                        (
                                            progress /
                                            100
                                        ) *
                                            lines.length
                                    );

                                if (
                                    expected !==
                                        lineIndex &&
                                    expected <
                                        lines.length
                                ) {
                                    lineIndex =
                                        expected;

                                    line.textContent =
                                        lines[
                                            lineIndex
                                        ];
                                }

                                if (
                                    progress >=
                                    100
                                ) {
                                    clearInterval(
                                        interval
                                    );

                                    setTimeout(
                                        function () {
                                            overlay.remove();

                                            document
                                                .getElementById(
                                                    "about"
                                                )
                                                ?.scrollIntoView(
                                                    {
                                                        behavior:
                                                            "smooth"
                                                    }
                                                );
                                        },
                                        500
                                    );
                                }
                            },
                            220
                        );
                },
                2500
            );
    }

    function cancelPress() {
        clearTimeout(
            timer
        );
    }

    startButton.addEventListener(
        "mousedown",
        startPress
    );

    startButton.addEventListener(
        "mouseup",
        cancelPress
    );

    startButton.addEventListener(
        "mouseleave",
        cancelPress
    );
})();


/* ==========================================================================
   SHIFT CLICK
========================================================================== */

(function setupShiftClick() {
    const lines = [
        "you clicked with shift held. legend.",
        "this bubble means nothing. enjoy it anyway.",
        "achievement unlocked: found a pointless feature",
        "shift clicking won't give you admin access",
        "yes, this was intentional. mostly."
    ];

    document.addEventListener(
        "click",
        function (event) {
            if (
                !event.shiftKey ||
                !isUnlocked()
            ) {
                return;
            }

            const bubble =
                document.createElement(
                    "div"
                );

            bubble.className =
                "meme-bubble";

            bubble.textContent =
                lines[
                    Math.floor(
                        Math.random() *
                            lines.length
                    )
                ];

            bubble.style.left =
                event.clientX +
                "px";

            bubble.style.top =
                event.clientY -
                20 +
                "px";

            document.body.appendChild(
                bubble
            );

            createRipple(
                event.clientX,
                event.clientY,
                "#ff8cd9"
            );

            setTimeout(
                function () {
                    bubble.remove();
                },
                2500
            );
        }
    );
})();


/* ==========================================================================
   MIDDLE CLICK
========================================================================== */

document.addEventListener(
    "auxclick",
    function (event) {
        if (
            event.button !== 1 ||
            !isUnlocked()
        ) {
            return;
        }

        event.preventDefault();

        showAvignaToast(
            "🖱️ middle click? on a birthday website? bold."
        );

        createRipple(
            event.clientX,
            event.clientY,
            "#42d9ff"
        );

        createScanline(
            "#42d9ff"
        );
    }
);


/* ==========================================================================
   FAST SCROLL
========================================================================== */

(function setupFastScroll() {
    let lastY =
        window.scrollY;

    let lastTime =
        Date.now();

    let warned = false;

    window.addEventListener(
        "scroll",
        function () {
            if (!isUnlocked()) {
                return;
            }

            const now =
                Date.now();

            const deltaY =
                Math.abs(
                    window.scrollY -
                        lastY
                );

            const deltaTime =
                now -
                lastTime;

            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;

            const nearBottom =
                documentHeight >
                    0 &&
                window.scrollY /
                    documentHeight >
                    0.92;

            if (
                deltaTime > 0 &&
                deltaTime < 120 &&
                deltaY > 900 &&
                nearBottom &&
                !warned
            ) {
                warned =
                    true;

                showAvignaToast(
                    "🏃 slow down, savor the content. or don't."
                );

                document.body.classList.add(
                    "scroll-chaos"
                );

                setTimeout(
                    function () {
                        document.body.classList.remove(
                            "scroll-chaos"
                        );
                    },
                    900
                );

                setTimeout(
                    function () {
                        warned = false;
                    },
                    15000
                );
            }

            lastY =
                window.scrollY;

            lastTime =
                now;
        },
        {
            passive: true
        }
    );
})();


/* ==========================================================================
   ANTI-KONAMI
========================================================================== */

const antiKonamiCode = [
    "ArrowDown",
    "ArrowDown",
    "ArrowUp",
    "ArrowUp",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "a",
    "b"
];

let antiKonamiIndex =
    0;

document.addEventListener(
    "keydown",
    function (event) {
        if (!isUnlocked()) {
            return;
        }

        const key =
            event.key.length === 1
                ? event.key.toLowerCase()
                : event.key;

        if (
            key ===
            antiKonamiCode[
                antiKonamiIndex
            ]
        ) {
            antiKonamiIndex++;

            if (
                antiKonamiIndex ===
                antiKonamiCode.length
            ) {
                antiKonamiIndex =
                    0;

                showAvignaToast(
                    "🔄 anti-konami detected. undoing... nothing. there was nothing to undo."
                );

                triggerInvertFlash();

                shockwave();

                createScanline(
                    "#ff73b5"
                );
            }
        } else {
            antiKonamiIndex =
                key ===
                antiKonamiCode[0]
                    ? 1
                    : 0;
        }
    }
);


/* ==========================================================================
   29-SECOND EVENT
========================================================================== */

let lastGoldenMinute =
    -1;

setInterval(
    function () {
        if (!isUnlocked()) {
            return;
        }

        const now =
            new Date();

        if (
            now.getSeconds() ===
                29 &&
            now.getMinutes() !==
                lastGoldenMinute
        ) {
            lastGoldenMinute =
                now.getMinutes();

            document.body.classList.add(
                "golden-second-event"
            );

            showAvignaToast(
                "✨ 29 seconds."
            );

            flashPage(
                "rgba(255,216,107,.15)",
                500
            );

            starBurst(
                innerWidth / 2,
                innerHeight / 2,
                [
                    "29",
                    "✦",
                    "✨"
                ]
            );

            setTimeout(
                function () {
                    document.body.classList.remove(
                        "golden-second-event"
                    );
                },
                800
            );
        }
    },
    1000
);


/* ==========================================================================
   MIDPOINT SCROLL
========================================================================== */

let midpointTriggered =
    false;

window.addEventListener(
    "scroll",
    function () {
        if (
            midpointTriggered ||
            !isUnlocked()
        ) {
            return;
        }

        const maxScroll =
            document.documentElement
                .scrollHeight -
            innerHeight;

        if (maxScroll <= 0) {
            return;
        }

        const progress =
            scrollY /
            maxScroll;

        if (
            progress >=
                0.5 &&
            progress <=
                0.55
        ) {
            midpointTriggered =
                true;

            showAvignaToast(
                "🌀 you found the middle of nowhere."
            );

            const portal =
                document.createElement(
                    "div"
                );

            portal.className =
                "midpoint-portal";

            document.body.appendChild(
                portal
            );

            requestAnimationFrame(
                function () {
                    portal.classList.add(
                        "active"
                    );
                }
            );

            setTimeout(
                function () {
                    portal.classList.remove(
                        "active"
                    );
                },
                100
            );

            setTimeout(
                function () {
                    portal.remove();
                },
                1400
            );

            createScanline(
                "#b58cff"
            );
        }
    },
    {
        passive: true
    }
);


/* ==========================================================================
   BOTTOM -> TOP
========================================================================== */

let reachedBottom =
    false;

let returnedFromBottom =
    false;

window.addEventListener(
    "scroll",
    function () {
        if (!isUnlocked()) {
            return;
        }

        const maxScroll =
            document.documentElement
                .scrollHeight -
            innerHeight;

        if (maxScroll <= 0) {
            return;
        }

        const progress =
            scrollY /
            maxScroll;

        if (
            progress >
            0.97
        ) {
            reachedBottom =
                true;
        }

        if (
            reachedBottom &&
            progress <
                0.08 &&
            !returnedFromBottom
        ) {
            returnedFromBottom =
                true;

            showAvignaToast(
                "🔄 you went all the way down... and came back."
            );

            document.body.classList.add(
                "bottom-return-effect"
            );

            spawnEmojiRain(
                [
                    "⬆️",
                    "✨",
                    "🎂",
                    "💫"
                ],
                12,
                3
            );

            setTimeout(
                function () {
                    document.body.classList.remove(
                        "bottom-return-effect"
                    );
                },
                1000
            );
        }
    },
    {
        passive: true
    }
);


/* ==========================================================================
   RESIZE PANIC
========================================================================== */

(function setupResizeSecret() {
    let count = 0;
    let timer = null;

    window.addEventListener(
        "resize",
        function () {
            if (!isUnlocked()) {
                return;
            }

            count++;

            clearTimeout(
                timer
            );

            timer =
                setTimeout(
                    function () {
                        count = 0;
                    },
                    4000
                );

            if (
                count >=
                5
            ) {
                count = 0;

                showAvignaToast(
                    "📐 RESPONSIVE PANIC DETECTED."
                );

                document.body.classList.add(
                    "resize-panic"
                );

                createScanline(
                    "#42d9ff"
                );

                setTimeout(
                    function () {
                        document.body.classList.remove(
                            "resize-panic"
                        );
                    },
                    1500
                );
            }
        }
    );
})();


/* ==========================================================================
   ORIENTATION
========================================================================== */

window.addEventListener(
    "orientationchange",
    function () {
        if (!isUnlocked()) {
            return;
        }

        showAvignaToast(
            "📱 orientation changed. fancy."
        );

        const flash =
            document.createElement(
                "div"
            );

        flash.className =
            "orientation-secret";

        document.body.appendChild(
            flash
        );

        spawnEmojiRain(
            [
                "🎂",
                "🎈",
                "✨",
                "🌈"
            ],
            10,
            3
        );

        setTimeout(
            function () {
                flash.remove();
            },
            1600
        );
    }
);


/* ==========================================================================
   TAB RETURN
========================================================================== */

let hiddenAt =
    null;

document.addEventListener(
    "visibilitychange",
    function () {
        if (
            document.hidden
        ) {
            hiddenAt =
                Date.now();

            return;
        }

        if (
            !isUnlocked() ||
            hiddenAt === null
        ) {
            return;
        }

        const awayTime =
            Date.now() -
            hiddenAt;

        hiddenAt =
            null;

        if (
            awayTime >=
            10000
        ) {
            document.body.classList.add(
                "tab-return-flash"
            );

            showAvignaToast(
                "👀 you disappeared for " +
                Math.floor(
                    awayTime /
                        1000
                ) +
                " seconds."
            );

            flashPage(
                "rgba(79,255,232,.12)",
                500
            );

            if (
                typeof confetti ===
                "function"
            ) {
                confetti({
                    particleCount: 65,
                    spread: 100,
                    startVelocity: 35,
                    origin: {
                        x: 0.5,
                        y: 0.35
                    }
                });
            }

            setTimeout(
                function () {
                    document.body.classList.remove(
                        "tab-return-flash"
                    );
                },
                1100
            );
        }
    }
);


/* ==========================================================================
   FULLSCREEN
========================================================================== */

document.addEventListener(
    "fullscreenchange",
    function () {
        if (
            !isUnlocked() ||
            !document.fullscreenElement
        ) {
            return;
        }

        showSecretBadge(
            "BIRTHDAY: DIRECTOR'S CUT",
            1800
        );

        flashPage(
            "rgba(255,120,220,.12)",
            700
        );

        createScanline(
            "#ff79b5"
        );
    }
);


/* ==========================================================================
   OFFLINE / ONLINE
========================================================================== */

window.addEventListener(
    "offline",
    function () {
        if (!isUnlocked()) {
            return;
        }

        showAvignaToast(
            "📡 BIRTHDAY SERVERS HAVE VANISHED."
        );

        const existing =
            document.getElementById(
                "offline-secret-banner"
            );

        if (existing) {
            return;
        }

        const banner =
            document.createElement(
                "div"
            );

        banner.className =
            "offline-secret";

        banner.id =
            "offline-secret-banner";

        banner.textContent =
            "⚠ CONNECTION LOST — birthday.exe is confused";

        document.body.appendChild(
            banner
        );

        flashPage(
            "rgba(255,50,50,.12)",
            600
        );
    }
);

window.addEventListener(
    "online",
    function () {
        const banner =
            document.getElementById(
                "offline-secret-banner"
            );

        if (banner) {
            banner.remove();
        }

        if (!isUnlocked()) {
            return;
        }

        showAvignaToast(
            "📡 connection restored. birthday.exe survived."
        );

        shockwave();

        if (
            typeof confetti ===
            "function"
        ) {
            confetti({
                particleCount: 40,
                spread: 80,
                startVelocity: 30,
                origin: {
                    x: 0.5,
                    y: 0.3
                }
            });
        }
    }
);


/* ==========================================================================
   TEXT SELECTION SECRET
========================================================================== */

let loreTriggered =
    false;

document.addEventListener(
    "selectionchange",
    function () {
        if (
            loreTriggered ||
            !isUnlocked()
        ) {
            return;
        }

        const selection =
            window.getSelection();

        if (!selection) {
            return;
        }

        const selected =
            selection
                .toString()
                .trim();

        if (
            selected.length >=
            100
        ) {
            loreTriggered =
                true;

            showAvignaToast(
                "📜 LORE UNLOCKED."
            );

            const lore =
                document.createElement(
                    "div"
                );

            lore.className =
                "lore-secret";

            lore.innerHTML = `
                <strong>
                    CLASSIFIED BIRTHDAY LORE
                </strong>

                <br><br>

                You selected enough text
                to qualify as a suspicious
                investigator.

                <br><br>

                Unfortunately, the classified
                information is:

                <br><br>

                there is no classified information.
            `;

            document.body.appendChild(
                lore
            );

            setTimeout(
                function () {
                    lore.classList.add(
                        "visible"
                    );
                },
                50
            );

            flashPage(
                "rgba(123,91,255,.12)",
                500
            );

            setTimeout(
                function () {
                    lore.classList.remove(
                        "visible"
                    );
                },
                5000
            );

            setTimeout(
                function () {
                    lore.remove();
                },
                5600
            );
        }
    }
);


/* ==========================================================================
   PRINT SECRET
========================================================================== */

window.addEventListener(
    "beforeprint",
    function () {
        if (!isUnlocked()) {
            return;
        }

        showAvignaToast(
            "🖨️ PRINTING CLASSIFIED BIRTHDAY DOCUMENTS."
        );

        flashPage(
            "rgba(255,0,0,.08)",
            500
        );
    }
);

window.addEventListener(
    "afterprint",
    function () {
        if (!isUnlocked()) {
            return;
        }

        showAvignaToast(
            "🖨️ report successfully printed. probably."
        );
    }
);


/* ==========================================================================
   REDUCED MOTION
========================================================================== */

const reducedMotionQuery =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (
    reducedMotionQuery.addEventListener
) {
    reducedMotionQuery.addEventListener(
        "change",
        function (event) {
            if (!isUnlocked()) {
                return;
            }

            if (event.matches) {
                showAvignaToast(
                    "♿ calm mode detected."
                );
            } else {
                showAvignaToast(
                    "⚡ FULL MOTION RESTORED."
                );

                flashPage(
                    "rgba(79,255,232,.1)",
                    500
                );
            }
        }
    );
}


/* ==========================================================================
   TWO-MINUTE VISITOR SECRET
========================================================================== */

setTimeout(
    function () {
        if (!isUnlocked()) {
            return;
        }

        showAvignaToast(
            "⏱️ you've been here for two minutes. respectfully... go outside."
        );

        const warning =
            document.createElement(
                "div"
            );

        warning.className =
            "visitor-secret";

        warning.innerHTML = `
            <div class="visitor-secret-title">
                VISITOR TIMEOUT
            </div>

            <div>
                You have officially spent too long
                investigating this birthday website.
            </div>

            <br>

            <div>
                Achievement unlocked:
                🏆 TOO CURIOUS
            </div>
        `;

        document.body.appendChild(
            warning
        );

        setTimeout(
            function () {
                warning.classList.add(
                    "visible"
                );
            },
            50
        );

        flashPage(
            "rgba(79,255,232,.12)",
            700
        );

        if (
            typeof confetti ===
            "function"
        ) {
            confetti({
                particleCount: 70,
                spread: 100,
                startVelocity: 40,
                origin: {
                    x: 0.5,
                    y: 0.35
                }
            });
        }

        setTimeout(
            function () {
                warning.classList.remove(
                    "visible"
                );
            },
            5500
        );

        setTimeout(
            function () {
                warning.remove();
            },
            6200
        );
    },
    120000
);


/* ==========================================================================
   SERIAL NUMBER SECRET
========================================================================== */

(function setupSerialSecret() {
    const serial =
        document.querySelector(
            ".serial-number"
        );

    if (!serial) {
        return;
    }

    let triggered = false;

    serial.addEventListener(
        "mouseenter",
        function () {
            if (triggered) {
                return;
            }

            triggered =
                true;

            showAvignaToast(
                "📁 FILE: AVIGNA_FINAL.exe"
            );

            glitchElement(
                serial
            );

            createScanline(
                "#4fffe8"
            );

            const original =
                serial.textContent;

            let flashes = 0;

            const interval =
                setInterval(
                    function () {
                        let output =
                            "";

                        const chars =
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

                        for (
                            let i = 0;
                            i <
                            original.length;
                            i++
                        ) {
                            output +=
                                original[
                                    i
                                ] ===
                                " "
                                    ? " "
                                    : chars[
                                          Math.floor(
                                              Math.random() *
                                                  chars.length
                                          )
                                      ];
                        }

                        serial.textContent =
                            output;

                        flashes++;

                        if (
                            flashes >=
                            6
                        ) {
                            clearInterval(
                                interval
                            );

                            serial.textContent =
                                "FILE: AVIGNA_FINAL.exe";
                        }
                    },
                    90
                );
        }
    );
})();


/* ==========================================================================
   CORNER SECRET
========================================================================== */

(function setupCornerSecret() {
    let triggered =
        false;

    document.addEventListener(
        "mousemove",
        function (event) {
            if (
                triggered ||
                !isUnlocked()
            ) {
                return;
            }

            if (
                event.clientX <=
                    12 &&
                event.clientY <=
                    12
            ) {
                triggered =
                    true;

                showAvignaToast(
                    "📍 you found the corner."
                );

                const corner =
                    document.createElement(
                        "div"
                    );

                corner.className =
                    "corner-coordinate-secret";

                corner.innerHTML = `
                    <span>LAT: 29.08</span><br>
                    <span>MEM: FRIENDSHIP</span><br>
                    <span>STATUS: CLASSIFIED</span>
                `;

                document.body.appendChild(
                    corner
                );

                requestAnimationFrame(
                    function () {
                        corner.classList.add(
                            "visible"
                        );
                    }
                );

                setTimeout(
                    function () {
                        corner.classList.remove(
                            "visible"
                        );
                    },
                    5000
                );

                setTimeout(
                    function () {
                        corner.remove();
                    },
                    5600
                );

                createRipple(
                    10,
                    10,
                    "#4fffe8"
                );
            }
        },
        {
            passive: true
        }
    );
})();


/* ==========================================================================
   MEMORY SCROLL SECRET
========================================================================== */

let memoryTriggered =
    false;

window.addEventListener(
    "scroll",
    function () {
        if (
            memoryTriggered ||
            !isUnlocked()
        ) {
            return;
        }

        const maxScroll =
            document.documentElement
                .scrollHeight -
            innerHeight;

        if (maxScroll <= 0) {
            return;
        }

        const progress =
            scrollY /
            maxScroll;

        if (
            progress >=
                0.285 &&
            progress <=
                0.31
        ) {
            memoryTriggered =
                true;

            const memory =
                document.createElement(
                    "div"
                );

            memory.className =
                "memory-fragment-secret";

            memory.textContent =
                "MEMORY_01: someone here has terrible judgement.";

            document.body.appendChild(
                memory
            );

            requestAnimationFrame(
                function () {
                    memory.classList.add(
                        "visible"
                    );
                }
            );

            showAvignaToast(
                "🧠 MEMORY FRAGMENT FOUND."
            );

            flashPage(
                "rgba(79,255,232,.08)",
                600
            );

            setTimeout(
                function () {
                    memory.classList.remove(
                        "visible"
                    );
                },
                3500
            );

            setTimeout(
                function () {
                    memory.remove();
                },
                4100
            );
        }
    },
    {
        passive: true
    }
);


/* ==========================================================================
   FOOTER SECRET
========================================================================== */

let footerSecretTriggered =
    false;

window.addEventListener(
    "scroll",
    function () {
        if (
            footerSecretTriggered ||
            !isUnlocked()
        ) {
            return;
        }

        const maxScroll =
            document.documentElement
                .scrollHeight -
            innerHeight;

        if (
            maxScroll > 0 &&
            scrollY /
                maxScroll >=
                0.985
        ) {
            footerSecretTriggered =
                true;

            const secret =
                document.createElement(
                    "div"
                );

            secret.className =
                "footer-ghost-secret";

            secret.textContent =
                "you weren't supposed to find this.";

            document.body.appendChild(
                secret
            );

            requestAnimationFrame(
                function () {
                    secret.classList.add(
                        "visible"
                    );
                }
            );

            showAvignaToast(
                "👁️ something is watching the footer."
            );

            setTimeout(
                function () {
                    secret.classList.remove(
                        "visible"
                    );
                },
                4500
            );

            setTimeout(
                function () {
                    secret.remove();
                },
                5200
            );
        }
    },
    {
        passive: true
    }
);


/* ==========================================================================
   HERO EDGE SECRET
========================================================================== */

(function setupHeroEdgeSecret() {
    const hero =
        document.querySelector(
            ".hero"
        );

    if (!hero) {
        return;
    }

    let triggered =
        false;

    hero.addEventListener(
        "mousemove",
        function (event) {
            if (triggered) {
                return;
            }

            const rect =
                hero.getBoundingClientRect();

            if (
                rect.right -
                    event.clientX <
                    18
            ) {
                triggered =
                    true;

                const whisper =
                    document.createElement(
                        "div"
                    );

                whisper.className =
                    "hero-edge-secret";

                whisper.textContent =
                    "psst...";

                document.body.appendChild(
                    whisper
                );

                requestAnimationFrame(
                    function () {
                        whisper.classList.add(
                            "visible"
                        );
                    }
                );

                createScanline(
                    "#4fffe8"
                );

                setTimeout(
                    function () {
                        whisper.classList.remove(
                            "visible"
                        );
                    },
                    2200
                );

                setTimeout(
                    function () {
                        whisper.remove();
                    },
                    2800
                );
            }
        },
        {
            passive: true
        }
    );
})();


/* ==========================================================================
   THEME HOVER SECRET
========================================================================== */

(function setupThemeHoverSecret() {
    if (!themeSwitch) {
        return;
    }

    let timer = null;

    themeSwitch.addEventListener(
        "mouseenter",
        function () {
            clearTimeout(
                timer
            );

            timer =
                setTimeout(
                    function () {
                        showAvignaToast(
                            "👀 you noticed the theme button."
                        );

                        if (
                            themeSwitchText
                        ) {
                            themeSwitchText.textContent =
                                "...THERE'S ANOTHER MODE";

                            pageGlow(
                                themeSwitch,
                                1500
                            );

                            setTimeout(
                                updateThemeButton,
                                2200
                            );
                        }
                    },
                    3000
                );
        }
    );

    themeSwitch.addEventListener(
        "mouseleave",
        function () {
            clearTimeout(
                timer
            );
        }
    );
})();


/* ==========================================================================
   TAB NAVIGATION SECRET
========================================================================== */

(function setupTabSecret() {
    let count = 0;
    let triggered =
        false;

    document.addEventListener(
        "keydown",
        function (event) {
            if (
                event.key !== "Tab" ||
                triggered ||
                !isUnlocked()
            ) {
                return;
            }

            count++;

            if (
                count >=
                12
            ) {
                triggered =
                    true;

                const terminal =
                    document.createElement(
                        "div"
                    );

                terminal.className =
                    "terminal-secret";

                terminal.innerHTML = `
                    <strong>
                        > BIRTHDAY_OS TERMINAL
                    </strong>

                    <br><br>

                    > keyboard route detected
                    <br>
                    > visitor classification: CURIOUS
                    <br>
                    > security status: questionable
                    <br>
                    > admin rights: absolutely not
                    <br><br>

                    > congratulations anyway.
                `;

                const close =
                    document.createElement(
                        "button"
                    );

                close.textContent =
                    "CLOSE";

                Object.assign(
                    close.style,
                    {
                        marginTop: "20px",
                        padding: "10px 18px",
                        background:
                            "transparent",
                        color: "#4fffe8",
                        border:
                            "1px solid rgba(79,255,232,.3)",
                        borderRadius:
                            "10px",
                        fontFamily:
                            "DM Mono,monospace",
                        cursor:
                            "pointer"
                    }
                );

                close.onclick =
                    function () {
                        terminal.remove();
                    };

                terminal.appendChild(
                    close
                );

                document.body.appendChild(
                    terminal
                );

                requestAnimationFrame(
                    function () {
                        terminal.classList.add(
                            "visible"
                        );
                    }
                );

                showAvignaToast(
                    "⌨️ keyboard explorer detected."
                );

                createScanline(
                    "#4fffe8"
                );
            }
        }
    );
})();


/* ==========================================================================
   INITIAL DISPLAY
========================================================================== */

refreshMoneyDisplay();
refreshHungerDisplay();
updatePageFilter();


/* ==========================================================================
   DEVTOOLS ART
========================================================================== */

console.log(
    "%c🎂 hii nosy person",
    "font-size:20px;font-weight:bold;color:#4fffe8;"
);

console.log(
    "%cThis website reacts to things. Explore it.",
    "font-size:14px;color:#baff6a;"
);

console.log(
    "%cTry the Konami code too. ↑ ↑ ↓ ↓ ← → ← → B A",
    "font-size:12px;color:#ff8cd9;"
);
