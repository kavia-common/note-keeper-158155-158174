import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotesListComponent } from './components/notes-list/notes-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    NotesListComponent
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Notes App</span>
    </mat-toolbar>
    <app-notes-list></app-notes-list>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
    mat-toolbar {
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {
  title = 'Notes App';
}
