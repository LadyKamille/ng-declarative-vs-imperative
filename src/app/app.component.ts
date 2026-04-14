import { Component, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpellsComponent } from './spells/spells.component';
import { SpellsImperativeComponent } from './spells-imperative/spells-imperative.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SpellsComponent, SpellsImperativeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  spellComponent: WritableSignal<'declarative' | 'imperative'> =
    signal('declarative');

  toggleSpellComponent() {
    this.spellComponent.update((prev) =>
      prev === 'declarative' ? 'imperative' : 'declarative'
    );
  }
}
