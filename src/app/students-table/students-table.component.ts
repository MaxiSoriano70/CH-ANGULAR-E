import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FullnamePipe } from '../../shared/pipes/fullname.pipe';
import { Router, RouterModule } from '@angular/router';
import { RoutePaths } from '../../shared/routes';
import { User } from '../../shared/entities';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FullnamePipe,
    RouterModule
  ],
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnChanges, AfterViewInit {
  @Input() students: User[] = [];
  @Output() editStudent = new EventEmitter<User>();
  @Output() deleteStudent = new EventEmitter<User>();

  constructor(private router: Router){}

  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.students;
  }

  onEdit(student: User): void {
    this.editStudent.emit(student);
  }

  onDelete(student: User): void {
    this.deleteStudent.emit(student);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['students'] && !changes['students'].firstChange) {
      this.dataSource.data = this.students;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewDetails(student: User){
    this.router.navigate([`${RoutePaths.ALUMNODETALLE}`],
      {
        state: { student: student }
      }
    )
  }
}
