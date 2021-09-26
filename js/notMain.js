
var globalAvatarImage = new Image();
var globalEnemyImage = new Image();
var globalPowerImage = new Image();
var GAPI = new Image();

globalAvatarImage.src = "img/avatar.png";
globalEnemyImage.src = "img/enemy.png";
globalPowerImage.src = "img/power.png"
GAPI.src = "img/GAPI.png"

var enemyYPositions = [];
var enemyXPositions = [];
var powerYPositions = -700;
var powerXPositions = 193;
var avatarX = 0;
var avatarY = 0;
var avatarPX = 0;
var avatarPY = 0;
var ticksSurvived = 0;
var mostTicksSurvived = 0;
var clear = 0;
var time = 5;

var resetTime = 5 - time;

var isPaused = false;
var checkEnd = false;

var gotPower = false;

var speed;
var moveStuff;
var changeScore;
var movePower;
var endPower;
var powerTime;

var goFaster;

var names;
var user;

var color = "gold"
var number = 0

window.addEventListener("keypress", onKeyPress, false);

function load() {
    var gameCanvas = document.getElementById("gameCanvas");
    var gocW = gameCanvas.width;
    var gocH = gameCanvas.height;

    gameCanvas.getContext("2d").font = "40px MCRegular";
    gameCanvas.getContext("2d").fillStyle = "black"
    gameCanvas.getContext("2d").textBaseline = "middle";
    gameCanvas.getContext("2d").textAlign = "center"
    gameCanvas.getContext("2d").fillText("Click To Play", gocW / 2, gocH / 2 - 5)

}

function askForName() {
    var gameCanvas = document.getElementById("gameCanvas");
    var gocW = gameCanvas.width;
    var gocH = gameCanvas.height;

    gameCanvas.width = 400;

    gameCanvas.getContext("2d").font = "40px MCRegular";
    gameCanvas.getContext("2d").fillStyle = "black"
    gameCanvas.getContext("2d").textBaseline = "middle";
    gameCanvas.getContext("2d").textAlign = "center"
    gameCanvas.getContext("2d").fillText("Enter Username", gocW / 2, 100);
    document.getElementById('user').setAttribute("style", "display: block;");
    document.getElementById('subBTN').setAttribute("style", "display: block;");
}

function checkSub() {
    user = document.getElementById("user").value;
    if (user == null || user == "") {
        alert("Please enter username");
    } else {
        setupGame()
        askForName = noop
    }
}

function backupLoad() {
    var gameCanvas = document.getElementById("gameCanvas")
    var gocW = gameCanvas.width;
    var gocH = gameCanvas.height;

    gameCanvas.getContext("2d").font = "40px MCRegular";
    gameCanvas.getContext("2d").fillStyle = "black"
    gameCanvas.getContext("2d").textBaseline = "middle";
    gameCanvas.getContext("2d").textAlign = "center"
    gameCanvas.getContext("2d").fillText("Click To Play", gocW / 2, gocH / 2 - 5)

}


function noop() { }; // makes the setUpGame function not run again if you click it

function setupGame() {

    if (localStorage.getItem("bestScore")) {
        mostTicksSurvived = localStorage.getItem("bestScore");
    }
    var gameScore = document.getElementById("gameScore");
    var gameCanvas = document.getElementById("gameCanvas");
    var avatarImage = globalAvatarImage;
    var avatarP = GAPI;

    //powerXPositions.push(193);

    goFaster = 100
    speed = 25;
    //movePower = setInterval(moveThePower, 25);
    moveStuff = setInterval(handleTick, speed);
    changeScore = setInterval(scores, 25);

    avatarImage.src = "img/avatar.png"
    avatarP.src = "img/GAPI.png"
    gameCanvas.getContext("2d").drawImage(avatarImage, 0, 0);
    gameCanvas.getContext("2d").drawImage(avatarP, 0, 0);
    gameScore.setAttribute("style", "display: block;");

    document.getElementById('user').setAttribute("style", "display: none;");
    document.getElementById('subBTN').setAttribute("style", "display: none;");

    gameCanvas.addEventListener("mousemove", handleMouseMovement);
    pauseGame = notop;
    setupGame = noop; // go to noop above ^

}



