/* ==========================================================================
   BIRTHDAY WEBSITE — CLEAN SECRET EDITION

   MAIN SYSTEMS
   - Birthday countdown + IST lock
   - Countdown stages + countdown parties
   - Blue / Pink theme
   - Money system
   - Hunger system
   - Food system
   - Shop progression
   - Gift progression
   - Dance / Movies / Books
   - Cinema Mode + Exit
   - Birthday poem
   - Konami / Anti-Konami
   - Typing secrets
   - Logo secrets
   - Quote secrets
   - Stats combo
   - Message postscript
   - Food ending
   - Final gift + confetti

   EXPLORATION / MECHANIC SECRETS
   - Tab return
   - Scroll direction combo
   - Perfect pause
   - 100% completion
   - $500 milestone
   - Hunger survival

   REMOVED FROM OLDER VERSION
   - Fast mouse sparkle
   - Mouse leaving ghost
   - Midpoint portal
   - Top-left corner secret
   - Hero edge secret
   - Serial hover secret
   - Text selection secret
   - Two-minute visitor timer
   - Print secret
   - Fullscreen secret
   - Offline / online secrets
   - Orientation secret
   - Resize secret
   - 29-second event
========================================================================== */


/* ==========================================================================
   GLOBAL
========================================================================== */

window.history.scrollRestoration = "manual";

window.addEventListener("load", function () {
    if (
        document.body.classList.contains(
            "birthday-unlocked"
        )
    ) {
        window.scrollTo(0, 0);
    }
});


/* ==========================================================================
   ELEMENT REFERENCES
========================================================================== */

const lockScreen =
    document.getElementById(
        "birthday-lock-screen"
    );

const countdownDays =
    document.getElementById(
        "countdown-days"
    );

const countdownHours =
    document.getElementById(
        "countdown-hours"
    );

const countdownMinutes =
    document.getElementById(
        "countdown-minutes"
    );

const countdownSeconds =
    document.getElementById(
        "countdown-seconds"
    );

const countdownStatus =
    document.getElementById(
        "countdown-status"
    );

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

const blackOut =
    document.querySelector(
        ".black-screen"
    );

const foodButtons =
    document.querySelectorAll(
        ".food-button"
    );

const shopButtons =
    document.querySelectorAll(
        ".shop-button"
    );

const affordText =
    document.getElementById(
        "afford-text"
    );

const shopAffordText =
    document.getElementById(
        "shop-afford-text"
    );

const chat =
    document.getElementById(
        "msg-card"
    );

const nextMsg =
    document.getElementById(
        "nextMessage"
    );

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

const pageContent =
    document.getElementById(
        "page-content"
    );

const muteBtn =
    document.getElementById(
        "mute-toggle"
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
   GAME STATE
========================================================================== */

let money = 0;
let hungerPercent = 0;

let msgIndex = 0;

let boughtConvo = false;
let boughtMsg = false;
let boughtBlur = false;

let doBlur = true;

let movieModeOn = false;
let cinemaModeOn = false;

let discoModeOn = false;
let rainbowModeOn = false;

let foodBought = 0;

let warningGiven = false;
let foodieEndingTriggered = false;

let confettiStarted = false;

let audioStarted = false;
let isMuted = false;

let typedBuffer = "";

let konamiIndex = 0;
let antiKonamiIndex = 0;

let idleTimer = null;
let idleIndex = 0;

let cinemaExitButton = null;
let rainbowInterval = null;
let debugHudInterval = null;


/* ==========================================================================
   EXPLORATION SECRET STATE
========================================================================== */

/* Secret #1:
   Returning to the tab after 10+ seconds. */

let hiddenAt = null;


/* Secret #2:
   Reverse scroll direction 3 times quickly. */

let lastScrollPosition = window.scrollY;
let lastScrollDirection = 0;
let scrollDirectionChanges = 0;
let scrollComboTimer = null;
let scrollComboTriggered = false;


/* Secret #3:
   Stay still for 8 seconds over the birthday message. */

let pauseTimer = null;
let pauseCandidate = null;
let pauseTriggered = false;


/* Secret #4:
   Reach 100% scroll progress. */

let completionSecretTriggered = false;


/* Secret #5:
   Reach exactly $500. */

let fiveHundredTriggered = false;


/* Secret #6:
   Survive 100% hunger and then eat. */

let hungerSurvivalTriggered = false;
let hungerReachedMaximum = false;


/* ==========================================================================
   BASIC HELPERS
========================================================================== */

function isUnlocked() {
    return document.body.classList.contains(
        "birthday-unlocked"
    );
}

function playClick() {
    if (
        !isUnlocked() ||
        !clickAudio
    ) {
        return;
    }

    clickAudio.currentTime = 0;

    clickAudio.play().catch(
        function () {}
    );
}

function showToast(message) {
    if (!avignaToast) {
        return;
    }

    clearTimeout(
        showToast.timeout
    );

    avignaToast.textContent =
        message;

    avignaToast.classList.add(
        "show"
    );

    showToast.timeout =
        setTimeout(
            function () {
                avignaToast.classList.remove(
                    "show"
                );
            },
            2600
        );
}

function showSecretToast(message) {
    showToast(
        "🔐 " + message
    );
}

function flashPage(
    color = "rgba(79,255,232,.12)",
    duration = 500
) {
    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "secret-page-flash";

    overlay.style.background =
        color;

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

    setTimeout(
        function () {
            overlay.classList.remove(
                "visible"
            );
        },
        duration / 2
    );

    setTimeout(
        function () {
            overlay.remove();
        },
        duration
    );
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

    setTimeout(
        function () {
            scan.remove();
        },
        1400
    );
}

function createShockwave() {
    const wave =
        document.createElement(
            "div"
        );

    wave.className =
        "secret-shockwave";

    document.body.appendChild(
        wave
    );

    setTimeout(
        function () {
            wave.remove();
        },
        1100
    );
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

    setTimeout(
        function () {
            element.classList.remove(
                "secret-glitch"
            );
        },
        700
    );
}

function pageGlow(
    element,
    duration = 1200
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

    setTimeout(
        function () {
            element.classList.remove(
                "secret-glow-pulse"
            );
        },
        duration
    );
}

function spotlightElement(
    element,
    duration = 2200
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

    spotlight.style.position =
        "fixed";

    spotlight.style.inset =
        "0";

    spotlight.style.zIndex =
        "29900";

    spotlight.style.pointerEvents =
        "none";

    spotlight.style.background =
        `radial-gradient(
            circle at
            ${rect.left + rect.width / 2}px
            ${rect.top + rect.height / 2}px,
            transparent 0,
            transparent 12%,
            rgba(0,0,0,.55) 45%,
            rgba(0,0,0,.82) 100%
        )`;

    spotlight.style.opacity =
        "0";

    spotlight.style.transition =
        "opacity .5s ease";

    document.body.appendChild(
        spotlight
    );

    element.classList.add(
        "secret-target-highlight"
    );

    requestAnimationFrame(
        function () {
            spotlight.style.opacity =
                "1";
        }
    );

    setTimeout(
        function () {
            spotlight.style.opacity =
                "0";

            element.classList.remove(
                "secret-target-highlight"
            );
        },
        duration
    );

    setTimeout(
        function () {
            spotlight.remove();
        },
        duration + 600
    );
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

        setTimeout(
            function () {
                star.remove();
            },
            1300
        );
    }
}


