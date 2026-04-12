import { Days } from '@src/app/shared/constants/days/days.constant';

export interface Course {
  id: string;
  name: string;
  teacher: string;
  description: string;
  daysCourse: DaysCourse[];
}

export interface DaysCourse {
  day: Days | null;
  startTime: Date | null;
  endTime: Date | null;
}
