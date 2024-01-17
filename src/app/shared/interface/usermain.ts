
export interface Roles {
  supplier?: boolean;
  Subcontractor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  // photoURL: string;
  // displayName: string;
  sPushId: string;
  roles: Roles;
  password: string;
  displayName: string;
  type: string;
  // compName: string;
}

export interface NewAdmins {
  uid: string;
  email: string | null;
  roles: Roles;
  password: string;
  displayName: string;
  type: string;
  department: string;
}