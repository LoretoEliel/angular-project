import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HomeContainer } from "./home.container";
import { EmployeeService } from "src/app/employes/services/employee.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { translateModuleConfig } from "src/app/translate/translateModuleConfig";

describe('HomeContainer', () => {
    let component: HomeContainer;
    let fixture: ComponentFixture<HomeContainer>;

    beforeEach(() => { // -> Configuración de los testbed
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule, // -> Este modulo se encarga de hacer peticiones que no son reales.
                TranslateModule.forRoot(translateModuleConfig)
            ],
            declarations: [
                HomeContainer // -> Componente que recibira las pruebas unitarias.
            ],
            providers: [
                EmployeeService, // -> Servicio que se usa en el componente.
                TranslateService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // -> Los esquemas son opcionales, pero es recomendable asignarlos a las pruebas
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // -> Verificar si el componente fue creado.
    it('Should create', () => {
        expect(component).toBeTruthy();
    });
});