/* ==========================================================================
   BIRTHDAY COUNTDOWN
========================================================================== */

let birthdayCountdownInterval =
    null;

function getIndiaDateParts() {
    const formatter =
        new Intl.DateTimeFormat(
            "en-CA",
            {
                timeZone:
                    "Asia/Kolkata",

                year:
                    "numeric",

                month:
                    "2-digit",

                day:
                    "2-digit",

                hour:
                    "2-digit",

                minute:
                    "2-digit",

                second:
                    "2-digit",

                hourCycle:
                    "h23"
            }
        );

    const parts =
        formatter.formatToParts(
            new Date()
        );

    const values = {};

    parts.forEach(
        function (part) {
            if (
                part.type !==
                "literal"
            ) {
                values[
                    part.type
                ] =
                    part.value;
            }
        }
    );

    return {
        year:
            Number(values.year),

        month:
            Number(values.month),

        day:
            Number(values.day),

        hour:
            Number(values.hour),

        minute:
            Number(values.minute),

        second:
            Number(values.second)
    };
}

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
    return String(number)
        .padStart(2, "0");
}


/* ==========================================================================
   COUNTDOWN STAGES
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

function updateCountdownEffects(
    totalSeconds
) {
    let stage =
        "normal";

    if (
        totalSeconds <= 60
    ) {
        stage =
            "1-minute";
    } else if (
        totalSeconds <= 600
    ) {
        stage =
            "10-minutes";
    } else if (
        totalSeconds <= 1800
    ) {
        stage =
            "30-minutes";
    } else if (
        totalSeconds <= 3600
    ) {
        stage =
            "1-hour";
    } else if (
        totalSeconds <= 7200
    ) {
        stage =
            "2-hours";
    } else if (
        totalSeconds <= 10800
    ) {
        stage =
            "3-hours";
    }

    if (
        stage !==
        countdownEffectStage
    ) {
        countdownEffectStage =
            stage;

        resetCountdownEffectClasses();

        document.body.classList.add(
            "countdown-" +
            stage
        );
    }

    if (
        totalSeconds <= 600 &&
        !tenMinutePartyStarted
    ) {
        tenMinutePartyStarted =
            true;

        triggerTenMinuteParty();
    }

    if (
        totalSeconds <= 60 &&
        !oneMinutePartyStarted
    ) {
        oneMinutePartyStarted =
            true;

        triggerOneMinuteParty();
    }
}

function updateBirthdayCountdown() {
    if (!lockScreen) {
        return;
    }

    if (isBirthdayToday()) {
        unlockBirthdayWebsite();
        return;
    }

    const difference =
        getBirthdayTarget()
            .getTime() -
        Date.now();

    if (
        difference <= 0
    ) {
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
            (totalSeconds % 86400) /
            3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) /
            60
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

function unlockBirthdayWebsite() {
    if (
        birthdayCountdownInterval
    ) {
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

    flashPage(
        "rgba(79,255,232,.16)",
        900
    );

    setTimeout(
        function () {
            if (lockScreen) {
                lockScreen.remove();
            }
        },
        2200
    );
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

        setTimeout(
            function () {
                if (lockScreen) {
                    lockScreen.remove();
                }
            },
            2200
        );

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
   COUNTDOWN PARTIES
========================================================================== */

function triggerTenMinuteParty() {
    flashPage(
        "rgba(186,255,106,.12)",
        800
    );

    if (
        typeof confetti !==
        "function"
    ) {
        return;
    }

    confetti({
        particleCount: 180,
        spread: 160,
        startVelocity: 55,
        gravity: .8,
        ticks: 300,
        origin: {
            x: .5,
            y: .65
        }
    });

    let bursts = 0;

    const timer =
        setInterval(
            function () {
                confetti({
                    particleCount: 18,
                    spread: 100,
                    startVelocity: 35,
                    gravity: .8,
                    origin: {
                        x:
                            Math.random() *
                            .35,
                        y: .9
                    }
                });

                confetti({
                    particleCount: 18,
                    spread: 100,
                    startVelocity: 35,
                    gravity: .8,
                    origin: {
                        x:
                            .65 +
                            Math.random() *
                            .35,
                        y: .9
                    }
                });

                bursts++;

                if (
                    bursts >= 15
                ) {
                    clearInterval(
                        timer
                    );
                }
            },
            450
        );
}

