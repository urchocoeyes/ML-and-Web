import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { Task } from '../models';
import { TaskService } from '../services/task.service';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { PageUnavailableComponent } from "../page-unavailable/page-unavailable.component";
import { RouterModule } from '@angular/router';
import { UpdateTaskModalComponent } from "../update-task-modal/update-task-modal.component";
import { CommentService } from '../services/comment.service';
import { UpdateModalComponent } from "../update-modal/update-modal.component";

@Component({
    selector: 'app-task',
    standalone: true,
    templateUrl: './task.component.html',
    styleUrl: './task.component.css',
    imports: [CommonModule, ModalComponent, CreateTaskModalComponent, PageUnavailableComponent, RouterModule, UpdateTaskModalComponent, UpdateModalComponent]
})
export class TaskComponent implements OnInit{

  @ViewChild(ModalComponent) modal!: ModalComponent;
  tasks: Task[] = []
  showModal: boolean = false;
  updateId = 0;
  constructor(private taskService: TaskService, private commentService: CommentService) {}

  updateTask(id: number) {
    this.showModal = true;
    this.taskService.updateId = id;
  }

  getIdForComment(id: number) {
    this.commentService.taskId = id;
  }

  ngOnInit(): void {
      this.getTasks();
  }

  toggleModal() {
    this.modal.toggle();
  }

  openModal(id: number) {
    this.taskService.updateId = id;
    console.log(id);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getTasks() {
    this.taskService.getTasks().subscribe((data) => {
      // console.log(data)
      this.tasks = data
    })
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: (response) => {
        console.log('Task deleted', response);
        this.getTasks(); // Обновить список задач после удаления
      },
      error: (error) => console.error('Error deleting task', error)
    });
  }
}
