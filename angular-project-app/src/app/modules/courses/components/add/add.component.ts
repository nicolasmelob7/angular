import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { Course, DaysCourse } from '../../model/course.model';
import {
  form,
  submit,
  FormRoot,
  FormField,
  FieldTree,
} from '@angular/forms/signals';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { pathRoutes } from '@src/app/app.routes';
import { Subject, takeUntil } from 'rxjs';
import { validatorCourseForm } from '../../validator/form-add-edit.validator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ResetTouchedOnFocusDirective } from '@src/app/shared/directives/reset-touched-on-focus/reset-touched-on-focus.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DAYS } from '@src/app/shared/constants/days/days.constant';

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
    ResetTouchedOnFocusDirective,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddCourseComponent implements OnDestroy {
  private coursesService = inject(CoursesService);
  private router = inject(Router);
  private ngUnsubscribe = new Subject<void>();
  readonly minDate = new Date();
  readonly DAYS = DAYS;

  courseModel = signal<Course>({
    id: '',
    name: '',
    teacher: '',
    description: '',
    daysCourse: [
      {
        day: null,
        startTime: null,
        endTime: null,
      },
    ],
  });

  courseForm = form(this.courseModel, (schemaPath) =>
    validatorCourseForm(schemaPath),
  );

  daysSelected = computed(() =>
    this.courseModel()
      .daysCourse.filter((dayCourse) => dayCourse.day != null)
      .map((dayCourse) => dayCourse.day),
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

  addNewDayCourse() {
    this.courseModel.update((oldCourse) => ({
      ...oldCourse,
      daysCourse: [
        ...oldCourse.daysCourse,
        {
          day: null,
          startTime: null,
          endTime: null,
        } as DaysCourse,
      ],
    }));
  }

  removeDayCourse() {
    this.courseModel.update((oldCourse) => ({
      ...oldCourse,
      daysCourse: oldCourse.daysCourse.slice(
        0,
        oldCourse.daysCourse.length - 1,
      ),
    }));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onFocus(fieldTree: FieldTree<string | string>) {
    fieldTree().reset();
  }
}
