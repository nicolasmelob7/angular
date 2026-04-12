import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CourseList, CoursesService } from '../../service/courses.service';
import { Course } from '../../model/course.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { pathRoutes } from '@src/app/app.routes';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoursesProviderService } from '../../service/courses-provider.service';
import { DAYS_KEYS } from '@src/app/shared/constants/days/days.constant';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListCourseComponent implements OnInit, OnDestroy {
  private courseService = inject(CoursesService);
  private ngUnsubscribe = new Subject<void>();
  private courseProviderService = inject(CoursesProviderService);
  private router = inject(Router);
  readonly pathRoutes = pathRoutes;
  readonly DAYS_KEYS = DAYS_KEYS;

  displayedColumns: string[] = ['name', 'teacher', 'date', 'action'];
  courses = new Array<CourseList>();
  pageIndex = 0;
  pageSize = 5;
  totalElements = 1;
  showData = false;

  ngOnInit() {
    this.fetchCourses(this.pageIndex, this.pageSize);
  }

  fetchCourses(pageIndex: number, pageSize: number) {
    this.courseService
      .getCourses(pageIndex, pageSize)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.courses = response.courses;
          this.totalElements = response.totalElements;
          this.showData = true;
        },
      });
  }

  onPaginate(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchCourses(this.pageIndex, this.pageSize);
  }

  onEdit(course: Course) {
    this.courseProviderService.sendCourse(course);
    this.router.navigateByUrl(this.pathRoutes.courses.edit);
  }

  onDelete(course: Course) {
    this.courseService
      .delete(course.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (resData) => {
          this.router.navigate([pathRoutes.homeScreen]);
        },
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
