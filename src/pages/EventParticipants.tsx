import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getEducationForm = (form: string) => {
  switch (form) {
    case 'full_time':
      return 'Очная';
    case 'part_time':
      return 'Заочная';
    case 'distance':
      return 'Дистанционная';
    default:
      return form;
  }
};

const getDegreeType = (type: string) => {
  switch (type) {
    case 'bachelor':
      return 'Бакалавриат';
    case 'master':
      return 'Магистратура';
    case 'specialist':
      return 'Специалитет';
    case 'postgraduate':
      return 'Аспирантура';
    default:
      return type;
  }
};

const EventParticipants = () => {
  const { id } = useParams();
  console.log("Загрузка участников мероприятия:", id);

  const { data: eventData, isLoading: eventLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("title")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ["event-participants", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_participants")
        .select("*")
        .eq("event_id", id);

      if (error) throw error;
      console.log("Загружены участники:", data);
      return data;
    },
  });

  const isLoading = eventLoading || participantsLoading;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
              Участники мероприятия: {eventData?.title}
            </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ФИО</TableHead>
                  <TableHead>Курс</TableHead>
                  <TableHead>Группа</TableHead>
                  <TableHead>Форма обучения</TableHead>
                  <TableHead>Степень образования</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants?.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>{participant.full_name}</TableCell>
                    <TableCell>{participant.course}</TableCell>
                    <TableCell>{participant.study_group}</TableCell>
                    <TableCell>{getEducationForm(participant.education_form)}</TableCell>
                    <TableCell>{getDegreeType(participant.degree_type)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EventParticipants;