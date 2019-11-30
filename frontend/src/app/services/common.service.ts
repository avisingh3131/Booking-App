import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/Note';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

const url = 'http://localhost:3000';
@Injectable()
export class CommonService {

  showNoteList = false;

  allNoteList: Note[] = [];

  constructor(private http: HttpClient) { }

  postNote(currentNote: Note) {
    const body = JSON.stringify(currentNote);
    return this.http.post<Note>(`${url}/notes`, body, httpOptions);
  }
  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(`${url}/notes`);
  }
  updateNote(currentNote) {
    const body = JSON.stringify(currentNote);
    return this.http.patch<Note>(`${url}/updatenote`, body, httpOptions);
  }
  deleteNote(id: string) {
    return this.http.delete<string>(`${url}/notes/${id}`);
  }
  createNewUser(data) {
    const body = JSON.stringify(data);
    return this.http.post<any>(`${url}/createUser`, body, httpOptions);
  }
  login(data) {
    const body = JSON.stringify(data);
    return this.http.post<any>(`${url}/login`, body, httpOptions);
  }
}
