const terminal = document.getElementById("terminal");
const inputField = document.getElementById("inputField");
const typingSound = document.getElementById("typingSound");
const alertSound = document.getElementById("alertSound");
const systemFailureSound = document.getElementById("systemFailureSound");
const hackingSound = document.getElementById("hackingSound");
const countdown = document.getElementById("countdown");
const timerDisplay = document.getElementById("timer");

let timeLeft = 600; // Countdown in seconds
let progress = 0;
let logs = [];
let isHacking = false;

// Fake logs
const logsData = {
    hacking: [
        "Initializing hacking tools...",
        "Connecting to remote server...",
        "Bypassing firewall...",
        "Executing brute-force attack...",
        "Password found: admin1234",
        "Access granted: Server compromised",
        "Deploying ransomware...",
        "Encrypting files...",
        "Files encrypted successfully. Demand sent to target...",
        "Mission complete. System compromised.",
    ],
    ipTrace: [
        "Tracing IP: 192.168.0.101...",
        "Connection established. IP is active.",
        "IP location: Unknown. Proceeding with reverse lookup...",
        "ISP: FastNet Services",
        "Country: USA, California",
        "Target confirmed. High-value asset identified.",
    ]
};

// Start the hacking simulation
document.getElementById("startBtn").addEventListener("click", () => {
    hackingSound.play();
    addLogs(logsData.hacking, 1000, () => {
        document.getElementById("traceBtn").disabled = false;
        document.getElementById("crackBtn").disabled = false;
        document.getElementById("ransomwareBtn").disabled = false;
        document.getElementById("shutdownBtn").disabled = false;
        startCountdown();
    });
});

// Trace IP
document.getElementById("traceBtn").addEventListener("click", () => {
    addLogs(logsData.ipTrace, 1000);
});

// Crack Password
document.getElementById("crackBtn").addEventListener("click", () => {
    const bruteForceLogs = [
        "Starting brute-force password attack...",
        "Attempting password: 123456",
        "Attempting password: password123",
        "Password cracked: admin1234",
        "Access granted. Server entry successful."
    ];
    addLogs(bruteForceLogs, 1500);
});

// Deploy Ransomware
document.getElementById("ransomwareBtn").addEventListener("click", () => {
    alertSound.play();
    terminal.innerHTML += `<p class="error">ALERT! RANSOMWARE DEPLOYED. ENCRYPTING FILES...</p>`;
    const loadingBar = document.createElement("div");
    loadingBar.classList.add("loading-bar");
    terminal.appendChild(loadingBar);
    setTimeout(() => {
        terminal.innerHTML += `<p class="error">FILES ENCRYPTED! DEMAND SENT TO TARGET.</p>`;
        addLogs(["Ransomware complete."], 1000);
    }, 3000);
});

// Abort Mission
document.getElementById("shutdownBtn").addEventListener("click", () => {
    systemFailureSound.play();
    terminal.innerHTML += `<p class="error">MISSION ABORTED! SHUTTING DOWN...</p>`;
    resetProgress();
    clearInterval(timerInterval);
});

// Handle command input
inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && inputField.value.trim() !== "") {
        const command = inputField.value.trim();
        terminal.innerHTML += `<p class="typing">>> ${command}</p>`;
        executeCommand(command);
        inputField.value = "";
    }
});

// Execute console commands
function executeCommand(command) {
    if (command === "hack") {
        addLogs(logsData.hacking, 1000);
    } else if (command === "trace") {
        addLogs(logsData.ipTrace, 1000);
    } else if (command === "crack") {
        addLogs(["Cracking password...", "Access granted."], 1500);
    } else {
        terminal.innerHTML += `<p class="error">Command not recognized: ${command}</p>`;
    }
    terminal.scrollTop = terminal.scrollHeight;
}

// Add logs dynamically with typing animation
function addLogs(logArray, delay, callback) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < logArray.length) {
            const log = document.createElement("p");
            log.classList.add("typing");
            log.textContent = logArray[i];
            terminal.appendChild(log);
            terminal.scrollTop = terminal.scrollHeight;
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, delay);
}

// Countdown Timer with animation
let timerInterval;
function startCountdown() {
    countdown.hidden = false;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
            const seconds = (timeLeft % 60).toString().padStart(2, "0");
            timerDisplay.textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 30) {
                timerDisplay.classList.add('warning');
            }
        } else {
            clearInterval(timerInterval);
            terminal.innerHTML += `<p class="error">TIME IS UP! SYSTEM DETECTED YOUR INTRUSION.</p>`;
        }
    }, 1000);
}

// Reset progress
function resetProgress() {
    timeLeft = 600;
    progress = 0;
    countdown.hidden = true;
    timerDisplay.classList.remove('warning');
}
