// Matt Petrower

const totalTime = 30;

var timer, timeRemaining;
var answersCorrect, answersIncorrect, answersNone;

// Array of questions and answers
var qa = [];
qa[0] = {
    question: "What was the first full length CGI movie?",
    answer: [
        {
            answerChoice: "A Bug's Life",
            answerCorrect: false
        }, {
            answerChoice: "Monsters, Inc.",
            answerCorrect: false
        }, {
            answerChoice: "Toy Story",
            answerCorrect: true // Correct
        }, {
            answerChoice: "The Lion King",
            answerCorrect: false
        }
    ]
};
qa[1] = {
    question: "Which of these is NOT a name of one of the Spice Girls?",
    answer: [
        {
            answerChoice: "Sporty Spice",
            answerCorrect: false
        }, {
            answerChoice: "Fred Spice",
            answerCorrect: true // Correct
        }, {
            answerChoice: "Scary Spice",
            answerCorrect: false
        }, {
            answerChoice: "Posh Spice",
            answerCorrect: false
        }
    ]
};
qa[2] = {
    question: "Which NBA team won the most titles in the 90s?",
    answer: [
        {
            answerChoice: "New York Knicks",
            answerCorrect: false
        }, {
            answerChoice: "Portland Trailblazers",
            answerCorrect: false
        }, {
            answerChoice: "Los Angeles Lakers",
            answerCorrect: false
        }, {
            answerChoice: "Chicago Bulls",
            answerCorrect: true // Correct
        }
    ]
};
qa[3] = {
    question: "Which group released the hit song, \"Smells Like Teen Spirit\"?",
    answer: [
        {
            answerChoice: "Nirvana",
            answerCorrect: true // Correct
        }, {
            answerChoice: "Backstreet Boys",
            answerCorrect: false
        }, {
            answerChoice: "The Offspring",
            answerCorrect: false
        }, {
            answerChoice: "No Doubt",
            answerCorrect: false
        }
    ]
};
qa[4] = {
    question: "Which popular Disney movie featured the song, \"Circle of Life\"?",
    answer: [
        {
            answerChoice: "Aladdin",
            answerCorrect: false
        }, {
            answerChoice: "Hercules",
            answerCorrect: false
        }, {
            answerChoice: "Mulan",
            answerCorrect: false
        }, {
            answerChoice: "The Lion King",
            answerCorrect: true // Correct
        }
    ]
};
qa[5] = {
    question: "Finish this line from the Fresh Prince of Bel-Air theme song: \"I whistled for a cab and when it came near, the license plate said...\"",
    answer: [
        {
            answerChoice: "Dice",
            answerCorrect: false
        }, {
            answerChoice: "Mirror",
            answerCorrect: false
        }, {
            answerChoice: "Fresh",
            answerCorrect: true // Correct
        }, {
            answerChoice: "Cab",
            answerCorrect: false
        }
    ]
};
qa[6] = {
    question: "What was Doug's best friend's name?",
    answer: [
        {
            answerChoice: "Skeeter",
            answerCorrect: true // Correct
        }, {
            answerChoice: "Mark",
            answerCorrect: false
        }, {
            answerChoice: "Zach",
            answerCorrect: false
        }, {
            answerChoice: "Cody",
            answerCorrect: false
        }
    ]
};
qa[7] = {
    question: "What was the name of the principal at Bayside High in Saved By the Bell?",
    answer: [
        {
            answerChoice: "Mr. Zhou",
            answerCorrect: false
        }, {
            answerChoice: "Mr. Driggers",
            answerCorrect: false
        }, {
            answerChoice: "Mr. Belding",
            answerCorrect: true // Correct
        }, {
            answerChoice: "Mr. Page",
            answerCorrect: false
        }
    ]
};


// Start game
$("#start").on("click", function () {
    $("#start").hide();
    $("#container-main").append("<form id='trivia'></form>");
    answersCorrect = 0, answersIncorrect = 0, answersNone = 0;
    timeRemaining = totalTime;
    $("#time").text("Time remaining: " + timeRemaining + " seconds");
    timer = setInterval(countdown, 1000);

    // Show questions and answer choices
    for (i = 0; i < qa.length; i++) {
        var myQuestion = qa[i].question;
        $("#trivia").append("<div>" + myQuestion);
        for (k = 0; k < qa[i].answer.length; k++) {
            var myAnswer = qa[i].answer[k].answerChoice;
            var radioGroup = "choice" + i;
            $("#trivia").append("<input type='radio' value=" + k + " name=" + radioGroup + "> " + myAnswer + "<br>");
            // Each radio button value is equal to the index of the corresponding answer choice (used later)
        }
        $("#trivia").append("<br>");
    }

    // Create "Done" button
    var doneBtn = $("<input id='doneBtn' type='submit' onclick=endGame() value='Done'>");
    $("#container-main").append($(doneBtn));
});

// Countdown
function countdown() {
    timeRemaining--;
    $("#time").text("Time remaining: " + timeRemaining + " seconds");
    if (timeRemaining === 0) {
        // Time ran out
        endGame();
    }
}

// Game is finished
function endGame() {
    clearInterval(timer);
    $("#time").text("");

    // Check answers
    for (i = 0; i < qa.length; i++) {
        // For each question...
        var radioGroup = "choice" + i;
        if ($("input:radio[name=" + radioGroup + "]").is(":checked")) {
            // An answer was selected
            var chosenAnswerValue = $("input:radio[name=" + radioGroup + "]:checked").val();
            if (qa[i].answer[chosenAnswerValue].answerCorrect === true) {
                // Answer is correct
                answersCorrect++;
            }
            else {
                // Answer is incorrect
                answersIncorrect++;
            }
        }
        else {
            // No answer was selected
            answersNone++;
        }
    }

    $("#container-main").empty();
    $("#container-main").append("<img id='doneGif' src='assets/images/done.gif' alt='Done and Done!'>");
    $("#container-main").append("<h3 id='results'>" +
        "Correct answers: " + answersCorrect + "<br>" +
        "Incorrect answers: " + answersIncorrect + "<br>" +
        "Unanswered: " + answersNone + "<br><br></h3>");


    // Create "Reset" button
    var reset = $("<button id='reset' type='button' onclick=resetGame()>Reset</button>");
    $("#container-main").append($(reset));
}

// Reset game
function resetGame() {
    $("#container-main").empty();
    $("#start").show();
}