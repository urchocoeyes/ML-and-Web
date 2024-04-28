import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_URL = 'http://127.0.0.1:8000'
  taskId = 0;
  
  constructor(private http: HttpClient) { }

  getComments(id: number) :Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.BASE_URL}/api/tasks/${id}/comments`
    )
  }
}
