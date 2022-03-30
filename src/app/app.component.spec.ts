import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { AppComponent } from "./app.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { translateModuleConfig } from "./translate/translateModuleConfig";

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(() => { // -> Configuración de los testbed
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				TranslateModule.forRoot(translateModuleConfig)
			],
			declarations: [
				AppComponent // -> Componente que recibira las pruebas unitarias.
			],
			providers: [
				TranslateService
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // -> Los esquemas son opcionales, pero es recomendable asignarlos a las pruebas
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// -> Verificar si el componente fue creado.
	it('Should create', () => {
		expect(component).toBeTruthy();
	});
});