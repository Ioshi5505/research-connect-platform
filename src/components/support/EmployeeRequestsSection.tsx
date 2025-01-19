import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RequestCard } from "./RequestCard";
import { RequestDetails } from "./RequestDetails";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const EmployeeRequestsSection = () => {
  const session = useSession();
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const { data: requests, isLoading } = useQuery({
    queryKey: ["support-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (!session) return null;

  if (isLoading) {
    return <div>Загрузка заявок...</div>;
  }

  const NoRequestsAlert = () => (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        В настоящее время заявки отсутствуют
      </AlertDescription>
    </Alert>
  );

  const renderRequestsList = (filteredRequests: any[]) => {
    if (filteredRequests.length === 0) {
      return <NoRequestsAlert />;
    }

    return (
      <ScrollArea className="h-[600px]">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            isSelected={selectedRequest === request.id}
            onClick={() => setSelectedRequest(request.id)}
          />
        ))}
      </ScrollArea>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              Все
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">
              Новые
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex-1">
              В работе
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {renderRequestsList(requests || [])}
          </TabsContent>
          <TabsContent value="pending">
            {renderRequestsList(
              (requests || []).filter((request) => request.status === "pending")
            )}
          </TabsContent>
          <TabsContent value="in_progress">
            {renderRequestsList(
              (requests || []).filter(
                (request) => request.status === "in_progress"
              )
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="md:col-span-2">
        {selectedRequest ? (
          <RequestDetails
            requestId={selectedRequest}
            onClose={() => setSelectedRequest(null)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Выберите заявку для просмотра деталей
          </div>
        )}
      </div>
    </div>
  );
};