import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddNewsForm } from "./AddNewsForm";
import { NewsSection } from "./NewsSection";

export const NewsManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Управление новостями</h1>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {showAddForm ? "Скрыть форму" : "Добавить новость"}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <AddNewsForm />
        </div>
      )}

      <NewsSection hideAddButton />
    </div>
  );
};