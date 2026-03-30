import { Component, inject, OnInit, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateInput } from '@src/app/shared/components/input/date-input/date-input.component';
import { MyInput } from '@src/app/shared/components/input/my-input/my-input.component';
import { TimeInput } from '@src/app/shared/components/input/time-input/time-input.component';
import { CoursesService } from '../../service/courses.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Course } from '../../model/course.model';
import { disabled, FieldTree, form, submit } from '@angular/forms/signals';
import { validatorCourseForm } from '../../validator/form-add-edit.validator';
import { pathRoutes } from '@src/app/app.routes';
import { CoursesProviderService } from '../../service/courses-provider.service';

@Component({
  selector: 'app-edit-courses',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MyInput, DateInput, TimeInput],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditCoursesComponent {
  private coursesService = inject(CoursesService);
  private coursesProviderService = inject(CoursesProviderService);
  private router = inject(Router);
  private ngUnsubscribe = new Subject<void>();
  readonly minDate = new Date();
  courseModel = signal<Course>({} as Course);
  courseForm = form(this.courseModel);

  constructor() {
    this.coursesProviderService
      .getObservable()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (course) => {
          this.courseModel.set(course);
          this.courseForm = form(this.courseModel, (schemaPath) => {
            (validatorCourseForm(schemaPath),
              disabled(schemaPath.title),
              disabled(schemaPath.description),
              disabled(schemaPath.teacher));
          });
        },
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.courseForm, async () => {
      const newCourse = this.courseModel();

      this.coursesService
        .update(newCourse)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (resData) => {
            this.router.navigate([pathRoutes.homeScreen]);
          },
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
