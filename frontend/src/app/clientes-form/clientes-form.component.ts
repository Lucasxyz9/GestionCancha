import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/cliente.service'; // Importa el servicio
import { clientes } from 'src/app/clientes.model'; // Importa el modelo
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-cliente-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClienteFormComponent {
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.email]],
      ruc: [''],
      ci: ['', Validators.required],
    });
  }

  // Método para guardar un cliente
  guardarCliente() {
    if (this.clienteForm.valid) {
      const clienteData: clientes = this.clienteForm.value; // Mapear al modelo Clientes
      console.log('Enviando datos del cliente al backend:', clienteData);

      // Llama al servicio para guardar el cliente
      this.clienteService.guardarCliente(clienteData).subscribe({
        next: (response) => {
          console.log('Cliente registrado con éxito:', response);
          Swal.fire({
            title: 'Éxito!',
            text: 'Cliente registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.clienteForm.reset(); // Limpia el formulario tras el éxito
        },
        error: (err) => {
          console.error('Error al registrar el cliente:', err);
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un problema al registrar el cliente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        },
      });
    } else {
      console.log('Formulario inválido. Revisa los campos.');
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Revisa los campos del formulario.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Método para cancelar la acción
  cancelar() {
    this.clienteForm.reset(); // Limpia el formulario
    console.log('Formulario reiniciado.');
  }
}
