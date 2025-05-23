const state = {
    Init: "Init",
    Shop: 'Shop',
    Talk: 'Talk',
};

var currentState = state.Init;

var talk_count = 0;
var leave_count = 0;

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
    speech.textContent = "I see you are interested in my ties! I have a wide variety of colors and patterns. I'm sure you'll find something you like.";

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent =  "[Something ??]";
    text2.textContent = "[Ko-fi link]";
    text3.textContent = "[Return]";
}

// Shop dialogue options
// function 
// FIXME : decide what the first option should be about

function kofi_link() {
    url="https://ko-fi.com/s/5a60ba39ef";
    window.open(url, '_blank').focus();

    var speech = document.getElementById("SpeechBubble");
    speech.textContent = "Thank you for having checked my shop!";
}

function talk_state() {
    currentState = state.Talk;

    var speech = document.getElementById("SpeechBubble");

    if (talk_count === 0) {
        speech.textContent = "What do you want ?"
    }
    else if (talk_count === 1) {
        speech.textContent = "Yes ?";
    }
    else if (talk_count > 1) {
        speech.textContent = "Want to talk *again*?";
    }

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent = "Something";
    text2.textContent = "Something else";
    text3.textContent = "[Return]";

    talk_count += 1;
}

// Talk dialogue options
// FIXME : Figure out what to talk about actually
function talk1() {
    var speech = document.getElementById("SpeechBubble");
    // speech.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum arcu, tempor auctor quam non, ultricies venenatis lacus. In sed purus nec ante pharetra euismod non tempor mauris. Suspendisse vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum arcu, tempor auctor quam non, ultricies venenatis lacus. In sed purus nec ante pharetra euismod non tempor mauris. Suspendisse vel. ";
    
}

function talk2() {
    var speech = document.getElementById("SpeechBubble");
    // speech.textContent = "";
    
}

function leave_dialogue() {
    var speech = document.getElementById("SpeechBubble");

    if (leave_count === 0) {
        speech.textContent = "Did you really think you could leave ?";
    }
    else if (leave_count === 1) {
        speech.textContent = "Trying that again ?";
    }
    else if (leave_count > 1) {
        speech.textContent = "*Sigh*";
    }

    leave_count += 1;
}

function first_text() {
    if (currentState === state.Init) {
        shop_state();
        console.log("Shop state");
    }

    if (currentState === state.Talk) {
        talk1();    }
}

function second_text() {
    if (currentState === state.Init) {
        talk_state();
        console.log("Talk state");
    }

    if (currentState === state.Shop) {
        kofi_link();
    }
}

function third_text() {
    if (currentState != state.Init) {
        initial_state();

        var speech = document.getElementById("SpeechBubble");
        speech.textContent = "Want something else ?";
    }
    else if (currentState === state.Init) {
        leave_dialogue();
    }
}

initial_state();

var button1 = document.getElementById("FirstText");
button1.addEventListener("click", first_text);

var button2 = document.getElementById("SecondText");
button2.addEventListener("click", second_text);

var button3 = document.getElementById("ThirdText");
button3.addEventListener("click", third_text);