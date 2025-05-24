const state = {
    Init: "Init",
    Shop: 'Shop',
    Talk: 'Talk',
};

var currentState = state.Init;

var talk_count = 0;
var leave_count = 0;
var image_click_count = 0;

// Initial state
function initial_state() {
    currentState = state.Init;

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent =  "[Shop]";
    text2.textContent = "[Talk]";
    text3.textContent = "[Leave]";
}

// Shop
function shop_state() {
    currentState = state.Shop;

    var speech = document.getElementById("SpeechBubble");
    speech.textContent = "I see you are interested in my ties! I have a wide variety of colors and patterns. I'm sure you'll find something you like.";

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent =  "What kind of design do you have ?";
    text2.textContent = "[Get a tie]";
    text3.textContent = "[Return]";
}

//// Shop dialogue options
function shop_question() {
    var speech = document.getElementById("SpeechBubble");
    // speech.textContent = "I have differents design mostly inspired by various piece of media, but who can be wear with more casual outfit. Some desigins are sublte enough to not be seen as a reference immediatly.";
    speech.textContent = "I have differents design mostly inspired by various piece of media, but not all of them are straigforward. I'm sure you'll find something you like. Feel free to check my shop.";

}

function kofi_link() {
    url="https://ko-fi.com/s/5a60ba39ef";
    window.open(url, '_blank').focus();

    var speech = document.getElementById("SpeechBubble");
    speech.textContent = "I hope you found something that sparked your interest.";
}

// Talk
function talk_state() {
    currentState = state.Talk;

    var speech = document.getElementById("SpeechBubble");

    if (talk_count === 0) {
        speech.textContent = "What do you want ?"
    }
    else if (talk_count === 1) {
        speech.textContent = "Yes ?";
    }
    else if (talk_count <= 3) {
        speech.textContent = "Want to talk *again*?";
    }
    else {
        speech.textContent = "What *more* would you *really* need to know ?";
    }

    var text1 = document.getElementById("FirstText");
    var text2 = document.getElementById("SecondText");
    var text3 = document.getElementById("ThirdText");

    text1.textContent = "Who are you ?";
    text2.textContent = "Where are we ?";
    text3.textContent = "[Return]";

    talk_count += 1;
}

//// Talk dialogue options
// FIXME : Figure out what to talk about actually
function talk1() {
    var speech = document.getElementById("SpeechBubble");
    // speech.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum arcu, tempor auctor quam non, ultricies venenatis lacus. In sed purus nec ante pharetra euismod non tempor mauris. Suspendisse vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ipsum arcu, tempor auctor quam non, ultricies venenatis lacus. In sed purus nec ante pharetra euismod non tempor mauris. Suspendisse vel. ";
    speech.textContent = "Just a simple tie seller, wanting to provide you with a nice tie."
}

function talk2() {
    var speech = document.getElementById("SpeechBubble");
    speech.textContent = "Does it really matter ? I sell ties, you can buy them, that's all.";
}

function leave_dialogue() {
    var speech = document.getElementById("SpeechBubble");

    if (leave_count === 0) {
        speech.textContent = "Did you really think you could leave ?";
    }
    else if (leave_count === 1) {
        speech.textContent = "Trying that again ?";
    }
    else if (leave_count === 2) {
        speech.textContent = "*Sigh*";
    }
    else if (leave_count === 3) {
        speech.textContent = "Oh fuck off! I'm not a videogame boss so let me be a nuisance and-";
    }
    else {
        url="https://ko-fi.com/s/5a60ba39ef";
        window.open(url, '_blank').focus();
        
        speech.textContent = ">:)";
    }

    leave_count += 1;
}

function first_text() {
    if (currentState === state.Init) {
        shop_state();
        console.log("Shop state");
    }
    else if (currentState === state.Shop) {
        shop_question();
    }
    else if (currentState === state.Talk) {
        talk1();
    }
}

function second_text() {
    if (currentState === state.Init) {
        talk_state();
        console.log("Talk state");
    }
    else if (currentState === state.Shop) {
        kofi_link();
    }
    else if (currentState === state.Talk) {
        talk2();
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

function image_click() {
    var possible_dialogues = ["Wot?",
        "I can talk about the Roman Empire, if you insist. By the way did you read my book?",
        "Oi not here, I'm ticklish...",
        "<a href='https://www.instagram.com/obscurely_artistic/'>Curity</a> made this drawing of me. Isn't it SO COOL?",
        "The secret to succeed in art is crime. Trust me.",
        "Pick a tie so I can buy a Citroën Traction 11.",
        "Don't stay here too long. There are vampires in the area... inhale awkwardly"
    ];

    var discount_dialogues = "Ok ok... Take that 10% discount code on my shop (<a href='https://ko-fi.com/angellilou/link/10SELLER'>10SELLER</a>) and GET OUT!";

    if (image_click_count > 3) {
        possible_dialogues.push(discount_dialogues);
    }

    var speech = document.getElementById("SpeechBubble");

    var random_id = Math.floor(Math.random()*possible_dialogues.length);
    var random_text = possible_dialogues[random_id];
    speech.innerHTML = random_text;

    image_click_count += 1;
}

initial_state();

var button1 = document.getElementById("FirstText");
button1.addEventListener("click", first_text);

var button2 = document.getElementById("SecondText");
button2.addEventListener("click", second_text);

var button3 = document.getElementById("ThirdText");
button3.addEventListener("click", third_text);

var seller_image = document.getElementById("SellerImage");
seller_image.addEventListener("click", image_click);

// console.log(image)
// document.getElementById("SellerImage").onclick = function() {
// //your code here
// }