import { Injectable, signal } from '@angular/core';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses = signal<Course[]>([]);

  addCourse(courseData: {
    title: string;
    teacher: string;
    date: Date;
    startTime: string;
    endTime: string;
  }) {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };

    this.courses.update((oldCourses) => [...oldCourses, newCourse]);
  }
}
