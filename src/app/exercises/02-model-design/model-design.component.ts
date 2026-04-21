/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Form Model Design
 * ================================================================
 * You will learn:
 * - linkedSignal to derive form model from API data
 * - httpResource (or rxResource) to load user from API
 * - domainToForm() / formToDomain() transformation functions
 * - disabled() validator while loading
 * - Form ↔ domain model separation concept
 *
 * 📝 YOUR TASKS (in order):
 *
 *   1. (TODO 1 — TS) Implement domainToForm(): map User.name → displayName,
 *      flatten User.address fields, default missing values to ''
 *
 *   2. (TODO 2 — TS) Implement formToDomain(): map displayName → name,
 *      re-nest street/city/postalCode into an address object
 *
 *   3. (TODO 4 — TS) Replace signal(EMPTY_FORM) with linkedSignal()
 *      so formModel auto-updates when userResource.value() changes
 *
 *   4. (TODO 5 — TS) Add disabled() validator while userResource is loading
 *
 *   5. (TODO 6 — TS) Implement onSubmit(): convert form → domain model,
 *      call API, show success or error message
 *
 * ================================================================
 * ✅ DONE WHEN:
 * - User data loads from API into form fields
 * - Domain model transforms to form model (flat fields)
 * - Form model transforms back to domain model on submit
 * - Form is disabled while data loads
 * - Successful save shows confirmation
 *
 * ⏱️ TIME: 12-15 minutes
 * ================================================================
 */

import { Component, signal, inject } from '@angular/core';
import { form, FormField, required, email, FormRoot } from '@angular/forms/signals';
import { rxResource } from '@angular/core/rxjs-interop';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../shared/models/api.models';
import { JsonPipe } from '@angular/common';

// ============================================
// Domain ↔ Form Model Types
// ============================================

interface UserFormModel {
  displayName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
}

const EMPTY_FORM: UserFormModel = {
  displayName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  postalCode: ''
};

// TODO 1: Implement domainToForm() — transform User → UserFormModel
// - Map user.name → displayName
// - Flatten address fields (street, city, postalCode)
// - Handle optional address (default to '')
function domainToForm(user: User): UserFormModel {
  return EMPTY_FORM;
}

// TODO 2: Implement formToDomain() — transform UserFormModel → Partial<User>
// - Map displayName → name
// - Re-nest address fields into address object
function formToDomain(formData: UserFormModel): Partial<User> {
  return {};
}

@Component({
  selector: 'app-model-design',
  standalone: true,
  imports: [FormField, JsonPipe, FormRoot],
  templateUrl: './model-design.component.html',
  styleUrl: './model-design.component.scss'
})
export class ModelDesignComponent {
  private readonly api = inject(ApiService);

  protected readonly successMessage = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  // ✅ Already provided: loads user from API
  protected readonly userResource = rxResource({
    stream: () => this.api.getUser('demo')
  });

  // TODO 4: Use linkedSignal to derive form model when userResource.value() changes
  protected readonly formModel = signal<UserFormModel>(EMPTY_FORM);

  protected readonly profileForm = form(this.formModel, (f) => {
    // ✅ Basic validators already provided
    required(f.displayName);
    required(f.email);
    email(f.email);

    // TODO 5: Disable the form while the API is loading
    // Hint: use disabled() with a condition based on userResource
  });

  // TODO 6: Submit — transform form data back to domain model and call API
  async onSubmit() {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    // TODO 6: Get form data, convert back to domain model, send to API, handle success/error
  }
}
