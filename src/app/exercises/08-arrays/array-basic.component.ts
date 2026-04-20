/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Dynamic Arrays
 * ================================================================
 * You will learn:
 * - Work with arrays in Signal Forms
 * - Validate each item with applyEach()
 * - Add/remove items with immutable updates
 *
 * ✅ DONE WHEN:
 * - Customer name is validated
 * - Items can be added and removed
 * - Each item validates product, quantity, and price
 * - Order total calculates correctly
 * - Submit logs form data
 *
 * ⏱️ TIME: 10-12 minutes
 *
 * 💡 HINT: Check the "applyEach" section below!
 * ================================================================
 */

import { Component, signal, computed } from '@angular/core';
import { form, FormField, required, min, applyEach } from '@angular/forms/signals';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-array-basics',
  standalone: true,
  imports: [FormField, CurrencyPipe],
  templateUrl: './array-basic.component.html',
  styleUrl: './array-basic.component.scss'
})
export class ArrayBasicsComponent {
  // TODO 1: Create form model with an items array
  // Each item needs: id (for tracking), product, quantity, price
  protected readonly orderModel = signal({
    customerName: '',
    items: [
      { id: crypto.randomUUID(), product: '', quantity: 1, price: 0 }
    ]
  });

  // TODO 2: Create form with validation
  // Customer name is required
  // Each item: product is required, quantity min 1, price min 10
  // Hint: See the "applyEach Pattern" section for array validation
  protected readonly orderForm = form(this.orderModel, (f) => {
    // Add validation here
  });

  // TODO 3: Implement addItem — use immutable update on the model signal
  addItem() {
  }

  // TODO 4: Implement removeItem — use immutable update on the model signal
  removeItem(index: number) {
  }

  // TODO 5: Replace with a computed() signal that sums quantity * price across all items
  protected readonly calculateTotal = computed(() => 0);

  // Debug info
  protected formDebugInfo = () => {
    return JSON.stringify({}, null, 2);
  };

  onSubmit() {
    console.log('Order submitted:', this.orderModel());
    alert('Order submitted! Check console for data.');
  }
}
