import { Component, signal } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from '../course.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddCourseComponent {
  course = signal<Course>({
    id: '',
    title: '',
    teacher: '',
    date: null,
    startTime: '',
    endTime: '',
  });

  constructor(private coursesService: CoursesService) {}
}
