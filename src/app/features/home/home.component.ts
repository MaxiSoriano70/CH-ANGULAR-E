import { Component } from '@angular/core';
import { NuestrosSponsorsComponent } from "../../nuestros-sponsors/nuestros-sponsors.component";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Course } from '../../../shared/entities';
import { HomeApiService } from './home-api.service';
import { LoadingComponent } from '../../loading/loading.component';
import { BigtittleDirective } from '../../../shared/directives/bigtittle.directive';
import { VeterinariaComponent } from "../../veterinaria/veterinaria.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, NuestrosSponsorsComponent, LoadingComponent, BigtittleDirective, VeterinariaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses$!: Observable<Course[]>;

  constructor(private homeApiService: HomeApiService) { }

  ngOnInit(): void {
    this.courses$ = this.homeApiService.getCursos();
  }

  private loadCourses() {
    this.courses$ = this.homeApiService.getCursos();
  }
}
