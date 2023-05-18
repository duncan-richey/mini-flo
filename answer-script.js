const flipLetters = document.querySelectorAll('.to-flip');
const flipButton = document.querySelector('#flip-button');
const flipAnswer = document.querySelectorAll('.box');
const allAnswersDiv = document.querySelector('.answers-container');
const revealImage = document.querySelector('.reveal-image');

var scrambleInstructions = document.querySelector('.scramble-instructions');


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


flipButton.addEventListener('click', () => {
    flipLetters.forEach((letter, index) => {
        letter.addEventListener('animationend', () => {
            console.log('Animation ended');
            letter.style.animation = '';
            letter.classList.add('clue-letter');
        });

        let delay = index * 0.2; 
        letter.style.animation = `flip 3s ${delay}s forwards`;

    });
});  

document.addEventListener("DOMContentLoaded", function() {
    var boxes = document.querySelectorAll(".box");
    var answerTiles = document.querySelectorAll(".answer-tile-container"); 
    var correctAnswer = ['S', 'W', 'E', 'E', 'N', 'E', 'Y', 'T', 'O', 'D', 'D']; // The correct answer


    boxes.forEach(function(box, index) {
        box.addEventListener('input', function() {
            if (this.value.length === this.maxLength) {
                if (boxes[index + 1] != null) {
                    boxes[index + 1].focus();
                } else {
                    this.blur(); // Manually trigger a blur event
                }
            }

            var allCorrect = Array.from(boxes).every((box, index) => box.value.toUpperCase() === correctAnswer[index]);
            if (allCorrect) {
                console.log("Correct answer!");

                // Get all the tiles
                var allTiles = Array.from(document.querySelectorAll('.box, .answer-tile-container'));
                allTiles.push(scrambleInstructions);

                 allTiles.forEach(tile => {
                    // Generate random values
                    var translateY = randomInt(50, 75);  // adjust range as needed
                    var rotate = randomInt(-360, 360);    // adjust range as needed
                
                    // Apply the animations to the tile using anime.js
                    anime({
                        targets: tile,
                        translateY: [0, `${translateY}vh`],
                        rotate: [0, `${rotate}deg`],
                        backgroundColor: '#b82729',
                        easing: 'easeOutQuad', 
                        duration: 3000,
                        opacity: [1,0],
                        complete: function() {
                            tile.style.visibility = 'hidden'; // Hide the tile after the animation
                        },
                    });
                });
                

                             

                // Start revealing the image after 1 second (when the color change completes)
                setTimeout(() => {
                    revealImage.style.opacity = '1';
                }, 1000);

            }
        });

        box.addEventListener('keydown', function(e) {
            if(e.keyCode === 8 || e.keyCode === 46) { // Backspace or Delete key
                if (boxes[index - 1] != null) {
                    boxes[index - 1].focus();
                }
            }
        });

        box.addEventListener('blur', function() {
            if(this.value.length === this.maxLength) {
                this.style.backgroundColor = '#b82729';
                this.style.color = 'white' // Replace 'yourColor' with the color you want
            } else {
                this.style.backgroundColor = 'initial'; // Resets to original color if the box is empty
                this.style.color = 'initial';
            }
        });
    });
});



