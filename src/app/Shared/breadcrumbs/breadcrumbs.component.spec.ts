import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent; // Declaramos la variable que contendrá la instancia del componente
  let fixture: ComponentFixture<BreadcrumbsComponent>; // Variable para manejar el fixture del componente

  // Configuración antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent] // Importamos el componente que estamos probando
    })
      .compileComponents(); // Compilamos los componentes importados

    fixture = TestBed.createComponent(BreadcrumbsComponent); // Creamos una instancia del componente
    component = fixture.componentInstance; // Obtenemos la instancia del componente
    fixture.detectChanges(); // Detectamos cambios en el componente para que se reflejen en la vista
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verificamos que la instancia del componente sea verdadera (exista)
  });
});

