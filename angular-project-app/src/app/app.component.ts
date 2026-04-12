import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { DialogMessage } from './shared/components/dialog-message/dialog-message';
import { SidebarComponent } from './core/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    RouterOutlet,
    LoadingComponent,
    DialogMessage,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isSidebarCollapsed = signal(false);

  onSidebarToggle() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed);
  }
}
