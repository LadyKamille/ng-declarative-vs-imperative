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

  selectedSpellUrl?: string;

  spellDetails?: SpellDetails;
  isSpellDetailsLoading = false;

  ngOnInit(): void {
    this.setSpells();
  }

  setSpells(): void {
    this.isSpellsLoading = true;

    this.spellsService
      .getAll()
      .then((spells) => {
        this.spells = spells?.results;
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
    this.spellsService
      .get(this.selectedSpellUrl!)
      .then((details) => {
        this.spellDetails = details;
      })
      .finally(() => {
        this.isSpellDetailsLoading = false;
        this.cdr.detectChanges();
      });
  }
}
