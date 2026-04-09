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

  selectedSpellUrl?: string;

  spellDetails?: SpellDetails;

  ngOnInit(): void {
    this.setSpells();
  }

  setSpells(): void {
    this.spellsService.getAll().subscribe((spells) => {
      this.spells = spells?.results;
      this.cdr.detectChanges();
    });
  }

  selectSpell(url: string): void {
    this.selectedSpellUrl = url;
    this.setSpellDetails();
  }

  setSpellDetails(): void {
    this.spellsService.get(this.selectedSpellUrl!).subscribe((details) => {
      this.spellDetails = details;
      this.cdr.detectChanges();
    });
  }
}
