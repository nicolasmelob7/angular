import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoursesService } from '../../service/courses.service';
import { Course } from '../../model/course.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListCourseComponent implements OnInit, OnDestroy {
  private courseService = inject(CoursesService);
  private ngUnsubscribe = new Subject<void>();

  displayedColumns: string[] = ['title', 'teacher', 'date', 'start', 'end'];
  courses = new Array<Course>();
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
