/**
 * Reference-counted scroll lock.
 * Multiple callers (AllProjectsModal + project Modal) each call lock/unlock;
 * the page only physically unlocks when the last caller releases.
 */
let lockCount = 0
let savedY    = 0

export function lockScroll() {
  if (lockCount === 0) {
    savedY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top      = `-${savedY}px`
    document.body.style.width    = '100%'
  }
  lockCount++
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top      = ''
    document.body.style.width    = ''
    window.scrollTo(0, savedY)
  }
}
