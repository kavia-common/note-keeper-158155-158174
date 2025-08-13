import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <div class="search-bar">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Search notes</mat-label>
        <input matInput [(ngModel)]="searchQuery" (ngModelChange)="onSearch($event)" placeholder="Search by title or content">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="openNoteDialog()">
        <mat-icon>add</mat-icon>
        New Note
      </button>
    </div>

    <div class="notes-grid">
      <mat-card *ngFor="let note of notes" class="note-card">
        <mat-card-header>
          <mat-card-title>{{ note.title }}</mat-card-title>
          <mat-card-subtitle>
            Last updated: {{ note.updatedAt | date:'medium' }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ note.content }}</p>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-icon-button color="primary" (click)="editNote(note)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="deleteNote(note.id!)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }

    .search-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-field {
      width: 60%;
    }

    .notes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .note-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
      overflow: hidden;
    }

    mat-card-content p {
      white-space: pre-wrap;
      margin: 0;
    }
  `]
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  searchQuery: string = '';

  constructor(
    private notesService: NotesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  openNoteDialog(note?: Note): void {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '600px',
      data: note || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.notesService.updateNote(result);
        } else {
          this.notesService.addNote(result);
        }
      }
    });
  }

  editNote(note: Note): void {
    this.openNoteDialog(note);
  }

  deleteNote(id: string): void {
    this.notesService.deleteNote(id);
  }

  onSearch(query: string): void {
    this.notesService.searchNotes(query);
  }
}
