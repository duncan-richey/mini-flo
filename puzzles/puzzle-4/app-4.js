const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.keyboard-all-rows')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'TIESTO'

const guessRows = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})


const keyboardKeys = document.querySelectorAll('.key')

keyboardKeys.forEach(keyButton => {

    const letter = keyButton.getAttribute('data-key').toUpperCase()
    keyButton.addEventListener('click', () => handleClick(letter))

})

const handleClick = (letter) => {
    console.log("Key pressed: ", letter);
    // convert the letter to uppercase, because the HTML gives lowercase letters
    letter = letter.toUpperCase()
    if (!isGameOver) {
        if (letter === '←') {
            deleteLetter()
            return
        }
        if (letter === '↵') {
            checkRow()
            return
        }
        addLetter(letter)
    }
}

const addLetter = (letter) => {
    if (currentTile < 6 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile > 5) {
           
    flipTile()
    
    setTimeout(() => {
        if (wordle == guess) {
            showMessage('Good job, Mama')
            isGameOver = true
            return
        } else {
            if (currentRow >= 6) {
                isGameOver = true
                showMessage('Sashay away')
                return
            }
            if (currentRow < 6) {
                currentRow++
                currentTile = 0
            }
        }
    }, 2800)
}
}


const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 8000)
}

const colorKey = (letter, color) => {
    const key = document.getElementById('key-' + letter);
    if (key) {
        // If you want to overwrite the previous color each time, first remove all potential color classes
        key.classList.remove('green-overlay', 'yellow-overlay', 'grey-overlay');

        // Now, add the new color class
        key.classList.add(color);
    }
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            colorKey(guess[index].letter, guess[index].color)
        }, 400 * index)
    })
}

