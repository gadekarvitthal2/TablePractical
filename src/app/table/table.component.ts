import { Component, OnInit } from '@angular/core';

import { TableService } from '../services/table.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  observations: any[] | undefined;
  Data:any
  properties:any
  constructor(private tableService:TableService) {}
  ngOnInit(): void {
    this.tableService.fetchData().subscribe(
      (response) => {
        this.observations = response[0].Datas;
        this.Data=response;
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  getProperty(properties: any[], label: string): any {
    const property = properties.find(p => p.Label === label);
    return property ? property.Value : '';
  }
}
