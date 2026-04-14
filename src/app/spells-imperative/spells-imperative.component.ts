import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { SpellDetails, Spells, SpellsService } from '../shared/spells.service';
import { MarkdownPipe } from '../shared/markdown.pipe';
import { SpellFiltersComponent } from '../shared/spell-filters/spell-filters.component';

@Component({
    selector: 'app-spells-imperative',
    imports: [MarkdownPipe, SpellFiltersComponent],
    templateUrl: './spells-imperative.component.html',
    styleUrl: './spells-imperative.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpellsImperativeComponent implements OnInit {
  private spellsService = inject(SpellsService);
  private cdr = inject(ChangeDetectorRef);

  spells?: Spells['results'];
  isSpellsLoading = false;
  spellsError?: string;

  filterLevel?: number;
  filterSchool?: string;

  selectedSpellUrl?: string;

  spellDetails?: SpellDetails;
  isSpellDetailsLoading = false;
  spellDetailsError?: string;

  ngOnInit(): void {
    this.setSpells();
  }

  setSpells(): void {
    this.isSpellsLoading = true;
    this.spellsError = undefined;

    this.spellsService
      .getAll({ level: this.filterLevel, school: this.filterSchool })
      .then((spells) => {
        this.spells = spells?.results;
      })
      .catch(() => {
        this.spellsError = 'Failed to load spells.';
      })
      .finally(() => {
        this.isSpellsLoading = false;
        this.cdr.detectChanges();
      });
  }

  onLevelChange(level: number | null): void {
    this.filterLevel = level ?? undefined;
    this.setSpells();
  }

  onSchoolChange(school: string | null): void {
    this.filterSchool = school ?? undefined;
    this.setSpells();
  }

  selectSpell(url: string): void {
    this.selectedSpellUrl = url;
    this.setSpellDetails();
  }

  setSpellDetails(): void {
    this.isSpellDetailsLoading = true;
    this.spellDetailsError = undefined;
    this.spellsService
      .get(this.selectedSpellUrl!)
      .then((details) => {
        this.spellDetails = details;
      })
      .catch(() => {
        this.spellDetailsError = 'Failed to load spell details.';
      })
      .finally(() => {
        this.isSpellDetailsLoading = false;
        this.cdr.detectChanges();
      });
  }
}
