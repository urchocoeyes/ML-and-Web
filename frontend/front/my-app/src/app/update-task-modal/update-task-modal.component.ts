import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models';

@Component({
  selector: 'app-update-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-task-modal.component.html',
  styleUrl: './update-task-modal.component.css'
})
export class UpdateTaskModalComponent {
  @Output() close = new EventEmitter<void>();
  newTask: Task
  updateId = 0;
  constructor(private taskService:TaskService) { 
    this.newTask = {
      id: 0,
      name: '',
      statement: '',
      start_time: new Date().toISOString(),
      author: 1,
      points: 0
    };
    this.updateId = taskService.updateId;
  }

  onSubmit(form: NgForm, id: number) {
    console.log('Creating task:', this.newTask);
    if (form.valid) {
      this.taskService.updateTask(id, this.newTask).subscribe({
        next: (task) => {
          console.log('Task updated:', task);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    }
    else {
      console.error('Form is invalid');
    }
  }

  closeModal() {
    this.close.emit(); // Оповещаем родительский компонент о необходимости закрыть модальное окно
  }
}
