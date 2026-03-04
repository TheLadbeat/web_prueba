/**
 * Scroll lock — reference-counted, zero visual jump.
 *
 * Strategy: add overflow:hidden to <html> (the scroll root).
 * The browser keeps the current scroll position exactly.
 * We also compensate for the scrollbar disappearing with padding-right
 * so the layout does not shift horizontally.
 *
 * Multiple callers (AllProjectsModal + project Modal) can each
 * lock/unlock; the page only unlocks when the last caller releases.
 */

let lockCount  = 0
let savedPadding = ''

export function lockScroll() {
  if (lockCount === 0) {
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth
    savedPadding = document.body.style.paddingRight
    if (scrollbarW > 0) {
      document.body.style.paddingRight = `${scrollbarW}px`
    }
    document.documentElement.style.overflow = 'hidden'
  }
  lockCount++
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.documentElement.style.overflow = ''
    document.body.style.paddingRight = savedPadding
  }
}
