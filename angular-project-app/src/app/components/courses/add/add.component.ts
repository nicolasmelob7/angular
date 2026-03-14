import { Component } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddCourseComponent {
  constructor(private coursesService: CoursesService) {}
}
