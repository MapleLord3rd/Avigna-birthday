/* ==========================================================================
   BIRTHDAY.EXE — MAIN JAVASCRIPT

   CORE
   - Birthday countdown + IST lock
   - Countdown effects
   - Countdown parties
   - Theme switch
   - Audio
   - Money
   - Hunger
   - Food
   - Chat
   - Shop
   - Gift
   - Dance
   - Cinema
   - Books / poem
   - Idle system

   CLICK / HOLD SECRETS
   - A. x5
   - A. long press
   - Avigna x3
   - Eyebrow x3
   - Quote mark x4
   - Quote double click
   - Stats sequence
   - Judgement long press
   - Message x6
   - Money x8
   - Food card x4
   - Hunger bar x5
   - Gift lock
   - Mute x10
   - Theme icon x7
   - Start button long press
   - Shop description x3
   - Food section double click
   - Right click
   - Middle click
   - Shift click
   - Dance x10
   - Movies x10
   - Books x10

   TYPING
   - avigna
   - secret
   - cake
   - matrix
   - disco
   - rainbow
   - flip
   - debug
   - banana
   - cat
   - pizza
   - boom
   - yolo
   - trail
   - invert

   KEYBOARD
   - Konami
   - Anti-Konami

   EXPLORATION
   - Tab return after 10 seconds
   - Reverse scroll
   - Pause over message
   - Reach page bottom
   - Reach $500
   - Survive 100% hunger

   TAB TITLE
   - "come back pleamseee 🥺"
========================================================================== */


/* ==========================================================================
   GLOBAL
========================================================================== */

window.history.scrollRestoration = "manual";

window.addEventListener("load", function () {
    if (document.body.classList.contains("birthday-unlocked")) {
        window.scrollTo(0, 0);
    }
});


/* ==========================================================================
   ELEMENT REFERENCES
========================================================================== */

const lockScreen = document.getElementById("birthday-lock-screen");

const countdownDays = document.getElementById("countdown-days");
const countdownHours = document.getElementById("countdown-hours");
const countdownMinutes = document.getElementById("countdown-minutes");
const countdownSeconds = document.getElementById("countdown-seconds");
const countdownStatus = document.getElementById("countdown-status");

const themeSwitch = document.getElementById("theme-switch");
const themeSwitchText = document.getElementById("theme-switch-text");
const themeIcon = document.getElementById("theme-icon");

const blackOut = document.querySelector(".black-screen");

const foodButtons = document.querySelectorAll(".food-button");
const foodCards = document.querySelectorAll(".food-card");

const shopButtons = document.querySelectorAll(".shop-button");

const affordText = document.getElementById("afford-text");
const shopAffordText = document.getElementById("shop-afford-text");

const chat = document.getElementById("msg-card");
const nextMsg = document.getElementById("nextMessage");

const clickAudio = document.getElementById("click-audio");
const backgroundAudio = document.getElementById("background-audio");
const bdayAudio = document.getElementById("bday-audio");
const danceAudio = document.getElementById("dance-audio");

const pageContent = document.getElementById("page-content");

const muteBtn = document.getElementById("mute-toggle");
const scrollProgress = document.getElementById("scroll-progress");

const avignaToast = document.getElementById("avigna-toast");

const secretLogo = document.getElementById("secret-logo");

const birthdayMessage = document.getElementById("message");

const quoteSection = document.querySelector(".trust-text");
const quoteMark = document.querySelector(".quote-mark");
const quoteMaker = document.querySelector(".quote-maker");


/* ==========================================================================
   GAME VARIABLES
========================================================================== */

let money = 0;
let hungerPercent = 0;
let foodBought = 0;

let msgIndex = 0;

let boughtConvo = false;
let boughtMsg = false;
let boughtBlur = false;

let doBlur = true;

let movieModeOn = false;
let cinemaModeOn = false;

let discoModeOn = false;
let rainbowModeOn = false;

let foodieEndingTriggered = false;
let confettiStarted = false;

let audioStarted = false;
let isMuted = false;

let typedBuffer = "";

let konamiIndex = 0;
let antiKonamiIndex = 0;

let idleTimer = null;
let idleNudgeCount = 0;

let avignaToastTimeout = null;
let cinemaExitButton = null;

let birthdayCountdownInterval = null;
let countdownEffectStage = "normal";
let tenMinutePartyStarted = false;
let oneMinutePartyStarted = false;

let warningGiven = false;

let hungerInterval = null;

let rainbowInterval = null;
let debugHudInterval = null;


/* ==========================================================================
   EXPLORATION SECRET VARIABLES
========================================================================== */

/* TAB RETURN */

let hiddenAt = null;


/* REVERSE SCROLL */

let lastScrollPosition = window.scrollY;
let lastScrollDirection = 0;
let scrollDirectionChanges = 0;
let scrollComboTimer = null;
let scrollComboTriggered = false;


/* PERFECT PAUSE */

let pauseTimer = null;
let pauseCandidate = false;
let pauseTriggered = false;


/* COMPLETION */

let completionSecretTriggered = false;


/* MONEY */

let fiveHundredTriggered = false;


/* HUNGER */

let hungerReachedMaximum = false;
let hungerSurvivalTriggered = false;


/* ==========================================================================
   BASIC HELPERS
========================================================================== */

function isUnlocked() {
    return document.body.classList.contains("birthday-unlocked");
}


function playClick() {
    if (!isUnlocked() || !clickAudio) {
        return;
    }

    clickAudio.currentTime = 0;

    clickAudio.play().catch(function () {});
}


function showAvignaToast(message) {
    if (!avignaToast) {
        return;
    }

    clearTimeout(avignaToastTimeout);

    avignaToast.textContent = message;

    avignaToast.classList.add("show");

    avignaToastTimeout = setTimeout(function () {
        avignaToast.classList.remove("show");
    }, 2600);
}


function showSecretToast(message) {
    showAvignaToast("🎂 BIRTHDAY.EXE // " + message);
}


function flashPage(color, duration) {
    const flash = document.createElement("div");

    flash.className = "secret-page-flash";

    if (color) {
        flash.style.background = color;
    }

    document.body.appendChild(flash);

    requestAnimationFrame(function () {
        flash.classList.add("visible");
    });

    setTimeout(function () {
        flash.classList.remove("visible");
    }, Math.max(150, duration / 2));

    setTimeout(function () {
        flash.remove();
    }, duration);
}


function createScanline(color) {
    const scanline = document.createElement("div");

    scanline.className = "secret-scanline";

    if (color) {
        scanline.style.color = color;
    }

    document.body.appendChild(scanline);

    setTimeout(function () {
        scanline.remove();
    }, 1400);
}


function createShockwave() {
    const wave = document.createElement("div");

    wave.className = "secret-shockwave";

    document.body.appendChild(wave);

    setTimeout(function () {
        wave.remove();
    }, 1100);
}


function glitchElement(element) {
    if (!element) {
        return;
    }

    element.classList.remove("secret-glitch");

    void element.offsetWidth;

    element.classList.add("secret-glitch");

    setTimeout(function () {
        element.classList.remove("secret-glitch");
    }, 700);
}


function pageGlow(element, duration) {
    if (!element) {
        return;
    }

    element.classList.remove("secret-glow-pulse");

    void element.offsetWidth;

    element.classList.add("secret-glow-pulse");

    setTimeout(function () {
        element.classList.remove("secret-glow-pulse");
    }, duration || 1200);
}


