export interface Course {
  id: string;
  title: string;
  teacher: string;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}
