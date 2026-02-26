import { useCursor } from '../../../hooks/useCursor';
import './Cursor.css';

export default function Cursor() {
  const { cursorRef, ringRef } = useCursor();

  return (
    <>
      <div ref={cursorRef} className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef}   className="cursor-ring" aria-hidden="true" />
    </>
  );
}
