// interfaces/rolesInterfaces.ts

export interface IRoles extends Document {
    role_id: string;
    manager: boolean;
    casher: boolean;
    guess_user: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  