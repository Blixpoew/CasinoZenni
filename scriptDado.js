let images = ["dice-01.svg",
"dice-02.svg",
"dice-03.svg",
"dice-04.svg",
"dice-05.svg",
"dice-06.svg"];
let dice = document.querySelectorAll("img");
let flipBtn = document.querySelector(".rollDice");

function roll(){
	var interval = setInterval(function(){
			let random= Math.floor(Math.random()*6);
			document.querySelector("#die-1").setAttribute("src", images[random])
		},500);
    dice.forEach(function(die){
        die.classList.add("shake");
    });
    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
			clearInterval(interval);
        });
        let dieOneValue = Math.floor(Math.random()*6);
        document.querySelector("#die-1").setAttribute("src", images[dieOneValue]);
        document.querySelector("#total").innerHTML = "Resultado: " + ( (dieOneValue +1) );
    },
    3000
    );
	setTimeout(fxConfetti, 3000);
	disableButton();
}
function disableButton(){
    flipBtn.disabled = true;
    setTimeout(function(){
        flipBtn.disabled = false;
    },3000);
}
function fxConfetti(){
	confetti({
		particleCount: 100,
		spread: 70,
		origin: {y: 0.6}
	})
}