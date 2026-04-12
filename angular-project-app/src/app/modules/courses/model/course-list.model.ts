import { Course, DaysCourse } from './course.model';

export interface DaysCourseList extends DaysCourse {
  dayLabel: string;
}

export interface CourseList extends Course {
  fieldLabel: string;
  daysCourse: DaysCourseList[];
}
