import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoslistComponent } from './emprestimoslist.component';

describe('EmprestimoslistComponent', () => {
  let component: EmprestimoslistComponent;
  let fixture: ComponentFixture<EmprestimoslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmprestimoslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmprestimoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
