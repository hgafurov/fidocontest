import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ILogin } from "../interfaces/i.login";
import { IUser } from "../interfaces/i.user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    private token: string = null;
    
    constructor(private http: HttpClient) {

    }
    
    login(lp: ILogin):Observable<{token: string}> {
        return this.http.post<{token: string}>("/api/v1/auth/login", lp)
            .pipe(tap(({token}) => {
                localStorage.setItem('fido-token', token);
                this.setToken(token);
            }));
    }

    register(user: IUser): Observable<IUser> {       
       return this.http.post<IUser>("/api/v1/auth/create-user", user);
    }

    getCurrentUser(): Observable<IUser> {
      if (this.token) {
        return this.http.post<IUser>("/api/v1/auth/guser", {token: this.token});
      } 
      return null;
    } 

    updateUser(user: IUser) {
        return this.http.post<IUser>("/api/v1/auth/update-user", user)
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    logout() {
        this.setToken(null);
        localStorage.clear();
    }
}