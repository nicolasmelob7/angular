import { Routes } from '@angular/router';
import { HomeScreenComponent } from '@src/app/core/home/home-screen/home-screen.component';
import { SimulateCoursesComponent } from '@src/app/modules/courses/components/simulate/simulate.component';
import { EditCoursesComponent } from '@src/app/modules/courses/components/edit/edit.component';
import { AddCourseComponent } from '@src/app/modules/courses/components/add/add.component';
import { ListCourseComponent } from './modules/courses/components/list/list';

export const pathRoutes = {
  homeScreen: '',
  courses: {
    list: 'courses-list',
    add: 'courses-add',
    edit: 'courses-edit',
    simulate: 'courses-simulate',
  },
};

export const routes: Routes = [
  {
    path: pathRoutes.homeScreen,
    component: HomeScreenComponent,
  },
  {
    path: pathRoutes.courses.list,
    component: ListCourseComponent,
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
