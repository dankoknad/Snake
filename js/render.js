const boardEl = document.getElementById('board')
const resultEl = document.getElementById('result')

export function render({ score, board, snake, gameOver }) {
  boardEl.replaceChildren()
  const [sR, sC]  = snake[snake.length - 1]
  resultEl.innerText = score

  for(let row = 0; row < board.length; row++) {
    const rowEl = document.createElement('div')
    rowEl.classList.add('row')
    for(let col = 0; col < board[0].length; col++) {
      const cellEl = document.createElement('div')
      if(gameOver && row === sR && col === sC) {
        cellEl.classList.add('blink')
      } else if(board[row][col] === 'o') {
        cellEl.classList.add('brown')
      }  else if(board[row][col] === 'x') {
        cellEl.classList.add('green')
      } else {
        cellEl.innerHTML = board[row][col] || '&#183;'
      }
      rowEl.appendChild(cellEl)
    }
    boardEl.appendChild(rowEl)
  }
  
}

