import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ModalData {
  tipos: string[]
  formBusca: FormGroup
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  tipos: string[] = [];
  formBusca?: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData) {
    this.tipos = data.tipos
    this.formBusca = data.formBusca
  }

  obterControle(nome:string): FormControl {
    const control = this.formBusca?.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }

  selecionarTipo(event: MatChipSelectionChange, tipo: string): void {
    if (event.selected) {
      this.formBusca?.patchValue({ tipo });
    }
  }

}
