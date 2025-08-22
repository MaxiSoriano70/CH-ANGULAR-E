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
  selector: 'app-usuario-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FullnamePipe,
    RouterModule
  ],
  templateUrl: './usuario-table.component.html',
  styleUrl: './usuario-table.component.css'
})
export class UsuarioTableComponent implements OnChanges, AfterViewInit{
  @Input() users: User[] = [];
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();

  constructor(private router: Router){}

  displayedColumns: string[] = ['fullname', 'age', 'dni', 'average', 'email', 'role' , 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.users;
  }

  onEdit(user: User): void {
    this.editUser.emit(user);
  }

  onDelete(user: User): void {
    this.deleteUser.emit(user);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && !changes['users'].firstChange) {
      this.dataSource.data = this.users;
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

  viewDetails(user: User){
    this.router.navigate([`${RoutePaths.USUARIODETALLE}`],
      {
        state: { user: user }
      }
    )
  }
}
