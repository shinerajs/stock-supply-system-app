export class Users {
    public email?: string;
    public password?: string;
    public firstName?: string;
    public lastName?: string;
    public phone?: string;
    public address?: string;
    public photoURL?: string;
    public displayName?: string;
    public profileName?: string;
    public uid?: string;
    public phoneNumber?: any;
    public role?: string;
    public profilerole?: string;
    public address1?: string;
    public postcode?: string;
    public state?: string;
    public address2?: string;
    public cityname?: string;
    public country?: string;

    public pan?: string;
    public gst?: string;

    public gender?: string;
    public dob?: any;

    public userType?: string;

}

export class NewUser {

    public email?: string;
    public password?: string;
    public userName?: string;
    public confirmPassword?: string;
    public roles?: string = 'Admin';
    public firstName?: string;
    public lastName?: string;
    public displayName?: string;
    public phone?: string;
    public address?: string;
    public photoURL?: string;
}
