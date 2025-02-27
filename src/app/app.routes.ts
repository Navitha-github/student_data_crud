import { Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentListComponent } from './student-list/student-list.component';

export const routes: Routes = [
    { 
        path: '',
        component: StudentListComponent 
    },
    { 
        path: 'add-student',
        component: CreateStudentComponent 
    },
    { 
        path: 'students',
        component: StudentListComponent 
    },

];
