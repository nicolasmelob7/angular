import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [MatProgressSpinnerModule, AsyncPipe, NgTemplateOutlet],
  standalone: true,
})
export class LoadingComponent implements OnInit {
  loading$: Observable<boolean>;

  detectRouteTransitions = input<boolean>();

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions()) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          }),
        )
        .subscribe();
    }
  }
}
