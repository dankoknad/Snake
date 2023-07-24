const observers = []

export default Object.freeze({
  add(fn) { observers.push(fn) },
  notify(data) { observers.forEach(fn => fn(data))  }
})

