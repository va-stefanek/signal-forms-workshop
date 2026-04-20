import { Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-live-coding',
  standalone: true,
  imports: [FormField, JsonPipe],
  templateUrl: './live-coding.component.html',
  styleUrl: './live-coding.component.scss'
})
export class LiveCodingComponent {
  protected readonly productModel = signal({
    name: '',
    minPrice: 0,
    maxPrice: 0,
  });

  protected readonly productForm = form(this.productModel, (f) => {
    // live coding here
  });

  onSubmit() {
    console.log('Product submitted:', this.productModel());
  }
}
