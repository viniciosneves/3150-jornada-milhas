import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-seletor-passageiro',
  templateUrl: './seletor-passageiro.component.html',
  styleUrls: ['./seletor-passageiro.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeletorPassageiroComponent),
      multi: true
    }
  ]
})
export class SeletorPassageiroComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() legenda!: string;

  value: number = 0;
  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(val: any): void {
    this.value = val;
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  incrementar() {
    this.value++;
    this.onChange(this.value);
    this.onTouch();
  }

  decrementar() {
    if(this.value > 0) {
      this.value--;
      this.onChange(this.value);
      this.onTouch();
    }
  }
}