function spotlightElement(element, duration) {
    if (!element) {
        return;
    }

    const rect = element.getBoundingClientRect();

    const spotlight = document.createElement("div");

    spotlight.className = "secret-spotlight";

    spotlight.style.position = "fixed";
    spotlight.style.inset = "0";
    spotlight.style.zIndex = "29900";
    spotlight.style.pointerEvents = "none";

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

    spotlight.style.opacity = "0";
    spotlight.style.transition = "opacity .5s ease";

    document.body.appendChild(spotlight);

    element.classList.add("secret-target-highlight");

    requestAnimationFrame(function () {
        spotlight.style.opacity = "1";
    });

    setTimeout(function () {
        spotlight.style.opacity = "0";
        element.classList.remove("secret-target-highlight");
    }, duration || 2200);

    setTimeout(function () {
        spotlight.remove();
    }, (duration || 2200) + 600);
}


function starBurst(x, y, symbols) {
    const list = symbols || ["🎂", "✨", "🎈", "★"];

    for (let i = 0; i < 14; i++) {
        const star = document.createElement("div");

        star.className = "secret-star";

        star.textContent =
            list[Math.floor(Math.random() * list.length)];

        star.style.left = x + "px";
        star.style.top = y + "px";

        star.style.setProperty("--sx", Math.random() * 2 - 1);
        star.style.setProperty("--sy", Math.random() * 2 - 1);

        document.body.appendChild(star);

        setTimeout(function () {
            star.remove();
        }, 1300);
    }
}


/* ==========================================================================
   IST TIME
========================================================================== */

