import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;

  constructor() {
    // Cargar usuario de localStorage o de donde lo tengas
    const userData = localStorage.getItem('currentUser');
    this.currentUser = userData ? JSON.parse(userData) : null;
  }

  getCurrentUserId(): number {
    return this.currentUser?.id || 1; // Default a 1 si no hay usuario
  }

  // Métodos adicionales que necesites
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}