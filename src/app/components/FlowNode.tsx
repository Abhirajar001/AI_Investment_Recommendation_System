interface FlowNodeProps {
  title: string;
  items: string[];
  color?: string;
  icon?: React.ReactNode;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export function FlowNode({ 
  title, 
  items, 
  color = "bg-blue-50 border-blue-300", 
  icon,
  x, 
  y, 
  width = 240,
  height
}: FlowNodeProps) {
  const actualHeight = height || (items.length * 28 + 60);
  
  return (
    <div 
      className={`absolute ${color} border-2 rounded-lg shadow-md p-4`}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        width: `${width}px`,
        minHeight: `${actualHeight}px`
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && <div className="text-blue-600">{icon}</div>}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-gray-700 flex items-start">
            <span className="mr-2 text-blue-500 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
