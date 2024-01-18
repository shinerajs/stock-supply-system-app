export interface ProfileUser {
    uid: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    phone?: string;
    address?: string;
    photoURL?: string;

    //supplier details
    id?: string;
    companyname?: string;
    regaddress?: string;
    tradeaddress?: string;
    town?: string;
    country?: string;
    postcode?: string;
    mobile?: string;
    supervisoremail?: string;
    accountnumber?: string;
    ifsccode?: string;
    status?: string;
    vatnumber?: string;
    companyregnum?: string;
    name?: string;
    position?: string;
    contactnum?: string;

    //add supplier

    contractor?: string;
    product?: string;
    period?: string;
    quantity?: string;
    amount?: string;
    purdate?: Date;
    buttonName?: string;
    available?: string;
    comments?: string;
    certificates?: string;
}
