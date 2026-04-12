import { inject, Injectable, signal } from '@angular/core';
import { Course, DaysCourse } from '../model/course.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pagination } from '@src/app/shared/models/pagination/pagination.model';
import { Days, DAYS_KEYS } from '@src/app/shared/constants/days/days.constant';
import { CourseList } from '../model/course-list.model';
import { Fields, FIELDS_KEYS } from '../constants/field.constant';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private httpClient = inject(HttpClient);

  getCourses(
    pageIndex: number = 0,
    pageSize: number = 5,
    fields: Fields[] = new Array<Fields>(),
  ): Observable<{
    courses: CourseList[];
    totalElements: number;
  }> {
    return this.httpClient
      .get<{
        data: {
          courses: Course[];
        };
        pagination: Pagination;
      }>('http://localhost:3000/courses', {
        params:
          fields.length > 0
            ? {
                fields: fields,
              }
            : {
                pageIndex: pageIndex,
                pageSize: pageSize,
              },
      })
      .pipe(
        map((response) => ({
          courses: response.data.courses.map((course) => ({
            ...course,
            fieldLabel: course.field ? FIELDS_KEYS[course.field] : '',
            daysCourse: course.daysCourse.map((dayCourse) => ({
              ...dayCourse,
              dayLabel: dayCourse.day ? DAYS_KEYS[dayCourse.day] : '',
            })),
          })),
          totalElements: response.pagination.totalElements,
        })),
      );
  }

  addCourse(courseData: {
    name: string;
    teacher: string;
    description: string;
    daysCourse: DaysCourse[];
  }) {
    return this.httpClient.post<{ course: Course }>(
      'http://localhost:3000/courses',
      courseData,
    );
  }

  update(courseData: {
    name: string;
    teacher: string;
    description: string;
    daysCourse: DaysCourse[];
  }) {
    return this.httpClient.put<{ course: Course }>(
      'http://localhost:3000/courses',
      courseData,
    );
  }

  delete(id: string) {
    return this.httpClient.delete(`http://localhost:3000/courses/${id}`);
  }
}
