/* ==========================================================================
   JAVASCRIPT CODE MAP

   [COUNTDOWN + LOCK]        Birthday countdown and website lock.
   [IST TIME]                Forces the birthday target to use India time.
   [THEME SWITCH]            Blue/green <-> pink/purple.
   [COUNTDOWN EFFECTS]       3h -> 2h -> 1h -> 30m -> 10m -> 1m.
   [COUNTDOWN PARTIES]       10-minute confetti. 1-minute confetti + objects.
   [ELEMENT REFERENCES]      Grabs important HTML elements.
   [GAME VARIABLES]          Money, hunger, shop unlocks, easter egg states.
   [AUDIO]                   Background, birthday, dance and click sounds.
   [MONEY]                   Automatic money generation.
   [HUNGER]                  Hunger + blur.
   [SCROLL]                  Scroll progress bar.
   [CHAT]                    Hidden conversation.
   [FOOD]                    Restaurant system.
   [FOODIE EMERGENCY]        Secret food ending.
   [SHOP]                    Hidden feature shop.
   [GIFT]                    Final birthday gift (FIXED: centering + confetti).
   [HOBBY EASTER EGGS]       Dance / Movies / Books.
   [TYPING SECRETS]          avigna / secret / cake / matrix / disco / flip / rainbow / debug
   [KONAMI]                  Up Up Down Down Left Right Left Right B A
   [IDLE]                    Inactivity messages.
   [SECRET LOGO]             Five clicks on A. Long-press on A.
   [NEW: MATRIX RAIN]        Falling code overlay.
   [NEW: DISCO MODE]         Flashing colour overlay.
   [NEW: RAINBOW MODE]       Hue-rotating filter.
   [NEW: PAGE FLIP]          Whole page flips upside down briefly.
   [NEW: RIGHT CLICK]        Custom context-menu toast.
   [NEW: SHAKE TO PARTY]     Mobile devicemotion confetti trigger.
   [NEW: DOUBLE CLICK QUOTE] Fireworks + toast on the quote section.
   [NEW: STAT COMBO]         Clicking stat bars in order unlocks a message.
   [NEW: DEBUG OVERLAY]      Typing "debug" shows a live stats HUD.
   [NEW: CONSOLE ART]        ASCII art + message for anyone opening devtools.

   ========================================================================== */


/* ==========================================================================
   GLOBAL
========================================================================== */

window.history.scrollRestoration = "manual";


/* ==========================================================================
   COUNTDOWN ELEMENTS
========================================================================== */

const lockScreen = document.getElementById("birthday-lock-screen");
const countdownDays = document.getElementById("countdown-days");
const countdownHours = document.getElementById("countdown-hours");
const countdownMinutes = document.getElementById("countdown-minutes");
const countdownSeconds = document.getElementById("countdown-seconds");
const countdownStatus = document.getElementById("countdown-status");

let birthdayCountdownInterval = null;


/* ==========================================================================
   IST TIME

   The countdown is based on Asia/Kolkata so the visitor's device timezone
   cannot shift the birthday countdown.
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


/* ==========================================================================
   BIRTHDAY TARGET
========================================================================== */

function getBirthdayTarget() {
    const india = getIndiaDateParts();

    /*
        Birthday unlock: 29 August 12:00 AM IST.
        IST is UTC+5:30, so 29 Aug 00:00 IST = 28 Aug 18:30 UTC.
    */
    let target = new Date(Date.UTC(india.year, 7, 28, 18, 30, 0, 0));

    /* Once August 29 has begun in India, target next year. */
    if (india.month === 8 && india.day >= 29) {
        target = new Date(Date.UTC(india.year + 1, 7, 28, 18, 30, 0, 0));
    }

    return target;
}


/* ==========================================================================
   CHECK BIRTHDAY
========================================================================== */

function isBirthdayToday() {
    const india = getIndiaDateParts();
    return india.month === 8 && india.day === 29;
}


/* ==========================================================================
   FORMAT NUMBER
========================================================================== */

function formatNumber(number) {
    return String(number).padStart(2, "0");
}


/* ==========================================================================
   COUNTDOWN EFFECT STATE
========================================================================== */

let countdownEffectStage = "normal";
let tenMinutePartyStarted = false;
let oneMinutePartyStarted = false;


/* ==========================================================================
   RESET COUNTDOWN CSS CLASSES
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


/* ==========================================================================
   COUNTDOWN EFFECT SYSTEM
========================================================================== */

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
        document.body.classList.add("countdown-" + newStage);
    }

    /* 10 MINUTE PARTY */
    if (totalSeconds <= 600 && !tenMinutePartyStarted) {
        tenMinutePartyStarted = true;
        triggerTenMinuteParty();
    }

    /* 1 MINUTE PARTY */
    if (totalSeconds <= 60 && !oneMinutePartyStarted) {
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

    const now = new Date();
    const target = getBirthdayTarget();
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
        unlockBirthdayWebsite();
        return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (countdownDays) countdownDays.textContent = formatNumber(days);
    if (countdownHours) countdownHours.textContent = formatNumber(hours);
    if (countdownMinutes) countdownMinutes.textContent = formatNumber(minutes);
    if (countdownSeconds) countdownSeconds.textContent = formatNumber(seconds);
    if (countdownStatus) countdownStatus.textContent = "SYSTEM LOCKED";

    updateCountdownEffects(totalSeconds);
}


/* ==========================================================================
   UNLOCK WEBSITE
========================================================================== */

function unlockBirthdayWebsite() {
    if (birthdayCountdownInterval) {
        clearInterval(birthdayCountdownInterval);
        birthdayCountdownInterval = null;
    }

    resetCountdownEffectClasses();

    document.body.classList.remove("birthday-locked");
    document.body.classList.add("birthday-unlocked");

    if (countdownStatus) {
        countdownStatus.textContent = "ACCESS GRANTED";
    }

    setTimeout(function () {
        if (lockScreen) {
            lockScreen.remove();
        }
    }, 2200);
}


/* ==========================================================================
   INITIALIZE BIRTHDAY LOCK
========================================================================== */

function initializeBirthdayLock() {
    if (isBirthdayToday()) {
        document.body.classList.add("birthday-unlocked");

        if (countdownStatus) {
            countdownStatus.textContent = "ACCESS GRANTED";
        }

        setTimeout(function () {
            if (lockScreen) {
                lockScreen.remove();
            }
        }, 2200);

        return;
    }

    document.body.classList.add("birthday-locked");
    updateBirthdayCountdown();

    birthdayCountdownInterval = setInterval(updateBirthdayCountdown, 1000);
}

initializeBirthdayLock();


/* ==========================================================================
   THEME SWITCH
========================================================================== */

const themeSwitch = document.getElementById("theme-switch");
const themeSwitchText = document.getElementById("theme-switch-text");
const themeIcon = document.getElementById("theme-icon");

