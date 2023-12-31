import { renderCanvas } from './renderCanvas.js'
import { gameInit } from './snake.js'
import O from './observable.js'
import { handleKeyDown } from './eventHandlers.js'

const newGameBtnEl = document.getElementById('newGameBtn')

window.addEventListener('keydown', handleKeyDown)
newGameBtnEl.addEventListener('click', gameInit)

O.add(renderCanvas)
gameInit()

