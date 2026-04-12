import { Component, signal } from '@angular/core';
import { TypewriterComponent } from '@src/app/shared/components/typewriter/typewriter.component';

const phrase1 = 'Hey!';
const phrase2 = 'Do you wanna play a game?';
const phrase3 = 'or not?!';
const phrase4 = "c'mon ...";

const phrases = [phrase1, phrase2, phrase3, phrase4];

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [TypewriterComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent {
  phrases = signal(phrases).asReadonly();
}
