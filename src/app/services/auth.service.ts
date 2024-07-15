import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { effect, Injectable } from "@angular/core";
import { AuthResponse } from "../models/auth.response";
import { catchError, Observable, tap, throwError } from "rxjs";
import { FirebaseService } from "./firebase.service";
import { UserModel } from "../models/user.model";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { UserSubject } from "./user.subject";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    url: string = "https://securetoken.googleapis.com/v1/token?key=";
    api_key: string = environment.api_key;

    constructor(
        private http: HttpClient,
        private firebaseService: FirebaseService,
        private usersubject: UserSubject,
        private router: Router
    ) {
        effect(() => {
            console.log("Current user: ", this.usersubject.user());
        })
    }

    autologin() {
        if (localStorage.getItem("user") == "null") {
            return
        }
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const loadeduser = new User(
            user.id,
            user.email,
            user.name,
            user.surname,
            user.localId,
            user._token,
            new Date(user._tokenExpirationDate)
        );
        if (loadeduser.token) {
            this.usersubject.user.set(loadeduser);
        }
    }

    register(name: string, surname: string, email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.api_key, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            tap(response => {
                const user: UserModel = {
                    id: response.localId,
                    name: name,
                    surname: surname,
                    email: email,
                    movies: [1],
                    tvshows: [1],
                    celebrities: [1]
                }
                this.firebaseService.AddUser(user).subscribe(userInfo => {
                    this.handleUser(
                        userInfo.name,
                        response.email,
                        user.name,
                        user.surname,
                        response.localId,
                        response.idToken,
                        response.expiresIn
                    );
                });
            }),
            catchError(this.handleError)
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            tap(response => {
                const id = response.localId;
                this.firebaseService.GetUser(id).subscribe(user => {
                    console.log(user)
                    this.handleUser(
                        user.id,
                        response.email,
                        user.name,
                        user.surname,
                        response.localId,
                        response.idToken,
                        response.expiresIn
                    );
                })
            }),
            catchError(this.handleError)
        );
    }

    logout() {
        this.usersubject.user.set(null);
        localStorage.setItem("user", null);
        this.router.navigate(["/home"]);
    }

    private handleUser(
        id: string,
        email: string,
        name: string,
        surname: string,
        localId: string,
        idToken: string,
        expiresIn: string
    ) {
        const expirationDate = new Date(new Date().getTime() + (Number(expiresIn) * 1000));
        const user = new User(
            id,
            email,
            name,
            surname,
            localId,
            idToken,
            expirationDate
        );
        this.usersubject.user.set(user);
        localStorage.setItem("user", JSON.stringify(user));

        this.router.navigate(['/home'])
    }

    private handleError(err: HttpErrorResponse) {
        let message: string = "hata oluştu";

        if (err.error.error) {
            switch (err.error.error.message) {
                case "EMAIL_EXISTS":
                    message = "Bu mail adresi zaten kullanılıyor";
                    break;
                case "TOO_MANY_ATTEMPTS_TRY_LATER":
                    message = "Çok fazla deneme yapıldı";
                    break;
                case "EMAIL_NOT_FOUND":
                    message = "Mail adresi bulunamadı";
                    break;
                case "INVALID_PASSWORD":
                    message = "Parola yanlış";
                    break;
                case "USER_DISABLED":
                    message = "Hesabınız Pasifleştirildi.";
                    break;
                case "INVALID_LOGIN_CREDENTIALS":
                    message = "Zaten giriş yaptınız";
                    break;
            }
        }
        return throwError(() => message)
    }

}