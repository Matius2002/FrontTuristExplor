// Clase que representa a un usuario en el sistema
export class Usuario {
  // Propiedad que almacena el ID del usuario
  id: number = 0;

  // Propiedad que almacena el nombre de usuario
  nombreUsuario: string = "";

  // Propiedad que almacena el correo electrónico del usuario
  email: string = "";

  // Propiedad que almacena una lista de permisos asociados al usuario
  permisos: string[] = [];
}

