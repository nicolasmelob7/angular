import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faCoffee,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  icon: IconDefinition;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarCollapsed = input.required<boolean>();
  faChevronDown = signal(faChevronDown).asReadonly();

  menuItems = [
    {
      icon: faCoffee,
      label: 'Dashboard',
      isOpen: false,
      children: [
        { icon: faCoffee, label: 'Analytics' },
        { icon: faCoffee, label: 'Projects' },
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
