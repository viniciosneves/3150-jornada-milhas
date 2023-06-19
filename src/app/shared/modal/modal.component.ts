import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData, 
  public formBuscaService: FormBuscaService ) {
    this.tipos = this.formBuscaService.tipos
  }

  selecionarTipo(event: MatChipSelectionChange, tipo: string): void {
    if (event.selected) {
      this.formBuscaService.formBusca?.patchValue({ tipo });
    }
  }

}
