import { User } from "../models/user";
import { Injectable, signal, WritableSignal } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserSubject {
    user: WritableSignal<User|null> = signal<User|null>(null);
}