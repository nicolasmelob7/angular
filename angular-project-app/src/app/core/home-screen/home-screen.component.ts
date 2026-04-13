import { Component, OnDestroy, signal } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent {}
