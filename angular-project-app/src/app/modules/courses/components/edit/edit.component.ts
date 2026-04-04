import { Component, inject, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CoursesService } from '../../service/courses.service';
import { Router } from '@angular/router';
import { first, skip, Subject, takeUntil } from 'rxjs';
import { Course } from '../../model/course.model';
import {
  disabled,
  form,
  FormField,
  FormRoot,
  submit,
} from '@angular/forms/signals';
import { validatorCourseForm } from '../../validator/form-add-edit.validator';
import { pathRoutes } from '@src/app/app.routes';
import { CoursesProviderService } from '../../service/courses-provider.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ResetTouchedOnFocusDirective } from '@src/app/shared/directives/reset-touched-on-focus/reset-touched-on-focus.directive';

@Component({
  selector: 'app-edit-courses',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormRoot,
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    ResetTouchedOnFocusDirective,
  ],
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

          let startTimeObservable = toObservable(
            this.courseForm.startTime().value,
          );

          startTimeObservable
            .pipe(skip(1))
            .pipe(first())
            .subscribe({
              next: () => {
                this.courseForm.endTime().markAsTouched();
              },
            });
        },
      });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.courseForm, async () => {
      const updatedCourse = this.courseModel();

      this.coursesService
        .update(updatedCourse)
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