function handleMouseMovement(mouseEvent) {

    avatarX = mouseEvent.offsetX;
    avatarY = mouseEvent.offsetY;

    avatarPX = mouseEvent.offsetX;
    avatarPY = mouseEvent.offsetY;


    //if (mouseEvent.offsetX > 220 && mouseEvent.offsetX < 280 && mouseEvent.offsetY > 117 && mouseEvent.offsetY < 180) {
    //my avatar is 30px wide and the enemy is at x=250, so I have to check whether mouseEvent.offsetX is within 30px
    //either side of x=250 (i.e., from 220 to 280)
    //similarly, since my avatar is 33px tall, I have to check whether mouseEvent.offsetX is within 33px ABOVE y=150
    //but since enemy is only 30px tall, I also check whether mouseEvent.offsetX is within 30px BELOW y=150
    //therefore, I check from (117 to 180)

    //alert("You hit the enemy!");
    //}


}

function handleTick() {

    var gameScore = document.getElementById("gameScore")
    var gameCanvaBtn = document.getElementById("gameCanvaBtn");
    var gameCanva = document.getElementById("gameCanva");
    var gameCanvas = document.getElementById("gameCanvas");
    var avatarImage = globalAvatarImage;
    var enemyImage = globalEnemyImage;
    var avatarP = GAPI;
    var currentEnemyNumber = 0;
    var numberOfEnemies = enemyXPositions.length;
    var goc = gameCanva.width;
    var gobW = gameCanvaBtn.width;
    var gobH = gameCanvaBtn.height;

    if (ticksSurvived > goFaster) {

        speed = speed - 1;
        goFaster = goFaster + 100;
        clearInterval(moveStuff)
        moveStuff = setInterval(handleTick, speed);
    }

    if (gotPower == true && isPaused == true) {
        clearInterval(endPower)
    }

    while (currentEnemyNumber < numberOfEnemies) {
        enemyYPositions[currentEnemyNumber] = enemyYPositions[currentEnemyNumber] + 1;
        currentEnemyNumber = currentEnemyNumber + 1;
    }
    if (Math.random() < 1 / 25) {
        enemyYPositions.push(0);
        enemyXPositions.push(Math.random() * 400);
    }



    gameCanvas.width = 400; //this erases the stuff on the canvas

    if (gotPower == false) {
        avatarImage.src = "img/avatar.png"
        gameCanvas.getContext("2d").drawImage(avatarImage, avatarX, avatarY);
    } else {
        avatarP.src = "img/GAPI.png"
        gameCanvas.getContext("2d").drawImage(avatarP, avatarPX, avatarPY);
    }
    currentEnemyNumber = 0;

    while (currentEnemyNumber < numberOfEnemies) {
        gameCanvas.getContext("2d").drawImage(enemyImage, enemyXPositions[currentEnemyNumber], enemyYPositions[currentEnemyNumber]);
        currentEnemyNumber = currentEnemyNumber + 1;
    }

    currentEnemyNumber = 0;

    if (((avatarX < powerXPositions && powerXPositions < avatarX + 30) || (powerXPositions < avatarX && avatarX < powerXPositions + 14)) && ((avatarY < powerYPositions && powerYPositions < avatarY + 30) || (powerYPositions < avatarY && avatarY < powerYPositions + 24))) {
        gotPower = true;
        powerYPositions = -700;
        displayPowerTime();
        powerTime = setInterval(displayPowerTime, 1000)
        endPower = setInterval(endThePower, 5000)
    }

    if (powerYPositions == 400) {
        powerYPositions = -700;
    }

    while (currentEnemyNumber < numberOfEnemies) {
        if (((avatarX < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < avatarX + 30) || (enemyXPositions[currentEnemyNumber] < avatarX && avatarX < enemyXPositions[currentEnemyNumber] + 30)) && ((avatarY < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < avatarY + 33) || (enemyYPositions[currentEnemyNumber] < avatarY && avatarY < enemyYPositions[currentEnemyNumber] + 30))) {
            //window.open("gameOver.html", "_self"); 
            if (gotPower == true) {
                //enemyImage.src = "img/dead.png"
                enemyYPositions[currentEnemyNumber] = 500;
            } else {

                pauseGame = noop;

                if (ticksSurvived > mostTicksSurvived) {
                    mostTicksSurvived = ticksSurvived
                    localStorage.setItem("bestScore", mostTicksSurvived);
                    endGame();
                }

                speed = 25;

                gameCanva.width = 133.33333333;

                gameCanvas.setAttribute("style", "filter: blur(2px);");
                //alert("you survived: " + ticksSurvived + " ticks");
                gameCanva.setAttribute("style", "display: block;");
                gameCanvaBtn.setAttribute("style", "display: block;");
                gameScore.setAttribute("style", "display: block; filter: blur(2px);");



                gameCanvaBtn.getContext("2d").font = "40px MCRegular";
                gameCanvaBtn.getContext("2d").fillStyle = "white"
                gameCanvaBtn.getContext("2d").textBaseline = "middle";
                gameCanvaBtn.getContext("2d").textAlign = 'center';
                gameCanvaBtn.getContext("2d").fillText("Play", gobW / 2, gobH / 2);



                gameCanva.getContext("2d").font = "18px MCRegular";
                gameCanva.getContext("2d").fillStyle = "white"
                gameCanva.getContext("2d").textBaseline = "top";
                gameCanva.getContext("2d").textAlign = 'center';
                gameCanva.getContext("2d").fillText("Score:", goc / 2, 5);
                gameCanva.getContext("2d").fillText(ticksSurvived, goc / 2, 25);
                gameCanva.getContext("2d").fillText("Best Score:", goc / 2, 260);
                gameCanva.getContext("2d").fillText(mostTicksSurvived, goc / 2, 280);






                //pauseGame();
                endGame();
            }
        }
        currentEnemyNumber = currentEnemyNumber + 1;
    }

}