function updateThemeButton() {
    const pinkMode = document.body.classList.contains("theme-pink");

    if (themeSwitchText) {
        themeSwitchText.textContent = pinkMode ? "PINK MODE" : "BLUE MODE";
    }

    if (themeIcon) {
        themeIcon.textContent = pinkMode ? "🌸" : "🌲";
    }

    if (themeSwitch) {
        themeSwitch.setAttribute(
            "aria-label",
            pinkMode ? "Switch to blue theme" : "Switch to pink theme"
        );
    }
}

function toggleTheme() {
    document.body.classList.toggle("theme-pink");

    const pinkMode = document.body.classList.contains("theme-pink");

    localStorage.setItem("birthday-theme", pinkMode ? "pink" : "blue");

    updateThemeButton();
}

if (themeSwitch) {
    themeSwitch.addEventListener("click", function () {
        toggleTheme();
    });
}

function initializeTheme() {
    const savedTheme = localStorage.getItem("birthday-theme");

    if (savedTheme === "pink") {
        document.body.classList.add("theme-pink");
    }

    updateThemeButton();
}

initializeTheme();


/* ==========================================================================
   COUNTDOWN PARTY -- 10 MINUTES
========================================================================== */

function triggerTenMinuteParty() {
    if (typeof confetti !== "function") {
        return;
    }

    confetti({
        particleCount: 180,
        spread: 160,
        startVelocity: 55,
        gravity: 0.8,
        ticks: 300,
        origin: { x: 0.5, y: 0.65 }
    });

    let bursts = 0;

    const partyInterval = setInterval(function () {
        confetti({
            particleCount: 18,
            spread: 100,
            startVelocity: 35,
            gravity: 0.8,
            origin: { x: Math.random() * 0.35, y: 0.9 }
        });

        confetti({
            particleCount: 18,
            spread: 100,
            startVelocity: 35,
            gravity: 0.8,
            origin: { x: 0.65 + Math.random() * 0.35, y: 0.9 }
        });

        bursts++;

        if (bursts >= 15) {
            clearInterval(partyInterval);
        }
    }, 450);
}


/* ==========================================================================
   COUNTDOWN PARTY -- 1 MINUTE
========================================================================== */

function triggerOneMinuteParty() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 350,
            spread: 180,
            startVelocity: 70,
            gravity: 0.75,
            ticks: 400,
            origin: { x: 0.5, y: 0.6 }
        });

        confetti({
            particleCount: 150,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            gravity: 0.8,
            origin: { x: 0, y: 1 }
        });

        confetti({
            particleCount: 150,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            gravity: 0.8,
            origin: { x: 1, y: 1 }
        });
    }

    startCountdownPartyObjects();
}


/* ==========================================================================
   COUNTDOWN BALLOONS + CAKES
========================================================================== */

function startCountdownPartyObjects() {
    let objectCount = 0;

    const objectInterval = setInterval(function () {
        createCountdownPartyObject();

        objectCount++;

        if (objectCount >= 45) {
            clearInterval(objectInterval);
        }
    }, 250);
}

function createCountdownPartyObject() {
    const object = document.createElement("div");
    object.className = "countdown-party-object";

    const isBalloon = Math.random() < 0.55;

    if (isBalloon) {
        object.classList.add("countdown-balloon");
        object.textContent = "🎈";
    } else {
        object.classList.add("countdown-cake");
        object.textContent = Math.random() < 0.5 ? "🎂" : "🧁";
    }

    object.style.left = Math.random() * 100 + "vw";
    object.style.animationDuration = (3 + Math.random() * 3) + "s";
    object.style.animationDelay = (Math.random() * 0.5) + "s";

    document.body.appendChild(object);

    setTimeout(function () {
        object.remove();
    }, 7000);
}


/* ==========================================================================
   HERO POSITION
========================================================================== */

window.addEventListener("load", function () {
    if (document.body.classList.contains("birthday-unlocked")) {
        window.scrollTo(0, 0);
    }
});


/* ==========================================================================
   ELEMENT REFERENCES
========================================================================== */

const blackOut = document.querySelector(".black-screen");
const foodButtons = document.querySelectorAll(".food-button");
const affordtext = document.getElementById("afford-text");
const chat = document.getElementById("msg-card");
const nextMsg = document.getElementById("nextMessage");
const shopButtons = document.querySelectorAll(".shop-button");
const shopaffordtext = document.getElementById("shop-afford-text");
const clickAudio = document.getElementById("click-audio");
const backgroundAudio = document.getElementById("background-audio");
const bdayAudio = document.getElementById("bday-audio");
const danceAudio = document.getElementById("dance-audio");
const pageContent = document.getElementById("page-content");
const muteBtn = document.getElementById("mute-toggle");
const scrollProgress = document.getElementById("scroll-progress");
const avignaToast = document.getElementById("avigna-toast");
const secretLogo = document.getElementById("secret-logo");


/* ==========================================================================
   GAME VARIABLES
========================================================================== */

let msgIndex = 0;
let money = 0;
let hungerPercent = 0;
let boughtConvo = false;
let boughtMsg = false;
let boughtBlur = false;
let doblur = true;
let movieModeOn = false;
let foodBought = 0;
let warningGiven = false;
let foodieEndingTriggered = false;
let confettiStarted = false;
let audioStarted = false;
let isMuted = false;
let avignaToastTimeout;
let typedBuffer = "";
let konamiIndex = 0;
let logoClicks = 0;
let logoClickTimer = null;
let idleTimer = null;
let idleNudgeCount = 0;


/* ==========================================================================
   AUDIO
========================================================================== */

function playClick() {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    if (!clickAudio) {
        return;
    }

    clickAudio.currentTime = 0;
    clickAudio.play().catch(function () {});
}

function startBackgroundAudio() {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    if (audioStarted) {
        return;
    }

    if (!backgroundAudio) {
        return;
    }

    audioStarted = true;
    backgroundAudio.loop = true;
    backgroundAudio.play().catch(function () {});
}

document.addEventListener("click", startBackgroundAudio);


/* ==========================================================================
   SPECIAL AUDIO FINISHED
========================================================================== */

if (danceAudio) {
    danceAudio.addEventListener("ended", function () {
        if (!backgroundAudio) return;
        backgroundAudio.currentTime = 0;
        backgroundAudio.play().catch(function () {});
    });
}

if (bdayAudio) {
    bdayAudio.addEventListener("ended", function () {
        if (!backgroundAudio) return;
        backgroundAudio.currentTime = 0;
        backgroundAudio.play().catch(function () {});
    });
}


/* ==========================================================================
   MUTE
========================================================================== */

if (muteBtn) {
    muteBtn.addEventListener("click", function () {
        isMuted = !isMuted;

        const audioElements = [backgroundAudio, bdayAudio, danceAudio, clickAudio];

        audioElements.forEach(function (audio) {
            if (audio) {
                audio.muted = isMuted;
            }
        });

        muteBtn.textContent = isMuted ? "🔇" : "🔊";
    });
}


/* ==========================================================================
   PAGE FILTER

   NOTE: extended to also support disco / rainbow modes further below
   without stomping on the blur / cinema filters.
========================================================================== */

