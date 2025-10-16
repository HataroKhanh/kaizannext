"use client";
import React, { useMemo } from "react";

export type ProgressCardProps = {
  /** Số mục đã làm */
  done?: number;
  /** Số mục đang làm */
  doing?: number;
  /** Tổng mục. Nếu không truyền, sẽ = done + doing + (todo || 0) */
  total?: number;
  /** Số mục chưa làm. Nếu không truyền sẽ suy ra từ tổng */
  todo?: number;
  /** Kích thước vòng tròn (px) */
  size?: number;
  /** Độ dày vòng tròn */
  strokeWidth?: number;
  /** Ghi đè màu sắc */
  colors?: Partial<{
    track: string;
    doing: string;
    done: string;
    primary: string;
    todo: string;
  }>;
  className?: string;
};

const DEFAULT_COLORS = {
  track: "#e0e0e0",
  doing: "#ff9800",
  done: "#4caf50",
  primary: "#2196f3",
  todo: "#9e9e9e",
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ProgressCard({
  done = 0,
  doing = 0,
  total,
  todo,
  size = 112,
  strokeWidth = 10,
  colors: userColors,
  className,
}: ProgressCardProps) {
  const colors = { ...DEFAULT_COLORS, ...(userColors || {}) };

  const { C, R, circumference, counts, percents, arcs } = useMemo(() => {
    const C = 50; // center in viewBox
    const R = 40; // radius (fits strokeWidth nicely in 100x100)
    const circumference = 2 * Math.PI * R;

    // derive totals
    const rawDone = Math.max(0, done);
    const rawDoing = Math.max(0, doing);
    const derivedTotal =
      total ?? rawDone + rawDoing + Math.max(0, todo ?? 0);
    const safeTotal = Math.max(1, derivedTotal); // avoid zero-div

    const rawTodo = todo ?? Math.max(0, derivedTotal - rawDone - rawDoing);

    // clamp so sum doesn't exceed total
    const safeDone = clamp(rawDone, 0, safeTotal);
    const safeDoing = clamp(rawDoing, 0, Math.max(0, safeTotal - safeDone));
    const safeTodo = clamp(rawTodo, 0, Math.max(0, safeTotal - safeDone - safeDoing));

    const percentDone = Math.round((safeDone / safeTotal) * 100);
    const percentDoing = Math.round((safeDoing / safeTotal) * 100);
    const percentTodo = clamp(100 - percentDone - percentDoing, 0, 100);

    const doneLen = (safeDone / safeTotal) * circumference;
    const doingLen = (safeDoing / safeTotal) * circumference;

    return {
      C,
      R,
      circumference,
      counts: { total: safeTotal, done: safeDone, doing: safeDoing, todo: safeTodo },
      percents: { done: percentDone, doing: percentDoing, todo: percentTodo },
      arcs: {
        doneDasharray: `${doneLen} ${Math.max(0, circumference - doneLen)}`,
        doingDasharray: `${doingLen} ${Math.max(0, circumference - doingLen)}`,
        // Start the orange segment immediately after the green segment
        doingDashoffset: -doneLen,
      },
    };
  }, [done, doing, total, todo, strokeWidth, userColors]);

  const pixelSize = `${size}px`;
  const rotation = `rotate(-90 ${C} ${C})`;

  return (
    <div className={`progress-card  ${className || ""}`.trim()}>
      <div
        className="chart-container"
        style={{ width: pixelSize, height: pixelSize }}
        aria-label="Tiến độ tổng"
        role="img"
      >
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx={C}
            cy={C}
            r={R}
            stroke={colors.track}
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* DOING (orange) - starts after 'done' */}
          <circle
            cx={C}
            cy={C}
            r={R}
            stroke={colors.doing}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={arcs.doingDasharray}
            strokeDashoffset={arcs.doingDashoffset}
            transform={rotation}
            strokeLinecap="round"
          />

          {/* DONE (green) */}
          <circle
            cx={C}
            cy={C}
            r={R}
            stroke={colors.done}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={arcs.doneDasharray}
            strokeDashoffset={0}
            transform={rotation}
            strokeLinecap="round"
          />

          {/* Center labels */}
          <g>
            <text
              x={C}
              y={C - 6}
              fontSize="18"
              fontWeight={700}
              fill={colors.primary}
              textAnchor="middle"
            >
              {percents.done}%
            </text>
            <text x={C} y={C + 12} fontSize="9" fill="#555" textAnchor="middle">
              Hoàn thành
            </text>
          </g>
        </svg>
      </div>

      <div className="stats-container">
        <h3 className="title">Thống kê tiến độ</h3>

        <div className="stat-row">
          <div className="indicator" style={{ backgroundColor: colors.done }} />
          <span className="stat-label">Đã làm</span>
          <span className="stat-value">{counts.done}/{counts.total}</span>
          <span className="stat-percent">{percents.done}%</span>
        </div>

        <div className="stat-row">
          <div className="indicator" style={{ backgroundColor: colors.doing }} />
          <span className="stat-label">Đang làm</span>
          <span className="stat-value">{counts.doing}/{counts.total}</span>
          <span className="stat-percent">{percents.doing}%</span>
        </div>

        <div className="stat-row">
          <div className="indicator" style={{ backgroundColor: colors.todo }} />
          <span className="stat-label">Chưa làm</span>
          <span className="stat-value">{counts.todo}/{counts.total}</span>
          <span className="stat-percent">{percents.todo}%</span>
        </div>
      </div>

      <style jsx>{`
        .progress-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          align-items: center;
          padding: 16px;
          border: 1px solid #eee;
          border-radius: 12px;
          background: #fff;
        }
        .chart-container { display: grid; place-items: center; }
        .stats-container { display: flex; flex-direction: column; gap: 8px; }
        .title { margin: 0 0 4px 0; font-size: 16px; }
        .stat-row {
          display: grid;
          grid-template-columns: 14px 1fr auto auto;
          gap: 8px;
          align-items: center;
          font-size: 14px;
        }
        .indicator { width: 12px; height: 12px; border-radius: 3px; }
        .stat-label { color: #333; }
        .stat-value { color: #444; }
        .stat-percent { color: #666; }
        @media (max-width: 520px) {
          .progress-card { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

// --- Ví dụ dùng ---
// <ProgressCard done={0} doing={9} total={15} />
