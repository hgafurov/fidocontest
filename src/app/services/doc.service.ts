import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IDoc } from "../interfaces/i.doc";

@Injectable({
    providedIn: 'root'
})
export class DocService {

    constructor(private http: HttpClient) {

    }

    getDocs(): Observable<IDoc[]> {
        return this.http.get<IDoc[]>(environment.apiUrl + "/api/v1/doc/get-all");
    }

    getDocById(id: number): Observable<IDoc> {
        return this.http.get<IDoc>(environment.apiUrl + '/api/v1/doc/get/' + id);
    }

    saveDoc(doc: IDoc): Observable<IDoc> {
        return this.http.post<IDoc>(environment.apiUrl + '/api/v1/doc/save-doc', doc);
    }

    updateDoc(doc: IDoc): Observable<IDoc> {
        return this.http.post<IDoc>(environment.apiUrl + '/api/v1/doc/update', doc);
    }

    deleteDoc(id: number): Observable<any> {
        return this.http.get(environment.apiUrl + '/api/v1/doc/delete/' + id);
    }
    
    task2(): Observable<IDoc[]> {
        return this.http.get<IDoc[]>(environment.apiUrl + "/api/v1/doc/task2");
    }

    task3(): Observable<IDoc[]> {
        return this.http.get<IDoc[]>(environment.apiUrl + "/api/v1/doc/task3");
    }

    task4(): Observable<IDoc[]> {
        return this.http.get<IDoc[]>(environment.apiUrl + "/api/v1/doc/task4");
    }
}