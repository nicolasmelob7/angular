import { Injectable, signal } from '@angular/core';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses = signal<Course[]>([]);

  constructor() {
    this.courses = signal<Course[]>(
      JSON.parse(localStorage.getItem('courses') ?? '[]'),
    );
  }

  addCourse(courseData: {
    title: string;
    teacher: string;
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
  }) {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };

    this.courses.update((oldCourses) => [...oldCourses, newCourse]);
    this.saveCourses();
  }

  private saveCourses() {
    localStorage.setItem('courses', JSON.stringify(this.courses()));
  }
}
