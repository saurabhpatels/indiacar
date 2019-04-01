import { Injectable } from '@angular/core';
import {Users} from '../services/users';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    usersRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
    userRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

    // Inject AngularFireDatabase Dependency in Constructor
    constructor(private db: AngularFireDatabase) { }
    // Create Student
    AddStudent(users: Users) {
        this.usersRef.push({
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            mobileNumber: users.mobileNumber
        });
    }

    // Fetch Single Student Object
    GetStudent(id: string) {
        this.userRef = this.db.object('users-list/' + id);
        return this.userRef;
    }
    // Fetch Students List
    GetStudentsList() {
        this.usersRef = this.db.list('users-list');
        return this.usersRef;
    }
// Update Student Object
    UpdateStudent(users: Users) {
        this.userRef.update({
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            mobileNumber: users.mobileNumber
        })
    }
    // Delete Student Object
    DeleteStudent(id: string) {
        this.userRef = this.db.object('users-list/'+id);
        this.userRef.remove();
    }
}
