/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Subforms with FieldTree
 * ================================================================
 * You will learn:
 * - Pass FieldTree<T> as input() to child components
 * - Single form state across multiple components
 * - Validation stays in parent schema, UI in children
 * - schema() for reusable validation of each section
 *
 * 📝 YOUR TASKS (in order):
 *
 *   1. (TODO 1b — TS) Declare PassengerFormComponent input with correct
 *      FieldTree<BookingFormModel['passenger']> type instead of any
 *
 *   2. (TODO 2b — TS) Same for FlightFormComponent input
 *
 *   3. (TODO 3b — TS) Same for PaymentFormComponent input
 *
 *   4. (TODO 4 — TS) Add validators to bookingForm
 *      (see 📋 VALIDATION REQUIREMENTS at the top of this file)
 *
 *   5. (TODO 5 — TS) Implement onSubmit(): simulate API call,
 *      show success message with passenger name and route
 *
 * ================================================================
 * ✅ DONE WHEN:
 * - 3 child components render their form sections
 * - All fields bind to the parent form state
 * - Validation errors show in child components
 * - Submit in parent collects everything
 *
 * ⏱️ TIME: 12-15 minutes
 *
 * 💡 HINT: FieldTree is the key — pass it as input()!
 *
 * 📋 VALIDATION REQUIREMENTS:
 * - passenger.firstName, passenger.lastName: must not be empty
 * - passenger.email:                         must be a valid email address
 * - flight.from, flight.to, flight.date:     must not be empty
 * - payment.cardNumber, payment.expMonth,
 *   payment.expYear, payment.cvv:            must not be empty
 * ================================================================
 */

import { Component, signal, input } from '@angular/core';
import { form } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

// ============================================
// Form Model
// ============================================

interface BookingFormModel {
  passenger: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  flight: {
    from: string;
    to: string;
    date: string;
    class: 'economy' | 'business';
  };
  payment: {
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvv: string;
  };
}

// ============================================
// TODO 1: Create PassengerFormComponent
// ============================================
// - Receives FieldTree<BookingFormModel['passenger']> as input
// - Renders firstName, lastName, email, phone fields
// - Uses [formField] to bind to parent form state

@Component({
  selector: 'app-passenger-form',
  standalone: true,
  templateUrl: './passenger-form.component.html'
})
export class PassengerFormComponent {
  // TODO 1b: Declare input with proper FieldTree type instead of any
  readonly passenger = input.required<any>();
}

// ============================================
// TODO 2: Create FlightFormComponent
// ============================================

@Component({
  selector: 'app-flight-form',
  standalone: true,
  templateUrl: './flight-form.component.html'
})
export class FlightFormComponent {
  // TODO 2b: Declare input with proper FieldTree type instead of any
  readonly flight = input.required<any>();
}

// ============================================
// TODO 3: Create PaymentFormComponent
// ============================================

@Component({
  selector: 'app-payment-form',
  standalone: true,
  templateUrl: './payment-form.component.html'
})
export class PaymentFormComponent {
  // TODO 3b: Declare input with proper FieldTree type instead of any
  readonly payment = input.required<any>();
}

// ============================================
// Parent Component
// ============================================

@Component({
  selector: 'app-subforms',
  standalone: true,
  imports: [PassengerFormComponent, FlightFormComponent, PaymentFormComponent, JsonPipe],
  templateUrl: './subforms.component.html',
  styleUrl: './subforms.component.scss'
})
export class SubformsComponent {
  protected readonly successMessage = signal<string | null>(null);

  protected readonly bookingModel = signal<BookingFormModel>({
    passenger: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    flight: {
      from: '',
      to: '',
      date: '',
      class: 'economy'
    },
    payment: {
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: ''
    }
  });

  // TODO 4: Create validation — see 📋 VALIDATION REQUIREMENTS at the top of this file
  protected readonly bookingForm = form(this.bookingModel, (f) => {
  });

  // TODO 5: Use submit() — simulate API call, show success message with passenger name and route
  async onSubmit() {
    this.successMessage.set(null);
  }
}