let discoModeOn = false;
let rainbowModeOn = false;

function updatePageFilter() {
    if (!pageContent) {
        return;
    }

    const filters = [];

    if (doblur) {
        filters.push(`blur(${hungerPercent / 65}px)`);
    }

    if (movieModeOn) {
        filters.push("grayscale(0.6)");
        filters.push("sepia(0.3)");
    }

    if (rainbowModeOn) {
        filters.push("hue-rotate(var(--rainbow-hue, 0deg))");
        filters.push("saturate(1.6)");
    }

    pageContent.style.filter = filters.join(" ");
}


/* ==========================================================================
   MONEY
========================================================================== */

function refreshMoneyDisplay() {
    const moneyDisplay = document.getElementById("display-money");

    if (moneyDisplay) {
        moneyDisplay.textContent = "Money: $" + money;
    }

    if (affordtext) {
        affordtext.innerHTML = `<p>Money: $${money}</p>`;
    }

    if (shopaffordtext) {
        shopaffordtext.innerHTML = `<p>Money: $${money}</p>`;
    }
}

function updatemoney() {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    money += 25;
    refreshMoneyDisplay();
}

function reducemoney(price) {
    money -= price;

    if (money < 0) {
        money = 0;
    }

    refreshMoneyDisplay();
}


/* ==========================================================================
   HUNGER
========================================================================== */

function refreshHungerDisplay() {
    const hungerBar = document.querySelector(".hunger-bar");
    const hungerLabel = document.querySelector(".hunger-percentage");

    if (hungerBar) {
        hungerBar.innerHTML = `<span style="width:${hungerPercent}%"></span>`;
    }

    if (hungerLabel) {
        hungerLabel.textContent = hungerPercent + "%";
    }
}

function hungerUpdate() {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    if (hungerPercent < 100) {
        hungerPercent += 1;
    }

    refreshHungerDisplay();
    updatePageFilter();
}

const hungerInterval = setInterval(hungerUpdate, 1000);

setInterval(updatemoney, 1000);


/* ==========================================================================
   SCROLL PROGRESS
========================================================================== */

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    scrollProgress.style.width = percent + "%";
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();


/* ==========================================================================
   TAB TITLE
========================================================================== */

const originalTitle = document.title;

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        document.title = "come back pleamseee 🥺";
    } else {
        document.title = originalTitle;
    }
});


/* ==========================================================================
   CHAT
========================================================================== */

const messages = [
    { name: "Neerav", text: "Hailoooo" },
    { name: "Avigna", text: "helloo" },
    { name: "Neerav", text: "Well there wasn't really any secret, it was a scam...500$ gone..." },
    { name: "Avigna", text: "fck u" },
    { name: "Neerav", text: "areeeee using such language on ur bday, so uncivilised" },
    { name: "Avigna", text: "......" },
    { name: "Neerav", text: "acha acha, happy birthday, eat some aloo, be better" },
    { name: "Avigna", text: "Thanksss" },
    { name: "Neerav", text: "btw there is a secret...but u will not get it, it is something u need to guess" },
    { name: "Avigna", text: "ki baje....bol naaaa" },
    { name: "Neerav", text: "😜😜😜😜 nahii" }
];

if (nextMsg) {
    nextMsg.addEventListener("click", function () {
        playClick();

        if (!boughtConvo) {
            return;
        }

        if (msgIndex >= messages.length) {
            return;
        }

        if (!chat) {
            return;
        }

        const message = messages[msgIndex];
        const p = document.createElement("p");
        p.className = "messages";
        p.innerHTML = `<strong>${message.name}:</strong> ${message.text}`;

        chat.appendChild(p);

        msgIndex++;
    });
}


/* ==========================================================================
   FOOD
========================================================================== */

foodButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const price = Number(button.dataset.price);
        const saturation = Number(button.dataset.saturation);

        playClick();

        if (money < price || foodieEndingTriggered) {
            return;
        }

        reducemoney(price);

        foodBought++;

        if (foodBought > 45 && !warningGiven) {
            warningGiven = true;
            alert("Stomach is about to burst, take it easy bhai");
        }

        hungerPercent -= saturation;

        if (hungerPercent < 0) {
            hungerPercent = 0;
        }

        refreshHungerDisplay();
        updatePageFilter();

        if (foodBought >= 25) {
            activateFoodieEnding();
        }
    });
});


/* ==========================================================================
   FOODIE EMERGENCY
========================================================================== */

function activateFoodieEnding() {
    if (foodieEndingTriggered) {
        return;
    }

    foodieEndingTriggered = true;

    clearInterval(hungerInterval);

    if (blackOut) {
        blackOut.classList.add("black-out");
    }

    const ending = document.createElement("div");
    ending.className = "foodie-ending-text";

    ending.innerHTML = `
        <div class="foodie-header">🚑 FOODIE EMERGENCY 🚑</div>
        <p>So… you ate <strong><em>everything.</em></strong></p>
        <p>At first, it was fine. You ate one thing, then another, and honestly nobody judged you.</p>
        <p>But then you kept eating.</p>
        <p>Pizza? Gone.<br>Burger? Gone.<br>Momos? Absolutely demolished.</p>
        <p>Aur phir bhi ruk nahi rahi thi sali. 💀</p>
        <p>Itna khaya sala restaurant bankrupt ho gaya, koi sharam hai.</p>
        <p>Now... paramedics have appeared.</p>
        <p>They looked at u... they looked at the restaurant owner... and sighed.</p>
        <p>They put u in the ambulance... it couldn't move...</p>
        <p>sala tanki hai.</p>
        <p>The doctors were shipped to ur location but it was too late....</p>
        <p><strong><em>SECRET ENDING UNLOCKED 💀</em></strong></p>
        <p>Now restart and next time...</p>
        <p>please eat a little less.</p>
        <p>It's a bit concerning.</p>
    `;

    document.body.appendChild(ending);

    createRestartButton();
}


/* ==========================================================================
   RESTART BUTTON
========================================================================== */

function createRestartButton() {
    if (document.querySelector(".restart-button")) {
        return;
    }

    const button = document.createElement("button");
    button.className = "restart-button";
    button.textContent = "Restart Website";

    button.addEventListener("click", function () {
        location.reload();
    });

    document.body.appendChild(button);
}


/* ==========================================================================
   SHOP
========================================================================== */

shopButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        playClick();

        const price = Number(button.dataset.price);
        const unlock = button.dataset.unlock;

        if (
            (unlock === "conversation" && boughtConvo) ||
            (unlock === "message" && boughtMsg) ||
            (unlock === "blur" && boughtBlur)
        ) {
            return;
        }

        if (money < price) {
            refreshMoneyDisplay();
            return;
        }

        reducemoney(price);

        if (unlock === "conversation") {
            boughtConvo = true;

            const lockedChat = document.getElementById("locked-chat");
            if (lockedChat) {
                lockedChat.textContent = "🔓";
            }
        }

        if (unlock === "message") {
            boughtMsg = true;

            const message = document.getElementById("message");
            const lockedMessage = document.getElementById("locked-message");

            if (message) {
                message.classList.add("message-animation");
                message.style.opacity = "1";
            }

            if (lockedMessage) {
                lockedMessage.textContent = "🔓";
            }
        }

        if (unlock === "blur") {
            doblur = false;
            boughtBlur = true;

            clearInterval(hungerInterval);
            updatePageFilter();
        }

        button.textContent = "Bought";
        button.style.background = "black";

        refreshMoneyDisplay();

        checkGiftUnlock();
    });
});


