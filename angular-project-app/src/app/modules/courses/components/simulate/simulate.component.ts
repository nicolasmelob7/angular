import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  applyEach,
  form,
  FormField,
  FormRoot,
  required,
  submit,
} from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ResetTouchedOnFocusDirective } from '@src/app/shared/directives/reset-touched-on-focus/reset-touched-on-focus.directive';
import { CoursesService } from '../../service/courses.service';
import { Subject, takeUntil } from 'rxjs';
import { Fields, FIELDS } from '../../constants/field.constant';
import { CourseList, DaysCourseList } from '../../model/course-list.model';
import { minDateTime } from '@src/app/shared/validators/min-date-time/min-date-time.validator';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-simulate-courses',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormRoot,
    FormField,
    MatFormFieldModule,
    MatInputModule,
    ResetTouchedOnFocusDirective,
    MatSelectModule,
    MatIconModule,
    MatTimepickerModule,
    MatDatepickerModule,
  ],
  templateUrl: './simulate.component.html',
  styleUrl: './simulate.component.scss',
})
export class SimulateCoursesComponent implements OnDestroy {
  private coursesService = inject(CoursesService);
  private ngUnsubscribe = new Subject<void>();
  readonly FIELDS = FIELDS;
  courses = signal<CourseList[]>([] as CourseList[]);
  courseModel = signal<{
    courseSelected: CourseList;
    daySelected: DaysCourseList;
  }>({
    courseSelected: {} as CourseList,
    daySelected: {
      startTime: null,
      endTime: null,
    } as DaysCourseList,
  });
  showCourses = false;

  fieldModel = signal<{ fields: Fields[] }>({
    fields: new Array<Fields>(),
  });

  fieldForm = form(this.fieldModel, (schemaPath) =>
    required(schemaPath.fields, { message: 'Field is required' }),
  );

  courseForm = form(this.courseModel, (schemaPath) => {
    required(schemaPath.daySelected.startTime, {
      message: 'Start time is required',
    });
    required(schemaPath.daySelected.endTime, {
      message: 'End time is required',
    });

    minDateTime(
      schemaPath.daySelected.endTime,
      schemaPath.daySelected.startTime,
      {
        message: 'End time is less than the start time',
      },
    );
  });

  constructor() {
    let courseSelectedObservable = toObservable(
      this.courseForm.courseSelected().value,
    );
    courseSelectedObservable.pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: () => {
        this.courseForm
          .daySelected()
          .value.set({ startTime: null, endTime: null } as DaysCourseList);
      },
    });
  }

  compareCourseFn(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }

  compareDayFn(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.day === obj2.day : obj1 === obj2;
  }

  onSubmitFields(event: Event) {
    event.preventDefault();
    submit(this.fieldForm, async () => {
      const fieldsSelected = this.fieldModel().fields;

      this.coursesService
        .getCourses()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe({
          next: (response) => {
            this.courses.set(response.courses);

            this.showCourses = true;
          },
        });
    });
  }

  onSubmitCourse(event: Event) {
    event.preventDefault();
    submit(this.fieldForm, async () => {});
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
