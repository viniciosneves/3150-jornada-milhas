import { Component } from '@angular/core';
import { FormBuscaValue } from 'src/app/shared/form-busca/form-busca.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  buscar (dados: Partial<FormBuscaValue>) {
    console.log(dados)
  }
}
