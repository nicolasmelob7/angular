import { Days } from '@src/app/shared/constants/days/days.constant';
import { Fields } from '../constants/field.constant';

export interface Course {
  id: string;
  name: string;
  teacher: string;
  field: Fields | null;
  description: string;
  daysCourse: DaysCourse[];
}

export interface DaysCourse {
  day: Days | null;
  startTime: Date | null;
  endTime: Date | null;
}
