import { Component } from '@angular/core';
import { User } from './../user.model';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  user: User = {
    id_usuario: 0, username: '', email: '', password: '',
    rol: '',
    apellido: '',
    nombre: '',
    fecha_creacion: ''
  };

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.createUser(this.user).subscribe(response => {
      console.log('User created successfully:', response);
    });
  }
}
