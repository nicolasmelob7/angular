import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { Course } from '../../model/course.model';
import { form, submit, FormRoot, FormField } from '@angular/forms/signals';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { pathRoutes } from '@src/app/app.routes';
import { Subject, takeUntil } from 'rxjs';
import { validatorCourseForm } from '../../validator/form-add-edit.validator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-course',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormRoot,
    FormField,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddCourseComponent implements OnDestroy {
  private coursesService = inject(CoursesService);
  private router = inject(Router);
  private ngUnsubscribe = new Subject<void>();
  readonly minDate = new Date();

  courseModel = signal<Course>({
    id: '',
    title: '',
    description: '',
    teacher: '',
    date: null,
    startTime: null,
    endTime: null,
  });

  courseForm = form(this.courseModel, (schemaPath) =>
    validatorCourseForm(schemaPath),
  );

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.courseForm, async () => {
      const newCourse = this.courseModel();

      this.coursesService
        .addCourse(newCourse)
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
