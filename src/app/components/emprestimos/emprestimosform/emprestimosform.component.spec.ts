import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimosformComponent } from './emprestimosform.component';

describe('EmprestimosformComponent', () => {
  let component: EmprestimosformComponent;
  let fixture: ComponentFixture<EmprestimosformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimosformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprestimosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
