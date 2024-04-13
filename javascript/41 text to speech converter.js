const textarea = document.querySelector('#text-section');
const buttonele = document.querySelector('.button-ele');
let isSpeaking = false;

textarea.addEventListener('input', () => {
    if (textarea.value.length === 0) {
        textarea.style.boxShadow = ""; // Remove box shadow if no text
    } else {
        textarea.style.boxShadow = "0px 0px 8px white"; // Add box shadow if there is text
    }
});

window.onload=()=>{
    const synth=window.speechSynthesis;
    const text="Hii I am Kunal,how can I help you?"
    const uttarence=new SpeechSynthesisUtterance(text);
    uttarence.rate=0.7;
    uttarence.volume=0.9;
    synth.speak(uttarence);
}

buttonele.addEventListener('click', () => {
    const synth = window.speechSynthesis;
    // speechSynthesis: This is a property of the window object. It represents the Speech 
    // Synthesis API provided by modern web browsers. This API allows web developers to generate
    //  speech from text on web pages

    const text = textarea.value;

    if (!synth.speaking && text) {
        const uttarence = new SpeechSynthesisUtterance(text);
        uttarence.rate=0.8;
        uttarence.volume=0.9;
        synth.speak(uttarence);
        isSpeaking = true;
        buttonele.innerHTML = "Speaking";

        setInterval(() => {
            if (!synth.speaking && isSpeaking) {
                isSpeaking = false;
                buttonele.innerHTML = "Convert to Speech";
            }
        },1000);

        // This code creates an interval that checks every 1000 milliseconds (1 second) whether
        // the speech synthesis is still speaking (!synth.speaking) and whether isSpeaking is 
        // true. If both conditions are met (meaning the speech synthesis has finished speaking),
        // it sets isSpeaking to false and changes the innerHTML of buttonele to "Convert to Speech
    }

    else if (text.length > 50) {
        if (synth.speaking && isSpeaking) {
            // synth.speaking-It is a boolean value that indicates whether the speech synthesis
            //  system is currently speaking or not.
            buttonele.innerHTML = "Pause";
            synth.resume();
            isSpeaking = false;
        }
        else {
            buttonele.innerHTML = "Resume";
            synth.pause();
            isSpeaking = true;
        }
    }
})