import { Routes } from '@angular/router';
import { ScheduleCoursesComponent } from '@components/courses/schedule/schedule.component';
import { HomeScreenComponent } from '@app/components/home-screen/home-screen.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
  },
  {
    path: 'schedule-courses',
    component: ScheduleCoursesComponent,
  },
];
