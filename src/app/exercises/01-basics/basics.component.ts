/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Signal Forms Basics
 * ================================================================
 * You will learn:
 * - How to create a form model with signal()
 * - How to initialize a form with form()
 * - How to bind inputs with [formField]
 * - How to read field state (value, errors, touched, valid)
 *
 * ✅ PART A - DONE WHEN:
 * - The form displays correctly
 * - Email and password validation works
 * - The Login button is disabled when the form is invalid
 * - Data is logged to console on Login click
 *
 * ⏱️ PART A TIME: 5-7 minutes
 *
 * ================== BONUS ==================
 *
 * 🎯 PART B - BONUS (5 min):
 * Extend the form with:
 * - Add "username" field with required + minLength(3) validation
 * - Add "rememberMe" field (boolean) with a checkbox
 * - Extend password validation with minLength(6)
 *
 * ✅ PART B - DONE WHEN:
 * - Username field validates correctly (min 3 characters)
 * - Remember Me checkbox toggles correctly
 * - Password requires at least 6 characters
 * - All fields are included in the form submission
 *
 * 💡 HINT: Check the "Key Concepts" section below!
 * ================================================================
 */

import { Component, signal } from '@angular/core';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';

@Component({
  selector: 'app-basics',
  standalone: true,
  imports: [FormField],
  templateUrl: './basics.component.html',
  styleUrl: './basics.component.scss'
})
export class BasicsComponent {
  // Form model — already set up with signal()
  // Notice how the form data structure matches the template fields
  protected readonly loginModel = signal({
    username: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  // TODO 2: Create form with validation using form(model, schemaFn)
  // Look at the template to understand which fields need validation and what error kinds are expected
  // PART B BONUS: add validation for the bonus fields too
  protected readonly loginForm = form(this.loginModel, (f) => {
    // Add validation here
  });

  // TODO 3: Return a debug string showing the current form state
  // Explore what properties are available on this.loginForm() and its fields
  protected formDebugInfo = (): string => {
    return JSON.stringify({}, null, 2);
  };

  onSubmit() {
    console.log('Form submitted:', this.loginModel());
    alert('Form submitted! Check console for data.');
  }

  toggleRememberMe() {
    this.loginModel.update(m => ({ ...m, rememberMe: !m.rememberMe }));
  }
}
