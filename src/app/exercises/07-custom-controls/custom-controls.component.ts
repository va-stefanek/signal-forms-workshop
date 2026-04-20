/*
 * ================================================================
 * 🎯 EXERCISE GOAL: Custom Form Controls
 * ================================================================
 * You will learn:
 * - How to implement FormValueControl<T> interface
 * - Create custom controls with model() and input()
 * - Integrate custom controls with [formField]
 * - No more ControlValueAccessor boilerplate!
 *
 * The UI components (StarRating, QuantitySelector) are ALREADY BUILT.
 * Your job: make them work with Signal Forms by implementing FormValueControl<T>.
 *
 * ✅ DONE WHEN:
 * - StarRating component works with [formField]
 * - QuantitySelector component works with [formField]
 * - Rating validation shows errors
 * - Form submits with all values
 *
 * ⏱️ TIME: 10-12 minutes
 *
 * 💡 HINT: Check "FormValueControl Interface" section below!
 *
 * 📋 VALIDATION REQUIREMENTS:
 * - productName: no validation needed
 * - rating:      must be selected (at least 1 star chosen)
 * - quantity:    no validation needed (bounds enforced by component UI)
 * - reviewText:  must be at least 10 characters, no more than 500
 * - recommend:   no validation needed
 * ================================================================
 */

import { Component, signal, input, model } from '@angular/core';
import { form, FormField, FormValueControl } from '@angular/forms/signals';

// ============================================
// StarRatingComponent — UI is ready!
// TODO 1: Make it a FormValueControl<number>
// ============================================
// Currently this component uses a local signal for its value.
// Transform it so [formField] can bind to it.

@Component({
  selector: 'app-star-rating',
  standalone: true,
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  // TODO 1: Make this component implement FormValueControl<number>
  // Currently it uses a plain signal — it needs to satisfy the FormValueControl interface
  // so that [formField] can bind to it. See the hint section for the interface definition.
  protected readonly currentValue = signal(0);

  // Internal state (keep as-is)
  hoveredStar = signal(0);
  stars = [1, 2, 3, 4, 5];
  ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  selectStar(star: number) {
    this.currentValue.set(star);
  }
}

// ============================================
// QuantitySelectorComponent — UI is ready!
// TODO 2: Make it a FormValueControl<number>
// ============================================

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss'
})
export class QuantitySelectorComponent {
  // TODO 2: Same as StarRating — make this implement FormValueControl<number>
  protected readonly currentValue = signal(1);

  // Configuration inputs (keep as-is)
  minVal = input<number>(1);
  maxVal = input<number>(99);

  increment() {
    if (this.currentValue() < this.maxVal()) {
      this.currentValue.update(v => v + 1);
    }
  }

  decrement() {
    if (this.currentValue() > this.minVal()) {
      this.currentValue.update(v => v - 1);
    }
  }
}

// ============================================
// Main Exercise Component
// ============================================
@Component({
  selector: 'app-custom-controls',
  standalone: true,
  imports: [FormField, StarRatingComponent, QuantitySelectorComponent],
  templateUrl: './custom-controls.component.html',
  styleUrl: './custom-controls.component.scss'
})
export class CustomControlsComponent {
  // Form Model
  protected readonly reviewModel = signal({
    productName: '',
    rating: 0,
    quantity: 1,
    reviewText: '',
    recommend: false
  });

  // TODO 5: Create form with validation (see 📋 VALIDATION REQUIREMENTS at the top of this file)
  protected readonly reviewForm = form(this.reviewModel, (f) => {
    // Add validation here
  });

  toggleRecommend() {
    this.reviewModel.update(m => ({ ...m, recommend: !m.recommend }));
  }

  onSubmit() {
    console.log('Review submitted:', this.reviewModel());
    alert('Review submitted! Check console for data.');
  }
}
