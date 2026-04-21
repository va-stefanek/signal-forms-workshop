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
  imports: [FormField, FormRoot],
  templateUrl: './submit-formroot.component.solution.html',
  styleUrl: './submit-formroot.component.solution.scss'
})
export class SubmitFormrootComponent {

  // ── PART A: imperative submit() ──────────────────────────────
  protected readonly modelA = signal<ContactFormModel>({ ...INITIAL });

  protected readonly formA = form(this.modelA, (f) => {
    required(f.name);
    required(f.email);
    email(f.email);
    required(f.subject);
    minLength(f.message, 10);
  });

  protected readonly successA = signal<string | null>(null);

  async onSubmitA() {
    this.successA.set(null);

    await submit(this.formA, {
      action: async (field) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.successA.set('Message sent successfully!');
        this.modelA.set({ ...INITIAL });
        field().reset();
        return undefined;
      },
      onInvalid: (field) => {
        field().errorSummary()[0]?.fieldTree().focusBoundControl();
      }
    });
  }

  // ── PART B: declarative [formRoot] ───────────────────────────
  protected readonly modelB = signal<ContactFormModel>({ ...INITIAL });

  protected readonly formB = form(this.modelB, (f) => {
    required(f.name);
    required(f.email);
    email(f.email);
    required(f.subject);
    minLength(f.message, 10);
  }, {
    submission: {
      action: async (field) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.successB.set('Message sent successfully!');
        this.modelB.set({ ...INITIAL });
        field().reset();
        return undefined;
      },
      onInvalid: (field) => {
        field().errorSummary()[0]?.fieldTree().focusBoundControl();
      }
    }
  });

  protected readonly successB = signal<string | null>(null);
}
