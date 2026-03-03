import { useCursor } from '../../hooks/useCursor'

export default function Cursor() {
  const { dotRef, ringRef } = useCursor()
  return (
    <>
      <div className="cur-dot"  ref={dotRef}  />
      <div className="cur-ring" ref={ringRef} />
    </>
  )
}
