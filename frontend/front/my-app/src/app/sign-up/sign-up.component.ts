import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { User } from '../models';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  logged: boolean = false;
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  newUser: User

  constructor(private taskService: TaskService, private router: Router, private userService: UserService) {
    this.newUser = {
      id: 0,
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    const access = localStorage.getItem('access');
    if (access) {
      this.logged = true;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(){
    this.userService
      .createUser(this.newUser)
      .subscribe((data) => {
        console.log(data)
        this.logged = true;
        //localStorage.setItem("access", data.access)
        //localStorage.setItem("refresh", data.refresh)
        this.userService.username = data.username;
        this.router.navigate(['/home']);
      });
  }

  logout() {
    this.logged = false;
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    this.router.navigate(['/login']);
  }
}
