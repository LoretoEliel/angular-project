import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { Employee } from "../interfaces/employee.interface";
import { EmployeeService } from "./employee.service";
import * as moment from "moment";

const urlBase: string = "http://localhost:3000";
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

describe('EmployeeService', () => {
    let service: EmployeeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                EmployeeService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        service = TestBed.inject(EmployeeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // -> Esto evita que no lance ninguna petición
    });

    it('Should create', () => {
        expect(service).toBeTruthy();
    });

    it('get() -> return list employes for method get', () => {
        service.get().subscribe((res) => {
            expect(res).not.toBeNull;
            expect(res).not.toBeUndefined;
            expect(res).toEqual(listEmployes);
        });

        const req = httpMock.expectOne(`${urlBase}/employes`);
        expect(req.request.method).toBe('GET');
        req.flush(listEmployes);
    });
    
    it('post() -> create employ for method post', () => {
        const __data: Employee = {
            name: "Carlos",
            lastname: "Castellano",
            profile: 1,
            d_create: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        service.post(__data).subscribe((res) => {
            expect(res).not.toBeNull;
            expect(res).not.toBeUndefined;
            expect(res === {id: 0}).toBeTrue;
        });

        const req = httpMock.expectOne(`${urlBase}/employes`);
        expect(req.request.method).toBe('POST');
        req.flush({id: 0});
    });

    it('put() -> update employ for method put', () => {
        const __data: Employee = {
            name: "Carlos",
            lastname: "Castellano",
            profile: 1,
            d_create: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        service.put(1, __data).subscribe((res) => {
            expect(res).not.toBeNull;
            expect(res).not.toBeUndefined;
            expect(res === {id: 1}).toBeTrue;
        });

        const req = httpMock.expectOne(`${urlBase}/employes/${1}`);
        expect(req.request.method).toBe('PUT');
        req.flush({id: 1});
    });
});