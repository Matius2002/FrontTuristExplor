import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExperienciaComponent } from './editar-experiencia.component';

describe('EditarExperienciaComponent', () => {
  let component: EditarExperienciaComponent;
  let fixture: ComponentFixture<EditarExperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarExperienciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
