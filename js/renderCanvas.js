import { genGrid } from './snake.js'

const canvas = document.getElementById('canvas')
const resultEl = document.getElementById('result')
const ctx = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect()
const grid = genGrid()

canvas.width = rect.width * devicePixelRatio
canvas.height = rect.height * devicePixelRatio

const unit = canvas.width / 24
const offset = unit * .5

export function renderCanvas({ score, snake, apple, gameOver }) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resultEl.innerText = score

  for(let row = 0; row < grid.length; row++) {
    for(let col = 0; col < grid[0].length; col++) {
      ctx.fillStyle = 'black'
      ctx.beginPath();
      ctx.arc(col * unit + offset, row * unit + offset, 2, 0, Math.PI * 2 )
      ctx.fill()
    }
  }

  snake.slice().reverse().forEach(([y, x], i) => {
    if(i === 0) {
      ctx.fillStyle = gameOver ? 'red' : 'brown'
    } else {
      ctx.fillStyle = 'green'
    }
    ctx.fillRect(x * unit, y * unit, unit, unit);
  })

  ctx.beginPath();
  ctx.fillStyle = 'red'
  ctx.arc(apple[1] * unit + offset, apple[0] * unit + offset, unit * .3, 0, Math.PI * 2 )
  ctx.fill()
  
}

