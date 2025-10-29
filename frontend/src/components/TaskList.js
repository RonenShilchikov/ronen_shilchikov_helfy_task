// src/components/TaskList.js
import { useState, useEffect, useRef } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onToggle, onDelete, onSave }) {
  // safety: ensure tasks is an array
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const total = safeTasks.length;

  // refs for DOM + layout data
  const trackRef = useRef(null);
  const loopWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const animRef = useRef(null);
  const lastTsRef = useRef(0);
  const speedRef = useRef(40); // px per second; adjust as desired
  const pausedRef = useRef(false);

  // Create a stable key from task IDs to detect when tasks actually change
  const tasksKey = safeTasks.map(t => t?.id ?? '').join(',') + `|${total}`;

  // Measure loop width and (re)start animation when tasks change
  useEffect(() => {
    if (total === 0) {
      // Stop animation if no tasks
      cancelAnimationFrame(animRef.current);
      return;
    }
    
    const track = trackRef.current;
    if (!track) return;

      // Wait for DOM to update, then measure
      const timeoutId = setTimeout(() => {
        const firstLoop = track.querySelector('.loop');
        if (!firstLoop) return;

        // Measure full width of one loop (cards + gaps inside the loop)
        // The gap between loops (20px) is handled by the track's gap property
        // We need loop width + the gap between loops
        const loopContentWidth = firstLoop.scrollWidth;
        const gapBetweenLoops = 20; // matches CSS gap: 20px
        loopWidthRef.current = loopContentWidth + gapBetweenLoops;

        // Reset offset to start fresh
        offsetRef.current = 0;
        track.style.transform = `translateX(0px)`;

        // Cancel any existing animation
        cancelAnimationFrame(animRef.current);
        lastTsRef.current = 0;

        const step = (ts) => {
          if (!lastTsRef.current) lastTsRef.current = ts;
          
          // Skip animation if paused
          if (pausedRef.current) {
            lastTsRef.current = ts; // keep timestamp fresh
            animRef.current = requestAnimationFrame(step);
            return;
          }

          const dt = Math.min(100, ts - lastTsRef.current) / 1000; // seconds
          lastTsRef.current = ts;

          const loopWidth = loopWidthRef.current || 0;
          if (loopWidth === 0) {
            animRef.current = requestAnimationFrame(step);
            return;
          }

          // Advance offset
          offsetRef.current += speedRef.current * dt;
          if (offsetRef.current >= loopWidth) {
            // Wrap seamlessly without visual jump
            offsetRef.current -= loopWidth;
          }

          track.style.transform = `translateX(-${offsetRef.current}px)`;
          animRef.current = requestAnimationFrame(step);
        };

        animRef.current = requestAnimationFrame(step);
    }, 10); // Small delay to ensure DOM is updated

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animRef.current);
    };
  }, [tasksKey, total]); // Depend on stable key to detect task changes

  // On window resize, re-measure and keep current offset within new loop width
  useEffect(() => {
    function handleResize() {
      const track = trackRef.current;
      if (!track) return;
      const firstLoop = track.querySelector('.loop');
      if (!firstLoop) return;

      const loopContentWidth = firstLoop.scrollWidth;
      const gapBetweenLoops = 20; // matches CSS gap: 20px
      loopWidthRef.current = loopContentWidth + gapBetweenLoops;

      // Keep offset within new bounds
      track.style.transform = `translateX(-${offsetRef.current}px)`;
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="carousel-wrapper">
      {total === 0 ? (
        <div className="task-list empty">No tasks yet.</div>
      ) : (
        <>
          <div className="task-list">
            <div 
              className="task-track" 
              ref={trackRef}
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
              onTouchStart={() => { pausedRef.current = true; }}
              onTouchEnd={() => { pausedRef.current = false; }}
            >
              <div className="loop">
                {safeTasks.map((task, i) => (
                  <TaskItem
                    key={`loop1-${i}-${task?.id ?? "ghost"}`}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onSave={onSave}
                  />
                ))}
              </div>
              <div className="loop" aria-hidden="true">
                {safeTasks.map((task, i) => (
                  <TaskItem
                    key={`loop2-${i}-${task?.id ?? "ghost"}`}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onSave={onSave}
                  />
                ))}
              </div>
            </div>
          </div>


        </>
      )}
    </div>
  );
}
