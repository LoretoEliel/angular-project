import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { EmployeeService } from "src/app/employes/services/employee.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { translateModuleConfig } from "src/app/translate/translateModuleConfig";
import { EmployeeContainer } from "./employee.container";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder, FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Employee } from "../../interfaces/employee.interface";
import { TableActionEvent } from "src/app/shared/az-table";
import { AddEmployComponent } from "../../components/add-employ/add-employ.component";
import { EditEmployComponent } from "../../components/edit-employ/edit-employ.component";

const listEmployes: Employee[] = [
    {
        "name": "Eliel",
        "lastname": "Loreto",
        "profile": 1,
        "id": 1
    },
    {
        "name": "Felipe",
        "lastname": "Salinas",
        "profile": 2,
        "d_create": "2022-03-12 10:03:54",
        "id": 4
    },
    {
        "name": "Juan",
        "lastname": "Diaz",
        "profile": 3,
        "d_create": "2022-03-12 15:21:05",
        "id": 5
    },
    {
        "name": "Camilo",
        "lastname": "Sesto",
        "profile": 4,
        "d_create": "2022-03-12 15:21:47",
        "id": 6
    }
];

const employeeServiceMock = {
    get: () => of(listEmployes)
};

const MatDialogMock = {
    open() {
        return {
            afterClosed: () => of(true)
        };
    }
};

describe('EmployeeContainer', () => {
    let component: EmployeeContainer;
    let fixture: ComponentFixture<EmployeeContainer>;
    let modal: MatDialog;
    let service: EmployeeService;

    beforeEach(() => { // -> Configuración de los testbed
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule, // -> Este modulo se encarga de hacer peticiones que no son reales.
                TranslateModule.forRoot(translateModuleConfig),
                // MatDialogModule,
                BrowserAnimationsModule,
                FormsModule,
                // MatSnackBarModule
            ],
            declarations: [
                EmployeeContainer // -> Componente que recibira las pruebas unitarias.
            ],
            providers: [
                EmployeeService, // -> Servicio que se usa en el componente.
                TranslateService,
                FormBuilder,
                {
                    provide: EmployeeService,
                    useValue: employeeServiceMock
                },
                { provide: MatDialog, useValue: MatDialogMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] // -> Los esquemas son opcionales, pero es recomendable asignarlos a las pruebas
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(EmployeeService); // -> Asi accedemos a variables privadas de los componentes
        modal = fixture.debugElement.injector.get(MatDialog); // -> Asi accedemos a variables privadas de los componentes
    });

    // -> Verificar si el componente fue creado.
    it('Should create', () => {
        expect(component).toBeTruthy();
    });

    // -> Verificando un fecha valida con formato
    it('formatFecha() -> format an date valid and invalid', () => {
        expect(component.formatFecha(new Date())).toEqual(moment().format("YYYY-MM-DD h:mm a"));
        expect(component.formatFecha(new Date())).not.toEqual("Invalid date");
        expect(component.formatFecha(new Date())).not.toBeUndefined;
        expect(component.formatFecha(new Date())).not.toBeNull;
        expect(component.formatFecha("")).toEqual("Invalid date");
    });

    // -> Obtener listado de empleados
    it('getEmployes() -> get list employes', () => {
        component.getEmployes();
        expect(component.listEmployee.length).toBe(4);
    });

    // -> Abrir modal para agregar empleados
    it('openAdd() -> open modal correctly', () => {
        // -> espiar si llaman al method de la modal.
        const spy_1 = spyOn(modal, 'open').and.returnValue({afterClosed: () => of(true)} as MatDialogRef<typeof MatDialogMock>);
        const spy_2 = spyOn(component, "getEmployes").and.callFake(() => null); // -> Llama al servicio pero no hace nada.
        component.openAdd();

        expect(spy_1).toHaveBeenCalled(); // -> Revisar si el method fue llamado correctamente.
        expect(spy_2).toHaveBeenCalled(); // -> Revisar si el method fue llamado correctamente.
    });

    it('onActionClick() -> action click function', () => {
        const event: TableActionEvent = {
            action: {
                name: "editar"
            },
            row: {
                index: 0,
                item: listEmployes[0],
                selected: false
            }
        }

        const spy_1 = spyOn(modal, 'open').and.returnValues({afterClosed: () => of(true)} as MatDialogRef<typeof MatDialogMock>);

        component.onActionClick(event);

        expect(spy_1).toHaveBeenCalled(); // -> Revisar si el method fue llamado correctamente.
    });
});