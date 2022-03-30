import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EmployeeService } from "src/app/employes/services/employee.service";
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { translateModuleConfig } from "src/app/translate/translateModuleConfig";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { EditEmployComponent } from "../../components/edit-employ/edit-employ.component";
import { Employee } from "../../interfaces/employee.interface";
import * as moment from "moment";
import { of, throwError } from "rxjs";
import { TableRow } from "src/app/shared/az-table";

const __data: Employee = {
    id: 0,
    name: "Carlos",
    lastname: "Castellano",
    profile: 1,
    d_create: moment().format("YYYY-MM-DD HH:mm:ss")
};

const employeeServiceMock = {
    put: () => of(__data)
};

const __matDialogData: TableRow = {
    index: 0,
    item: __data,
    selected: false
};

const MatDialogRefMock = {
    close: () => of(true)
};

describe('EditEmployComponent', () => {
    let component: EditEmployComponent;
    let fixture: ComponentFixture<EditEmployComponent>;
    let modalRef: MatDialogRef<EditEmployComponent>;
    let service: EmployeeService;
    let alerts: MatSnackBar;
    let fb: FormBuilder;

    beforeEach(() => { // -> Configuración de los testbed
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule, // -> Este modulo se encarga de hacer peticiones que no son reales.
                TranslateModule.forRoot(translateModuleConfig),
                MatDialogModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatSnackBarModule
            ],
            declarations: [
                EditEmployComponent // -> Componente que recibira las pruebas unitarias.
            ],
            providers: [
                TranslateService,
                { provide: MAT_DIALOG_DATA, useValue: __matDialogData },
                { provide: MatDialogRef, useValue: MatDialogRefMock },
                { provide: EmployeeService, useValue: employeeServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // -> Los esquemas son opcionales, pero es recomendable asignarlos a las pruebas
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEmployComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(EmployeeService); // -> Asi accedemos a variables privadas de los componentes
        modalRef = fixture.debugElement.injector.get(MatDialogRef); // -> Asi accedemos a variables privadas de los componentes
        alerts = fixture.debugElement.injector.get(MatSnackBar);
        fb = fixture.debugElement.injector.get(FormBuilder);
    });

    // -> Verificar si el componente fue creado.
    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    it('submit() -> update employ correctly', () => {
        const spy_1 = spyOn(service, 'put').and.returnValues(of(__data));
        component.submit();
        expect(spy_1).toHaveBeenCalled();
    });

    it('submit() -> faile service', () => {
        const spy_1 = spyOn(service, 'put').and.returnValues(throwError({status: 404}));
        component.submit();
        expect(spy_1).toHaveBeenCalled();
    });
});