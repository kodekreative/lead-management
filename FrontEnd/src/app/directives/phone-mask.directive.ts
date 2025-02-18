import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneMaskDirective),
      multi: true
    }
  ]
})
export class PhoneMaskDirective implements ControlValueAccessor {
  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  private previousValue: string = '';

  constructor(private el: ElementRef) {}

  writeValue(value: string): void {
    this.el.nativeElement.value = this.formatPhoneNumber(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    let inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/\D/g, ''); // Remove all non-numeric characters

    if (value.length > 10) {
      value = value.substring(0, 10); // Limit to 10 digits
    }

    const formattedValue = this.formatPhoneNumber(value);

    inputElement.value = formattedValue;

    // Prevent infinite loops: update only when the value changes
    if (this.previousValue !== formattedValue) {
      this.previousValue = formattedValue;
      if (this.onChange) this.onChange(formattedValue);
    }
  }

  @HostListener('blur')
  onBlur(): void {
    if (this.onTouched) this.onTouched();
  }

  private formatPhoneNumber(value: string): string {
    if (!value) return '';

    if (value.length > 6) {
      return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
    } else if (value.length > 3) {
      return `(${value.substring(0, 3)}) ${value.substring(3)}`;
    } else if (value.length > 0) {
      return `(${value}`;
    }

    return value;
  }
}
