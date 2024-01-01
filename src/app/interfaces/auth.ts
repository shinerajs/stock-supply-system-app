export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    
    supplierList: [
        name: string,
        product: string,
        quantity: number,
        inumber: string,
        amount: number
    ]
}