function endGame() {


    /*var gameCanvas = document.getElementById("gameCanvas");
    var gameCanva = document.getElementById("gameCanva");
    
    gameCanva.setAttribute("style", "display: none;");
    gameCanvas.setAttribute("style", "filter: blur(0px);");
    enemyXPositions = [];
    enemyYPositions = [];
    ticksSurvived = 0;
    }
    
    function pauseGame() {
    var currentEnemyNumber = 0;
    var gameCanvas = document.getElementById("gameCanvas");
    var gameCanva = document.getElementById("gameCanva");
        
    gameCanva.setAttribute("style", "display: block;");
    gameCanvas.setAttribute("style", "filter: blur(2px);");
    
    enemyYPositions[currentEnemyNumber] = enemyYPositions[currentEnemyNumber] - 1;
    currentEnemyNumber = currentEnemyNumber + 1*/

    clearInterval(moveStuff);
    clearInterval(changeScore);
    writeUserData(name);
    powerYPositions = -700;
    powerXPositions = 193;
    checkEnd = true;

}

function startNewGame() {
    var gameScore = document.getElementById("gameScore");
    var gameCanvas = document.getElementById("gameCanvas");
    var gameCanva = document.getElementById("gameCanva");
    var gameCanvaBtn = document.getElementById("gameCanvaBtn");

    gameCanvaBtn.setAttribute("style", "display: none;");
    gameCanva.setAttribute("style", "display: none;");
    gameCanvas.setAttribute("style", "filter: blur(0px);");
    gameScore.setAttribute("style", "filter: blur(0px);");
    gameScore.setAttribute("style", "display: block;");

    enemyXPositions = [];
    enemyYPositions = [];
    powerYPositions = -700;
    powerXPositions = 193;
    ticksSurvived = 0;

    changeScore = setInterval(scores, 25);
    moveStuff = setInterval(handleTick, speed);
    checkEnd = false;
    pauseGame = notop;
}


function scores() {
    var gameScore = document.getElementById("gameScore")

    gameScore.width = 400;

    moveThePower();

    gameScore.getContext("2d").font = "18px MCRegular";
    gameScore.getContext("2d").textBaseline = "top";
    gameScore.getContext("2d").fillText("Score: " + ticksSurvived, 5, 5);
    gameScore.getContext("2d").fillText("Best Score: " + mostTicksSurvived, 5, 280);


    ticksSurvived = ticksSurvived + 1;
}

function pauseBtn() {
    var pause = document.getElementById("pause")

    pause.getContext("2d").fillStyle = "black"
    pause.getContext("2d").fillRect(50, 25, 25, 25)
    pause.getContext("2d").fillStyle = "white"
    pause.getContext("2d").rect(55, 28, 5, 19);
    pause.getContext("2d").rect(65, 28, 5, 19);
    pause.getContext("2d").fill();
}

