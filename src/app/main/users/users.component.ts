import { Component, OnInit } from "@angular/core";
import {ApiService} from '../../api/api.service';
import {MatTableDataSource} from '@angular/material';



@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
    displayedColumns: string[] = ['title', 'year', 'rating', 'runtime'];
    dataSource: MatTableDataSource<movies>;

    loader = false;
    constructor(public api: ApiService) {}
    ngOnInit() {
        this.loadEmployees()
    }
    // Get employees list
    loadEmployees() {
        this.loader = true;
        return this.api.getEmployees().subscribe((data: any) => {
            this.loader = false;
            this.dataSource = data.data.movies;
        })
    }
}

export interface movies {
    title: string;
    year: string;
    rating: string;
    runtime: string;
}