/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Dynamic Arrays
 * ================================================================
 * You will learn:
 * - Work with arrays in Signal Forms
 * - Validate each item with applyEach()
 * - Add/remove items with immutable updates
 *
 * 📝 YOUR TASKS (in order):
 *
 *   1. (TODO 2 — TS) Add validators to orderForm using applyEach()
 *      for items array (see 📋 VALIDATION REQUIREMENTS)
 *
 *   2. (TODO 3 — TS) Implement addItem(): append a blank item
 *      to orderModel using an immutable update
 *
 *   3. (TODO 4 — TS) Implement removeItem(index): remove the item
 *      at given index using an immutable update
 *
 *   4. (TODO 5 — TS) Replace calculateTotal with computed() that
 *      sums quantity × price across all items
 *
 * ================================================================
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
 *
 * 📋 VALIDATION REQUIREMENTS:
 * - customerName:  must not be empty
 * - items[].product:   must not be empty
 * - items[].quantity:  at least 1
 * - items[].price:     at least 10
 * ================================================================
 */

import { Component, signal, computed } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-array-basics',
  standalone: true,
  imports: [FormField, CurrencyPipe],
  templateUrl: './array-basic.component.html',
  styleUrl: './array-basic.component.scss'
})
export class ArrayBasicsComponent {
  // ✅ Already provided: form model with items array
  protected readonly orderModel = signal({
    customerName: '',
    items: [
      { id: crypto.randomUUID(), product: '', quantity: 1, price: 0 }
    ]
  });

  // TODO 2: Create form with validation — see 📋 VALIDATION REQUIREMENTS at the top of this file
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
