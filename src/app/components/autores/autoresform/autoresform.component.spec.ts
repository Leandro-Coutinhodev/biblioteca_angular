import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresformComponent } from './autoresform.component';

describe('AutoresformComponent', () => {
  let component: AutoresformComponent;
  let fixture: ComponentFixture<AutoresformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoresformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoresformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
