/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Schemas and Conditional Logic
 * ================================================================
 * You will learn:
 * - How to create reusable validation schemas with schema()
 * - How to apply schemas with apply()
 * - How to use conditional validation with applyWhen()
 * - DRY principle - define once, use everywhere
 *
 * ✅ DONE WHEN:
 * - addressSchema works for shipping address
 * - contactSchema validates email and phone
 * - Business fields required ONLY when customerType === 'business'
 * - Address required ONLY when deliveryType === 'shipping'
 * - Switching types dynamically updates validation
 *
 * ⏱️ TIME: 12-15 minutes
 *
 * 💡 HINT: Check the "Schema Definition" and "applyWhen" sections!
 *
 * 📋 VALIDATION REQUIREMENTS:
 * - contact.email:              must be a valid email address
 * - contact.phone:              exactly 9 digits
 * - shippingAddress (all fields): required — but ONLY when delivery type is "shipping"
 * - companyName:                required — but ONLY when customer type is "business"
 * - taxId:                      required — but ONLY when customer type is "business"
 * ================================================================
 */

import { Component, signal } from '@angular/core';
import {form, FormField, schema} from '@angular/forms/signals';

// TODO 1a: Create reusable addressSchema — see 📋 VALIDATION REQUIREMENTS above
const addressSchema = schema<{
  street: string;
  city: string;
  postalCode: string;
  country: string;
}>((addr) => {
  // Add validation here
});

// TODO 1b: Create contactSchema — see 📋 VALIDATION REQUIREMENTS above
const contactSchema = schema<{
  email: string;
  phone: string;
}>((contact) => {
  // Add validation here
});

@Component({
  selector: 'app-schemas',
  standalone: true,
  imports: [FormField],
  templateUrl: './schemas.component.html',
  styleUrl: './schemas.component.scss'
})
export class SchemasComponent {
  // TODO 2: Create form model
  protected readonly orderModel = signal({
    customerType: 'personal' as 'personal' | 'business',
    companyName: '',
    taxId: '',
    contact: {
      email: '',
      phone: ''
    },
    deliveryType: 'pickup' as 'pickup' | 'shipping',
    shippingAddress: {
      street: '',
      city: '',
      postalCode: '',
      country: ''
    }
  });

  // TODO 3: Create form with schemas and conditional validation
  protected readonly orderForm = form(this.orderModel, (f) => {
    // TODO 3a: Contact info should use the contactSchema defined above

    // TODO 3b: When customerType is 'business', company name and tax ID are required
    // Hint: See "Conditional Validation with applyWhen" section

    // TODO 3c: When deliveryType is 'shipping', shipping address should use addressSchema
  });

  // KEEP AS-IS:
  setCustomerType(type: 'personal' | 'business') {
    this.orderModel.update(m => ({ ...m, customerType: type }));
  }

  setDeliveryType(type: 'pickup' | 'shipping') {
    this.orderModel.update(m => ({ ...m, deliveryType: type }));
  }

  onSubmit() {
    console.log('Order submitted:', this.orderModel());
    alert('Order placed! Check console for data.');
  }
}
