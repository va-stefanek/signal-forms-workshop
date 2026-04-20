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
 * ================================================================
 * 📝 YOUR TASKS (in order):
 *
 *   1. (TODO 2) Create the form schema using form(model, schemaFn)
 *      - email    → required, must be a valid email address
 *      - password → required, at least 6 characters
 *
 *   2. (TODO 3) Implement formDebugInfo() to show live form state
 *      - Return a JSON.stringify of the form — explore what properties
 *        are available on loginForm() and its fields
 *
 * ================================================================
 * 🎯 BONUS — extend the form further:
 *
 *   3. Add validation for the username field
 *      - username → required, at least 3 characters
 *
 *   4. Extend password validation
 *      - password → add minLength(6) if not already there
 *
 * ================================================================
 * ✅ DONE WHEN:
 *   - Typing an invalid email and blurring the field shows an error
 *   - Typing a password shorter than 6 chars and blurring shows an error
 *   - Login button is disabled until both email and password are valid
 *   - Clicking Login logs the form data to the console
 *   - Debug panel below the form shows live field state
 *
 * ⏱️ TIME: 12-15 min  |  Bonus: +8-10 min
 *
 * 💡 STUCK? Check the "Key Concepts" hint section at the bottom of
 *    the template
 * ================================================================
 */

import { Component, signal } from '@angular/core';
import {form, FormField, required, validate} from '@angular/forms/signals';

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
  // See 📋 VALIDATION REQUIREMENTS at the top of this file
  protected readonly loginForm = form(this.loginModel, (f) => {
    // Add validation here
    required(f.username)
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
