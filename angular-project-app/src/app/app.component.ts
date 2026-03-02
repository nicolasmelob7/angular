import { Component, signal } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from '@app/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSidebarCollapsed = signal(false);
  faArrowLeft = signal(faArrowLeft).asReadonly();
  faArrowRight = signal(faArrowRight).asReadonly();

  onSidebarToggle() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed);
  }
}
