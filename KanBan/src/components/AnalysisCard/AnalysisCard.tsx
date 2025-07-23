import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";

export interface ANALYSIS_TYPE {
  id: string;
  title: string;
  count: number;
  analysis: number;
  direction: "up" | "down";
  icon: React.ReactNode;
}

interface PropType {
  item: ANALYSIS_TYPE;
}

const AnalysisCard = (props: PropType) => {
  const { item } = props;

  return (
    <Card className="w-full basis:auto lg:basis-full rounded-sm bg-zinc-50 dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {item?.icon}
            <span className="text-[0.9125rem] font-semibold text-gray-500 dark:text-gray-300">
              {item?.title}
            </span>
          </div>

          <div
            className={`flex items-center gap-1 ${
              item.direction === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {item?.direction === "up" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
            <span>{item?.analysis}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-xl font-bold dark:text-primary">{item?.count}</h1>
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;
