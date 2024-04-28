import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../models';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';
import { User } from '../models';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})

export class CommentsComponent implements OnInit{
  comments: Comment[] = []
  username: string = "";
  constructor(private commentService:CommentService, private userService:UserService) {}

  ngOnInit(): void {
      this.getComments();
  }
  getComments() {
    this.commentService.getComments(this.commentService.taskId).subscribe((data) => {
      this.comments = data;
    })
  }
  /*getUsername(comment: Comment) : Observable<string> {
    return this.userService.getUser(comment.user_id);
  }*/
}
