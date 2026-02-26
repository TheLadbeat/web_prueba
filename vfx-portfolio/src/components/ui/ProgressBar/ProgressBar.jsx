import { useRef } from 'react';
import { useScrollProgress } from '../../../hooks/useScrollProgress';
import './ProgressBar.css';

export default function ProgressBar({ navRef }) {
  const barRef = useRef(null);
  useScrollProgress({ progressBarRef: barRef, navRef });

  return <div ref={barRef} className="progress-bar" aria-hidden="true" />;
}