function getIndiaDateParts() {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    });

    const parts = formatter.formatToParts(new Date());
    const values = {};

    parts.forEach(function (part) {
        if (part.type !== "literal") {
            values[part.type] = part.value;
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


function isBirthdayToday() {
    const india = getIndiaDateParts();

    return india.month === 8 && india.day === 29;
}


function getBirthdayTarget() {
    const india = getIndiaDateParts();

    let target = new Date(
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

    if (india.month === 8 && india.day >= 29) {
        target = new Date(
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


function formatNumber(number) {
    return String(number).padStart(2, "0");
}


/* ==========================================================================
   COUNTDOWN
========================================================================== */

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

    if (newStage !== countdownEffectStage) {
        countdownEffectStage = newStage;

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


function updateBirthdayCountdown() {
    if (!lockScreen) {
        return;
    }

    if (isBirthdayToday()) {
        unlockBirthdayWebsite();
        return;
    }

    const target = getBirthdayTarget();

    const difference =
        target.getTime() - Date.now();

    if (difference <= 0) {
        unlockBirthdayWebsite();
        return;
    }

    const totalSeconds =
        Math.floor(difference / 1000);

    const days =
        Math.floor(totalSeconds / 86400);

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


function unlockBirthdayWebsite() {
    if (birthdayCountdownInterval) {
        clearInterval(
            birthdayCountdownInterval
        );

        birthdayCountdownInterval = null;
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
        "rgba(255,216,107,.16)",
        1000
    );

    showAvignaToast(
        "🎂 BIRTHDAY.EXE // ACCESS GRANTED"
    );

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
   COUNTDOWN PARTY
========================================================================== */

function triggerTenMinuteParty() {
    flashPage(
        "rgba(255,216,107,.13)",
        850
    );

    showAvignaToast(
        "🎉 BIRTHDAY.EXE // PARTY INITIALIZED"
    );

    if (typeof confetti !== "function") {
        return;
    }

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

    const partyInterval =
        setInterval(function () {

            confetti({
                particleCount: 18,
                spread: 100,
                startVelocity: 35,
                gravity: 0.8,
                origin: {
                    x: Math.random() * 0.35,
                    y: 0.9
                }
            });

            confetti({
                particleCount: 18,
                spread: 100,
                startVelocity: 35,
                gravity: 0.8,
                origin: {
                    x: 0.65 + Math.random() * 0.35,
                    y: 0.9
                }
            });

            bursts++;

            if (bursts >= 15) {
                clearInterval(
                    partyInterval
                );
            }

        }, 450);
}


function triggerOneMinuteParty() {
    flashPage(
        "rgba(255,216,107,.18)",
        1000
    );

    createShockwave();

    showAvignaToast(
        "🎂 BIRTHDAY.EXE // FINAL COUNTDOWN"
    );

    if (typeof confetti === "function") {
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
    let objectCount = 0;

    const objectInterval =
        setInterval(function () {

            createCountdownPartyObject();

            objectCount++;

            if (objectCount >= 45) {
                clearInterval(
                    objectInterval
                );
            }

        }, 250);
}


function createCountdownPartyObject() {
    const object =
        document.createElement("div");

    object.className =
        "countdown-party-object";

    if (Math.random() < 0.55) {
        object.classList.add(
            "countdown-balloon"
        );

        object.textContent = "🎈";
    } else {
        object.classList.add(
            "countdown-cake"
        );

        object.textContent =
            Math.random() < 0.5
                ? "🎂"
                : "🧁";
    }

    object.style.left =
        Math.random() * 100 + "vw";

    object.style.animationDuration =
        3 + Math.random() * 3 + "s";

    document.body.appendChild(
        object
    );

    setTimeout(function () {
        object.remove();
    }, 7000);
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

    audioStarted = true;

    backgroundAudio.loop = true;

    backgroundAudio.play().catch(
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

            backgroundAudio.currentTime = 0;

            backgroundAudio.play().catch(
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

            backgroundAudio.currentTime = 0;

            backgroundAudio.play().catch(
                function () {}
            );
        }
    );
}


/* ==========================================================================
   MUTE
========================================================================== */

if (muteBtn) {
    muteBtn.addEventListener(
        "click",
        function () {

            isMuted = !isMuted;

            [
                backgroundAudio,
                bdayAudio,
                danceAudio,
                clickAudio
            ].forEach(
                function (audio) {

                    if (audio) {
                        audio.muted = isMuted;
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
            "grayscale(.6)"
        );

        filters.push(
            "sepia(.3)"
        );
    }

    if (rainbowModeOn) {
        filters.push(
            "hue-rotate(var(--rainbow-hue,0deg))"
        );

        filters.push(
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
            "Money: $" + money;
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


function reduceMoney(price) {
    money -= price;

    if (money < 0) {
        money = 0;
    }

    refreshMoneyDisplay();
}


function updateMoney() {
    if (!isUnlocked()) {
        return;
    }

    money += 25;

    refreshMoneyDisplay();

    checkMoneyMilestone();
}


setInterval(
    updateMoney,
    1000
);


/* ==========================================================================
   $500 SECRET
========================================================================== */

function checkMoneyMilestone() {
    if (
        fiveHundredTriggered ||
        money !== 500
    ) {
        return;
    }

    fiveHundredTriggered = true;

    showSecretToast(
        "$500 BIRTHDAY BUDGET"
    );

    flashPage(
        "rgba(255,216,107,.18)",
        900
    );

    const badge =
        document.createElement("div");

    badge.className =
        "money-milestone-badge";

    badge.innerHTML = `
        <strong>BIRTHDAY BUDGET: $500</strong>
        <span>BIRTHDAY.EXE financial milestone reached.</span>
    `;

    document.body.appendChild(
        badge
    );

    requestAnimationFrame(
        function () {
            badge.classList.add("visible");
        }
    );

    setTimeout(
        function () {
            badge.classList.remove("visible");
        },
        4200
    );

    setTimeout(
        function () {
            badge.remove();
        },
        4800
    );

    if (typeof confetti === "function") {
        confetti({
            particleCount: 100,
            spread: 100,
            startVelocity: 45,
            origin: {
                x: 0.5,
                y: 0.3
            }
        });
    }
}


/* ==========================================================================
   HUNGER
========================================================================== */

function refreshHungerDisplay() {
    const hungerBar =
        document.querySelector(
            ".hunger-bar"
        );

    const hungerLabel =
        document.querySelector(
            ".hunger-percentage"
        );

    if (hungerBar) {
        hungerBar.innerHTML =
            `<span style="width:${hungerPercent}%"></span>`;
    }

    if (hungerLabel) {
        hungerLabel.textContent =
            hungerPercent + "%";
    }
}


function hungerUpdate() {
    if (
        !isUnlocked() ||
        foodieEndingTriggered ||
        !doBlur
    ) {
        return;
    }

    if (
        hungerPercent < 100
    ) {
        hungerPercent++;
    }

    if (
        hungerPercent >= 100
    ) {
        hungerPercent = 100;
        hungerReachedMaximum = true;
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


hungerInterval =
    setInterval(
        hungerUpdate,
        1000
    );


/* ==========================================================================
   HUNGER SURVIVAL SECRET
========================================================================== */

function triggerHungerSurvivalSecret() {

    if (hungerSurvivalTriggered) {
        return;
    }

    hungerSurvivalTriggered = true;

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
        "BIRTHDAY BUFFET SURVIVOR"
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
        <strong>BIRTHDAY BUFFET SURVIVOR</strong>
        <span>You actually waited until 100% hunger.</span>
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
        3800
    );

    setTimeout(
        function () {
            recovery.remove();
        },
        4500
    );
}


/* ==========================================================================
   SCROLL PROGRESS
========================================================================== */

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percent =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        percent + "%";

    if (
        !completionSecretTriggered &&
        percent >= 99.5 &&
        isUnlocked()
    ) {

        completionSecretTriggered = true;

        triggerCompletionSecret();
    }
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


function triggerCompletionSecret() {

    showSecretToast(
        "BIRTHDAY JOURNEY COMPLETE"
    );

    flashPage(
        "rgba(79,255,232,.12)",
        700
    );

    if (scrollProgress) {
        scrollProgress.classList.add(
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
        "🎂 BIRTHDAY JOURNEY COMPLETE";

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

    const serials =
        document.querySelectorAll(
            ".serial-number"
        );

    serials.forEach(
        function (
            serial,
            index
        ) {

            setTimeout(
                function () {

                    serial.classList.add(
                        "secret-target-highlight"
                    );

                    setTimeout(
                        function () {

                            serial.classList.remove(
                                "secret-target-highlight"
                            );

                        },
                        450
                    );

                },
                index * 120
            );

        }
    );

    setTimeout(
        function () {

            badge.classList.remove(
                "visible"
            );

        },
        3200
    );

    setTimeout(
        function () {

            badge.remove();

        },
        3800
    );
}


/* ==========================================================================
   REVERSE SCROLL SECRET
========================================================================== */

window.addEventListener(
    "scroll",
    function () {

        if (!isUnlocked()) {
            return;
        }

        const currentPosition =
            window.scrollY;

        const delta =
            currentPosition -
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
            lastScrollDirection !== 0 &&
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
                scrollDirectionChanges >= 3 &&
                !scrollComboTriggered
            ) {

                scrollComboTriggered = true;

                showSecretToast(
                    "BIRTHDAY TIMELINE REWOUND"
                );

                document.body.classList.add(
                    "scroll-rewind-secret"
                );

                if (scrollProgress) {
                    scrollProgress.classList.add(
                        "rewind-progress"
                    );
                }

                flashPage(
                    "rgba(181,140,255,.12)",
                    650
                );

                createScanline(
                    "#ff8cd9"
                );

                setTimeout(
                    function () {

                        document.body.classList.remove(
                            "scroll-rewind-secret"
                        );

                        if (scrollProgress) {
                            scrollProgress.classList.remove(
                                "rewind-progress"
                            );
                        }

                    },
                    1100
                );
            }
        }

        lastScrollDirection =
            direction;

        lastScrollPosition =
            currentPosition;

    },
    {
        passive: true
    }
);


/* ==========================================================================
   PERFECT PAUSE SECRET
========================================================================== */

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

                        if (pauseCandidate) {
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

            pauseCandidate = false;

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

    pauseTriggered = true;

    const messageArea =
        document.querySelector(
            ".message-area"
        );

    if (messageArea) {

        messageArea.classList.add(
            "memory-mode"
        );

        setTimeout(
            function () {

                messageArea.classList.remove(
                    "memory-mode"
                );

            },
            5000
        );
    }

    spotlightElement(
        birthdayMessage,
        2200
    );

    const memory =
        document.createElement(
            "div"
        );

    memory.className =
        "memory-secret";

    memory.innerHTML = `
        <strong>BIRTHDAY MEMORY FOUND</strong>
        <span>You stopped long enough to actually read it.</span>
    `;

    document.body.appendChild(
        memory
    );

    showSecretToast(
        "BIRTHDAY MEMORY FOUND"
    );

    requestAnimationFrame(
        function () {
            memory.classList.add(
                "visible"
            );
        }
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
        4500
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

                showAvignaToast(
                    "🔒 BIRTHDAY CHAT LOCKED"
                );

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

                if (
                    foodieEndingTriggered
                ) {
                    return;
                }

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
                    price
                ) {

                    showAvignaToast(
                        "💸 BIRTHDAY.EXE // FUNDS LOW"
                    );

                    return;
                }

                const survivedMaximumHunger =
                    hungerReachedMaximum;

                reduceMoney(
                    price
                );

                foodBought++;

                hungerPercent -=
                    saturation;

                if (
                    hungerPercent < 0
                ) {
                    hungerPercent = 0;
                }

                refreshHungerDisplay();

                updatePageFilter();

                if (
                    survivedMaximumHunger
                ) {
                    triggerHungerSurvivalSecret();
                }

                if (
                    foodBought > 45 &&
                    !warningGiven
                ) {

                    warningGiven = true;

                    alert(
                        "Birthday.EXE warning: stomach capacity reaching concerning levels."
                    );
                }

                if (
                    foodBought >= 25
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

    const ending =
        document.createElement(
            "div"
        );

    ending.className =
        "foodie-ending-text";

    ending.innerHTML = `

        <div class="foodie-header">
            🎂 BIRTHDAY FOOD EMERGENCY 🎂
        </div>

        <p>
            BIRTHDAY.EXE has detected
            an absolutely unreasonable
            amount of food consumption.
        </p>

        <p>
            Pizza? Gone.
            <br>
            Burger? Gone.
            <br>
            Momos? Absolutely demolished.
        </p>

        <p>
            Aur phir bhi ruk nahi rahi thi sali. 💀
        </p>

        <p>
            Itna khaya sala restaurant
            bankrupt ho gaya,
            koi sharam hai.
        </p>

        <p>
            The birthday buffet has officially
            entered emergency mode.
        </p>

        <p>
            <strong>
                <em>
                    SECRET BIRTHDAY ENDING UNLOCKED 💀
                </em>
            </strong>
        </p>

        <p>
            Next birthday,
            maybe eat slightly less.
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
        "Restart Birthday.EXE";

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

shopButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        playClick();

        const price =
            Number(button.dataset.price);

        const unlock =
            button.dataset.unlock;


        /* Already bought */
        if (
            (unlock === "conversation" && boughtConvo) ||
            (unlock === "message" && boughtMsg) ||
            (unlock === "blur" && boughtBlur)
        ) {
            return;
        }


        /* Not enough money */
        if (money < price) {

            showAvignaToast(
                "💸 BIRTHDAY.EXE // INSUFFICIENT FUNDS"
            );

            return;
        }


        /* Pay */
        reduceMoney(price);


        /* Conversation */
        if (unlock === "conversation") {

            boughtConvo = true;

            const lockedChat =
                document.getElementById(
                    "locked-chat"
                );

            if (lockedChat) {
                lockedChat.textContent = "🔓";
            }

            showAvignaToast(
                "🎂 BIRTHDAY CHAT UNLOCKED"
            );
        }


        /* Message */
        if (unlock === "message") {

            boughtMsg = true;

            const message =
                document.getElementById(
                    "message"
                );

            const lockedMessage =
                document.getElementById(
                    "locked-message"
                );

            if (message) {

                message.classList.add(
                    "message-animation"
                );

                message.style.opacity = "1";
            }

            if (lockedMessage) {
                lockedMessage.textContent = "🔓";
            }

            showAvignaToast(
                "💌 BIRTHDAY MESSAGE UNLOCKED"
            );
        }


        /* Remove blur */
        if (unlock === "blur") {

            doBlur = false;

            boughtBlur = true;

            clearInterval(
                hungerInterval
            );

            updatePageFilter();

            showAvignaToast(
                "✨ BIRTHDAY DEFECT REMOVED"
            );
        }


        /* Button state */
        button.textContent =
            "Bought";

        button.style.background =
            "black";


        /* Installation animation */
        const option =
            button.closest(
                ".shop-option"
            );

        if (option) {

            option.classList.add(
                "secret-border"
            );

            if (
                !option.querySelector(
                    ".secret-installation"
                )
            ) {

                const install =
                    document.createElement(
                        "div"
                    );

                install.className =
                    "secret-installation";

                install.textContent =
                    "✓ BIRTHDAY.EXE INSTALLED";

                option.appendChild(
                    install
                );

                requestAnimationFrame(
                    function () {

                        install.classList.add(
                            "visible"
                        );

                    }
                );
            }
        }


        refreshMoneyDisplay();

        checkGiftUnlock();

    });

});


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

            pageGlow(
                giftSection,
                1200
            );

            showAvignaToast(
                "🎁 BIRTHDAY GIFT UNLOCKED"
            );
        }
    }
}


/* ==========================================================================
   GIFT LOCK TAUNTS
========================================================================== */

(function setupGiftLockTaunts() {

    const lockedNotice =
        document.getElementById(
            "gift-locked-notice"
        );

    if (!lockedNotice) {
        return;
    }

    const taunts = [

        "🔒 BIRTHDAY.EXE // ACCESS DENIED",

        "🔒 still locked.",

        "🔒 the shop is right above you.",

        "🔒 buy the three birthday upgrades.",

        "🔒 clicking harder won't help.",

        "🔒 you know what to do."

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

            index++;
        }
    );

})();


/* ==========================================================================
   FINAL GIFT
========================================================================== */

const initialGiftButton =
    document.querySelector(
        "#gift-section .gift-button"
    );


if (initialGiftButton) {

    initialGiftButton.addEventListener(
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
                    🎂 Gift Unlocked 🎂
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
                    class="gift-button appear"
                    id="final-confetti-button"
                >
                    Celebrate 🎉
                </button>

            `;

            playClick();

            flashPage(
                "rgba(255,216,107,.16)",
                850
            );

            showAvignaToast(
                "🎁 BIRTHDAY.EXE // FINAL GIFT"
            );

            if (backgroundAudio) {
                backgroundAudio.pause();
            }

            if (bdayAudio) {

                bdayAudio.currentTime =
                    0;

                bdayAudio.volume =
                    1;

                bdayAudio.play().catch(
                    function () {}
                );
            }

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

            setupFinalConfetti();

            createRestartButton();

        }
    );
}


/* ==========================================================================
   FINAL GIFT CONFETTI
========================================================================== */

function setupFinalConfetti() {

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
                typeof confetti !== "function"
            ) {
                return;
            }

            confettiStarted = true;

            showAvignaToast(
                "🎉 BIRTHDAY.EXE // PARTY MODE"
            );

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


            function shootConfetti() {

                giftConfetti({

                    particleCount: 18,

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

                    particleCount: 18,

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


            shootConfetti();


            setInterval(
                shootConfetti,
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

            if (!isUnlocked()) {
                return;
            }

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
                "BIRTHDAY PARTY MODE 💃";

            card.appendChild(
                label
            );
        }

        showSecretToast(
            "BIRTHDAY PARTY MODE"
        );

        pageGlow(
            card,
            1500
        );

        if (backgroundAudio) {
            backgroundAudio.pause();
        }

        if (danceAudio) {

            danceAudio.currentTime =
                0;

            danceAudio.play().catch(
                function () {}
            );
        }

        if (
            typeof confetti ===
            "function"
        ) {

            confetti({

                particleCount:
                    100,

                spread:
                    120,

                startVelocity:
                    45,

                origin: {
                    x:
                        0.5,

                    y:
                        0.65
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
   MOVIES / CINEMA
========================================================================== */

setupHobbyEasterEgg(
    ".movies",
    10,
    function (card) {

        startCinemaMode(
            card
        );

    }
);


function startCinemaMode(card) {

    if (cinemaModeOn) {
        return;
    }

    cinemaModeOn = true;
    movieModeOn = true;

    showSecretToast(
        "AVIGNA'S BIRTHDAY PREMIERE"
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

    overlay.innerHTML = `
        <span class="movie-countdown">
            3
        </span>
    `;

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

                if (count > 0) {

                    number.textContent =
                        count;

                }

                else if (count === 0) {

                    number.textContent =
                        "AVIGNA'S BIRTHDAY PREMIERE 🎬";

                }

                else {

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

    if (cinemaExitButton) {
        return;
    }

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

    showAvignaToast(
        "🎬 BIRTHDAY PREMIERE ENDED"
    );
}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            cinemaModeOn
        ) {
            exitCinemaMode();
        }

    }
);


/* ==========================================================================
   BOOKS / BIRTHDAY DIARY
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
                "BIRTHDAY DIARY ENTRY UNLOCKED 📖";

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

    const poemOverlay =
        document.createElement(
            "div"
        );

    poemOverlay.className =
        "poem-overlay";

    poemOverlay.innerHTML = `

        <div class="poem-text">

            <p>
                <strong>
                    BIRTHDAY DIARY ENTRY
                </strong>
            </p>

            <p>
                Today,

                <br><br>

                In the dead of night,
                fireworks blossom like tiny stars.

                <br>

                Seated on the garden soil,
                the seasons turn without notice.
            </p>

            <p>
                In this garden of life,
                another flower blooms.

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

                Mountains erode, rivers run dry,
                and yet—the flowers remain,

                <br>

                quietly unchanged.
            </p>

            <p>
                And so, between the silence and noise,
                we remain,

                <br>

                not forever,
                but nurturing a flower while we still can,

                <br>

                forever immortalizing ourselves,
                in the panels of time.
            </p>

        </div>

        <button class="button poem-return-button">
            ← Return to Birthday.EXE
        </button>

    `;

    document.body.appendChild(
        poemOverlay
    );

    requestAnimationFrame(
        function () {
            poemOverlay.classList.add(
                "visible"
            );
        }
    );

    const returnButton =
        poemOverlay.querySelector(
            ".poem-return-button"
        );

    returnButton.addEventListener(
        "click",
        function () {

            playClick();

            poemOverlay.classList.remove(
                "visible"
            );

            setTimeout(
                function () {

                    poemOverlay.remove();

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
   TYPING SECRET HELPERS
========================================================================== */

function spawnEmojiRain(
    emojiList,
    count,
    duration
) {

    for (let i = 0; i < count; i++) {

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
            (duration + 3) * 1000
        );

    }
}


/* ==========================================================================
   TYPING — AVIGNA
========================================================================== */

function activateAvignaTypingSecret() {

    showSecretToast(
        "AVIGNA // BIRTHDAY GIRL IDENTIFIED"
    );

    if (pageContent) {

        pageContent.classList.add(
            "secret-chromatic"
        );

        setTimeout(
            function () {

                pageContent.classList.remove(
                    "secret-chromatic"
                );

            },
            900
        );
    }

    const heroName =
        document.querySelector(
            ".hero-title span:nth-child(3)"
        );

    if (heroName) {

        const original =
            heroName.textContent;

        heroName.textContent =
            "GURL";

        pageGlow(
            heroName,
            1300
        );

        setTimeout(
            function () {

                heroName.textContent =
                    original;

            },
            1300
        );
    }

    starBurst(
        innerWidth / 2,
        innerHeight / 3,
        [
            "🎂",
            "💗",
            "🎈",
            "✨"
        ]
    );
}


/* ==========================================================================
   TYPING — SECRET
========================================================================== */

function activateSecretTypingSecret() {

    showSecretToast(
        "CLASSIFIED: AVIGNA'S BIRTHDAY FILE"
    );

    flashPage(
        "rgba(181,140,255,.18)",
        800
    );

    createScanline(
        "#ff8cd9"
    );

    const file =
        document.createElement(
            "div"
        );

    file.className =
        "birthday-classified-secret";

    file.innerHTML = `

        <strong>
            CLASSIFIED BIRTHDAY FILE
        </strong>

        <span>
            SUBJECT: AVIGNA
        </span>

        <span>
            DATE: 29 AUGUST
        </span>

        <span>
            STATUS: BIRTHDAY GIRL
        </span>

    `;

    document.body.appendChild(
        file
    );

    requestAnimationFrame(
        function () {
            file.classList.add(
                "visible"
            );
        }
    );

    setTimeout(
        function () {
            file.classList.remove(
                "visible"
            );
        },
        3500
    );

    setTimeout(
        function () {
            file.remove();
        },
        4200
    );
}


/* ==========================================================================
   TYPING — CAKE
========================================================================== */

function activateCakeSecret() {

    showSecretToast(
        "BIRTHDAY CAKE PARADE"
    );

    spawnEmojiRain(
        [
            "🎂",
            "🧁",
            "🎈",
            "🎉"
        ],
        22,
        4
    );
}


/* ==========================================================================
   TYPING — MATRIX
========================================================================== */

function spawnMatrixRain() {

    if (
        document.querySelector(
            ".matrix-rain-canvas"
        )
    ) {
        return;
    }

    showSecretToast(
        "BIRTHDAY MATRIX // MEMORY OVERFLOW"
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
            transition: "opacity .5s ease"
        }
    );

    document.body.appendChild(
        canvas
    );

    const ctx =
        canvas.getContext(
            "2d"
        );

    function sizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;
    }

    sizeCanvas();

    const chars =
        "29AUGUSTAVIGNA🎂🎈🎉✨0123456789BIRTHDAY";

    const fontSize =
        18;

    const columns =
        Math.ceil(
            canvas.width /
            fontSize
        );

    const drops =
        new Array(
            columns
        ).fill(1);

    requestAnimationFrame(
        function () {

            canvas.style.opacity =
                "1";

        }
    );

    let frames = 0;

    const matrixTimer =
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
                        chars[
                            Math.floor(
                                Math.random() *
                                chars.length
                            )
                        ];

                    ctx.fillText(
                        glyph,
                        i * fontSize,
                        drops[i] * fontSize
                    );

                    if (
                        drops[i] * fontSize >
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
                        matrixTimer
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
   TYPING — DISCO
========================================================================== */

function activateDiscoMode() {

    if (discoModeOn) {
        return;
    }

    discoModeOn =
        true;

    showSecretToast(
        "BIRTHDAY PARTY MODE"
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

    const discoTimer =
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
                discoTimer
            );

            overlay.remove();

            discoModeOn =
                false;

        },
        6000
    );
}


/* ==========================================================================
   TYPING — RAINBOW
========================================================================== */

function activateRainbowMode() {

    if (rainbowModeOn) {
        return;
    }

    rainbowModeOn =
        true;

    showSecretToast(
        "BIRTHDAY RAINBOW MODE"
    );

    let hue = 0;

    rainbowInterval =
        setInterval(
            function () {

                hue =
                    (
                        hue +
                        6
                    ) %
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


/* ==========================================================================
   TYPING — FLIP
========================================================================== */

function activatePageFlip() {

    if (!pageContent) {
        return;
    }

    showSecretToast(
        "BIRTHDAY HAS BEEN TURNED UPSIDE DOWN"
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
   TYPING — DEBUG
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
        "BIRTHDAY DIAGNOSTICS ONLINE"
    );

    const hud =
        document.createElement(
            "div"
        );

    hud.className =
        "debug-hud";

    function renderHud() {

        hud.innerHTML =

            "<strong>BIRTHDAY.EXE</strong><br>" +

            "DATE: 29 AUGUST<br>" +

            "STATUS: ACTIVE<br>" +

            "MONEY: $" +
            money +
            "<br>" +

            "HUNGER: " +
            hungerPercent +
            "%<br>" +

            "FOOD BOUGHT: " +
            foodBought +
            "<br>" +

            "CHAT: " +
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

    renderHud();

    debugHudInterval =
        setInterval(
            renderHud,
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
   TYPING — BANANA
========================================================================== */

function activateBananaSecret() {

    showSecretToast(
        "BIRTHDAY BANANA EMERGENCY"
    );

    spawnEmojiRain(
        [
            "🍌",
            "🎈",
            "🎂"
        ],
        22,
        4
    );
}


/* ==========================================================================
   TYPING — CAT
========================================================================== */

function activateCatSecret() {

    showSecretToast(
        "MEOWDY BIRTHDAY"
    );

    spawnEmojiRain(
        [
            "🐱",
            "🐈",
            "🐈‍⬛",
            "🎂"
        ],
        20,
        4.5
    );
}


/* ==========================================================================
   TYPING — PIZZA
========================================================================== */

function activatePizzaSecret() {

    showSecretToast(
        "BIRTHDAY PIZZA DELIVERY"
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
}


/* ==========================================================================
   TYPING — BOOM
========================================================================== */

function activateBoomSecret() {

    showSecretToast(
        "BIRTHDAY.EXE HAS EXPLODED"
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


/* ==========================================================================
   TYPING — YOLO
========================================================================== */

function activateYoloSecret() {

    if (!pageContent) {
        return;
    }

    showSecretToast(
        "ANOTHER YEAR UNLOCKED"
    );

    const year =
        document.createElement(
            "div"
        );

    year.className =
        "birthday-year-secret";

    year.textContent =
        "+1 YEAR";

    document.body.appendChild(
        year
    );

    pageContent.classList.remove(
        "zoom-pulse"
    );

    void pageContent.offsetWidth;

    pageContent.classList.add(
        "zoom-pulse"
    );

    setTimeout(
        function () {

            pageContent.classList.remove(
                "zoom-pulse"
            );

        },
        1500
    );

    setTimeout(
        function () {

            year.remove();

        },
        1800
    );
}


/* ==========================================================================
   TYPING — TRAIL
========================================================================== */

function activateTrailMode() {

    if (activateTrailMode.active) {
        return;
    }

    activateTrailMode.active =
        true;

    showSecretToast(
        "BIRTHDAY CELEBRATION TRAIL"
    );

    const trailEmojis = [
        "🎂",
        "✨",
        "🎈",
        "🎉"
    ];

    function trailHandler(event) {

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
    }

    document.addEventListener(
        "mousemove",
        trailHandler
    );

    setTimeout(
        function () {

            document.removeEventListener(
                "mousemove",
                trailHandler
            );

            activateTrailMode.active =
                false;

        },
        8000
    );
}


/* ==========================================================================
   TYPING — INVERT
========================================================================== */

function activateInvertSecret() {

    showSecretToast(
        "ANTI-BIRTHDAY MODE"
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


/* ==========================================================================
   TYPING SECRET MAP
========================================================================== */

const typingSecrets = {

    avigna:
        activateAvignaTypingSecret,

    secret:
        activateSecretTypingSecret,

    cake:
        activateCakeSecret,

    matrix:
        spawnMatrixRain,

    disco:
        activateDiscoMode,

    rainbow:
        activateRainbowMode,

    flip:
        activatePageFlip,

    debug:
        toggleDebugHud,

    banana:
        activateBananaSecret,

    cat:
        activateCatSecret,

    pizza:
        activatePizzaSecret,

    boom:
        activateBoomSecret,

    yolo:
        activateYoloSecret,

    trail:
        activateTrailMode,

    invert:
        activateInvertSecret

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

                typingSecrets[
                    word
                ]();

                typedBuffer =
                    "";

                break;
            }
        }
    }
);


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

                activateKonamiCode();
            }

        }

        else {

            konamiIndex =
                key ===
                konamiCode[0]
                    ? 1
                    : 0;
        }

    }
);


function activateKonamiCode() {

    showSecretToast(
        "BIRTHDAY CHEAT CODE ACTIVATED"
    );

    document.body.classList.add(
        "arcade-secret-active"
    );

    flashPage(
        "rgba(255,216,107,.15)",
        700
    );

    createScanline(
        "#ff8cd9"
    );

    createScanline(
        "#4fffe8"
    );

    if (typeof confetti === "function") {

        confetti({

            particleCount:
                220,

            spread:
                180,

            startVelocity:
                65,

            gravity:
                0.75,

            origin: {
                x:
                    0.5,

                y:
                    0.5
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
                    "ANTI-BIRTHDAY CODE DETECTED"
                );

                activateInvertSecret();

                createShockwave();
            }

        }

        else {

            antiKonamiIndex =
                key ===
                antiKonamiCode[0]
                    ? 1
                    : 0;
        }

    }
);


/* ==========================================================================
   A. LOGO — FIVE CLICKS
========================================================================== */

if (secretLogo) {

    let logoClicks = 0;
    let logoTimer = null;


    secretLogo.addEventListener(
        "click",
        function () {

            if (!isUnlocked()) {
                return;
            }

            logoClicks++;

            playClick();

            clearTimeout(
                logoTimer
            );

            logoTimer =
                setTimeout(
                    function () {
                        logoClicks = 0;
                    },
                    1200
                );

            if (
                logoClicks <
                5
            ) {
                return;
            }

            logoClicks = 0;

            showSecretToast(
                "BIRTHDAY ADMIN ACCESS"
            );

            secretLogo.animate(
                [
                    {
                        transform:
                            "rotate(0deg) scale(1)"
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
                            "rotate(0deg) scale(1)"
                    }
                ],
                {
                    duration: 600,
                    easing: "ease-in-out"
                }
            );

            starBurst(
                60,
                40,
                [
                    "👑",
                    "🎂",
                    "✨",
                    "🔐"
                ]
            );

        }
    );


    /* A. LONG PRESS */

    let logoPressTimer = null;

    secretLogo.addEventListener(
        "mousedown",
        function () {

            logoPressTimer =
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
                logoPressTimer
            );
        }
    );

    secretLogo.addEventListener(
        "mouseleave",
        function () {
            clearTimeout(
                logoPressTimer
            );
        }
    );

}


/* ==========================================================================
   A. LONG PRESS — ROOT
========================================================================== */

function triggerRootAccessSecret() {

    if (!isUnlocked()) {
        return;
    }

    showSecretToast(
        "BIRTHDAY ADMIN ACCESS GRANTED"
    );

    const panel =
        document.createElement(
            "div"
        );

    panel.className =
        "birthday-root-secret";

    panel.innerHTML = `

        <strong>
            BIRTHDAY.EXE // ROOT ACCESS
        </strong>

        <span>
            ACCESSING AVIGNA...
        </span>

        <span>
            VERIFYING BIRTHDAY...
        </span>

        <span>
            29 AUGUST: CONFIRMED
        </span>

        <span>
            CAKE REQUIREMENT: CRITICAL
        </span>

    `;

    document.body.appendChild(
        panel
    );

    requestAnimationFrame(
        function () {

            panel.classList.add(
                "visible"
            );

        }
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

    setTimeout(
        function () {

            panel.classList.remove(
                "visible"
            );

        },
        3500
    );

    setTimeout(
        function () {

            panel.remove();

        },
        4200
    );
}


/* ==========================================================================
   AVIGNA TRIPLE CLICK
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
        "dblclick",
        function (event) {
            event.preventDefault();
        }
    );

    heroName.addEventListener(
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

            const original =
                heroName.textContent;

            showSecretToast(
                "BIRTHDAY GIRL IDENTIFIED"
            );

            heroName.textContent =
                "GURL";

            pageGlow(
                heroName,
                1300
            );

            starBurst(
                heroName.getBoundingClientRect().left +
                    heroName.offsetWidth / 2,

                heroName.getBoundingClientRect().top +
                    40,

                [
                    "🎂",
                    "💗",
                    "🎈",
                    "✨"
                ]
            );

            setTimeout(
                function () {
                    heroName.textContent =
                        original;
                },
                1300
            );

        }
    );

})();


/* ==========================================================================
   EYEBROW TRIPLE CLICK
========================================================================== */

(function setupEyebrowSecret() {

    const eyebrow =
        document.querySelector(
            ".eyebrow"
        );

    if (!eyebrow) {
        return;
    }

    const messages = [

        "birthday report: certified goofball.",

        "birthday report: attention span still questionable.",

        "birthday report: no refunds.",

        "birthday report: subject appears to be having a birthday."

    ];

    let clicks = 0;
    let timer = null;

    eyebrow.style.cursor =
        "pointer";

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

            showSecretToast(
                messages[
                    Math.floor(
                        Math.random() *
                        messages.length
                    )
                ]
            );

            flashPage(
                "rgba(255,216,107,.07)",
                450
            );
        }
    );

})();


/* ==========================================================================
   QUOTE MARK FOUR CLICKS
========================================================================== */

(function setupQuoteMarkSecret() {

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

            if (!isUnlocked()) {
                return;
            }

            clicks++;

            playClick();

            if (
                clicks < 4 ||
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
                "(birthday diary entry #2: somehow you're still reading this.)";

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
                "BIRTHDAY DIARY FOOTNOTE"
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

if (quoteSection) {

    quoteSection.addEventListener(
        "dblclick",
        function (event) {

            if (!isUnlocked()) {
                return;
            }

            playClick();

            showAvignaToast(
                "🎆 BIRTHDAY FIREWORK"
            );

            if (
                typeof confetti ===
                "function"
            ) {

                confetti({

                    particleCount:
                        75,

                    spread:
                        90,

                    startVelocity:
                        40,

                    origin: {
                        x:
                            event.clientX /
                            window.innerWidth,

                        y:
                            event.clientY /
                            window.innerHeight
                    }

                });
            }
        }
    );

}


/* ==========================================================================
   STATS ORDER
========================================================================== */

(function setupStatsCombo() {

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

                    if (!isUnlocked()) {
                        return;
                    }

                    playClick();

                    if (
                        statIndex ===
                        index
                    ) {

                        index++;

                        stat.classList.add(
                            "secret-target-highlight"
                        );

                        setTimeout(
                            function () {

                                stat.classList.remove(
                                    "secret-target-highlight"
                                );

                            },
                            300
                        );

                        if (
                            index ===
                            stats.length
                        ) {

                            index = 0;

                            showSecretToast(
                                "BIRTHDAY STATISTICS VERIFIED"
                            );

                            spotlightElement(
                                document.querySelector(
                                    ".stats"
                                ),
                                1800
                            );

                            createScanline(
                                "#ffd86b"
                            );

                            if (
                                typeof confetti ===
                                "function"
                            ) {

                                confetti({

                                    particleCount:
                                        80,

                                    spread:
                                        90,

                                    startVelocity:
                                        40,

                                    origin: {
                                        x:
                                            0.5,

                                        y:
                                            0.4
                                    }

                                });
                            }
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

(function setupJudgementLongPress() {

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


    function revealJudgement() {

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
            "(birthday judgement reviewed by Neerav, who is extremely biased)";

        judgement.appendChild(
            tooltip
        );

        showSecretToast(
            "BIRTHDAY JUDGEMENT FILE FOUND"
        );

        spotlightElement(
            judgement,
            1800
        );
    }


    function startPress() {

        timer =
            setTimeout(
                revealJudgement,
                1800
            );
    }


    function cancelPress() {

        clearTimeout(
            timer
        );
    }


    judgement.addEventListener(
        "mousedown",
        startPress
    );

    judgement.addEventListener(
        "mouseup",
        cancelPress
    );

    judgement.addEventListener(
        "mouseleave",
        cancelPress
    );

    judgement.addEventListener(
        "touchstart",
        startPress,
        {
            passive: true
        }
    );

    judgement.addEventListener(
        "touchend",
        cancelPress
    );

})();


/* ==========================================================================
   MESSAGE SIX CLICKS
========================================================================== */

(function setupMessageSecret() {

    if (!birthdayMessage) {
        return;
    }

    let clicks = 0;

    birthdayMessage.addEventListener(
        "click",
        function () {

            if (
                !boughtMsg ||
                !isUnlocked()
            ) {
                return;
            }

            clicks++;

            playClick();

            if (
                clicks <
                6
            ) {
                return;
            }

            if (
                birthdayMessage.querySelector(
                    ".message-ps"
                )
            ) {
                return;
            }

            birthdayMessage.classList.add(
                "message-corrupted"
            );

            setTimeout(
                function () {

                    birthdayMessage.classList.remove(
                        "message-corrupted"
                    );

                    const ps =
                        document.createElement(
                            "span"
                        );

                    ps.className =
                        "message-ps";

                    ps.textContent =
                        "P.S. — Birthday.EXE says you're still reading this. Respect.";

                    birthdayMessage.appendChild(
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
                        "HIDDEN BIRTHDAY POSTSCRIPT"
                    );

                    spotlightElement(
                        birthdayMessage,
                        1500
                    );

                },
                500
            );

        }
    );

})();


/* ==========================================================================
   MONEY DISPLAY EIGHT CLICKS
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

            if (
                !isUnlocked() ||
                cooldown
            ) {
                return;
            }

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
                "BIRTHDAY FUND FOUND // +$200"
            );

            const amount =
                document.createElement(
                    "div"
                );

            amount.className =
                "money-float-secret";

            amount.textContent =
                "+$200 BIRTHDAY MONEY";

            const rect =
                display.getBoundingClientRect();

            amount.style.left =
                rect.left +
                rect.width / 2 +
                "px";

            amount.style.top =
                rect.top +
                "px";

            document.body.appendChild(
                amount
            );

            setTimeout(
                function () {
                    amount.remove();
                },
                1600
            );

            checkMoneyMilestone();

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
   FOOD CARD FOUR CLICKS
========================================================================== */

foodCards.forEach(
    function (card) {

        let clicks = 0;
        let claimed = false;

        card.addEventListener(
            "click",
            function (event) {

                if (
                    !isUnlocked() ||
                    claimed
                ) {
                    return;
                }

                if (
                    event.target.closest(
                        ".food-button"
                    )
                ) {
                    return;
                }

                clicks++;

                playClick();

                if (
                    clicks <
                    4
                ) {
                    return;
                }

                claimed = true;

                money += 30;

                refreshMoneyDisplay();

                card.classList.add(
                    "bonus-glow"
                );

                showSecretToast(
                    "BIRTHDAY SPECIAL // +$30"
                );

                const rect =
                    card.getBoundingClientRect();

                starBurst(
                    rect.left +
                        rect.width / 2,

                    rect.top +
                        rect.height / 2,

                    [
                        "🎂",
                        "🍴",
                        "💰",
                        "✨"
                    ]
                );

                checkMoneyMilestone();

            }
        );

    }
);


/* ==========================================================================
   HUNGER BAR FIVE CLICKS
========================================================================== */

(function setupHungerBarCheat() {

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

            clicks++;

            playClick();

            if (
                clicks <
                5
            ) {
                return;
            }

            clicks = 0;

            hungerPercent = 0;

            refreshHungerDisplay();

            updatePageFilter();

            showSecretToast(
                "BIRTHDAY BUFFET RESET"
            );

            spawnEmojiRain(
                [
                    "🍕",
                    "🍔",
                    "🥟",
                    "🎂",
                    "🎈"
                ],
                12,
                3
            );

        }
    );

})();


/* ==========================================================================
   MUTE TEN CLICKS
========================================================================== */

(function setupMuteSecret() {

    if (!muteBtn) {
        return;
    }

    let clicks = 0;
    let timer = null;

    muteBtn.addEventListener(
        "click",
        function () {

            if (!isUnlocked()) {
                return;
            }

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

            document.body.classList.remove(
                "screen-shake"
            );

            void document.body.offsetWidth;

            document.body.classList.add(
                "screen-shake"
            );

            showSecretToast(
                "BIRTHDAY.EXE AUDIO SYSTEM PANIC"
            );

            flashPage(
                "rgba(255,60,110,.08)",
                450
            );

            setTimeout(
                function () {

                    document.body.classList.remove(
                        "screen-shake"
                    );

                },
                400
            );

        }
    );

})();


/* ==========================================================================
   THEME ICON SEVEN CLICKS
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

            if (!isUnlocked()) {
                return;
            }

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

            showSecretToast(
                "BIRTHDAY MYSTERY MODE"
            );

            document.body.classList.remove(
                "invert-flash"
            );

            void document.body.offsetWidth;

            document.body.style.filter =
                "grayscale(1) invert(1)";

            setTimeout(
                function () {

                    document.body.style.filter =
                        "";

                },
                2000
            );

        },
        true
    );

})();


/* ==========================================================================
   START BUTTON LONG PRESS
========================================================================== */

(function setupFakeLoadingStart() {

    const startButton =
        document.querySelector(
            'a[href="#about"].button'
        );

    if (!startButton) {
        return;
    }

    let pressTimer = null;

    const loadingLines = [

        "Booting BIRTHDAY.EXE...",

        "Loading birthday subject...",

        "Verifying 29 August...",

        "Calculating goofiness levels...",

        "Loading 1 (one) friendship...",

        "Checking cake requirements..."

    ];


    function startPress() {

        pressTimer =
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
                            BIRTHDAY.EXE
                        </div>

                        <div>
                            INITIALIZING...
                        </div>

                        <div
                            class="fake-loading-bar-track"
                        >

                            <div
                                class="fake-loading-bar-fill"
                            ></div>

                        </div>

                        <div
                            class="fake-loading-line"
                        ></div>

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
                        loadingLines[0];

                    const timer =
                        setInterval(
                            function () {

                                progress +=
                                    8 +
                                    Math.random() * 10;

                                if (
                                    progress >
                                    100
                                ) {
                                    progress = 100;
                                }

                                fill.style.width =
                                    progress + "%";

                                const expected =
                                    Math.floor(
                                        (
                                            progress /
                                            100
                                        ) *
                                        loadingLines.length
                                    );

                                if (
                                    expected !==
                                        lineIndex &&
                                    expected <
                                        loadingLines.length
                                ) {

                                    lineIndex =
                                        expected;

                                    line.textContent =
                                        loadingLines[
                                            lineIndex
                                        ];
                                }

                                if (
                                    progress >=
                                    100
                                ) {

                                    clearInterval(
                                        timer
                                    );

                                    setTimeout(
                                        function () {

                                            overlay.remove();

                                            const about =
                                                document.getElementById(
                                                    "about"
                                                );

                                            if (about) {

                                                about.scrollIntoView(
                                                    {
                                                        behavior:
                                                            "smooth"
                                                    }
                                                );
                                            }

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
            pressTimer
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

    startButton.addEventListener(
        "touchstart",
        startPress,
        {
            passive: true
        }
    );

    startButton.addEventListener(
        "touchend",
        cancelPress
    );

})();


/* ==========================================================================
   SHOP DESCRIPTION THREE CLICKS
========================================================================== */

(function setupShopDescriptionSecret() {

    const paragraphs =
        document.querySelectorAll(
            ".shop-option p"
        );

    if (!paragraphs.length) {
        return;
    }

    const paragraph =
        paragraphs[1];

    if (!paragraph) {
        return;
    }

    let clicks = 0;

    paragraph.style.cursor =
        "pointer";

    paragraph.addEventListener(
        "click",
        function () {

            clicks++;

            playClick();

            if (
                clicks <
                3
            ) {
                return;
            }

            clicks = 0;

            paragraph.classList.add(
                "secret-target-highlight"
            );

            showSecretToast(
                "HUNGER WAS A BIRTHDAY FEATURE"
            );

            setTimeout(
                function () {

                    paragraph.classList.remove(
                        "secret-target-highlight"
                    );

                },
                1000
            );

        }
    );

})();


/* ==========================================================================
   FOOD SECTION DOUBLE CLICK
========================================================================== */

(function setupFoodSectionDoubleClick() {

    const eatSection =
        document.querySelector(
            ".eat-section"
        );

    if (!eatSection) {
        return;
    }

    eatSection.addEventListener(
        "dblclick",
        function (event) {

            if (
                !isUnlocked() ||
                event.target.closest(
                    ".food-card"
                )
            ) {
                return;
            }

            playClick();

            showSecretToast(
                "BIRTHDAY BUFFET STORM"
            );

            spawnEmojiRain(
                [
                    "🍕",
                    "🍔",
                    "🥟",
                    "🍜",
                    "🧋",
                    "🎂"
                ],
                18,
                3.5
            );

        }
    );

})();


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
            "BIRTHDAY.EXE // NICE TRY"
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
            "BIRTHDAY.EXE // MIDDLE CLICK?"
        );

        createScanline(
            "#ffd86b"
        );

    }
);


/* ==========================================================================
   SHIFT CLICK
========================================================================== */

(function setupShiftClick() {

    const lines = [

        "you found a hidden birthday input.",

        "shift-click detected by Birthday.EXE.",

        "birthday admin privileges: still denied.",

        "achievement unlocked: unnecessarily curious."

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
   TAB TITLE — COME BACK PLEASE
========================================================================== */

const originalTitle =
    document.title;


document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden) {

            document.title =
                "come back pleamseee 🥺";

        } else {

            document.title =
                originalTitle;

        }

    }
);


/* ==========================================================================
   TAB RETURN AFTER 10+ SECONDS
========================================================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden) {

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

        hiddenAt = null;

        if (
            awayTime >=
            10000
        ) {

            document.body.classList.add(
                "tab-return-flash"
            );

            showSecretToast(
                "WELCOME BACK TO THE BIRTHDAY"
            );

            createScanline(
                "#ffd86b"
            );

            if (
                typeof confetti ===
                "function"
            ) {

                confetti({

                    particleCount:
                        45,

                    spread:
                        90,

                    startVelocity:
                        30,

                    origin: {
                        x:
                            0.5,

                        y:
                            0.2
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
   IDLE SYSTEM
========================================================================== */

const idleMessages = [

    "👀 birthday.exe is waiting.",

    "🎂 still exploring?",

    "🎈 there are secrets hidden here.",

    "🧁 birthday.exe has not finished with you.",

    "🎉 maybe there's something you missed."

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
            showIdleNudge,
            20000
        );
}


function showIdleNudge() {

    if (!isUnlocked()) {
        return;
    }

    showAvignaToast(
        idleMessages[
            idleNudgeCount %
            idleMessages.length
        ]
    );

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
            {
                passive:
                    true
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
   CONSOLE
========================================================================== */

console.log(
    "%c🎂 BIRTHDAY.EXE",
    "font-size:24px;font-weight:bold;color:#ffd86b;"
);

console.log(
    "%cAvigna's birthday system is running.",
    "font-size:14px;color:#4fffe8;"
);

console.log(
    "%cThere are hidden birthday features throughout the website.",
    "font-size:13px;color:#baff6a;"
);

console.log(
    "%cKonami: ↑ ↑ ↓ ↓ ← → ← → B A",
    "font-size:12px;color:#ff8cd9;"
);
