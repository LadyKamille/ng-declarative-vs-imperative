import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { SpellDetails, Spells, SpellsService } from '../shared/spells.service';
import { MarkdownPipe } from '../shared/markdown.pipe';
import { SpellFiltersComponent } from '../shared/spell-filters/spell-filters.component';

@Component({
  selector: 'app-spells-experimental',
  imports: [MarkdownPipe, SpellFiltersComponent],
  templateUrl: './spells-experimental.component.html',
  styleUrl: './spells-experimental.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsExperimentalComponent {
  private spellsService = inject(SpellsService);

  readonly filterLevel = signal<number | null>(null);
  readonly filterSchool = signal<string | null>(null);
  readonly selectedSpellUrl = signal<string | null>(null);

  readonly spellsResource = httpResource<Spells>(() =>
    this.spellsService.getAllRequest({ level: this.filterLevel(), school: this.filterSchool() })
  );

  readonly spellDetailsResource = httpResource<SpellDetails>(() => {
    const url = this.selectedSpellUrl();
    return url ? this.spellsService.getRequest(url) : undefined;
  });

  selectSpell(url: string): void {
    this.selectedSpellUrl.set(url);
  }
}