function unpauseBtn() {
    var unpause = document.getElementById("unpause")




}

function pauseGame() {

}


function unpauseGame() {
    moveStuff = setInterval(handleTick, speed);
    changeScore = setInterval(scores, 25);
    pause.setAttribute("style", "display: block;");
    unpause.setAttribute("style", "display: none;");

    isPaused = false;

    endPower = setInterval(endThePower, resetTime)
}

function notop() {
    var unpause = document.getElementById("unpause")
    var pause = document.getElementById("pause")

    clearInterval(moveStuff);
    clearInterval(changeScore);
    pause.setAttribute("style", "display: none;");
    unpause.setAttribute("style", "display: block;");
    unpause.getContext("2d").fillStyle = "black"
    unpause.getContext("2d").fillRect(50, 25, 25, 25)
    unpause.getContext("2d").beginPath();
    unpause.getContext("2d").moveTo(55, 28);
    unpause.getContext("2d").lineTo(70, 37);
    unpause.getContext("2d").lineTo(55, 47);
    unpause.getContext("2d").closePath();

    unpause.getContext("2d").fillStyle = "white"
    unpause.getContext("2d").fill();

    isPaused = true
}

function onKeyPress(evt) {
    const keyP = "112"
    if (evt.keyCode == keyP && checkEnd == false) {
        pauseOrUnpause()
    }

}

function pauseOrUnpause() {
    if (isPaused == false) {
        pauseGame();
    } else {
        unpauseGame();
    }
}

function moveThePower() {
    gameScore.getContext("2d").drawImage(globalPowerImage, powerXPositions, powerYPositions);
    powerYPositions = powerYPositions + 1;
}

function endThePower() {
    gotPower = false
    clearInterval(endPower)
}

function displayPowerTime() {
    var PowerTimer = document.getElementById("powerTimer")

    PowerTimer.width = 400;

    PowerTimer.getContext("2d").font = "24px MCRegular";
    PowerTimer.getContext("2d").textBaseline = "top";
    PowerTimer.getContext("2d").fillText("Time Left:" + time, 140, 10);
    //PowerTimer.getContext("2d").fillText("Best Score: " + mostTicksSurvived, 5, 280);
    time = time - 1;
    if (time == -1) {
        time = 5
        clearInterval(powerTime);
        PowerTimer.width = 400;

    }
}


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBU0xxxof4QrDt4Us0gMYY6eabxGa2NhLY",
    authDomain: "board-b818e.firebaseapp.com",
    databaseURL: "https://board-b818e-default-rtdb.firebaseio.com",
    projectId: "board-b818e",
    storageBucket: "board-b818e.appspot.com",
    messagingSenderId: "886026389343",
    appId: "1:886026389343:web:31d81262d88fecc19e58ea",
    measurementId: "G-6BL556ZN29"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
var myFBref = database.ref("name");

function writeUserData(name) {
    if (user == null || user == "") {
        alert("Please enter username");
    } else {
        firebase.database().ref('users/').push({
            name: user,
            score: ticksSurvived,
            order: ticksSurvived * -1
        });
    }
}

function sendAvatar() {
    var fileUpload = document.getElementById("cameraInput")
    console.log(fileUpload.value)
    alert('hi')
    firebase.storage().ref("Avatars/").put(
    fileUpload.files[0]
    );
    then(snapshot => {
        console.log(snapshot);
    })
}

var ref = firebase.database().ref("users");

ref.orderByChild("order").limitToFirst(10).on("value", function (snapshot) {
    document.getElementById("scores").innerHTML = " "
    //var place = 1;
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        //document.getElementById("scores").innerHTML += place + ". " + childData.name + ": " + childData.score + "<br>";
        // place = place + 1

        document.getElementById("scores").innerHTML += '<li style=" background-color: ' + color + '";">' + childData.name + ": " + childData.score + "</li>"
        number = number + 1;
        if (number == 1) {
            color = "silver"
        }
        if (number == 2) {
            color = "rgb(176 141 87)"
        } if (number >= 3) {
            color = "transparent"
        }
        if (number >= 10) {
            number = 0
            color = "gold"
        }
    });
});
