export class Users {
    // uid: string;
   public email?: string;
   public password?: string;
   public firstName?: string;
   public lastName?: string;
   public  displayName?: string;
   public phone?: string;
   public address?: string;
   public photoURL?: string;
}

export class NewUser {

    public email?: string;
    public password?: string;
    public userName?: string;
    public confirmPassword?: string;
    public roles?: string = 'Admin';
    public firstName?: string;
    public lastName?: string;
    public  displayName?: string;
    public  phone?: string;
    public  address?: string;
    public photoURL?: string;
}
