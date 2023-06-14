import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UnidadeFederativa } from 'src/app/core/interfaces/types';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss']
})
export class DropdownUfComponent implements OnInit {
  @Input() label!: string;
  @Input() matPrefix!: string;
  @Input() controle!: FormControl;
  @Input() options: UnidadeFederativa[] = [];
  estadosFiltrados$?: Observable<UnidadeFederativa[]>;

  ngOnInit() {
    this.estadosFiltrados$ = this.controle.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarUfs(value))
    )
  }

  filtrarUfs(value: string): UnidadeFederativa[] {
    const valorFiltrado = value?.toLowerCase();
    const result = this.options.filter(
      estado => estado.nome.toLowerCase().includes(valorFiltrado)
    )
    return result
  }
}
