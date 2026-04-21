/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Async Validation and Submit
 * ================================================================
 * You will learn:
 * - Async validation with real API
 * - How to use debounce() to limit requests
 * - How to handle pending() state in UI
 * - How to use submit() with server error mapping
 *
 * 📝 YOUR TASKS (in order):
 *
 *   1. (TODO 2 — TS) Add debounced async username availability check:
 *      call GET /api/auth/check-username, show suggestions when taken
 *
 *   2. (TODO 3 — TS) Implement onSubmit() with server error handling:
 *      call API, show success or map server errors back to form fields
 *
 * ================================================================
 * ✅ DONE WHEN:
 * - Username checked asynchronously (with debounce)
 * - Pending/success/error icons display correctly
 * - Username suggestions show when taken
 * - Submit sends data to API
 * - Server errors map to form fields
 *
 * ⏱️ TIME: 15-18 minutes
 *
 * 💡 HINT: "Async Validation" and "submit()" sections are key!
 * ================================================================
 */

import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, email, minLength } from '@angular/forms/signals';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-async-submit',
  standalone: true,
  imports: [FormField],
  templateUrl: './async-submit.component.html',
  styleUrl: './async-submit.component.scss'
})
export class AsyncSubmitComponent {
  private readonly api = inject(ApiService);

  private readonly API_BASE = 'https://signal-forms-workshop-api.matestefanczyk.workers.dev';

  // State
  protected readonly usernameSuggestions = signal<string[]>([]);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  // Form model — fields: username (string), email (string), password (string)
  protected readonly regModel = signal({
    username: '',
    email: '',
    password: ''
  });

  protected readonly regForm = form(this.regModel, (f) => {
    // ✅ Basic validators already provided
    required(f.username);
    minLength(f.username, 3);
    required(f.email);
    email(f.email);
    required(f.password);
    minLength(f.password, 8);

    // TODO 2: Add debounced async username availability check
    // API: GET ${this.API_BASE}/api/auth/check-username?username=...
    // Response: { available: boolean, suggestions?: string[] }
    // Hint: See "Async Validation Pattern" section
  });

  useSuggestion(suggestion: string) {
    this.regModel.update(m => ({ ...m, username: suggestion }));
  }

  // TODO 3: Implement submit with server error handling
  // - Send form data to API (this.api.register)
  // - On success: show success message
  // - On server validation errors: map them back to form fields
  // - On network error: show error message
  // Hint: See "submit() with ApiService" section
  async onSubmit() {
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }
}
