import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  inject,
  input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { tap } from 'rxjs';
import { LoadingService } from './service/loading.service';
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
export class LoadingComponent {
  loadingService = inject(LoadingService);
  router = inject(Router);

  loading$ = this.loadingService.loading$;

  @ContentChild('loading')
  customLoadingIndicator: TemplateRef<any> | null = null;
}
