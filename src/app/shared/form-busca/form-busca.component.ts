import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuscaValue, UnidadeFederativa } from 'src/app/core/interfaces/types';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';



@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  @Output() aoBuscar = new EventEmitter<Partial<FormBuscaValue>>();


  ufs: UnidadeFederativa[] = []

  tipos: string[] = ['Econômica', 'Executiva']

  constructor(
    public formBuscaService: FormBuscaService, 
    private ufService: UnidadeFederativaService
  ) {

    this.ufService.listar()
      .subscribe(data => {
        this.ufs = data;
      })
  }
  onSubmit (): void {
    this.aoBuscar.emit(this.formBuscaService.formBusca.value);
  }
}
