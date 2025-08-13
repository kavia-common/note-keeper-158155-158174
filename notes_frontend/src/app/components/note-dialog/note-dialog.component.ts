import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit Note' : 'Create Note' }}</h2>
    <form [formGroup]="noteForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Note title">
        </mat-form-field>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Content</mat-label>
          <textarea matInput formControlName="content" placeholder="Note content" rows="6"></textarea>
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!noteForm.valid">
          {{ data ? 'Update' : 'Create' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    textarea {
      resize: vertical;
    }
  `]
})
export class NoteDialogComponent {
  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note | null
  ) {
    this.noteForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      content: [data?.content || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const note: Note = {
        ...this.noteForm.value,
        id: this.data?.id
      };
      this.dialogRef.close(note);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
