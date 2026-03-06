"use client";

import { useEffect, useRef } from "react";

interface TopoGridProps {
  className?: string;
  rows?: number;
  cols?: number;
  amplitude?: number;
  speed?: number;
}

export function TopoGrid({
  className = "",
  rows = 20,
  cols = 30,
  amplitude = 30,
  speed = 0.0008,
}: TopoGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let startTime = Date.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const t = (Date.now() - startTime) * speed;

      ctx.clearRect(0, 0, w, h);

      const cellW = w / (cols - 1);
      const cellH = h / (rows - 1);

      // compute displaced grid points
      const points: { x: number; y: number }[][] = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * cellW;
          const baseY = r * cellH;
          const nx = c / cols;
          const ny = r / rows;
          const displacement =
            Math.sin(nx * 4 + t) *
            Math.cos(ny * 3 + t * 0.7) *
            amplitude +
            Math.sin(nx * 2 - ny * 2 + t * 0.5) * amplitude * 0.5;

          points[r][c] = {
            x: baseX + displacement * 0.3,
            y: baseY + displacement,
          };
        }
      }

      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 0.5;

      // draw horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(points[r][0].x, points[r][0].y);
        for (let c = 1; c < cols; c++) {
          ctx.lineTo(points[r][c].x, points[r][c].y);
        }
        ctx.stroke();
      }

      // draw vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(points[0][c].x, points[0][c].y);
        for (let r = 1; r < rows; r++) {
          ctx.lineTo(points[r][c].x, points[r][c].y);
        }
        ctx.stroke();
      }

      // draw dots at intersections
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          ctx.beginPath();
          ctx.arc(points[r][c].x, points[r][c].y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [rows, cols, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: "block" }}
    />
  );
}
