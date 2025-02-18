export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class ContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContextError";
  }
}
// Liste des erreurs réutilisables
export const ERROR_MESSAGES = {
  EMPTY_FIELDS: "Un ou plusieurs champs sont vides.",
  PASSWORD_TOO_SHORT: "Le mot de passe doit contenir au moins 8 caractères.",
  USER_ALREADY_EXISTS: "L'utilisateur existe déjà.",
  USER_NOT_FOUND: "Utilisateur non trouvé.",
  INCORRECT_PASSWORD: "Mot de passe incorrect.",
  STORAGE_ERROR: "Erreur lors de l’enregistrement des données.",
  FETCH_ERROR: "Erreur lors de la récupération des données.",
  CONTEXT_PROVIDER_ERROR:
    "le Context doit etre utilisé à l'interieur de son Provider.",
  SLOT_ERROR: "Le slot n'est pas disponible.",
};
