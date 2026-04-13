import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';

export const SPELL_SCHOOLS = [
  { index: 'abjuration', name: 'Abjuration' },
  { index: 'conjuration', name: 'Conjuration' },
  { index: 'divination', name: 'Divination' },
  { index: 'enchantment', name: 'Enchantment' },
  { index: 'evocation', name: 'Evocation' },
  { index: 'illusion', name: 'Illusion' },
  { index: 'necromancy', name: 'Necromancy' },
  { index: 'transmutation', name: 'Transmutation' },
];

export const SPELL_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

@Component({
  selector: 'app-spell-filters',
  standalone: true,
  templateUrl: './spell-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellFiltersComponent {
  readonly levelChange = output<number | null>();
  readonly schoolChange = output<string | null>();

  readonly schools = SPELL_SCHOOLS;
  readonly levels = SPELL_LEVELS;

  readonly selectedLevel = signal<number | null>(null);
  readonly selectedSchool = signal<string | null>(null);
  readonly hasActiveFilters = computed(() => this.selectedLevel() !== null || this.selectedSchool() !== null);

  onLevelChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const level = value !== '' ? Number(value) : null;
    this.selectedLevel.set(level);
    this.levelChange.emit(level);
  }

  onSchoolChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const school = value || null;
    this.selectedSchool.set(school);
    this.schoolChange.emit(school);
  }

  clearFilters(): void {
    this.selectedLevel.set(null);
    this.selectedSchool.set(null);
    this.levelChange.emit(null);
    this.schoolChange.emit(null);
  }
}
