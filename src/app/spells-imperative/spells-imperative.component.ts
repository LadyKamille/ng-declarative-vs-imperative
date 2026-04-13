import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { SpellDetails, Spells, SpellsService } from '../shared/spells.service';
import { MarkdownPipe } from '../shared/markdown.pipe';

@Component({
  selector: 'app-spells-imperative',
  standalone: true,
  imports: [MarkdownPipe],
  templateUrl: './spells-imperative.component.html',
  styleUrl: './spells-imperative.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsImperativeComponent implements OnInit {
  private spellsService = inject(SpellsService);
  private cdr = inject(ChangeDetectorRef);

  spells?: Spells['results'];
  isSpellsLoading = false;
  spellsError?: string;

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
      .getAll()
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
