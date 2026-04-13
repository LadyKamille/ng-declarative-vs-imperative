import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { SpellsService } from '../shared/spells.service';
import { AsyncPipe } from '@angular/common';
import { catchError, filter, map, of, startWith, switchMap } from 'rxjs';
import { MarkdownPipe } from '../shared/markdown.pipe';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-spells',
  standalone: true,
  imports: [AsyncPipe, MarkdownPipe],
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsComponent {
  private spellsService = inject(SpellsService);

  readonly spellsState$ = this.spellsService.getAll$().pipe(
    map(data => ({ loading: false, data, error: null })),
    catchError(() => of({ loading: false, data: null, error: 'Failed to load spells.' })),
    startWith({ loading: true, data: null, error: null }),
  );

  readonly selectedSpellUrl = signal<string | null>(null);
  readonly selectedSpellUrl$ = toObservable(this.selectedSpellUrl);

  readonly spellDetailsState$ = this.selectedSpellUrl$.pipe(
    filter((url): url is string => url !== null),
    switchMap(url => this.spellsService.get$(url).pipe(
      map(data => ({ loading: false, data, error: null })),
      catchError(() => of({ loading: false, data: null, error: 'Failed to load spell details.' })),
      startWith({ loading: true, data: null, error: null }),
    )),
  );

  selectSpell(url: string): void {
    this.selectedSpellUrl.set(url);
  }
}
