/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Validation - Built-in and Cross-Field
 * ================================================================
 * You will learn:
 * - How to use built-in validators (required, email, minLength)
 * - How to implement cross-field validation (password confirmation)
 * - How to understand automatic dependency tracking
 *
 * ✅ DONE WHEN:
 * - Username is required (min 3 characters)
 * - Password requires min 8 characters
 * - confirmPassword checks match with password
 * - All errors display properly
 *
 * ⏱️ TIME: 8-10 minutes
 * ================================================================
 */

import { Component, signal } from '@angular/core';
import { form, FormField, required, email, minLength, maxLength, validate, REQUIRED, MIN_LENGTH, MAX_LENGTH } from '@angular/forms/signals';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [FormField],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.scss'
})
export class ValidationComponent {

  protected readonly regModel = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // TODO 1: Add validation for each field
  // Username: required, min 3 characters
  // Email: required, must be valid email format
  // Password: required, min 8 characters
  // Confirm password: required, must match password (cross-field validation)
  protected readonly regForm = form(this.regModel, (f) => {
    // Add validation here
  });

  // ---- Metadata Demo (ready example) ----
  protected readonly REQUIRED = REQUIRED;
  protected readonly MIN_LENGTH = MIN_LENGTH;
  protected readonly MAX_LENGTH = MAX_LENGTH;

  private readonly metaModel = signal({
    displayName: '',
    bio: ''
  });

  protected readonly metaForm = form(this.metaModel, (f) => {
    required(f.displayName);
    minLength(f.displayName, 3);
    maxLength(f.displayName, 20);
    maxLength(f.bio, 140);
  });

  protected formDebugInfo = (): string => {
    return JSON.stringify(this.regForm(), null, 2);
  };

  onSubmit() {
    console.log('Registration submitted:', this.regModel());
    alert('Registration submitted! Check console for data.');
  }
}
