import { Routes } from '@angular/router';
import { HomeScreenComponent } from '@app/components/home-screen/home-screen.component';
import { SimulateCoursesComponent } from '@app/components/courses/simulate/simulate.component';
import { EditCoursesComponent } from '@app/components/courses/edit/edit.component';
import { AddCourseComponent } from '@app/components/courses/add/add.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
  },
  {
    path: 'courses/simulate',
    component: SimulateCoursesComponent,
  },
  {
    path: 'courses/edit',
    component: EditCoursesComponent,
  },
  {
    path: 'courses/add',
    component: AddCourseComponent,
  },
];
