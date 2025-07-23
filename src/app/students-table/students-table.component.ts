import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Student } from '../../shared/emtities';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FullnamePipe } from '../../shared/pipes/fullname.pipe';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FullnamePipe
  ],
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnChanges, AfterViewInit {
  @Input() students: Student[] = [];

  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average'];
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    // Aquí asignamos paginator y sort después de que existan
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Inicializamos los datos para el primer render
    this.dataSource.data = this.students;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['students'] && !changes['students'].firstChange) {
      // Actualizamos los datos cuando cambian, pero NO la primera vez (para no sobrescribir antes de tener paginator y sort)
      this.dataSource.data = this.students;

      // Volvemos a la primera página para que se refresque bien la tabla
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
