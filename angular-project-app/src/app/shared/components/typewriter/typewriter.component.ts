import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { sleep } from '../../common/common';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  imports: [],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.scss',
})
export class TypewriterComponent implements AfterViewInit {
  phrases = input.required<string[]>();
  sleepTyping = input<number>(200);
  sleepBetweenPhrases = input<number>(2000);
  sleepBetweenLoop = input<number>(1500);

  value = viewChild.required<ElementRef<HTMLSpanElement>>('value');

  async ngAfterViewInit() {
    setTimeout(() => {
      this.writePhrases(this.phrases());
    }, 1000);
  }

  writeLetter(letter: string) {
    this.value().nativeElement.textContent += letter;
  }

  async writePhrase(phrase: string): Promise<void> {
    this.value().nativeElement.textContent = '';
    for (let i = 0; i < phrase.length; i++) {
      this.writeLetter(phrase[i]);
      await sleep(this.sleepTyping());
    }
  }

  async writePhrases(phrases: string[]) {
    setTimeout(async () => {
      let index = 0;
      let len = phrases.length;
      while (index < len) {
        await this.writePhrase(phrases[index]);
        if (index < len - 1) await sleep(this.sleepBetweenPhrases());
        index += 1;
      }
      this.writePhrases(phrases);
    }, this.sleepBetweenLoop());
  }
}
