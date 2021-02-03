import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IDoc } from "../interfaces/i.doc";

@Injectable({
    providedIn: 'root'
})
export class DocService {

    restUrl: string = "http://localhost:8080";

    constructor(private http: HttpClient) {

    }

    getDocs(): Observable<IDoc[]> {
        return this.http.get<IDoc[]>("/api/v1/doc/get-all");
    }

    getDocById(id: number): Observable<IDoc> {
        return this.http.get<IDoc>('/api/v1/doc/get/' + id);
    }

    saveDoc(doc: IDoc): Observable<IDoc> {
        return this.http.post<IDoc>('/api/v1/doc/save-doc', doc);
    }

    updateDoc(doc: IDoc): Observable<IDoc> {
        return this.http.post<IDoc>('/api/v1/doc/update', doc);
    }

    deleteDoc(id: number): Observable<any> {
        return this.http.get('/api/v1/doc/delete/' + id);
    }
}