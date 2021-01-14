import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILogin } from "../interfaces/i.login";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) {

    }
    
    login(lp: ILogin):Observable<{token: string}> {
        return this.http.post<{token: string}>("/api/v1/auth/login", lp);
    }

    register(){
        
    }
}