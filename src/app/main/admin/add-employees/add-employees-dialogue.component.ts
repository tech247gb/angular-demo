import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { EmployessService } from 'src/app/core/services/employess.service';


@Component({
	selector: 'app-add-employees-dialogue',
	templateUrl: './add-employees-dialogue.component.html',
	styleUrls: ['./add-employees-dialogue.component.scss']
})
export class AddEmployeesDialogueComponent implements OnInit {
	addEmployeesForm!: FormGroup;
	files!: any[]
	title:any;
	breakpoint: number | undefined; 
	constructor(private fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEmployeesDialogueComponent>, public employeeService: EmployessService) { }
	ngOnInit(): void {
		this.title='Add Employee';
		this.addEmployeesForm = this.fb.group({
			name: [null, [Validators.required]],
			email: [null, [Validators.required]],
			gender: [null, [Validators.required]],
			status: [null, [Validators.required]],
		});
		if (this.data && this.data.id) {
			this.title='Edit Employee';
			this.addEmployeesForm.patchValue({
				name: this.data.name,
				email: this.data.email,
				status: this.data.status,
				gender: this.data.gender
			});
		}
		console.log(this.title);
	}
	closeDialog() {
		this.dialogRef.close(true);
	}
	async addEmployee(data:any) {
		if (this.addEmployeesForm?.valid ) {
			if(data && this.data.id){
				let res = await this.employeeService.editEmployee(this.addEmployeesForm.value,data);
			}else{
				 let res = await this.employeeService.addEmployee(this.addEmployeesForm.value);
			}
			let employeeList=await this.employeeService.getEmployees();
			this.employeeService.changeList(employeeList);
			this.dialogRef.close(true);
		}
	}
	public onResize(event: any): void {
		this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
	  }

}
