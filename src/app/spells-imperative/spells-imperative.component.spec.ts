import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellsImperativeComponent } from './spells-imperative.component';

describe('SpellsImperativeComponent', () => {
  let component: SpellsImperativeComponent;
  let fixture: ComponentFixture<SpellsImperativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellsImperativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellsImperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
