import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faCoffee,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { pathRoutes } from '@src/app/app.routes';

interface MenuItem {
  icon: IconDefinition;
  label: string;
  isOpen?: boolean;
  routerLink?: string[];
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FaIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarCollapsed = input.required<boolean>();
  faChevronDown = signal(faChevronDown).asReadonly();

  menuItems = <MenuItem[]>[
    {
      icon: faCoffee,
      label: 'Home',
      routerLink: [pathRoutes.homeScreen],
    },
    {
      icon: faCoffee,
      label: 'Courses',
      isOpen: false,
      children: [
        {
          icon: faCoffee,
          label: 'List',
          routerLink: [pathRoutes.courses.list],
        },
        { icon: faCoffee, label: 'Add', routerLink: [pathRoutes.courses.add] },
        {
          icon: faCoffee,
          label: 'Edit',
          routerLink: [pathRoutes.courses.edit],
        },
        {
          icon: faCoffee,
          label: 'Simulate',
          routerLink: [pathRoutes.courses.simulate],
        },
      ],
    },
    {
      icon: faCoffee,
      label: 'Settings',
      isOpen: false,
      children: [
        { icon: faCoffee, label: 'Profile' },
        { icon: faCoffee, label: 'Security' },
      ],
    },
    {
      icon: faCoffee,
      label: 'Messages',
    },
  ];

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed() && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
