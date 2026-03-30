import { PathKind, required, SchemaPathTree } from '@angular/forms/signals';
import { Course } from '../model/course.model';
import { noWhiteSpaces } from '@src/app/shared/validators/no-white-spaces/no-white-spaces.validator';
import { minDateTime } from '@src/app/shared/validators/min-date-time/min-date-time.validator';

export function validatorCourseForm(
  schemaPath: SchemaPathTree<Course, PathKind.Root>,
) {
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

  minDateTime(schemaPath.date, new Date(), {
    message: 'Date is less than today',
  });
}
