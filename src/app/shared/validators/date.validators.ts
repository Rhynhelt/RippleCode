import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Ensures the date is today or later.
 * Adds { pastDate: true } if the control's date is in the past.
 * Adds { invalidDate: true } if the value can't be parsed as a date.
 */
export function dueDateNotPast(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null; // empty is valid; use required() if you need it

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return { invalidDate: true };

    // Compare by date only (ignore time-of-day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    return d < today ? { pastDate: true } : null;
  };
}