function triggerOneMinuteParty() {
    flashPage(
        "rgba(79,255,232,.18)",
        900
    );

    createShockwave();

    if (
        typeof confetti ===
        "function"
    ) {
        confetti({
            particleCount: 350,
            spread: 180,
            startVelocity: 70,
            gravity: .75,
            ticks: 400,
            origin: {
                x: .5,
                y: .6
            }
        });

        confetti({
            particleCount: 150,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            gravity: .8,
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
            gravity: .8,
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

    const timer =
        setInterval(
            function () {
                createCountdownPartyObject();

                count++;

                if (
                    count >= 45
                ) {
                    clearInterval(
                        timer
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
        Math.random() < .55
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
            Math.random() < .5
                ? "🎂"
                : "🧁";
    }

    object.style.left =
        Math.random() *
        100 +
        "vw";

    object.style.animationDuration =
        3 +
        Math.random() * 3 +
        "s";

    document.body.appendChild(
        object
    );

    setTimeout(
        function () {
            object.remove();
        },
        7000
    );
}


/* ==========================================================================
   THEME
========================================================================== */

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

if (themeSwitch) {
    themeSwitch.addEventListener(
        "click",
        function () {
            playClick();
            toggleTheme();
        }
    );
}

updateThemeButton();


/* ==========================================================================
   AUDIO
========================================================================== */

function startBackgroundAudio() {
    if (
        !isUnlocked() ||
        audioStarted ||
        !backgroundAudio
    ) {
        return;
    }

    audioStarted =
        true;

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
   PAGE FILTER
========================================================================== */

function updatePageFilter() {
    if (!pageContent) {
        return;
    }

    const filters = [];

    if (doBlur) {
        filters.push(
            `blur(${hungerPercent / 65}px)`
        );
    }

    if (movieModeOn) {
        filters.push(
            "grayscale(.6)",
            "sepia(.3)"
        );
    }

    if (rainbowModeOn) {
        filters.push(
            "hue-rotate(var(--rainbow-hue,0deg))",
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

    if (affordText) {
        affordText.innerHTML =
            `<p>Money: $${money}</p>`;
    }

    if (shopAffordText) {
        shopAffordText.innerHTML =
            `<p>Money: $${money}</p>`;
    }
}

function updateMoney() {
    if (!isUnlocked()) {
        return;
    }

    money += 25;

    refreshMoneyDisplay();

    checkMoneyMilestone();
}

function reduceMoney(price) {
    money =
        Math.max(
            0,
            money - price
        );

    refreshMoneyDisplay();
}

function checkMoneyMilestone() {
    if (
        fiveHundredTriggered ||
        money !== 500
    ) {
        return;
    }

    fiveHundredTriggered =
        true;

    const display =
        document.getElementById(
            "display-money"
        );

    if (display) {
        display.classList.add(
            "secret-money-milestone"
        );
    }

    showSecretToast(
        "💰 $500 MILESTONE"
    );

    flashPage(
        "rgba(255,216,107,.18)",
        900
    );

    const badge =
        document.createElement(
            "div"
        );

    badge.className =
        "money-milestone-badge";

    badge.innerHTML = `
        <strong>$500 ACHIEVEMENT</strong>
        <span>Financially irresponsible. Respectable.</span>
    `;

    document.body.appendChild(
        badge
    );

    requestAnimationFrame(
        function () {
            badge.classList.add(
                "visible"
            );
        }
    );

    setTimeout(
        function () {
            badge.classList.remove(
                "visible"
            );
        },
        4200
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
                x: .5,
                y: .3
            }
        });
    }
}

setInterval(
    updateMoney,
    1000
);


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
    if (
        !isUnlocked() ||
        foodieEndingTriggered
    ) {
        return;
    }

    if (
        hungerPercent <
        100
    ) {
        hungerPercent++;
    }

    if (
        hungerPercent >=
        100
    ) {
        hungerPercent =
            100;

        hungerReachedMaximum =
            true;
    }

    refreshHungerDisplay();
    updatePageFilter();

    const bar =
        document.querySelector(
            ".hunger-bar"
        );

    if (bar) {
        bar.classList.toggle(
            "critical-hunger",
            hungerPercent >= 90
        );
    }
}

const hungerInterval =
    setInterval(
        hungerUpdate,
        1000
    );


/* ==========================================================================
   HUNGER SURVIVAL SECRET
========================================================================== */

function checkHungerSurvival() {
    if (
        hungerSurvivalTriggered ||
        !hungerReachedMaximum
    ) {
        return;
    }

    hungerSurvivalTriggered =
        true;

    const section =
        document.querySelector(
            ".eat-section"
        );

    if (section) {
        section.classList.add(
            "hunger-recovery-mode"
        );

        setTimeout(
            function () {
                section.classList.remove(
                    "hunger-recovery-mode"
                );
            },
            3500
        );
    }

    showSecretToast(
        "🍽️ SURVIVAL MODE"
    );

    flashPage(
        "rgba(255,216,107,.13)",
        700
    );

    const recovery =
        document.createElement(
            "div"
        );

    recovery.className =
        "hunger-recovery-secret";

    recovery.innerHTML = `
        <strong>RECOVERY MODE</strong>
        <span>you actually waited until 100% hunger.</span>
    `;

    document.body.appendChild(
        recovery
    );

    requestAnimationFrame(
        function () {
            recovery.classList.add(
                "visible"
            );
        }
    );

    setTimeout(
        function () {
            recovery.classList.remove(
                "visible"
            );
        },
        3000
    );

    setTimeout(
        function () {
            recovery.remove();
        },
        3600
    );
}


/* ==========================================================================
   SCROLL PROGRESS + COMPLETION SECRET
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

    if (
        !completionSecretTriggered &&
        percent >= 99.5 &&
        isUnlocked()
    ) {
        completionSecretTriggered =
            true;

        triggerCompletionSecret();
    }
}

function triggerCompletionSecret() {
    const progress =
        document.getElementById(
            "scroll-progress"
        );

    showSecretToast(
        "100% — YOU MADE IT"
    );

    flashPage(
        "rgba(79,255,232,.12)",
        700
    );

    if (progress) {
        progress.classList.add(
            "completion-progress"
        );
    }

    const badge =
        document.createElement(
            "div"
        );

    badge.className =
        "completion-secret";

    badge.textContent =
        "100% — YOU MADE IT";

    document.body.appendChild(
        badge
    );

    requestAnimationFrame(
        function () {
            badge.classList.add(
                "visible"
            );
        }
    );

    setTimeout(
        function () {
            badge.classList.remove(
                "visible"
            );
        },
        3000
    );

    setTimeout(
        function () {
            badge.remove();
        },
        3600
    );
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
        passive: true
    }
);

window.addEventListener(
    "resize",
    updateScrollProgress
);

updateScrollProgress();


/* ==========================================================================
   EXPLORATION SECRET #2
   REVERSE SCROLL DIRECTION 3 TIMES
========================================================================== */

window.addEventListener(
    "scroll",
    function () {
        if (!isUnlocked()) {
            return;
        }

        const currentY =
            window.scrollY;

        const delta =
            currentY -
            lastScrollPosition;

        if (
            Math.abs(delta) <
            4
        ) {
            return;
        }

        const direction =
            delta > 0
                ? 1
                : -1;

        if (
            lastScrollDirection !==
                0 &&
            direction !==
                lastScrollDirection
        ) {
            scrollDirectionChanges++;

            clearTimeout(
                scrollComboTimer
            );

            scrollComboTimer =
                setTimeout(
                    function () {
                        scrollDirectionChanges =
                            0;
                    },
                    2500
                );

            if (
                scrollDirectionChanges >=
                    3 &&
                !scrollComboTriggered
            ) {
                scrollComboTriggered =
                    true;

                triggerScrollDirectionSecret();
            }
        }

        lastScrollDirection =
            direction;

        lastScrollPosition =
            currentY;
    },
    {
        passive: true
    }
);

function triggerScrollDirectionSecret() {
    const bar =
        document.getElementById(
            "scroll-progress"
        );

    showSecretToast(
        "↕️ you found the rewind"
    );

    document.body.classList.add(
        "scroll-rewind-secret"
    );

    if (bar) {
        bar.classList.add(
            "rewind-progress"
        );
    }

    flashPage(
        "rgba(123,91,255,.12)",
        650
    );

    setTimeout(
        function () {
            document.body.classList.remove(
                "scroll-rewind-secret"
            );

            if (bar) {
                bar.classList.remove(
                    "rewind-progress"
                );
            }
        },
        1100
    );
}


/* ==========================================================================
   EXPLORATION SECRET #3
   PERFECT PAUSE OVER THE BIRTHDAY MESSAGE
========================================================================== */

const birthdayMessage =
    document.getElementById(
        "message"
    );

if (birthdayMessage) {
    birthdayMessage.addEventListener(
        "mouseenter",
        function () {
            if (
                pauseTriggered ||
                !isUnlocked()
            ) {
                return;
            }

            pauseCandidate = true;

            clearTimeout(
                pauseTimer
            );

            pauseTimer =
                setTimeout(
                    function () {
                        if (
                            pauseCandidate
                        ) {
                            triggerPerfectPauseSecret();
                        }
                    },
                    8000
                );
        }
    );

    birthdayMessage.addEventListener(
        "mouseleave",
        function () {
            pauseCandidate =
                false;

            clearTimeout(
                pauseTimer
            );
        }
    );
}

function triggerPerfectPauseSecret() {
    if (pauseTriggered) {
        return;
    }

    pauseTriggered =
        true;

    const area =
        document.querySelector(
            ".message-area"
        );

    if (area) {
        area.classList.add(
            "memory-mode"
        );

        setTimeout(
            function () {
                area.classList.remove(
                    "memory-mode"
                );
            },
            5000
        );
    }

    const memory =
        document.createElement(
            "div"
        );

    memory.className =
        "memory-secret";

    memory.innerHTML = `
        <strong>MEMORY FOUND</strong>
        <span>you stopped long enough to actually read this.</span>
    `;

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

    showSecretToast(
        "🕰️ memory found"
    );

    setTimeout(
        function () {
            memory.classList.remove(
                "visible"
            );
        },
        3800
    );

    setTimeout(
        function () {
            memory.remove();
        },
        4400
    );
}


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
        text:
            "Well there wasn't really any secret, it was a scam...500$ gone..."
    },
    {
        name: "Avigna",
        text: "fck u"
    },
    {
        name: "Neerav",
        text:
            "areeeee using such language on ur bday, so uncivilised"
    },
    {
        name: "Avigna",
        text: "......"
    },
    {
        name: "Neerav",
        text:
            "acha acha, happy birthday, eat some aloo, be better"
    },
    {
        name: "Avigna",
        text: "Thanksss"
    },
    {
        name: "Neerav",
        text:
            "btw there is a secret...but u will not get it, it is something u need to guess"
    },
    {
        name: "Avigna",
        text:
            "ki baje....bol naaaa"
    },
    {
        name: "Neerav",
        text:
            "😜😜😜😜 nahii"
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

            chat.appendChild(
                p
            );

            msgIndex++;
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
                playClick();

                const price =
                    Number(
                        button.dataset.price
                    );

                const saturation =
                    Number(
                        button.dataset.saturation
                    );

                if (
                    money <
                        price ||
                    foodieEndingTriggered
                ) {
                    return;
                }

                const survivedHunger =
                    hungerReachedMaximum;

                reduceMoney(price);

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

                if (
                    survivedHunger
                ) {
                    checkHungerSurvival();
                }

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
        "rgba(255,60,60,.2)",
        700
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
                    showToast(
                        "💸 not enough money."
                    );

                    return;
                }

                reduceMoney(price);

                if (
                    unlock ===
                    "conversation"
                ) {
                    boughtConvo =
                        true;

                    const locked =
                        document.getElementById(
                            "locked-chat"
                        );

                    if (locked) {
                        locked.textContent =
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
                    doBlur =
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

                installShopUpgrade(
                    button
                );

                refreshMoneyDisplay();

                checkGiftUnlock();
            }
        );
    }
);

function installShopUpgrade(
    button
) {
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
        const locked =
            document.getElementById(
                "gift-locked-notice"
            );

        const section =
            document.getElementById(
                "gift-section"
            );

        if (locked) {
            locked.style.display =
                "none";
        }

        if (section) {
            section.style.display =
                "block";

            pageGlow(
                section,
                1200
            );
        }
    }
}


/* ==========================================================================
   GIFT LOCK TAUNTS
========================================================================== */

(function setupGiftLockTaunts() {
    const locked =
        document.getElementById(
            "gift-locked-notice"
        );

    if (!locked) {
        return;
    }

    const taunts = [
        "🔒 nope.",
        "🔒 still nope.",
        "🔒 the shop is right above you.",
        "🔒 buy the three upgrades.",
        "🔒 clicking harder won't help."
    ];

    let index = 0;

    locked.addEventListener(
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

            locked.classList.remove(
                "gift-taunt-shake"
            );

            void locked.offsetWidth;

            locked.classList.add(
                "gift-taunt-shake"
            );

            showToast(
                taunts[
                    index %
                    taunts.length
                ]
            );

            index++;
        }
    );
})();


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

                <button
                    id="final-confetti-button"
                    class="gift-button appear"
                >
                    Celebrate 🎉
                </button>
            `;

            playClick();

            flashPage(
                "rgba(255,255,255,.16)",
                800
            );

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

            setupFinalConfettiButton();

            createRestartButton();
        }
    );
}


/* ==========================================================================
   FINAL GIFT CONFETTI
   Canvas is attached directly to BODY so it covers the visible gift screen.
========================================================================== */

function setupFinalConfettiButton() {
    const button =
        document.getElementById(
            "final-confetti-button"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
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

            document.body.appendChild(
                canvas
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
                    particleCount: 16,
                    angle: 60,
                    spread: 50,
                    startVelocity: 80,
                    gravity: .8,
                    ticks: 250,
                    origin: {
                        x: 0,
                        y: 1
                    }
                });

                giftConfetti({
                    particleCount: 16,
                    angle: 120,
                    spread: 50,
                    startVelocity: 80,
                    gravity: .8,
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
                120
            );
        }
    );
}


/* ==========================================================================
   HOBBY SYSTEM
========================================================================== */

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

    let clicks = 0;

    card.addEventListener(
        "click",
        function () {
            clicks++;

            playClick();

            if (
                clicks <
                threshold
            ) {
                return;
            }

            clicks = 0;

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

        showSecretToast(
            "SHE'S GOT THE MOVES 💃"
        );

        pageGlow(
            card,
            1500
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

        if (
            typeof confetti ===
            "function"
        ) {
            confetti({
                particleCount: 100,
                spread: 120,
                startVelocity: 45,
                origin: {
                    x: .5,
                    y: .65
                }
            });
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
   MOVIES / CINEMA MODE
========================================================================== */

setupHobbyEasterEgg(
    ".movies",
    10,
    function (card) {
        startCinemaMode(card);
    }
);

function startCinemaMode(card) {
    if (cinemaModeOn) {
        return;
    }

    cinemaModeOn =
        true;

    movieModeOn =
        true;

    showSecretToast(
        "🎬 CINEMA MODE"
    );

    pageGlow(
        card,
        1000
    );

    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "movie-overlay";

    overlay.innerHTML =
        `<span class="movie-countdown">3</span>`;

    document.body.appendChild(
        overlay
    );

    const number =
        overlay.querySelector(
            ".movie-countdown"
        );

    let count = 3;

    const timer =
        setInterval(
            function () {
                count--;

                if (
                    count > 0
                ) {
                    number.textContent =
                        count;
                } else if (
                    count === 0
                ) {
                    number.textContent =
                        "CINEMA 🎬";
                } else {
                    clearInterval(
                        timer
                    );

                    overlay.remove();

                    updatePageFilter();

                    activateCinemaBars();
                }
            },
            1000
        );
}

function activateCinemaBars() {
    const top =
        document.createElement(
            "div"
        );

    const bottom =
        document.createElement(
            "div"
        );

    top.className =
        "cinema-bars-secret top";

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

    createCinemaExitButton();
}

function createCinemaExitButton() {
    cinemaExitButton =
        document.createElement(
            "button"
        );

    cinemaExitButton.className =
        "cinema-exit-button";

    cinemaExitButton.textContent =
        "EXIT CINEMA MODE";

    cinemaExitButton.addEventListener(
        "click",
        function () {
            playClick();
            exitCinemaMode();
        }
    );

    document.body.appendChild(
        cinemaExitButton
    );
}

function exitCinemaMode() {
    if (!cinemaModeOn) {
        return;
    }

    cinemaModeOn =
        false;

    movieModeOn =
        false;

    document
        .querySelectorAll(
            ".cinema-bars-secret"
        )
        .forEach(
            function (bar) {
                bar.classList.remove(
                    "visible"
                );

                setTimeout(
                    function () {
                        bar.remove();
                    },
                    600
                );
            }
        );

    if (pageContent) {
        pageContent.classList.remove(
            "secret-letterbox"
        );
    }

    if (cinemaExitButton) {
        cinemaExitButton.remove();

        cinemaExitButton =
            null;
    }

    updatePageFilter();

    showToast(
        "🎬 Cinema Mode Off"
    );
}

document.addEventListener(
    "keydown",
    function (event) {
        if (
            event.key ===
                "Escape" &&
            cinemaModeOn
        ) {
            exitCinemaMode();
        }
    }
);


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

function showBirthdayPoem() {
    if (
        document.querySelector(
            ".poem-overlay"
        )
    ) {
        return;
    }

    if (pageContent) {
        pageContent.classList.add(
            "page-fade-out"
        );
    }

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
        50
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

                        if (pageContent) {
                            pageContent.classList.remove(
                                "page-fade-out"
                            );
                        }
                    },
                    900
                );
            }
        );
}


/* ==========================================================================
   TYPING SECRET EFFECTS
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

function spawnFlyingPizza() {
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

    showSecretToast(
        "🍕 pizza summoned"
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
}

function triggerScreenCrack() {
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

    createShockwave();

    showSecretToast(
        "💥 uh oh."
    );

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
        2000
    );
}

function activateTrailMode() {
    if (
        activateTrailMode.active
    ) {
        return;
    }

    activateTrailMode.active =
        true;

    showSecretToast(
        "✨ trail mode"
    );

    const emojis = [
        "✨",
        "💫",
        "⭐"
    ];

    function handler(event) {
        if (
            Math.random() >
            .35
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
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
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
    }

    document.addEventListener(
        "mousemove",
        handler
    );

    setTimeout(
        function () {
            document.removeEventListener(
                "mousemove",
                handler
            );

            activateTrailMode.active =
                false;
        },
        8000
    );
}

function triggerInvertFlash() {
    showSecretToast(
        "🙃 inverted"
    );

    document.body.classList.remove(
        "invert-flash"
    );

    void document.body.offsetWidth;

    document.body.classList.add(
        "invert-flash"
    );

    setTimeout(
        function () {
            document.body.classList.remove(
                "invert-flash"
            );
        },
        3000
    );
}

function spawnMatrixRain() {
    if (
        document.querySelector(
            ".matrix-rain-canvas"
        )
    ) {
        return;
    }

    showSecretToast(
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

    function resize() {
        canvas.width =
            innerWidth;

        canvas.height =
            innerHeight;
    }

    resize();

    const chars =
        "アイウエオカキクケコ01AVIGNA";

    const size = 18;

    const drops =
        new Array(
            Math.ceil(
                canvas.width /
                size
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
                    size +
                    "px monospace";

                for (
                    let i = 0;
                    i < drops.length;
                    i++
                ) {
                    const char =
                        chars[
                            Math.floor(
                                Math.random() *
                                chars.length
                            )
                        ];

                    ctx.fillText(
                        char,
                        i * size,
                        drops[i] *
                        size
                    );

                    if (
                        drops[i] * size >
                        canvas.height &&
                        Math.random() > .975
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

function activateDiscoMode() {
    if (discoModeOn) {
        return;
    }

    discoModeOn =
        true;

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
            opacity: ".55"
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

    showSecretToast(
        "🪩 DISCO MODE"
    );

    const timer =
        setInterval(
            function () {
                overlay.style.background =
                    colors[
                        index %
                        colors.length
                    ];

                index++;
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

function activateRainbowMode() {
    if (rainbowModeOn) {
        return;
    }

    rainbowModeOn =
        true;

    showSecretToast(
        "🌈 RAINBOW MODE"
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
                        hue + "deg"
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

function activatePageFlip() {
    if (!pageContent) {
        return;
    }

    showSecretToast(
        "🙃 who allowed you to touch the keyboard"
    );

    pageContent.style.transition =
        "transform 1s ease-in-out";

    pageContent.style.transform =
        "rotate(180deg)";

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

function toggleDebugHud() {
    const existing =
        document.querySelector(
            ".debug-hud"
        );

    if (existing) {
        clearInterval(
            debugHudInterval
        );

        existing.remove();

        return;
    }

    showSecretToast(
        "debug hud online"
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
            padding: "12px 16px",
            background:
                "rgba(5,15,19,.94)",
            border:
                "1px solid rgba(79,255,232,.35)",
            borderRadius: "12px",
            fontFamily:
                "'DM Mono',monospace",
            fontSize: ".72rem",
            color: "#4fffe8",
            lineHeight: "1.6",
            cursor: "pointer"
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

            "BLUR: " +
            (
                boughtBlur
                    ? "REMOVED"
                    : "ACTIVE"
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

    avigna: function () {
        showSecretToast(
            "YOU FOUND THE NAME SECRET"
        );

        document.body.classList.add(
            "secret-chromatic"
        );

        starBurst(
            innerWidth / 2,
            innerHeight / 3,
            [
                "💗",
                "💚",
                "✨"
            ]
        );

        setTimeout(
            function () {
                document.body.classList.remove(
                    "secret-chromatic"
                );
            },
            800
        );
    },

    secret: function () {
        showSecretToast(
            "SECRET SECRET FOUND"
        );

        flashPage(
            "rgba(123,91,255,.18)",
            650
        );

        createScanline(
            "#b58cff"
        );
    },

    cake: function () {
        spawnEmojiRain(
            [
                "🎂",
                "🧁"
            ],
            18,
            4
        );
    },

    matrix: function () {
        spawnMatrixRain();
    },

    disco: function () {
        activateDiscoMode();
    },

    rainbow: function () {
        activateRainbowMode();
    },

    flip: function () {
        activatePageFlip();
    },

    debug: function () {
        toggleDebugHud();
    },

    banana: function () {
        showSecretToast(
            "🍌 banana rain"
        );

        spawnEmojiRain(
            ["🍌"],
            22,
            4
        );
    },

    cat: function () {
        showSecretToast(
            "🐱 meow"
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
    },

    pizza: function () {
        spawnFlyingPizza();
    },

    boom: function () {
        triggerScreenCrack();
    },

    yolo: function () {
        if (!pageContent) {
            return;
        }

        pageContent.classList.remove(
            "zoom-pulse"
        );

        void pageContent.offsetWidth;

        pageContent.classList.add(
            "zoom-pulse"
        );

        showSecretToast(
            "🎉 YOLO"
        );

        setTimeout(
            function () {
                pageContent.classList.remove(
                    "zoom-pulse"
                );
            },
            1500
        );
    },

    trail: function () {
        activateTrailMode();
    },

    invert: function () {
        triggerInvertFlash();
    }
};

document.addEventListener(
    "keydown",
    function (event) {
        if (
            !isUnlocked() ||
            event.key.length !== 1
        ) {
            return;
        }

        typedBuffer +=
            event.key.toLowerCase();

        if (
            typedBuffer.length >
            30
        ) {
            typedBuffer =
                typedBuffer.slice(
                    -30
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
                typingSecrets[word]();

                typedBuffer = "";

                break;
            }
        }
    }
);


/* ==========================================================================
   KONAMI CODE
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
                konamiIndex =
                    0;

                activateKonami();
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

function activateKonami() {
    showSecretToast(
        "🎮 KONAMI CODE ACTIVATED"
    );

    document.body.classList.add(
        "arcade-secret-active"
    );

    createScanline(
        "#ff8cd9"
    );

    createScanline(
        "#4fffe8"
    );

    if (
        typeof confetti ===
        "function"
    ) {
        confetti({
            particleCount: 220,
            spread: 180,
            startVelocity: 65,
            gravity: .75,
            origin: {
                x: .5,
                y: .5
            }
        });
    }

    setTimeout(
        function () {
            document.body.classList.remove(
                "arcade-secret-active"
            );
        },
        2500
    );
}


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

                showSecretToast(
                    "🔄 anti-konami detected"
                );

                triggerInvertFlash();

                createShockwave();
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
   LOGO — FIVE CLICKS + LONG PRESS
========================================================================== */

if (secretLogo) {
    let clicks = 0;
    let timer = null;

    secretLogo.addEventListener(
        "click",
        function () {
            clicks++;

            clearTimeout(timer);

            timer =
                setTimeout(
                    function () {
                        clicks = 0;
                    },
                    1200
                );

            if (
                clicks <
                5
            ) {
                return;
            }

            clicks = 0;

            showSecretToast(
                "🤫 CEO BUTTON FOUND"
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
                    duration: 600
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

    secretLogo.addEventListener(
        "mouseup",
        function () {
            clearTimeout(
                pressTimer
            );
        }
    );

    secretLogo.addEventListener(
        "mouseleave",
        function () {
            clearTimeout(
                pressTimer
            );
        }
    );
}

function triggerRootAccessSecret() {
    showSecretToast(
        "🔓 ROOT ACCESS GRANTED"
    );

    flashPage(
        "rgba(79,255,232,.18)",
        800
    );

    createScanline(
        "#4fffe8"
    );

    glitchElement(
        document.querySelector(
            ".hero"
        )
    );
}


/* ==========================================================================
   QUOTE — FOUR CLICKS
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
            clicks++;

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

            showSecretToast(
                "💬 quote footnote unlocked"
            );

            spotlightElement(
                quoteMark,
                2200
            );
        }
    );
})();


/* ==========================================================================
   QUOTE DOUBLE CLICK
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

            if (
                typeof confetti ===
                "function"
            ) {
                confetti({
                    particleCount: 70,
                    spread: 90,
                    startVelocity: 40,
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
   STATS ORDER SECRET
========================================================================== */

(function setupStatCombo() {
    const stats =
        document.querySelectorAll(
            ".stats .stat"
        );

    if (!stats.length) {
        return;
    }

    let index = 0;

    stats.forEach(
        function (
            stat,
            statIndex
        ) {
            stat.style.cursor =
                "pointer";

            stat.addEventListener(
                "click",
                function () {
                    if (
                        statIndex ===
                        index
                    ) {
                        index++;

                        if (
                            index ===
                            stats.length
                        ) {
                            index = 0;

                            showSecretToast(
                                "📊 stats sequence complete"
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
                        }
                    } else {
                        index =
                            statIndex ===
                            0
                                ? 1
                                : 0;
                    }
                }
            );
        }
    );
})();


/* ==========================================================================
   JUDGEMENT LONG PRESS
========================================================================== */

(function setupJudgementSecret() {
    const stats =
        document.querySelectorAll(
            ".stats .stat"
        );

    const judgement =
        stats[
            stats.length - 1
        ];

    if (!judgement) {
        return;
    }

    let timer = null;

    judgement.addEventListener(
        "mousedown",
        function () {
            timer =
                setTimeout(
                    function () {
                        if (
                            judgement.querySelector(
                                ".roast-tooltip"
                            )
                        ) {
                            return;
                        }

                        const tooltip =
                            document.createElement(
                                "span"
                            );

                        tooltip.className =
                            "roast-tooltip visible";

                        tooltip.textContent =
                            "(peer reviewed by Neerav, who is extremely biased)";

                        judgement.appendChild(
                            tooltip
                        );

                        spotlightElement(
                            judgement,
                            1800
                        );
                    },
                    1800
                );
        }
    );

    [
        "mouseup",
        "mouseleave"
    ].forEach(
        function (eventName) {
            judgement.addEventListener(
                eventName,
                function () {
                    clearTimeout(
                        timer
                    );
                }
            );
        }
    );
})();


/* ==========================================================================
   MESSAGE POSTSCRIPT
========================================================================== */

(function setupMessagePostscript() {
    const message =
        document.getElementById(
            "message"
        );

    if (!message) {
        return;
    }

    let clicks = 0;

    message.addEventListener(
        "click",
        function () {
            if (!boughtMsg) {
                return;
            }

            clicks++;

            if (
                clicks <
                6
            ) {
                return;
            }

            if (
                message.querySelector(
                    ".message-ps"
                )
            ) {
                return;
            }

            message.classList.add(
                "message-corrupted"
            );

            setTimeout(
                function () {
                    message.classList.remove(
                        "message-corrupted"
                    );

                    const ps =
                        document.createElement(
                            "span"
                        );

                    ps.className =
                        "message-ps";

                    ps.textContent =
                        "P.S. — you clicked this six times. I respect the dedication.";

                    message.appendChild(
                        ps
                    );

                    requestAnimationFrame(
                        function () {
                            ps.classList.add(
                                "visible"
                            );
                        }
                    );

                    showSecretToast(
                        "📝 postscript unlocked"
                    );
                },
                500
            );
        }
    );
})();


/* ==========================================================================
   MONEY DISPLAY ATM
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
        function () {
            if (cooldown) {
                return;
            }

            clicks++;

            clearTimeout(timer);

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

            showSecretToast(
                "🏧 hidden ATM found. +$200"
            );

            const float =
                document.createElement(
                    "div"
                );

            float.className =
                "money-float-secret";

            float.textContent =
                "+$200";

            const rect =
                display.getBoundingClientRect();

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
                },
                1400
            );

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
                    function (event) {
                        if (
                            event.target.closest(
                                ".food-button"
                            ) ||
                            claimed
                        ) {
                            return;
                        }

                        clicks++;

                        if (
                            clicks <
                            4
                        ) {
                            return;
                        }

                        claimed =
                            true;

                        money += 30;

                        refreshMoneyDisplay();

                        card.classList.add(
                            "bonus-glow"
                        );

                        showSecretToast(
                            "👨‍🍳 chef's special. +$30"
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
                                "🍴",
                                "💰",
                                "✨"
                            ]
                        );
                    }
                );
            }
        );
})();


/* ==========================================================================
   HUNGER BAR CHEAT
========================================================================== */

(function setupHungerBarCheat() {
    const bar =
        document.querySelector(
            ".hunger-bar"
        );

    if (!bar) {
        return;
    }

    let clicks = 0;

    bar.addEventListener(
        "click",
        function () {
            if (!isUnlocked()) {
                return;
            }

            clicks++;

            if (
                clicks <
                5
            ) {
                return;
            }

            clicks = 0;

            hungerPercent =
                0;

            refreshHungerDisplay();

            updatePageFilter();

            showSecretToast(
                "🍽️ hunger reset"
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


/* ==========================================================================
   TAB RETURN SECRET
========================================================================== */

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

            showSecretToast(
                "👀 welcome back."
            );

            createScanline(
                "#4fffe8"
            );

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
   RIGHT CLICK
========================================================================== */

document.addEventListener(
    "contextmenu",
    function (event) {
        if (!isUnlocked()) {
            return;
        }

        event.preventDefault();

        showSecretToast(
            "🖱️ nice try."
        );

        createScanline(
            "#4fffe8"
        );
    }
);


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

        showSecretToast(
            "🖱️ middle click?"
        );
    }
);


/* ==========================================================================
   SHIFT CLICK
========================================================================== */

(function setupShiftClick() {
    const lines = [
        "you clicked with shift held.",
        "shift clicking won't give you admin access.",
        "achievement unlocked: pointless discovery.",
        "yes, this was intentional."
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
   IDLE SYSTEM
========================================================================== */

const idleMessages = [
    "👀 You still there?",
    "The website is getting lonely.",
    "There are secrets hidden here.",
    "You're really just gonna stare at it?"
];

function resetIdleTimer() {
    if (!isUnlocked()) {
        return;
    }

    clearTimeout(
        idleTimer
    );

    idleTimer =
        setTimeout(
            showIdleMessage,
            20000
        );
}

function showIdleMessage() {
    if (!isUnlocked()) {
        return;
    }

    showToast(
        idleMessages[
            idleIndex %
            idleMessages.length
        ]
    );

    idleIndex++;

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
            {
                passive: true
            }
        );
    }
);

resetIdleTimer();


/* ==========================================================================
   INITIAL DISPLAY
========================================================================== */

refreshMoneyDisplay();
refreshHungerDisplay();
updatePageFilter();
updateScrollProgress();


/* ==========================================================================
   DEVTOOLS MESSAGE
========================================================================== */

console.log(
    "%c🎂 hii nosy person",
    "font-size:20px;font-weight:bold;color:#4fffe8;"
);

console.log(
    "%cThere are secrets hidden throughout this website.",
    "font-size:14px;color:#baff6a;"
);

console.log(
    "%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A",
    "font-size:12px;color:#ff8cd9;"
);
