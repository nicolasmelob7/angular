import { inject, Injectable, signal } from '@angular/core';
import { Course } from '../model/course.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pagination } from '@src/app/shared/models/pagination/pagination.model';

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
    return this.httpClient.post<{ course: Course }>(
      'http://localhost:3000/courses',
      courseData,
    );
  }

  getCourses(
    pageIndex: number = 0,
    pageSize: number = 5,
  ): Observable<{
    courses: Course[];
    totalElements: number;
  }> {
    return this.httpClient
      .get<{
        data: {
          courses: Course[];
        };
        pagination: Pagination;
      }>('http://localhost:3000/courses', {
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize,
        },
      })
      .pipe(
        map((response) => ({
          courses: response.data.courses,
          totalElements: response.pagination.totalElements,
        })),
      );
  }
}
