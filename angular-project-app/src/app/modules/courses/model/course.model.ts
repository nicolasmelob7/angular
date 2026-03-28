export interface Course {
  id: string;
  title: string;
  description: string;
  teacher: string;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}
