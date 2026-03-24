import { inject, Injectable, signal } from '@angular/core';
import { Course } from './course.model';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private httpClient = inject(HttpClient);

  addCourse(courseData: {
    title: string;
    teacher: string;
    description: string;
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
  }) {
    return this.httpClient
      .post<{ courses: Course[] }>('http://localhost:3000/courses', courseData)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(() => {
            new Error('Something went wrong!');
          });
        }),
      );
  }
}