/* ==========================================================================
   GIFT UNLOCK
========================================================================== */

function checkGiftUnlock() {
    if (boughtConvo && boughtMsg && boughtBlur) {
        const lockedNotice = document.getElementById("gift-locked-notice");
        const giftSection = document.getElementById("gift-section");

        if (lockedNotice) {
            lockedNotice.style.display = "none";
        }

        if (giftSection) {
            giftSection.style.display = "block";
        }
    }
}


/* ==========================================================================
   FINAL GIFT

   FIXED: scrolls to top so the centered .gift-layout box is actually
   visible in the viewport instead of sitting wherever the page had
   scrolled to (the shop section, usually far down the page).
========================================================================== */

const bdayBtn = document.querySelector(".gift-button");

if (bdayBtn) {
    bdayBtn.addEventListener("click", function () {
        if (!pageContent) {
            return;
        }

        /* Apply the dedicated final-gift layout. */
        pageContent.classList.add("gift-layout");

        /* Remove any existing hunger/movie/disco/rainbow filters. */
        pageContent.style.filter = "none";

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

        if (blackOut) {
            blackOut.classList.add("black-out");
        }

        if (backgroundAudio) {
            backgroundAudio.pause();
        }

        if (bdayAudio) {
            bdayAudio.currentTime = 0;
            bdayAudio.volume = 1;
            bdayAudio.play().catch(function () {});
        }

        /*
            FIX: scroll the page back to the top immediately so the
            centered gift-layout box is actually in view. Using
            "instant" avoids a jarring smooth-scroll fighting with
            the new layout appearing.
        */
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });

        createRestartButton();
    });
}


/* ==========================================================================
   GIFT CONFETTI

   FIXED: the confetti canvas previously had no CSS sizing at all, so it
   rendered at the browser default of 300x150px -- all the confetti was
   firing inside that tiny invisible box. We now give the canvas real
   pixel dimensions matching the viewport (and keep it in sync on
   resize), on top of the CSS full-screen sizing added in styles.css.
========================================================================== */

const confettiBtn = document.getElementById("confettiBtn");

if (confettiBtn) {
    confettiBtn.addEventListener("click", function () {
        if (confettiStarted || typeof confetti !== "function") {
            return;
        }

        confettiStarted = true;

        const canvas = document.createElement("canvas");
        canvas.className = "gift-confetti-canvas";

        if (pageContent) {
            pageContent.appendChild(canvas);
        }

        /* FIX: give the canvas a real drawing buffer size. */
        function sizeConfettiCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        sizeConfettiCanvas();

        window.addEventListener("resize", sizeConfettiCanvas);

        const giftConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });

        function shootConfetti() {
            giftConfetti({
                particleCount: 10,
                angle: 60,
                spread: 50,
                startVelocity: 80,
                gravity: 0.8,
                ticks: 250,
                origin: { x: 0, y: 1 }
            });

            giftConfetti({
                particleCount: 10,
                angle: 120,
                spread: 50,
                startVelocity: 80,
                gravity: 0.8,
                ticks: 250,
                origin: { x: 1, y: 1 }
            });
        }

        shootConfetti();

        setInterval(shootConfetti, 100);
    });
}


/* ==========================================================================
   HOBBY EASTER EGG SYSTEM
========================================================================== */

const HOBBY_CLICKS_TO_UNLOCK = 10;

function setupHobbyEasterEgg(selector, threshold, onUnlock, repeatable) {
    const card = document.querySelector(selector);

    if (!card) {
        return;
    }

    let clicks = 0;
    let locked = false;

    card.addEventListener("click", function () {
        if (locked) {
            return;
        }

        clicks++;

        playClick();

        if (clicks < threshold) {
            return;
        }

        if (repeatable) {
            clicks = 0;
        } else {
            locked = true;
        }

        onUnlock(card);
    });
}


/* ==========================================================================
   DANCE EASTER EGG
========================================================================== */

setupHobbyEasterEgg(".dance", HOBBY_CLICKS_TO_UNLOCK, function (card) {
    card.classList.add("dance-mode");

    if (!card.querySelector(".dance-label")) {
        const label = document.createElement("p");
        label.className = "hobby-unlock-text dance-label";
        label.textContent = "SHE'S GOT THE MOVES 💃";
        card.appendChild(label);
    }

    if (backgroundAudio) {
        backgroundAudio.pause();
    }

    if (danceAudio) {
        danceAudio.currentTime = 0;
        danceAudio.play().catch(function () {});
    }

    if (typeof confetti === "function") {
        let bursts = 0;

        const danceBurst = setInterval(function () {
            confetti({
                particleCount: 6,
                spread: 100,
                startVelocity: 35,
                origin: { x: Math.random() * 0.4 + 0.3, y: 0.7 }
            });

            bursts++;

            if (bursts > 15) {
                clearInterval(danceBurst);
            }
        }, 150);
    }

    setTimeout(function () {
        card.classList.remove("dance-mode");
    }, 10000);
}, true);


/* ==========================================================================
   MOVIES EASTER EGG
========================================================================== */

setupHobbyEasterEgg(".movies", HOBBY_CLICKS_TO_UNLOCK, function (card) {
    if (document.querySelector(".movie-overlay")) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.className = "movie-overlay";
    overlay.innerHTML = '<span class="movie-countdown">3</span>';

    document.body.appendChild(overlay);

    const countdownEl = overlay.querySelector(".movie-countdown");
    let count = 3;

    const countdownTimer = setInterval(function () {
        count--;

        if (count > 0) {
            countdownEl.textContent = count;
        } else if (count === 0) {
            countdownEl.textContent = "CINEMA 🎬";
        } else {
            clearInterval(countdownTimer);

            overlay.remove();

            movieModeOn = true;
            updatePageFilter();
        }
    }, 1000);

    if (!document.querySelector(".no-cinema-button")) {
        const offButton = document.createElement("button");
        offButton.className = "no-cinema-button";
        offButton.textContent = "Cinema Mode Off";

        offButton.addEventListener("click", function () {
            movieModeOn = false;
            updatePageFilter();
            offButton.remove();
        });

        document.body.appendChild(offButton);
    }

    if (!card.querySelector(".movies-label")) {
        const label = document.createElement("p");
        label.className = "hobby-unlock-text movies-label";
        label.textContent = '"one movie" — the biggest lie she tells 🎬';
        card.appendChild(label);
    }
}, true);


/* ==========================================================================
   BOOKS EASTER EGG
========================================================================== */

