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

    if( key === 'ArrowUp' && !forbiddenMoves[key][lastDir] )  { 
      updatedData.directions = ['up', ...directions]
    } else if( key === 'ArrowDown' && !forbiddenMoves[key][lastDir] ) {
      updatedData.directions = ['down', ...directions]
    } else if( key === 'ArrowLeft' && !forbiddenMoves[key][lastDir] ) {
      updatedData.directions = ['left', ...directions]
    } else if( key === 'ArrowRight' && !forbiddenMoves[key][lastDir] ) {
      updatedData.directions = ['right', ...directions]
    } else {
      updatedData.directions = directions
    }

    O.notify(updatedData)
  }
}

