/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Validation - Built-in and Cross-Field
 * ================================================================
 * You will learn:
 * - How to use built-in validators (required, email, minLength)
 * - How to implement cross-field validation (password confirmation)
 * - How to understand automatic dependency tracking
 *
 * 📋 VALIDATION REQUIREMENTS:
 * - username:        at least 3 characters
 * - email:           must be a valid email address
 * - password:        at least 8 characters
 * - confirmPassword: must match the password field (cross-field validation)
 *
 * ✅ DONE WHEN:
 * - All four fields validate correctly
 * - Passwords-don't-match error shows when confirmPassword differs
 * - All errors display properly
 *
 * ⏱️ TIME: 8-10 minutes
 * ================================================================
 */

import { Component, signal } from '@angular/core';
import {
  form,
  FormField,
  REQUIRED,
  MIN_LENGTH,
  MAX_LENGTH,
  maxLength,
  minLength,
  required
} from '@angular/forms/signals';

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

  // TODO 1: Add validation — see 📋 VALIDATION REQUIREMENTS at the top of this file
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
