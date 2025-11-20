// Check if browser supports speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const display = document.getElementById("display");
const resultText = document.getElementById("resultText");
const voiceBtn = document.getElementById("voiceBtn");

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    voiceBtn.addEventListener("click", () => {
        recognition.start();
    });

    recognition.onresult = function(event) {
        let spoken = event.results[0][0].transcript;
        display.value = spoken;

        // Convert voice math to JavaScript math
        spoken = spoken.replace(/plus/gi, "+")
                       .replace(/minus/gi, "-")
                       .replace(/into|multiply|times/gi, "*")
                       .replace(/divide by|divided by|divide/gi, "/");

        try {
            const answer = eval(spoken);
            resultText.innerText = "= " + answer;
        } catch {
            resultText.innerText = "Error understanding expression";
        }
    };

} else {
    alert("Voice recognition not supported in this browser");
}
