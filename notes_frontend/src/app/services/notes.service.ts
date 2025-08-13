import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor() {
    // Initialize with some sample notes
    this.addNote({
      title: 'Welcome to Notes!',
      content: 'This is your first note. You can create, edit, and delete notes.',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(note: Note): void {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.notes = [...this.notes, newNote];
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: Note): void {
    this.notes = this.notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date() } : note
    );
    this.notesSubject.next(this.notes);
  }

  deleteNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
  }

  searchNotes(query: string): void {
    const filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    this.notesSubject.next(filteredNotes);
  }
}
