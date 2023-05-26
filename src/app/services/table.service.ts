import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private http:HttpClient) { }
  baseUrl = 'http://localhost:3000'

  public fetchData(): Observable<any> {
  const url = `${this.baseUrl}/data`;
    return this.http.get<any>(url);
  }

  updateData(observation:any) {
    const url =  `${this.baseUrl}/data/1`;
    this.http.put(url, observation).subscribe(
      response => {
        console.log('Data updated successfully', response);
      },
      error => {
        console.error('Error occurred while updating data', error);
      }
    );
  }
}

