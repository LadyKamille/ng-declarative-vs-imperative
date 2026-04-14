import { Component, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpellsComponent } from './spells/spells.component';
import { SpellsImperativeComponent } from './spells-imperative/spells-imperative.component';
import { SpellsExperimentalComponent } from './spells-experimental/spells-experimental.component';

type SpellView = 'declarative' | 'imperative' | 'experimental';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SpellsComponent, SpellsImperativeComponent, SpellsExperimentalComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  spellComponent: WritableSignal<SpellView> = signal('declarative');

  readonly views: { id: SpellView; label: string }[] = [
    { id: 'imperative', label: 'Imperative' },
    { id: 'declarative', label: 'Declarative (RxJS)' },
    { id: 'experimental', label: 'Resource API' },
  ];
}
