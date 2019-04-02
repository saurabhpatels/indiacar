import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    apiURL = 'https://yts.am/api/v2/list_movies.json';

    constructor(private http: HttpClient) { }
    // Http Options
/*    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
*/
    // HttpClient API get() method => Fetch employees list
    getEmployees(): Observable<any> {
        return this.http.get<any>(this.apiURL)
            .pipe(
                retry(1),
                catchError(ApiService.handleError)
            )
    }


    // Error handling
    static handleError(error) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
