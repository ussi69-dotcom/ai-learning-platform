"use client";

import React from 'react';
import { useLocale } from 'next-intl';

interface DiagramProps {
  type: string;
}

export default function DiagramEvaluation({ type }: DiagramProps) {
  const locale = useLocale();
  const isCs = locale === 'cs';

  if (type === 'regression-matrix') {
    return <RegressionMatrixDiagram isCs={isCs} />;
  }

  if (type === 'tradeoff-radar') {
    return <TradeoffRadarDiagram isCs={isCs} />;
  }

  return null;
}

/**
 * Regression Matrix Diagram
 * Shows Test Cases vs Versions with Pass/Fail indicators
 * Highlights how Fix #1 fixed TC3/TC4 but broke TC5 (regression)
 */
function RegressionMatrixDiagram({ isCs }: { isCs: boolean }) {
  // Test case data: [name, baseline, fix1, fix2]
  // true = pass (green), false = fail (red)
  const testCases = [
    { name: 'TC1: Basic Query', baseline: true, fix1: true, fix2: true },
    { name: 'TC2: Complex Query', baseline: true, fix1: true, fix2: true },
    { name: 'TC3: Edge Case A', baseline: false, fix1: true, fix2: true },
    { name: 'TC4: Edge Case B', baseline: false, fix1: true, fix2: true },
    { name: 'TC5: Safety Check', baseline: true, fix1: false, fix2: true },
    { name: 'TC6: Format Output', baseline: true, fix1: true, fix2: true },
  ];

  const versions = ['Baseline', 'Fix #1', 'Fix #2'];
  const cellWidth = 90;
  const cellHeight = 40;
  const labelWidth = 140;
  const headerHeight = 50;
  const startX = 60;
  const startY = 80;

  return (
    <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
      <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
        <div className="md:hidden space-y-3">
          <div className="text-center text-lg font-bold text-slate-200">
            {isCs ? 'Regresní matice' : 'Regression Matrix'}
          </div>
          <div className="text-sm text-slate-400 text-center">
            {isCs ? 'Fix #1 opravuje edge cases, ale rozbíjí TC5' : 'Fix #1 fixes edge cases but breaks TC5'}
          </div>
          <div className="grid gap-2 text-sm">
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-green-200">
              {isCs ? 'Baseline: TC1, TC2, TC5 ✅' : 'Baseline: TC1, TC2, TC5 ✅'}
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-200">
              {isCs ? 'Fix #1: TC3, TC4 ✅ • TC5 ❌' : 'Fix #1: TC3, TC4 ✅ • TC5 ❌'}
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-green-200">
              {isCs ? 'Fix #2: všechno ✅' : 'Fix #2: all ✅'}
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 600 380"
          className="hidden md:block w-full h-auto"
          role="img"
          aria-label="Regression Matrix: Test Cases vs Versions showing how Fix #1 introduced a regression in TC5"
        >
          <defs>
            {/* Gradients for cells */}
            <linearGradient id="grad-pass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="grad-fail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="grad-regression" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow filter for regression highlight */}
            <filter id="glow-regression" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Title */}
          <text
            x="300"
            y="30"
            textAnchor="middle"
            className="text-base font-bold fill-slate-700 dark:fill-slate-200"
          >
            Regression Matrix
          </text>
          <text
            x="300"
            y="50"
            textAnchor="middle"
            className="text-xs fill-slate-500 dark:fill-slate-400"
          >
            Test Cases × Prompt Versions
          </text>

          {/* Version Headers */}
          {versions.map((version, i) => (
            <g key={version} transform={`translate(${startX + labelWidth + i * cellWidth}, ${startY})`}>
              <rect
                x="0"
                y="0"
                width={cellWidth - 4}
                height={headerHeight - 4}
                rx="6"
                fill={i === 1 ? '#f59e0b' : '#3b82f6'}
                fillOpacity="0.15"
                stroke={i === 1 ? '#f59e0b' : '#3b82f6'}
                strokeWidth="1.5"
              />
              <text
                x={(cellWidth - 4) / 2}
                y={headerHeight / 2 + 4}
                textAnchor="middle"
                className={`text-xs font-bold ${i === 1 ? 'fill-amber-700 dark:fill-amber-300' : 'fill-blue-700 dark:fill-blue-300'}`}
              >
                {version}
              </text>
            </g>
          ))}

          {/* Test Case Rows */}
          {testCases.map((tc, rowIndex) => {
            const y = startY + headerHeight + rowIndex * cellHeight;
            const results = [tc.baseline, tc.fix1, tc.fix2];

            // Detect regression: was passing before, now failing
            const isRegression = tc.baseline && !tc.fix1;
            // Detect fix: was failing before, now passing
            const isFix = !tc.baseline && tc.fix1;

            return (
              <g key={tc.name} transform={`translate(${startX}, ${y})`}>
                {/* Test Case Label */}
                <rect
                  x="0"
                  y="0"
                  width={labelWidth - 4}
                  height={cellHeight - 4}
                  rx="4"
                  fill="#64748b"
                  fillOpacity="0.1"
                  stroke="#64748b"
                  strokeWidth="1"
                />
                <text
                  x="10"
                  y={cellHeight / 2}
                  className="text-[10px] font-medium fill-slate-600 dark:fill-slate-300"
                >
                  {tc.name}
                </text>

                {/* Result Cells */}
                {results.map((passed, colIndex) => {
                  const isRegressionCell = colIndex === 1 && isRegression;
                  const isFixCell = colIndex === 1 && isFix;

                  return (
                    <g
                      key={colIndex}
                      transform={`translate(${labelWidth + colIndex * cellWidth}, 0)`}
                      filter={isRegressionCell ? 'url(#glow-regression)' : undefined}
                    >
                      <rect
                        x="0"
                        y="0"
                        width={cellWidth - 4}
                        height={cellHeight - 4}
                        rx="4"
                        fill={isRegressionCell ? 'url(#grad-regression)' : passed ? 'url(#grad-pass)' : 'url(#grad-fail)'}
                        stroke={isRegressionCell ? '#f59e0b' : passed ? '#22c55e' : '#ef4444'}
                        strokeWidth={isRegressionCell || isFixCell ? '2' : '1'}
                      />

                      {/* Pass/Fail Icon */}
                      <text
                        x={(cellWidth - 4) / 2}
                        y={cellHeight / 2}
                        textAnchor="middle"
                        className="text-base"
                      >
                        {passed ? '✓' : '✗'}
                      </text>

                      {/* Regression Label */}
                      {isRegressionCell && (
                        <text
                          x={(cellWidth - 4) / 2}
                          y={cellHeight - 6}
                          textAnchor="middle"
                          className="text-[8px] font-bold fill-amber-600 dark:fill-amber-400"
                        >
                          REGRESSION!
                        </text>
                      )}

                      {/* Fix Label */}
                      {isFixCell && (
                        <text
                          x={(cellWidth - 4) / 2}
                          y={cellHeight - 6}
                          textAnchor="middle"
                          className="text-[8px] font-bold fill-green-600 dark:fill-green-400"
                        >
                          FIXED
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(60, 340)">
            <rect x="0" y="0" width="480" height="30" rx="6" fill="#1e293b" fillOpacity="0.3" />

            {/* Pass */}
            <rect x="20" y="8" width="14" height="14" rx="2" fill="url(#grad-pass)" stroke="#22c55e" />
            <text x="40" y="19" className="text-[10px] fill-slate-600 dark:fill-slate-400">Pass</text>

            {/* Fail */}
            <rect x="90" y="8" width="14" height="14" rx="2" fill="url(#grad-fail)" stroke="#ef4444" />
            <text x="110" y="19" className="text-[10px] fill-slate-600 dark:fill-slate-400">Fail</text>

            {/* Regression */}
            <rect x="160" y="8" width="14" height="14" rx="2" fill="url(#grad-regression)" stroke="#f59e0b" strokeWidth="2" />
            <text x="180" y="19" className="text-[10px] fill-amber-600 dark:fill-amber-400 font-bold">Regression (was ✓, now ✗)</text>

            {/* Fixed */}
            <rect x="350" y="8" width="14" height="14" rx="2" fill="url(#grad-pass)" stroke="#22c55e" strokeWidth="2" />
            <text x="370" y="19" className="text-[10px] fill-green-600 dark:fill-green-400 font-bold">Fixed (was ✗, now ✓)</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * Tradeoff Radar Diagram (Spider Chart)
 * Shows Accuracy, Safety, Helpfulness, Conciseness
 * Two data series: Baseline vs Fixed
 */
function TradeoffRadarDiagram({ isCs }: { isCs: boolean }) {
  // Dimensions for radar chart
  const dimensions = ['Accuracy', 'Safety', 'Helpfulness', 'Conciseness'];
  const numDimensions = dimensions.length;

  // Data: values from 0-100
  const baseline = { name: 'Baseline', values: [70, 30, 95, 60], color: '#ef4444' };
  const fixed = { name: 'Fixed', values: [80, 90, 55, 75], color: '#22c55e' };

  const centerX = 300;
  const centerY = 240;
  const maxRadius = 110;
  const labelRadius = maxRadius + 14;

  // Calculate point positions
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numDimensions - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  // Generate path for a data series
  const generatePath = (values: number[]) => {
    return values.map((value, i) => {
      const point = getPoint(i, value);
      return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';
  };

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <div className="my-8 flex justify-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:static md:mx-0">
      <div className="relative p-4 md:p-6 rounded-none md:rounded-2xl bg-white/5 backdrop-blur-xl border-y md:border border-white/10 shadow-lg w-full max-w-none md:max-w-3xl">
        <div className="md:hidden space-y-3">
          <div className="text-center text-lg font-bold text-slate-200">
            {isCs ? 'Radar kompromisů kvality' : 'Quality Trade-offs Radar'}
          </div>
          <div className="text-sm text-slate-400 text-center">
            {isCs ? 'Bezpečnost vs. užitečnost v praxi' : 'Safety vs helpfulness in practice'}
          </div>
          <div className="grid gap-2 text-sm">
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-200">
              {isCs ? 'Baseline: vyšší užitečnost, nižší bezpečnost' : 'Baseline: higher helpfulness, lower safety'}
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2 text-green-200">
              {isCs ? 'Fixed: vyšší bezpečnost, nižší užitečnost' : 'Fixed: higher safety, lower helpfulness'}
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 600 460"
          className="hidden md:block w-full h-auto"
          role="img"
          aria-label="Tradeoff Radar: Comparing Baseline (high helpfulness, low safety) vs Fixed (high safety, lower helpfulness)"
        >
          <defs>
            {/* Gradients for data areas */}
            <linearGradient id="grad-baseline-radar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="grad-fixed-radar" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Title */}
          <text
            x="300"
            y="32"
            textAnchor="middle"
            className="text-base font-bold fill-slate-700 dark:fill-slate-200"
          >
            Quality Trade-offs Radar
          </text>
          <text
            x="300"
            y="52"
            textAnchor="middle"
            className="text-xs fill-slate-500 dark:fill-slate-400"
          >
            Visualizing the Safety vs Helpfulness trade-off
          </text>

          {/* Grid circles */}
          {gridLevels.map((level) => {
            const radius = (level / 100) * maxRadius;
            const points = dimensions.map((_, i) => {
              const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
              return `${centerX + Math.cos(angle) * radius},${centerY + Math.sin(angle) * radius}`;
            }).join(' ');

            return (
              <g key={level}>
                <polygon
                  points={points}
                  fill="none"
                  stroke="#64748b"
                  strokeOpacity="0.2"
                  strokeWidth="1"
                  strokeDasharray={level === 100 ? "0" : "2 2"}
                />
                {level < 100 && (
                  <text
                    x={centerX + 5}
                    y={centerY - radius + 4}
                    className="text-[8px] fill-slate-500 dark:fill-slate-500"
                  >
                    {level}%
                  </text>
                )}
              </g>
            );
          })}

          {/* Axis lines */}
          {dimensions.map((_, i) => {
            const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
            const endX = centerX + Math.cos(angle) * maxRadius;
            const endY = centerY + Math.sin(angle) * maxRadius;

            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="#64748b"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            );
          })}

          {/* Baseline data area */}
          <path
            d={generatePath(baseline.values)}
            fill="url(#grad-baseline-radar)"
            stroke={baseline.color}
            strokeWidth="2"
            strokeOpacity="0.8"
          />

          {/* Fixed data area */}
          <path
            d={generatePath(fixed.values)}
            fill="url(#grad-fixed-radar)"
            stroke={fixed.color}
            strokeWidth="2"
            strokeOpacity="0.8"
          />

          {/* Data points - Baseline */}
          {baseline.values.map((value, i) => {
            const point = getPoint(i, value);
            return (
              <circle
                key={`baseline-${i}`}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={baseline.color}
                stroke="#fff"
                strokeWidth="2"
              />
            );
          })}

          {/* Data points - Fixed */}
          {fixed.values.map((value, i) => {
            const point = getPoint(i, value);
            return (
              <circle
                key={`fixed-${i}`}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={fixed.color}
                stroke="#fff"
                strokeWidth="2"
              />
            );
          })}

          {/* Dimension labels */}
          {dimensions.map((dim, i) => {
            const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;

            // Highlight Safety and Helpfulness as key trade-off
            const isKeyDimension = dim === 'Safety' || dim === 'Helpfulness';

            return (
              <g key={dim}>
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className={`text-sm font-bold ${isKeyDimension ? 'fill-amber-600 dark:fill-amber-400' : 'fill-slate-600 dark:fill-slate-300'}`}
                >
                  {dim}
                </text>
                {isKeyDimension && (
                  <text
                    x={x}
                    y={y + 14}
                    textAnchor="middle"
                    className="text-[9px] fill-amber-500 dark:fill-amber-500"
                  >
                    ⚡ Key Trade-off
                  </text>
                )}
              </g>
            );
          })}

          {/* Legend */}
          <g transform="translate(150, 400)">
            <rect x="0" y="0" width="300" height="45" rx="8" fill="#1e293b" fillOpacity="0.3" />

            {/* Baseline Legend */}
            <g transform="translate(20, 12)">
              <rect x="0" y="0" width="20" height="12" rx="2" fill="url(#grad-baseline-radar)" stroke={baseline.color} strokeWidth="2" />
              <text x="28" y="10" className="text-xs font-bold fill-red-600 dark:fill-red-400">Baseline</text>
              <text x="90" y="10" className="text-[9px] fill-slate-500 dark:fill-slate-400">High Helpfulness, Low Safety</text>
            </g>

            {/* Fixed Legend */}
            <g transform="translate(20, 28)">
              <rect x="0" y="0" width="20" height="12" rx="2" fill="url(#grad-fixed-radar)" stroke={fixed.color} strokeWidth="2" />
              <text x="28" y="10" className="text-xs font-bold fill-green-600 dark:fill-green-400">Fixed</text>
              <text x="90" y="10" className="text-[9px] fill-slate-500 dark:fill-slate-400">High Safety, Lower Helpfulness</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
