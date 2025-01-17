import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddEventForm } from "./AddEventForm";
import { EventsSection } from "./EventsSection";

export const EventsManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Управление мероприятиями</h1>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {showAddForm ? "Скрыть форму" : "Добавить мероприятие"}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <AddEventForm />
        </div>
      )}

      <EventsSection hideAddButton />
    </div>
  );
};