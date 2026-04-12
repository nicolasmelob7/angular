import {
  applyEach,
  PathKind,
  required,
  SchemaPathTree,
} from '@angular/forms/signals';
import { Course } from '../model/course.model';
import { noWhiteSpaces } from '@src/app/shared/validators/no-white-spaces/no-white-spaces.validator';
import { minDateTime } from '@src/app/shared/validators/min-date-time/min-date-time.validator';

export function validatorCourseForm(
  schemaPath: SchemaPathTree<Course, PathKind.Root>,
) {
  required(schemaPath.name, { message: 'Name is required' });
  required(schemaPath.field, { message: 'Field is required' });

  noWhiteSpaces(schemaPath.name, { message: 'Name is required' });

  applyEach(schemaPath.daysCourse, (daysCoursePath) => {
    required(daysCoursePath.day, { message: 'Day is required' });
    required(daysCoursePath.startTime, { message: 'Start time is required' });
    required(daysCoursePath.endTime, { message: 'End time is required' });

    minDateTime(daysCoursePath.endTime, daysCoursePath.startTime, {
      message: 'End time is less than the start time',
    });
  });
}
