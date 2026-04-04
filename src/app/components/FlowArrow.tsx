interface Point {
  x: number;
  y: number;
}

interface FlowArrowProps {
  from: Point;
  to: Point;
  label?: string;
  dashed?: boolean;
  color?: string;
}

export function FlowArrow({ from, to, label, dashed = false, color = "#3b82f6" }: FlowArrowProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  // Calculate control points for curved line
  const controlPointOffset = Math.abs(dx) * 0.5;
  
  // Create path
  let path;
  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal flow
    path = `M ${from.x} ${from.y} C ${from.x + controlPointOffset} ${from.y}, ${to.x - controlPointOffset} ${to.y}, ${to.x} ${to.y}`;
  } else {
    // Vertical flow
    const vControlOffset = Math.abs(dy) * 0.5;
    path = `M ${from.x} ${from.y} C ${from.x} ${from.y + vControlOffset}, ${to.x} ${to.y - vControlOffset}, ${to.x} ${to.y}`;
  }
  
  // Calculate arrow head angle
  const angle = Math.atan2(dy, dx);
  const arrowSize = 8;
  
  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={dashed ? "5,5" : "0"}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 5}
          fill={color}
          fontSize="11"
          fontWeight="500"
          textAnchor="middle"
          className="pointer-events-none"
        >
          {label}
        </text>
      )}
      {/* Arrow head */}
      <polygon
        points={`0,-${arrowSize / 2} ${arrowSize},0 0,${arrowSize / 2}`}
        fill={color}
        transform={`translate(${to.x}, ${to.y}) rotate(${(angle * 180) / Math.PI})`}
      />
    </g>
  );
}
