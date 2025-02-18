import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeadService } from '../../services/lead.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-create-lead',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.css'],
  providers: [LeadService],
})
export class CreateLeadComponent {
  leadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private leadService: LeadService,
    private snackBar: MatSnackBar
  ) {
    this.leadForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      email: ['', [Validators.required, Validators.email]],
      permissionToContact: [false],
    });

    // Auto-format phone number
    this.leadForm.get('phone')?.valueChanges.subscribe(value => {
      if (value) {
        this.leadForm.get('phone')?.setValue(this.formatPhoneNumber(value), { emitEvent: false });
      }
    });
  }

  isFormValid(): boolean {
    return this.leadForm.valid;
  }

  onSubmit(): void {
    if (this.leadForm.valid) {
      this.leadService.createLead(this.leadForm.value).subscribe({
        next: () => {
          this.showSnackbar('✅ Lead created successfully!', 'success-snackbar');
          this.leadForm.reset();
        },
        error: (error) => {
          console.error('Error creating lead:', error);
          this.showSnackbar('❌ Error creating lead. Please try again.', 'error-snackbar');
        },
      });
    }
  }

  private formatPhoneNumber(value: string): string {
    let cleaned = value.replace(/\D/g, '');

    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }

    if (cleaned.length > 6) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    } else if (cleaned.length > 3) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3)}`;
    } else if (cleaned.length > 0) {
      return `(${cleaned}`;
    }

    return cleaned;
  }

  private showSnackbar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [panelClass], 
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
