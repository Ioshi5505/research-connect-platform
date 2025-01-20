export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      event_participants: {
        Row: {
          course: number
          created_at: string
          degree_type: string
          education_form: string
          event_id: string | null
          full_name: string
          id: string
          study_group: string
          user_id: string | null
        }
        Insert: {
          course?: number
          created_at?: string
          degree_type?: string
          education_form?: string
          event_id?: string | null
          full_name?: string
          id?: string
          study_group?: string
          user_id?: string | null
        }
        Update: {
          course?: number
          created_at?: string
          degree_type?: string
          education_form?: string
          event_id?: string | null
          full_name?: string
          id?: string
          study_group?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          author_id: string
          created_at: string
          current_participants: number
          date: string
          description: string
          id: string
          image_url: string | null
          participants_limit: number | null
          title: string
        }
        Insert: {
          author_id: string
          created_at?: string
          current_participants?: number
          date: string
          description: string
          id?: string
          image_url?: string | null
          participants_limit?: number | null
          title: string
        }
        Update: {
          author_id?: string
          created_at?: string
          current_participants?: number
          date?: string
          description?: string
          id?: string
          image_url?: string | null
          participants_limit?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          image_url: string | null
          published: boolean
          title: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          title: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          assigned_to: string | null
          comments: Json[] | null
          course: number
          created_at: string
          data_processing_consent: boolean
          description: string
          desired_deadline: string
          email: string
          faculty: string
          file_url: string | null
          full_name: string
          history: Json[] | null
          id: string
          scientific_field: string
          special_requirements: string | null
          status: string
          support_types: Database["public"]["Enums"]["support_type"][]
          title: string
          user_id: string
          work_stage: Database["public"]["Enums"]["work_stage"]
          work_type: Database["public"]["Enums"]["work_type"]
        }
        Insert: {
          assigned_to?: string | null
          comments?: Json[] | null
          course: number
          created_at?: string
          data_processing_consent: boolean
          description: string
          desired_deadline: string
          email: string
          faculty: string
          file_url?: string | null
          full_name: string
          history?: Json[] | null
          id?: string
          scientific_field: string
          special_requirements?: string | null
          status?: string
          support_types: Database["public"]["Enums"]["support_type"][]
          title: string
          user_id: string
          work_stage: Database["public"]["Enums"]["work_stage"]
          work_type: Database["public"]["Enums"]["work_type"]
        }
        Update: {
          assigned_to?: string | null
          comments?: Json[] | null
          course?: number
          created_at?: string
          data_processing_consent?: boolean
          description?: string
          desired_deadline?: string
          email?: string
          faculty?: string
          file_url?: string | null
          full_name?: string
          history?: Json[] | null
          id?: string
          scientific_field?: string
          special_requirements?: string | null
          status?: string
          support_types?: Database["public"]["Enums"]["support_type"][]
          title?: string
          user_id?: string
          work_stage?: Database["public"]["Enums"]["work_stage"]
          work_type?: Database["public"]["Enums"]["work_type"]
        }
        Relationships: [
          {
            foreignKeyName: "support_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_emails: {
        Args: {
          user_ids: string[]
        }
        Returns: {
          id: string
          email: string
        }[]
      }
    }
    Enums: {
      support_type: "editing" | "formatting" | "publication" | "conference"
      user_role: "student" | "employee"
      work_stage: "idea" | "draft" | "complete"
      work_type: "article" | "report"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