setupHobbyEasterEgg(".books", HOBBY_CLICKS_TO_UNLOCK, function (card) {
    card.classList.add("book-mode");

    if (!card.querySelector(".books-label")) {
        const label = document.createElement("p");
        label.className = "hobby-unlock-text books-label";
        label.textContent = '"just one more chapter" — famous last words 📖';
        card.appendChild(label);
    }

    showBirthdayPoem();
}, true);


/* ==========================================================================
   BIRTHDAY POEM
========================================================================== */

function showBirthdayPoem() {
    if (document.querySelector(".poem-overlay")) {
        return;
    }

    const page = document.querySelector("#page-content");

    if (!page) {
        return;
    }

    page.classList.add("page-fade-out");

    const poemOverlay = document.createElement("div");
    poemOverlay.className = "poem-overlay";

    poemOverlay.innerHTML = `
        <div class="poem-text">
            <p>
                Today, <br><br>
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

    document.body.appendChild(poemOverlay);

    setTimeout(function () {
        poemOverlay.classList.add("visible");
    }, 100);

    const returnBtn = poemOverlay.querySelector(".poem-return-button");

    returnBtn.addEventListener("click", function () {
        playClick();

        poemOverlay.classList.remove("visible");

        setTimeout(function () {
            poemOverlay.remove();
            page.classList.remove("page-fade-out");
        }, 1000);
    });
}


/* ==========================================================================
   AVIGNA TOAST
========================================================================== */

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


/* ==========================================================================
   SECRET TOAST
========================================================================== */

function showSecretToast(message) {
    showAvignaToast("🔐 " + message);
}


/* ==========================================================================
   FLOATING CAKES
========================================================================== */

function spawnFloatingCakes() {
    for (let i = 0; i < 18; i++) {
        const cake = document.createElement("div");
        cake.className = "floating-cake";
        cake.textContent = "🎂";

        cake.style.left = Math.random() * 100 + "vw";
        cake.style.animationDuration = (3 + Math.random() * 3) + "s";
        cake.style.animationDelay = (Math.random() * 0.8) + "s";
        cake.style.fontSize = (1.5 + Math.random() * 2) + "rem";

        document.body.appendChild(cake);

        setTimeout(function () {
            cake.remove();
        }, 7000);
    }
}


/* ==========================================================================
   NEW SECRET: MATRIX RAIN

   Typing "matrix" drops a canvas of falling green code over everything
   for a few seconds, then fades out and removes itself.
========================================================================== */

function spawnMatrixRain() {
    if (document.querySelector(".matrix-rain-canvas")) {
        return;
    }

    showAvignaToast("💊 Wake up...");

    const canvas = document.createElement("canvas");
    canvas.className = "matrix-rain-canvas";

    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "18000";
    canvas.style.pointerEvents = "none";
    canvas.style.opacity = "0";
    canvas.style.transition = "opacity 0.6s ease";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function sizeMatrixCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    sizeMatrixCanvas();

    const glyphs = "アイウエオカキクケコ01アヴィグナ";
    const fontSize = 18;
    const columnCount = Math.ceil(canvas.width / fontSize);
    const drops = new Array(columnCount).fill(1);

    requestAnimationFrame(function () {
        canvas.style.opacity = "1";
    });

    let frames = 0;
    const maxFrames = 420;

    const matrixTimer = setInterval(function () {
        ctx.fillStyle = "rgba(2, 6, 8, 0.18)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#4fffb0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];

            ctx.fillText(glyph, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        frames++;

        if (frames >= maxFrames) {
            clearInterval(matrixTimer);

            canvas.style.opacity = "0";

            setTimeout(function () {
                canvas.remove();
            }, 700);
        }
    }, 40);
}


/* ==========================================================================
   NEW SECRET: DISCO MODE

   Typing "disco" flashes a full-screen colour-cycling overlay for a
   short burst, synced loosely to a "beat" interval.
========================================================================== */

let discoInterval = null;

function activateDiscoMode() {
    if (discoModeOn) {
        return;
    }

    discoModeOn = true;

    showAvignaToast("🪩 DISCO MODE ENGAGED");

    const overlay = document.createElement("div");
    overlay.className = "disco-overlay";

    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "17000";
    overlay.style.pointerEvents = "none";
    overlay.style.mixBlendMode = "overlay";
    overlay.style.opacity = "0.55";
    overlay.style.transition = "background 0.15s linear";

    document.body.appendChild(overlay);

    const discoColors = [
        "#ff3d9a",
        "#ffd93d",
        "#3dfff0",
        "#7b3dff",
        "#3dff6a",
        "#ff3d3d"
    ];

    let colorIndex = 0;

    discoInterval = setInterval(function () {
        overlay.style.background = discoColors[colorIndex % discoColors.length];
        colorIndex++;
    }, 160);

    setTimeout(function () {
        clearInterval(discoInterval);
        overlay.remove();
        discoModeOn = false;
    }, 6000);
}


/* ==========================================================================
   NEW SECRET: RAINBOW MODE

   Typing "rainbow" hue-rotates the whole page content for a while.
   Works alongside updatePageFilter() so it doesn't clobber blur/cinema.
========================================================================== */

let rainbowInterval = null;

function activateRainbowMode() {
    if (rainbowModeOn) {
        return;
    }

    rainbowModeOn = true;

    showAvignaToast("🌈 RAINBOW MODE ON");

    let hue = 0;

    if (pageContent) {
        pageContent.style.setProperty("--rainbow-hue", "0deg");
    }

    updatePageFilter();

    rainbowInterval = setInterval(function () {
        hue = (hue + 6) % 360;

        if (pageContent) {
            pageContent.style.setProperty("--rainbow-hue", hue + "deg");
        }

        updatePageFilter();
    }, 40);

    setTimeout(function () {
        clearInterval(rainbowInterval);

        rainbowModeOn = false;

        if (pageContent) {
            pageContent.style.removeProperty("--rainbow-hue");
        }

        updatePageFilter();
    }, 8000);
}


/* ==========================================================================
   NEW SECRET: PAGE FLIP

   Typing "flip" rotates the entire page 180 degrees for a couple of
   seconds before flipping it back. Chaotic and completely pointless,
   which is exactly the point.
========================================================================== */

function activatePageFlip() {
    if (!pageContent) {
        return;
    }

    if (pageContent.classList.contains("flip-mode")) {
        return;
    }

    showAvignaToast("🙃 who allowed you to touch the keyboard");

    pageContent.style.transition = "transform 1s ease-in-out";
    pageContent.style.transform = "rotate(180deg)";
    pageContent.classList.add("flip-mode");

    setTimeout(function () {
        pageContent.style.transform = "rotate(0deg)";

        setTimeout(function () {
            pageContent.classList.remove("flip-mode");
        }, 1000);
    }, 2200);
}


/* ==========================================================================
   NEW SECRET: DEBUG HUD

   Typing "debug" shows a small live stats overlay (money, hunger,
   food bought, unlocks) that updates every second, and can be closed
   by clicking it or typing "debug" again.
========================================================================== */

let debugHudInterval = null;

function toggleDebugHud() {
    const existing = document.querySelector(".debug-hud");

    if (existing) {
        clearInterval(debugHudInterval);
        existing.remove();
        return;
    }

    showAvignaToast("🧪 debug hud online");

    const hud = document.createElement("div");
    hud.className = "debug-hud";

    hud.style.position = "fixed";
    hud.style.bottom = "18px";
    hud.style.left = "18px";
    hud.style.zIndex = "26000";
    hud.style.background = "rgba(5, 15, 19, 0.9)";
    hud.style.border = "1px solid rgba(150, 240, 230, 0.25)";
    hud.style.borderRadius = "12px";
    hud.style.padding = "12px 16px";
    hud.style.fontFamily = "'DM Mono', monospace";
    hud.style.fontSize = "0.72rem";
    hud.style.color = "#4fffe8";
    hud.style.lineHeight = "1.6";
    hud.style.cursor = "pointer";
    hud.style.backdropFilter = "blur(10px)";
    hud.title = "click to close";

    function renderHud() {
        hud.innerHTML =
            "MONEY: $" + money + "<br>" +
            "HUNGER: " + hungerPercent + "%<br>" +
            "FOOD BOUGHT: " + foodBought + "<br>" +
            "CONVO: " + (boughtConvo ? "UNLOCKED" : "locked") + "<br>" +
            "MESSAGE: " + (boughtMsg ? "UNLOCKED" : "locked") + "<br>" +
            "BLUR REMOVED: " + (boughtBlur ? "YES" : "no");
    }

    renderHud();

    debugHudInterval = setInterval(renderHud, 1000);

    hud.addEventListener("click", function () {
        clearInterval(debugHudInterval);
        hud.remove();
    });

    document.body.appendChild(hud);
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
        action: showAvignaToast
    },

    secret: {
        messages: [
            "🚨 YOU FOUND A SECRET SECRET",
            "This secret was hidden from Avigna.",
            "Neerav definitely spent too much time making this.",
            "There is absolutely nothing useful here.",
            "Congratulations. You wasted your time professionally."
        ],
        action: showSecretToast
    },

    cake: {
        action: spawnFloatingCakes
    },

    matrix: {
        action: spawnMatrixRain
    },

    disco: {
        action: activateDiscoMode
    },

    rainbow: {
        action: activateRainbowMode
    },

    flip: {
        action: activatePageFlip
    },

    debug: {
        action: toggleDebugHud
    }
};

const MAX_TYPED_BUFFER = 30;

document.addEventListener("keydown", function (event) {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    if (event.key.length !== 1) {
        return;
    }

    typedBuffer += event.key.toLowerCase();

    if (typedBuffer.length > MAX_TYPED_BUFFER) {
        typedBuffer = typedBuffer.slice(-MAX_TYPED_BUFFER);
    }

    const words = Object.keys(typingSecrets);

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (typedBuffer.endsWith(word)) {
            const secret = typingSecrets[word];

            if (secret.messages) {
                const message = secret.messages[
                    Math.floor(Math.random() * secret.messages.length)
                ];

                secret.action(message);
            } else {
                secret.action();
            }

            typedBuffer = "";

            break;
        }
    }
});


/* ==========================================================================
   KONAMI CODE
========================================================================== */

const konamiCode = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a"
];

document.addEventListener("keydown", function (event) {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            activateKonamiCode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = key === konamiCode[0] ? 1 : 0;
    }
});


/* ==========================================================================
   KONAMI ACTIVATION
========================================================================== */

function activateKonamiCode() {
    showAvignaToast("🎮 KONAMI CODE ACTIVATED. YOU CHEATED.");

    if (typeof confetti !== "function") {
        return;
    }

    confetti({
        particleCount: 150,
        spread: 180,
        startVelocity: 60,
        gravity: 0.8,
        origin: { x: 0.5, y: 0.6 }
    });

    setTimeout(function () {
        confetti({
            particleCount: 100,
            spread: 120,
            startVelocity: 45,
            origin: { x: 0.1, y: 0.7 }
        });

        confetti({
            particleCount: 100,
            spread: 120,
            startVelocity: 45,
            origin: { x: 0.9, y: 0.7 }
        });
    }, 250);
}


/* ==========================================================================
   IDLE NUDGE
========================================================================== */

const IDLE_TIME = 20000;

const idleMessages = [
    "👀 You still there?",
    "Bro... you haven't touched anything in a while.",
    "The website is getting lonely.",
    "Psst... there are secrets hidden here.",
    "Try clicking around. You might find something.",
    "Avigna would probably have found a secret by now.",
    "You're really just gonna stare at the website?"
];

function resetIdleTimer() {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    clearTimeout(idleTimer);

    idleTimer = setTimeout(showIdleNudge, IDLE_TIME);
}

function showIdleNudge() {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    const message = idleMessages[idleNudgeCount % idleMessages.length];

    idleNudgeCount++;

    showAvignaToast(message);

    resetIdleTimer();
}

["mousemove", "mousedown", "keydown", "scroll", "touchstart"].forEach(function (eventName) {
    document.addEventListener(eventName, resetIdleTimer, { passive: true });
});

resetIdleTimer();


/* ==========================================================================
   SECRET LOGO -- FIVE QUICK CLICKS
========================================================================== */

if (secretLogo) {
    secretLogo.addEventListener("click", function () {
        logoClicks++;

        playClick();

        clearTimeout(logoClickTimer);

        logoClickTimer = setTimeout(function () {
            logoClicks = 0;
        }, 1200);

        if (logoClicks >= 5) {
            logoClicks = 0;

            showAvignaToast("🤫 You found the CEO button.");

            if (typeof confetti === "function") {
                confetti({
                    particleCount: 60,
                    spread: 100,
                    startVelocity: 35,
                    origin: { x: 0.12, y: 0.12 }
                });
            }

            secretLogo.animate(
                [
                    { transform: "rotate(0deg) scale(1)" },
                    { transform: "rotate(-15deg) scale(1.3)" },
                    { transform: "rotate(15deg) scale(1.3)" },
                    { transform: "rotate(0deg) scale(1)" }
                ],
                { duration: 600, easing: "ease-in-out" }
            );
        }
    });
}


/* ==========================================================================
   NEW SECRET: LOGO LONG-PRESS

   Holding down on the "A." logo for 2 seconds triggers a completely
   different secret from the 5-click one -- a fake "root access"
   sequence that ends in a toast and a screen-wide green flash.
========================================================================== */

if (secretLogo) {
    let logoPressTimer = null;
    let logoPressFired = false;

    function startLogoPress() {
        logoPressFired = false;

        logoPressTimer = setTimeout(function () {
            logoPressFired = true;
            triggerRootAccessSecret();
        }, 2000);
    }

    function cancelLogoPress() {
        clearTimeout(logoPressTimer);
    }

    secretLogo.addEventListener("mousedown", startLogoPress);
    secretLogo.addEventListener("touchstart", startLogoPress, { passive: true });

    secretLogo.addEventListener("mouseup", cancelLogoPress);
    secretLogo.addEventListener("mouseleave", cancelLogoPress);
    secretLogo.addEventListener("touchend", cancelLogoPress);
}

function triggerRootAccessSecret() {
    const flash = document.createElement("div");

    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.background = "rgba(79, 255, 232, 0.18)";
    flash.style.zIndex = "26500";
    flash.style.pointerEvents = "none";
    flash.style.opacity = "1";
    flash.style.transition = "opacity 1.2s ease";

    document.body.appendChild(flash);

    requestAnimationFrame(function () {
        flash.style.opacity = "0";
    });

    setTimeout(function () {
        flash.remove();
    }, 1300);

    showAvignaToast("🔓 root access granted. nothing happens though.");
}


/* ==========================================================================
   NEW SECRET: RIGHT CLICK
========================================================================== */

document.addEventListener("contextmenu", function (event) {
    if (!document.body.classList.contains("birthday-unlocked")) {
        return;
    }

    event.preventDefault();

    const rightClickMessages = [
        "🖱️ nice try. no context menu for you.",
        "sneaky. there's nothing under here.",
        "you right clicked. bold move.",
        "inspect element won't save you either."
    ];

    showAvignaToast(
        rightClickMessages[Math.floor(Math.random() * rightClickMessages.length)]
    );
});


/* ==========================================================================
   NEW SECRET: DOUBLE-CLICK THE QUOTE

   Double clicking the "diary" quote fires a small firework burst
   centered on the click and a special toast, repeatable.
========================================================================== */

const quoteSection = document.querySelector(".trust-text");

if (quoteSection) {
    quoteSection.addEventListener("dblclick", function (event) {
        playClick();

        showAvignaToast("📖 diary entry #1: this easter egg exists.");

        if (typeof confetti !== "function") {
            return;
        }

        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;

        confetti({
            particleCount: 90,
            spread: 100,
            startVelocity: 45,
            origin: { x: x, y: y }
        });
    });
}


/* ==========================================================================
   NEW SECRET: STAT BAR COMBO

   Clicking the five stat bars in top-to-bottom order (GOOFINESS ->
   ENERGY -> EMOTIONAL INTELLIGENCE -> EXTRA CURRICULAR -> JUDGEMENT)
   unlocks a hidden message. Clicking out of order resets the combo.
========================================================================== */

const statBars = document.querySelectorAll(".stats .stat");
let statComboIndex = 0;

statBars.forEach(function (statEl, index) {
    statEl.style.cursor = "pointer";

    statEl.addEventListener("click", function () {
        playClick();

        if (index === statComboIndex) {
            statComboIndex++;

            if (statComboIndex === statBars.length) {
                statComboIndex = 0;

                showAvignaToast("📊 you actually read the stats in order. impressive.");

                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 80,
                        spread: 90,
                        startVelocity: 40,
                        origin: { x: 0.5, y: 0.4 }
                    });
                }
            }
        } else {
            statComboIndex = index === 0 ? 1 : 0;
        }
    });
});


/* ==========================================================================
   NEW SECRET: SHAKE TO PARTY (MOBILE)

   On devices that support devicemotion, a firm shake triggers a
   confetti burst and a toast. Permission is requested lazily on the
   first user interaction where required (iOS 13+).
========================================================================== */

let lastShakeTime = 0;
let lastAcceleration = { x: 0, y: 0, z: 0 };
const SHAKE_THRESHOLD = 18;

function handleDeviceMotion(event) {
    const acceleration = event.accelerationIncludingGravity;

    if (!acceleration) {
        return;
    }

    const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
    const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
    const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);

    lastAcceleration = {
        x: acceleration.x,
        y: acceleration.y,
        z: acceleration.z
    };

    const totalDelta = deltaX + deltaY + deltaZ;
    const now = Date.now();

    if (totalDelta > SHAKE_THRESHOLD && now - lastShakeTime > 2000) {
        lastShakeTime = now;

        if (!document.body.classList.contains("birthday-unlocked")) {
            return;
        }

        showAvignaToast("📱 shake detected. here's confetti for your trouble.");

        if (typeof confetti === "function") {
            confetti({
                particleCount: 120,
                spread: 140,
                startVelocity: 50,
                origin: { x: 0.5, y: 0.5 }
            });
        }
    }
}

function enableShakeDetection() {
    if (typeof DeviceMotionEvent === "undefined") {
        return;
    }

    if (typeof DeviceMotionEvent.requestPermission === "function") {
        /*
            iOS requires an explicit user gesture to grant motion
            permission. We request it on first click/tap after
            unlock, then attach the listener once granted.
        */
        document.addEventListener("click", function requestMotionOnce() {
            DeviceMotionEvent.requestPermission()
                .then(function (state) {
                    if (state === "granted") {
                        window.addEventListener("devicemotion", handleDeviceMotion);
                    }
                })
                .catch(function () {});

            document.removeEventListener("click", requestMotionOnce);
        }, { once: true });
    } else {
        window.addEventListener("devicemotion", handleDeviceMotion);
    }
}

enableShakeDetection();


/* ==========================================================================
   NEW SECRET: CONSOLE ART

   A little something for anyone who opens devtools out of curiosity.
========================================================================== */

console.log(
    "%c🎂 hii nosy person",
    "font-size: 20px; font-weight: bold; color: #4fffe8;"
);

console.log(
    "%cyes this is a birthday website. no there is nothing useful in here. try typing 'matrix', 'disco', 'rainbow', 'flip', 'debug', 'cake', 'avigna' or 'secret' anywhere on the page.",
    "font-size: 13px; color: #baff6a;"
);

console.log(
    "%calso try the konami code. ↑ ↑ ↓ ↓ ← → ← → B A",
    "font-size: 12px; color: #ff8cd9;"
);


/* ==========================================================================
   NEW SECRET: MESSAGE POSTSCRIPT

   Clicking the birthday message paragraph 6 times reveals a hidden
   postscript fade-in at the bottom of it. Only works once the message
   itself has already been bought/unlocked, since it's invisible
   before that.
========================================================================== */

(function setupMessagePostscript() {
    const messageEl = document.getElementById("message");

    if (!messageEl) {
        return;
    }

    let clicks = 0;
    let psAdded = false;

    messageEl.addEventListener("click", function () {
        if (!boughtMsg) {
            return;
        }

        playClick();

        clicks++;

        if (clicks < 6 || psAdded) {
            return;
        }

        psAdded = true;

        const ps = document.createElement("span");
        ps.className = "message-ps";

        ps.innerHTML =
            "P.S. -- if you're reading this after clicking the message six times, " +
            "you have too much free time, and I respect that. Go outside though. Maybe.";

        messageEl.appendChild(ps);

        requestAnimationFrame(function () {
            ps.classList.add("visible");
        });

        showAvignaToast("📝 you found the postscript.");
    });
})();


/* ==========================================================================
   NEW SECRET: HERO NAME TRIPLE-CLICK

   Triple-clicking "Avigna" in the hero title spawns floating hearts
   and a toast. Repeatable.
========================================================================== */

(function setupHeroNameSecret() {
    const heroName = document.querySelector(".hero-title span:nth-child(3)");

    if (!heroName) {
        return;
    }

    heroName.addEventListener("dblclick", function (event) {
        event.preventDefault();
    });

    let clicks = 0;
    let clickTimer = null;

    heroName.addEventListener("click", function () {
        playClick();

        clicks++;

        clearTimeout(clickTimer);

        clickTimer = setTimeout(function () {
            clicks = 0;
        }, 700);

        if (clicks < 3) {
            return;
        }

        clicks = 0;

        showAvignaToast("💗 aww ok fine, you're kind of great too.");

        for (let i = 0; i < 14; i++) {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.textContent = "💚";

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (3.5 + Math.random() * 2.5) + "s";
            heart.style.animationDelay = (Math.random() * 0.6) + "s";
            heart.style.fontSize = (1.4 + Math.random() * 1.8) + "rem";

            document.body.appendChild(heart);

            setTimeout(function () {
                heart.remove();
            }, 6000);
        }
    });
})();


/* ==========================================================================
   NEW SECRET: HIDDEN ATM (MONEY DISPLAY CLICK CHEAT)

   Clicking the "Money: $..." display in the top bar 8 times within
   a short window grants a one-time bonus of $200. Can be re-armed
   by waiting -- so it's repeatable, just rate-limited.
========================================================================== */

(function setupMoneyClickCheat() {
    const moneyDisplay = document.getElementById("display-money");

    if (!moneyDisplay) {
        return;
    }

    let clicks = 0;
    let windowTimer = null;
    let cooldown = false;

    moneyDisplay.addEventListener("click", function () {
        if (cooldown) {
            showAvignaToast("🏧 ATM is out of cash. try again later.");
            return;
        }

        playClick();

        clicks++;

        clearTimeout(windowTimer);

        windowTimer = setTimeout(function () {
            clicks = 0;
        }, 2500);

        if (clicks < 8) {
            return;
        }

        clicks = 0;
        cooldown = true;

        money += 200;
        refreshMoneyDisplay();

        showAvignaToast("🏧 hidden ATM found. +$200. don't tell the shop.");

        if (typeof confetti === "function") {
            confetti({
                particleCount: 40,
                spread: 70,
                startVelocity: 30,
                origin: { x: 0.85, y: 0.08 }
            });
        }

        setTimeout(function () {
            cooldown = false;
        }, 30000);
    });
})();


/* ==========================================================================
   NEW SECRET: QUOTE MARK CLICK

   Clicking the giant quote mark 4 times reveals a small secret line
   fading in underneath the quote's attribution.
========================================================================== */

(function setupQuoteMarkSecret() {
    const quoteMark = document.querySelector(".quote-mark");
    const quoteMaker = document.querySelector(".quote-maker");

    if (!quoteMark || !quoteMaker) {
        return;
    }

    let clicks = 0;
    let revealed = false;

    quoteMark.addEventListener("click", function () {
        playClick();

        clicks++;

        if (clicks < 4 || revealed) {
            return;
        }

        revealed = true;

        const secretLine = document.createElement("span");
        secretLine.className = "quote-secret-line";
        secretLine.textContent = "(the diary never actually got a second entry. typical.)";

        quoteMaker.insertAdjacentElement("afterend", secretLine);

        requestAnimationFrame(function () {
            secretLine.classList.add("visible");
        });

        showAvignaToast("💬 the quote had a footnote all along.");
    });
})();


/* ==========================================================================
   NEW SECRET: GIFT SECTION TAUNTS (BEFORE UNLOCK)

   Clicking the locked gift notice before all three shop items are
   bought gives a shrinking series of taunt toasts and a little shake
   animation, so it's not just a dead click.
========================================================================== */

(function setupGiftLockTaunts() {
    const lockedNotice = document.getElementById("gift-locked-notice");

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

    let tauntIndex = 0;

    lockedNotice.addEventListener("click", function () {
        if (boughtConvo && boughtMsg && boughtBlur) {
            return;
        }

        playClick();

        lockedNotice.classList.remove("gift-taunt-shake");

        void lockedNotice.offsetWidth;

        lockedNotice.classList.add("gift-taunt-shake");

        showAvignaToast(taunts[tauntIndex % taunts.length]);

        tauntIndex++;
    });
})();


/* ==========================================================================
   NEW SECRET: HUNGER BAR CHEAT

   Clicking the hunger bar itself (not a food button) 5 times resets
   hunger to 0 early and spawns a small burst of food emojis, as a
   reward for finding a shortcut instead of eating 25+ items.
========================================================================== */

(function setupHungerBarCheat() {
    const hungerBar = document.querySelector(".hunger-bar");

    if (!hungerBar) {
        return;
    }

    let clicks = 0;

    hungerBar.addEventListener("click", function () {
        if (!document.body.classList.contains("birthday-unlocked")) {
            return;
        }

        playClick();

        clicks++;

        if (clicks < 5) {
            return;
        }

        clicks = 0;

        hungerPercent = 0;

        refreshHungerDisplay();
        updatePageFilter();

        showAvignaToast("🍽️ cheat activated: hunger reset. shh.");

        const emojis = ["🍕", "🍔", "🥟", "🥢"];

        for (let i = 0; i < 10; i++) {
            const bonus = document.createElement("div");
            bonus.className = "bonus-emoji";
            bonus.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            bonus.style.left = Math.random() * 100 + "vw";
            bonus.style.animationDuration = (3 + Math.random() * 3) + "s";
            bonus.style.animationDelay = (Math.random() * 0.5) + "s";
            bonus.style.fontSize = (1.5 + Math.random() * 1.5) + "rem";

            document.body.appendChild(bonus);

            setTimeout(function () {
                bonus.remove();
            }, 7000);
        }
    });
})();


/* ==========================================================================
   NEW SECRET: FOOD CARD BORDER BONUS

   Clicking a food card's border area (the card itself, not the order
   button inside it) 4 times grants a small $30 "chef's special" bonus
   per card, once per card.
========================================================================== */

(function setupFoodCardBonus() {
    const foodCards = document.querySelectorAll(".food-card");

    foodCards.forEach(function (card) {
        let clicks = 0;
        let claimed = false;

        card.addEventListener("click", function (event) {
            if (event.target.closest(".food-button")) {
                return;
            }

            if (claimed) {
                return;
            }

            playClick();

            clicks++;

            if (clicks < 4) {
                return;
            }

            claimed = true;

            money += 30;
            refreshMoneyDisplay();

            card.classList.add("bonus-glow");

            showAvignaToast("👨‍🍳 chef's special found. +$30.");
        });
    });
})();


/* ==========================================================================
   INITIAL DISPLAY
========================================================================== */

refreshMoneyDisplay();
refreshHungerDisplay();
updatePageFilter();
