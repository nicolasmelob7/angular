import { Routes } from '@angular/router';
import { HomeScreenComponent } from '@app/components/home-screen/home-screen.component';
import { SimulateCoursesComponent } from '@app/components/courses/simulate/simulate.component';
import { EditCoursesComponent } from '@app/components/courses/edit/edit.component';
import { AddCourseComponent } from '@app/components/courses/add/add.component';

export const pathRoutes = {
  homeScreen: '',
  courses: {
    list: 'courses/list',
    add: 'courses/add',
    edit: 'courses/edit',
    simulate: 'courses/simulate',
  },
};

export const routes: Routes = [
  {
    path: pathRoutes.homeScreen,
    component: HomeScreenComponent,
  },
  {
    path: pathRoutes.courses.simulate,
    component: SimulateCoursesComponent,
  },
  {
    path: pathRoutes.courses.edit,
    component: EditCoursesComponent,
  },
  {
    path: pathRoutes.courses.add,
    component: AddCourseComponent,
  },
];
