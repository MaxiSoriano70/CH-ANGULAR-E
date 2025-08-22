import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Course } from '../../shared/entities';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.css'
})

export class CoursesTableComponent implements OnChanges, AfterViewInit {
  @Input() courses: Course[] = [];
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  displayedColumns: string[] = ['name', 'code', 'credits', 'actions'];
  dataSource = new MatTableDataSource<Course>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.courses;
  }

  onEdit(course: Course): void {
    this.editCourse.emit(course);
  }

  onDelete(course: Course): void {
    this.deleteCourse.emit(course);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courses'] && !changes['courses'].firstChange) {
      this.dataSource.data = this.courses;
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
}