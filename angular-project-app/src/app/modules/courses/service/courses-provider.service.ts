import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../model/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesProviderService {
  private coursesProvider = new BehaviorSubject<Course>({} as Course);

  sendCourse(course: Course) {
    this.coursesProvider.next(course);
  }

  getObservable() {
    return this.coursesProvider.asObservable();
  }
}
