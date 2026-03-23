import { Component, inject, signal } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from '../course.model';
import { form, required, validate, submit } from '@angular/forms/signals';
import { noWhiteSpaces } from '@src/app/shared/validators/no-white-spaces/no-white-spaces.validator';
import { MyInput } from '@src/app/shared/components/input/my-input/my-input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateInput } from '@src/app/shared/components/input/date-input/date-input';
import { TimeInput } from '@src/app/shared/components/input/time-input/time-input';
import { Router } from '@angular/router';
import { minDateTime } from '@src/app/shared/validators/min-date-time/min-date-time.validator';

@Component({
  selector: 'app-add-course',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MyInput, DateInput, TimeInput],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddCourseComponent {
  private coursesService = inject(CoursesService);
  private router = inject(Router);
  readonly minDate = new Date();

  courseModel = signal<Course>({
    id: '',
    title: '',
    teacher: '',
    date: null,
    startTime: null,
    endTime: null,
  });

  courseForm = form(this.courseModel, (schemaPath) => {
    required(schemaPath.title, { message: 'Title is required' });
    required(schemaPath.teacher, { message: 'Teacher is required' });
    required(schemaPath.date, { message: 'Date is required' });
    required(schemaPath.startTime, { message: 'Start is required' });
    required(schemaPath.endTime, { message: 'End is required' });

    noWhiteSpaces(schemaPath.title, { message: 'Title is required' });
    noWhiteSpaces(schemaPath.teacher, { message: 'Teacher is required' });

    minDateTime(schemaPath.endTime, schemaPath.startTime, {
      message: 'End time is less than the start time',
    });

    minDateTime(schemaPath.date, this.minDate, {
      message: 'Date is less than today',
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.courseForm, async () => {
      const newCourse = this.courseModel();

      this.coursesService.addCourse(newCourse);

      this.router.navigate(['/']);
    });
  }
}
