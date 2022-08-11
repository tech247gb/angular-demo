import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployessService } from 'src/app/core/services/employess.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeesDialogueComponent } from '../add-employees/add-employees-dialogue.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  displayedColumns = ['id', 'name', 'email', 'gender', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  currentList:any;

  constructor(public employeeService: EmployessService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    let values = await this.employeeService.getEmployees();
    this.employeeService.changeList(values);
    this.currentList=await this.employeeService.currentEmployeeList;
    this.employeeService.currentEmployeeList.subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  addEmployees() {
    let dialogRef = this.dialog.open(AddEmployeesDialogueComponent, {
      data: {}
    });
    dialogRef.afterClosed()
  }
  editEmployees(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = item
    let dialogRef = this.dialog.open(AddEmployeesDialogueComponent, dialogConfig);
    dialogRef.afterClosed()
  }
  async deleteEmployees(item: any) {
    if (confirm("Are you sure to delete " + item.name)) {
      this.employeeService.deleteEmployee(item);
      let values = await this.employeeService.getEmployees();
      this.employeeService.changeList(values);    
      console.log("Implement delete functionality here");
    }
  }

}
