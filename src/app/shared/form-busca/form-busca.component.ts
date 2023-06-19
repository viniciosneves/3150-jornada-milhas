import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { UnidadeFederativa } from 'src/app/core/interfaces/types';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';

export interface FormBuscaValue {
  somenteIda: boolean | null;
  adultos: number | null;
  criancas: number | null;
  bebes: number | null;
  tipo: string | null;
  origem: UnidadeFederativa | null;
  destino: UnidadeFederativa | null;
  dataIda: Date | null;
  dataVolta: Date | null;
}

interface FormBusca {
  somenteIda: FormControl<boolean | null>;
  adultos: FormControl<number | null>;
  criancas: FormControl<number | null>;
  bebes: FormControl<number | null>;
  tipo: FormControl<string | null>;
  origem: FormControl<UnidadeFederativa | null>;
  destino: FormControl<UnidadeFederativa | null>;
  dataIda: FormControl<Date | null>;
  dataVolta: FormControl<Date | null>;
}

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  @Output() aoBuscar = new EventEmitter<Partial<FormBuscaValue>>();

  formBusca: FormGroup<FormBusca>;

  ufs: UnidadeFederativa[] = []

  tipos: string[] = ['Econômica', 'Executiva']

  constructor(
    public dialog: MatDialog, 
    private ufService: UnidadeFederativaService
  ) {

    this.formBusca = new FormGroup<FormBusca>({
      somenteIda: new FormControl(false),
      adultos: new FormControl(1),
      criancas: new FormControl(0),
      bebes: new FormControl(0),
      tipo: new FormControl('Econômica'),
      origem: new FormControl(),
      destino: new FormControl(),
      dataIda: new FormControl(),
      dataVolta: new FormControl(),
    });
    this.ufService.listar()
      .subscribe(data => {
        this.ufs = data;
      })
  }

  onSubmit (): void {
    this.aoBuscar.emit(this.formBusca.value);
  }

  trocarOrigemDestino(): void {
    const origem = this.formBusca.get('origem')?.value;
    const destino = this.formBusca.get('destino')?.value;
  
    this.formBusca.patchValue({
      origem: destino,
      destino: origem
    });
  }

  obterControle(nome:string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }

  getDescricaoPassageiros(): string {
    let descricao = '';
  
    const adultos = this.formBusca.get('adultos')?.value;
    if (adultos && adultos > 0) {
      descricao += `${adultos} adulto${adultos > 1 ? 's' : ''}`;
    }
  
    const criancas = this.formBusca.get('criancas')?.value;
    if (criancas && criancas > 0) {
      descricao += `${descricao ? ', ' : ''}${criancas} criança${criancas > 1 ? 's' : ''}`;
    }
  
    const bebes = this.formBusca.get('bebes')?.value;
    if (bebes && bebes > 0) {
      descricao += `${descricao ? ', ' : ''}${bebes} bebê${bebes > 1 ? 's' : ''}`;
    }
  
    return descricao;
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%',
      data: {
        tipos: this.tipos,
        formBusca: this.formBusca
      }
    })
  }
}
