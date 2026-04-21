/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Submit & FormRoot
 * ================================================================
 * You will learn:
 * - submit() with action + onInvalid callbacks
 * - errorSummary() + focusBoundControl() for UX
 * - submitting() loading state
 * - form() 3rd argument for declarative submission
 * - [formRoot] directive — no onSubmit() method needed
 *
 * ================================================================
 * 📋 VALIDATION REQUIREMENTS (both forms use the same rules):
 * - name:    must not be empty
 * - email:   must be a valid email address
 * - subject: must not be empty
 * - message: at least 10 characters
 *
 * ================================================================
 * 📝 YOUR TASKS (in order):
 *
 *   PART A — imperative submit()
 *
 *   1. (TODO 1 — TS) Implement onSubmitA() using submit():
 *      - action:    simulate 1500ms API call, set successA, reset model + field state
 *      - onInvalid: focus first invalid field via errorSummary()
 *
 *   PART B — declarative [formRoot]
 *
 *   2. (TODO 2 — TS) Add 3rd argument to formB's form() call:
 *      { submission: { action: ..., onInvalid: ... } }
 *      (same logic as Part A — now lives inside the form definition)
 *
 *   3. (TODO 3 — HTML) Change (submit)="noop($event)" → [formRoot]="formB"
 *      Also add FormRoot to the imports array in this file.
 *
 * ================================================================
 * ✅ DONE WHEN:
 *   Part A:
 *   - Submitting invalid form focuses the first error field
 *   - Submitting valid form: spinner → success message → form clears
 *   Part B:
 *   - Identical behavior — but no onSubmit method, only [formRoot]
 *
 * ⏱️ TIME: 18-22 min
 *
 * 💡 STUCK? Check hint sections at the bottom of the template
 * ================================================================
 */

import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required, email, minLength, submit } from '@angular/forms/signals';

interface ContactFormModel {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

const INITIAL: ContactFormModel = {
  name: '',
  email: '',
  subject: '',
  message: '',
  priority: 'medium'
};

@Component({
  selector: 'app-submit-formroot',
  standalone: true,
  imports: [FormField],
  templateUrl: './submit-formroot.component.html',
  styleUrl: './submit-formroot.component.scss'
})
export class SubmitFormrootComponent {

  // ── PART A: imperative submit() ──────────────────────────────
  protected readonly modelA = signal<ContactFormModel>({ ...INITIAL });

  protected readonly formA = form(this.modelA, (f) => {
    // ✅ Basic validators already provided
    required(f.name);
    required(f.email);
    email(f.email);
    required(f.subject);
    minLength(f.message, 10);
  });

  protected readonly successA = signal<string | null>(null);

  // TODO 2: Implement using submit(this.formA, { action, onInvalid })
  // action:    await 1500ms, set successA, reset modelA + call field().reset()
  // onInvalid: field().errorSummary()[0]?.fieldTree().focusBoundControl()
  async onSubmitA() {
    this.successA.set(null);
  }

  // ── PART B: declarative [formRoot] ───────────────────────────
  protected readonly modelB = signal<ContactFormModel>({ ...INITIAL });

  // TODO 3: Add 3rd argument { submission: { action, onInvalid } }
  // Same logic as Part A — but declared here, not in a separate method
  protected readonly formB = form(this.modelB, (f) => {
    // ✅ Basic validators already provided
    required(f.name);
    required(f.email);
    email(f.email);
    required(f.subject);
    minLength(f.message, 10);
  });

  protected readonly successB = signal<string | null>(null);

  protected noop(event: Event) { event.preventDefault(); }
}
