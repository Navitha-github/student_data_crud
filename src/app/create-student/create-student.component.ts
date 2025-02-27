import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-create-student',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent {
  stname: string = '';
  roll: string = '';
  mobile: string = '';
  course: string = '';
  address: string = '';

  constructor(private studentService: StudentService, private router: Router) {}

  save() {
    const student = {
      name: this.stname,
      rollNo: this.roll,
      mobile: this.mobile,
      course: this.course,
      address: this.address
    };

    this.studentService.addStudent(student).subscribe(
      (response) => {
        alert('Student added successfully!');
        this.router.navigate(['/students']);
      },
      (error) => {
        alert('Failed to add student: ' + (error.error?.message || 'Unknown error'));
        console.error(error);
      }
    );
  }
}
