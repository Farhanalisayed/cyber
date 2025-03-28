import { Tooltip } from "recharts";
import { cn } from "../../lib/utils";

export const ChartContainer = ({ children, className }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
};

export const ChartTooltipContent = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="rounded-lg bg-white p-2 text-sm shadow-md">
      <p className="font-semibold">{label}</p>
      <p className="text-gray-600">{payload[0].value}</p>
    </div>
  );
};

export  const ChartTooltip = (props) => <Tooltip content={<ChartTooltipContent {...props} />} />;
