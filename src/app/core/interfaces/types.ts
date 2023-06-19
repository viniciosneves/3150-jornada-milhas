import { FormControl } from "@angular/forms";

export interface Promocao {
  id: number;
  destino: string;
  imagem: string;
  preco: number;
}

export interface Depoimento {
  id: number;
  texto: string;
  autor: string;
  avatar: string;
}

export interface UnidadeFederativa {
  id: number;
  nome: string;
  sigla: string;
}

export interface Passageiros {
  adultos: number,
  criancas: number,
  bebes: number,
  categoria: string
}

export interface Companhia {
  id:   number;
  nome: string;
}

export interface Resultado {
  paginaAtual:  number;
  ultimaPagina: number;
  total:        number;
  resultado:    Passagem[];
}

export interface Passagem {
  tipo:         string;
  precoIda:     number;
  precoVolta:   number;
  taxaEmbarque: number;
  conexoes:     number;
  tempoVoo:     number;
  origem:       UnidadeFederativa;
  destino:      UnidadeFederativa;
  companhia:    Companhia;
  dataIda:      Date;
  dataVolta:    Date;
}

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

export interface FormBusca {
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