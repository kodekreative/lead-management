import { Component, OnInit, ViewChild } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'phone', 'zipCode', 'email']; 
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private leadService: LeadService) {}

  ngOnInit() {
    this.leadService.leads$.subscribe({
      next: (data) => {
        this.dataSource.data = data; 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error fetching leads:', err);
      }
    });

    // Fetch initial leads
    this.leadService.getAllLeads().subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
