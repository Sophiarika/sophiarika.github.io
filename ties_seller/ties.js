const state = {
    Init: "Init",
    Shop: 'Shop',
    Talk: 'Talk',
};

var currentState = state.Init;

function initial_state() {
    currentState = state.Init;

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent =  "[Shop]";
    text2.textContent = "[Talk]";
    text3.textContent = "[Leave]";
}

function shop_state() {
    currentState = state.Shop;

    var speech = document.getElementById("SpeechBubble");
    speech.textContent = "Ooooh, I see you are interested in my ties! I have a wide variety of colors and patterns. Do you have a specific color in mind?";

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent =  "[Something ??]";
    text2.textContent = "[Ko-fi link]";
    text3.textContent = "[Return]";
}

function talk_state() {
    currentState = state.Talk;

    var speech = document.getElementById("SpeechBubble");
    speech.textContent = "What do you want ?"

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent = "Something";
    text2.textContent = "Something else";
    text3.textContent = "[Return]";
}

function kofi_link() {
    url="https://ko-fi.com/s/5a60ba39ef";
    window.open(url, '_blank').focus();
}

function leave_state() {
    var speech = document.getElementById("SpeechBubble");
    speech.textContent = "Did you really think you could leave ?"; 
}

function first_text() {
    // var speech = document.getElementById("SpeechBubble");
    // speech.textContent = "Ooooh, I see you are interested in my ties! I have a wide variety of colors and patterns. Do you have a specific color in mind?";

    if (currentState === state.Init) {
        shop_state();
        console.log("Shop state");
    }
}

function second_text() {
    // var speech = document.getElementById("SpeechBubble");
    // speech.textContent = "I have a special offer for you! If you buy two ties, you get a third one for free! What do you think?";

    if (currentState === state.Init) {
        talk_state();
        console.log("Talk state");
    }

    if (currentState === state.Shop) {
        kofi_link();
    }
}

function third_text() {
    // var speech = document.getElementById("SpeechBubble");
    // speech.textContent = "I understand, sometimes you just want to browse. If you change your mind, I'll be here!";

    if (currentState != state.Init) {
        initial_state();

        var speech = document.getElementById("SpeechBubble");
        speech.textContent = "Want something else ?";
        console.log("Init state");
    }
    else if (currentState === state.Init) {
        leave_state();
        console.log("Leave state");
    }
}

initial_state();

var button1 = document.getElementById("FirstText");
button1.addEventListener("click", first_text);

var button2 = document.getElementById("SecondText");
button2.addEventListener("click", second_text);

var button3 = document.getElementById("ThirdText");
button3.addEventListener("click", third_text);