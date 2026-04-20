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
import { form, FormField, required, email, minLength, debounce, submit, validateHttp } from '@angular/forms/signals';
import { ApiService } from '../../shared/services/api.service';
import { firstValueFrom } from 'rxjs';

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

  // TODO 1: Create form model — look at the template to see which fields are needed
  protected readonly regModel = signal({
    username: '',
    email: '',
    password: ''
  });

  // TODO 2: Create form with async validation
  protected readonly regForm = form(this.regModel, (f) => {
    // TODO 2a: Username — required, min 3 characters, debounced async check
    // TODO 2b: Username availability — check via API, show "taken" error if unavailable
    //   API: GET ${this.API_BASE}/api/auth/check-username?username=...
    //   Response: { available: boolean, suggestions?: string[] }
    //   Hint: See "Async Validation Pattern" section
    // TODO 2c: Email — required, valid format
    // TODO 2d: Password — required, min 8 characters
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
