import { Component, signal } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isSidebarCollapsed = signal(false);
  faArrowLeft = signal(faArrowLeft).asReadonly();
  faArrowRight = signal(faArrowRight).asReadonly();

  onSidebarToggle() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed);
  }
}
