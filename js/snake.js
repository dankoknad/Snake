import O from './observable.js'

let dataRef

function updateDataRef2(data) {
  dataRef = data
}

const time = 130

O.add(updateDataRef2)

export function genGrid(rows = 16, cols = 24) {
  const grid = []
  for(let i = 0; i < rows; i++) {
    const row = []
    for(let j = 0; j < cols; j++) {
      row.push('')
    }
    grid.push(row)
  }
  return grid
}

const snakeInitiall = [ [8,0], [8,1], [8,2], [8,3], [8,4] ]

function findPlaceForApple(snake) {
  const occupied = snake.reduce((acc, next) => {
    acc[next.join()] = true
    return acc
  }, {})
  let r = snake[0][0]
  let c = snake[0][1]

  while(occupied[[r, c].join()]) {
    r = Math.round(Math.random() * 15)
    c = Math.round(Math.random() * 23)
  }

  return [r, c]
}

let timer

function clearTimer() {
  clearInterval(timer)
  timer = false;
}

function play() {
  if(!dataRef) { return }
  const { ...updatedData } = dataRef
  const { directions } = updatedData
  const direction = directions.length > 1 ? directions.slice(-1)[0] : directions[0]
  const [aR, aC]  = updatedData.apple
  const lastSnakeHeadPos = updatedData.snake[dataRef.snake.length - 1]
  const [ _, ...newSnake ] = updatedData.snake
  const newBoard = genGrid()

  if(direction === 'up') { 
    const newRowInx = lastSnakeHeadPos[0] - 1
    if(newRowInx < 0) {
      updatedData.gameOver = true
      O.notify(updatedData)
      clearTimer()
      return
    }
    newSnake.push([newRowInx, lastSnakeHeadPos[1]])
  } else if(direction === 'down') {
    const newRowInx = lastSnakeHeadPos[0] + 1
    if(newRowInx > 15) {
      updatedData.gameOver = true
      O.notify(updatedData)
      clearTimer()
      return
    }
    newSnake.push([newRowInx, lastSnakeHeadPos[1]])
  } else if(direction === 'left') {
    const newColInx = lastSnakeHeadPos[1] - 1
    if(newColInx < 0) {
      updatedData.gameOver = true
      O.notify(updatedData)
      clearTimer()
      return
    }
    newSnake.push([lastSnakeHeadPos[0], newColInx])
  } else if(direction === 'right') {
    const newColInx = lastSnakeHeadPos[1] + 1
    if(newColInx > 23) {
      updatedData.gameOver = true
      O.notify(updatedData)
      clearTimer()
      return
    }
    newSnake.push([lastSnakeHeadPos[0], lastSnakeHeadPos[1] + 1])
  }
  
  // snake colides with itself
  const nh = newSnake.slice(-1)[0]
  const tail = newSnake.slice(0, newSnake.length - 1)
  const collision = tail.some(([rI, cI]) => rI === nh[0] && cI === nh[1])

  if(collision) {
    updatedData.gameOver = true
    O.notify(updatedData)
    clearTimer()
    return
  }

  // eaten apple
  const [hR, hC] = newSnake[newSnake.length - 1]

  if(hR === aR && hC === aC) {
    if(updatedData.score % 2 === 0) {
      newSnake.unshift(_)
    }
    const [row, col] = findPlaceForApple(newSnake)

    updatedData.score++
    updatedData.apple = [row, col]
    newBoard[row][col] = '🍎'
  } else {
    newBoard[aR][aC] = '🍎'
  }
  // end eaten apple

  newSnake.forEach(([r,c], i, s) => newBoard[r][c] = (i < s.length - 1) ? 'x' : 'o')

  updatedData.board = newBoard 
  updatedData.snake = newSnake

  if(directions.length > 1) {
    updatedData.directions = directions.slice(0, -1)
  }

  O.notify(updatedData)
  
  if(updatedData.gameOver) {
    clearTimer()
  }
}

export function togglePause() {
  if(timer) {
    clearTimer()
  } else {
    timer = setInterval(play, time)
  }
}

export function isTimerActive() {
  return Boolean(timer)
}

export function gameInit() {
  if(timer) { clearTimer() }

  const grid = genGrid()
  snakeInitiall.forEach(([r,c], i, s) => grid[r][c] = (i < s.length - 1) ? 'x' : 'o')
  const [row, col] = findPlaceForApple(snakeInitiall)
  grid[row][col] = '🍎'

  const initialData = {
    board: grid,
    snake: [ ...snakeInitiall ],
    apple: [row, col],
    directions: ['right'],
    score: 0,
    gameOver: false,
  }

  O.notify(initialData)
  timer = setInterval(play, time)
}

