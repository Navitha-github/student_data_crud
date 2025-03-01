import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-create-student',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css'
})
export class CreateStudentComponent implements OnInit{
  stname: string = '';
  roll: string = '';
  mobile: string = '';
  course: string = '';
  address: string = '';

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute) {}

id: number | null = null;

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    if (params['id']) {
      this.id = +params['id'];
      this.getStudentDetails(this.id);
    }
  });
}

getStudentDetails(id: number) {
  this.studentService.getStudents().subscribe(students => {
    const student = students.find(stu => stu.id === id);
    if (student) {
      this.stname = student.student_name;
      this.roll = student.roll_no;
      this.mobile = student.mobile;
      this.course = student.course;
      this.address = student.address;
    }
  });
}


save() {
  const student = {
    name: this.stname,
    rollNo: this.roll,
    mobile: this.mobile,
    course: this.course,
    address: this.address
  };

  if (this.id) {
    this.studentService.updateStudent(this.id, student).subscribe(() => {
      alert('Student updated successfully!');
      this.router.navigate(['/students']);
    });
  } else {
    this.studentService.addStudent(student).subscribe(() => {
      alert('Student added successfully!');
      this.router.navigate(['/students']);
    });
  }
}
}
