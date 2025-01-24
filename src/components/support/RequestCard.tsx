import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface RequestCardProps {
  request: any;
  isSelected: boolean;
  onClick: () => void;
}

export const RequestCard = ({ request, isSelected, onClick }: RequestCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Новая</Badge>;
      case "in_progress":
        return <Badge variant="default">В работе</Badge>;
      case "completed":
        return <Badge variant="success">Завершена</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getWorkType = (type: string) => {
    switch (type) {
      case "scientific_work":
        return "Научная работа";
      case "scientific_article":
        return "Научная статья";
      default:
        return type;
    }
  };

  return (
    <Card
      className={`p-4 mb-2 cursor-pointer hover:bg-accent ${
        isSelected ? "border-primary" : ""
      }`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium truncate">{request.title}</h3>
            <p className="text-xs text-muted-foreground">
              №{request.id.slice(0, 8)}
            </p>
          </div>
          {getStatusBadge(request.status)}
        </div>
        <div className="text-sm text-muted-foreground">
          <p>{request.full_name}</p>
          <p>
            {request.faculty}, {request.course} курс
          </p>
          <p className="text-xs">{getWorkType(request.work_type)}</p>
        </div>
        <div className="text-xs text-muted-foreground flex justify-between items-center">
          <span>
            {format(new Date(request.created_at), "d MMMM yyyy", { locale: ru })}
          </span>
          {request.assigned_to && (
            <Badge variant="outline" className="text-xs">
              Назначено
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};