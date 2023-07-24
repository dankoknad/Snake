import O from './observable.js'
import { togglePause, isTimerActive } from './snake.js'

let dataRef

function updateDataRef(data) {
  dataRef = data
}

O.add(updateDataRef)

const validKeys = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowRight: 'right',
  ArrowLeft: 'left',
}

const forbiddenMoves = {
  ArrowUp: { up: true, down: true, },
  ArrowRight: { right: true, left: true, },
  ArrowDown: { down: true, up: true, },
  ArrowLeft: { left: true, right: true, },
}

export function handleKeyDown(e) {
  if(dataRef.gameOver) { return }
  const { directions, ...updatedData } = dataRef
  const lastDir = directions[0]
  const active = isTimerActive()

  const { key } = e

  if(key === 'p') {
    togglePause()
  }

  const isValidMove = validKeys[key] || false

  if(isValidMove && active) {
    //console.log('prev', directions)

    //if( key === 'ArrowUp' && direction !== 'up' && direction !== 'down' )  { 
    if( key === 'ArrowUp' && !forbiddenMoves[key][lastDir] )  { 
      //console.log(1)
      updatedData.directions = ['up', ...directions]
    //} else if( key === 'ArrowDown' && direction !== 'down' && direction !== 'up' ) {
    } else if( key === 'ArrowDown' && !forbiddenMoves[key][lastDir] ) {
      //console.log(2)
      updatedData.directions = ['down', ...directions]
    //} else if( key === 'ArrowLeft' && direction !== 'left' && direction !== 'right' ) {
    } else if( key === 'ArrowLeft' && !forbiddenMoves[key][lastDir] ) {
      //console.log(3)
      updatedData.directions = ['left', ...directions]
    //} else if( key === 'ArrowRight' && direction !== 'right' && direction !== 'left' ) {
    } else if( key === 'ArrowRight' && !forbiddenMoves[key][lastDir] ) {
      updatedData.directions = ['right', ...directions]
      //console.log(4)
    } else {
      //console.log(5)
      updatedData.directions = directions
    }

    O.notify(updatedData)
  }
}

