
const onSwipe = (elm: HTMLElement, doneCallback: (direction: ['right' | 'left', 'up' | 'down'], delta: [number, number]) => void, 
      moveCallback?: (direction: ['right' | 'left', 'up' | 'down'], delta: [number, number]) => void) => {
  let startEvent: TouchEvent
  let endEvent: TouchEvent
  elm.addEventListener('touchstart', (e: TouchEvent) => {
    startEvent = e
  })
  elm.addEventListener('touchmove', (e: TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - startEvent.changedTouches[0].clientX
    const deltaY = e.changedTouches[0].clientY - startEvent.changedTouches[0].clientY
    moveCallback && moveCallback([deltaX > 0 ? 'right' : 'left', deltaY > 0 ? 'down' : 'up'], [Math.abs(deltaX), Math.abs(deltaY)])
  })
  elm.addEventListener('touchend', (e: TouchEvent) => {
    endEvent = e
    const deltaX = endEvent.changedTouches[0].clientX - startEvent.changedTouches[0].clientX
    const deltaY = endEvent.changedTouches[0].clientY - startEvent.changedTouches[0].clientY
    doneCallback([deltaX > 0 ? 'right' : 'left', deltaY > 0 ? 'down' : 'up'], [Math.abs(deltaX), Math.abs(deltaY)])
  })
}
const exportedObject = {
  onSwipe
}
export default exportedObject