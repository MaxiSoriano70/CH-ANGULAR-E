import { Component } from '@angular/core';
import { VeterinariaComponent } from "../../veterinaria/veterinaria.component";
import { PeluqueriaComponent } from "../../peluqueria/peluqueria.component";

@Component({
  selector: 'app-tips',
  imports: [VeterinariaComponent, PeluqueriaComponent],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent {

}
