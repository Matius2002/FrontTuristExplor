import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para iniciar sesión
  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
