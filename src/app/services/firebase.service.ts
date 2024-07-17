import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, tap } from "rxjs";
import { UserModel } from "../models/user.model";
import { UserSubject } from "./user.subject";
import { User } from "../models/user";

@Injectable({
    providedIn: "root"
})
export class FirebaseService {

    url: string = "https://filmdizibulmaseysi-default-rtdb.firebaseio.com/"

    constructor(
        private http: HttpClient,
        private usersubject: UserSubject,
    ) {}

    AddUser(user: UserModel): Observable<UserModel> {
        let currentuser: User = this.usersubject.user();
        return this.http.post<UserModel>( this.url + ".json?auth=" + currentuser?.token, user);
    }

    GetUser(userId: string): Observable<UserModel> {
        return this.http.get<UserModel[]>( this.url + "users.json" ).pipe(
            map(data => {
                let returnuser: UserModel | null = null;
                for (let key in data) {
                    let user: UserModel = data[key];
                    if (user.id === userId) {
                        returnuser = user;
                        returnuser.id = key;
                    }
                }
                return returnuser;
            })
        )
    }

    GetUserFavoriteList(what: string) {
        let user: User = this.usersubject.user();
        return this.http.get(this.url + "users/" + user.id + ".json" ).pipe(
            map(userInfo => {
                return userInfo[what];
            })
        )
    }

    AddorRemoveMovieFavorite(status: string, movieId: number) {

        let user: User = this.usersubject.user();
        return this.http.get(this.url + "users/" + user.id + ".json" ).pipe(
            map(userInfo => {
                let movies: number[] = userInfo["movies"]
                if (status == "Add") {
                    if (!movies.includes(movieId)) {
                        movies.push(movieId);
                    }
                } else if (status == "Remove") {
                    if (movies.includes(movieId)) {
                        let index = movies.indexOf(movieId)
                        movies.splice(index, 1);
                    }
                }
                return movies;
            }),
            exhaustMap(moviesList => {
                return this.http.patch<UserModel[]>( this.url + "users/" + user.id + ".json?auth=" + user?.token, { movies: moviesList  } ).pipe(
                    // tap(data => {console.log(data)})
                )
            })
        )
    }

    AddorRemoveTvShowFavorite(status: string, tvshowId: number) {

        let user: User = this.usersubject.user();
        return this.http.get(this.url + "users/" + user.id + ".json" ).pipe(
            map(userInfo => {
                let tvshows: number[] = userInfo["tvshows"]
                if (status == "Add") {
                    if (!tvshows.includes(tvshowId)) {
                        tvshows.push(tvshowId);
                    }
                } else if (status == "Remove") {
                    if (tvshows.includes(tvshowId)) {
                        let index = tvshows.indexOf(tvshowId)
                        tvshows.splice(index, 1);
                    }
                }
                return tvshows;
            }),
            exhaustMap(tvshowsList => {
                return this.http.patch<UserModel[]>( this.url + "users/" + user.id + ".json?auth=" + user?.token, { tvshows: tvshowsList  } ).pipe(
                    // tap(data => {console.log(data)})
                )
            })
        )
    }

    AddorRemovePersonFavorite(status: string, personId: number) {

        let user: User = this.usersubject.user();
        return this.http.get(this.url + "users/" + user.id + ".json" ).pipe(
            map(userInfo => {
                let people: number[] = userInfo["celebrities"]
                if (status == "Add") {
                    if (!people.includes(personId)) {
                        people.push(personId);
                    }
                } else if (status == "Remove") {
                    if (people.includes(personId)) {
                        let index = people.indexOf(personId)
                        people.splice(index, 1);
                    }
                }
                return people;
            }),
            exhaustMap(peopleList => {
                return this.http.patch<UserModel[]>( this.url + "users/" + user.id + ".json?auth=" + user?.token, { celebrities: peopleList  } ).pipe(
                    // tap(data => {console.log(data)})
                )
            })
        )
    }

}

