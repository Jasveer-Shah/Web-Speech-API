var voiceList = document.querySelector('#voiceList');
var txtInput = document.querySelector('#txtInput');
var btnSpeak = document.querySelector('#btnSpeak');
var aws = document.querySelector(".aws");
var tts = window.speechSynthesis;
var languages = [];
let pause = document.querySelector('#pause')
let stop = document.querySelector('#stop');
let resume = document.querySelector('#resume')
GetVoices();

if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = GetVoices;
    // speechSynthesis.cancel
    // on voices changed event getVoices function should heppen 
}


btnSpeak.addEventListener('click', ()=>{
    // on click of the speak button we gonna pass txtInput value in the constructor of SpeechSynthesisUtterance class
    // var toSpeak = new SpeechSynthesisUtterance(txtInput.value);  // create an object
    var toSpeak = new SpeechSynthesisUtterance(aws.textContent)
    // here we are selecting the node
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    languages.forEach((language) =>{
        if(language.name === selectedVoiceName){
            toSpeak.voice = language;
        }
    })
    // tts.speak(toSpeak);
     window.speechSynthesis.speak(toSpeak);
});

stop.addEventListener('click', ()=>{
    speechSynthesis.cancel()
})



function GetVoices(){
    languages = tts.getVoices();
    voiceList.innerHTML = '';
    languages.forEach((language) => {
        var listItem = document.createElement('option');
        listItem.textContent = language.name;
        listItem.setAttribute('data-lang', language.lang);
        listItem.setAttribute('data-name', language.name);
        voiceList.appendChild(listItem);
    })
    voiceList.selectedIndex = 0;
}
pause.addEventListener('click', ()=>{
    speechSynthesis.pause();
})

resume.addEventListener('click', ()=>{
    speechSynthesis.resume();
} )