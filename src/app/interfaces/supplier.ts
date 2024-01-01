export interface Supplier {
    id: number;
    name: string;
    product: string;
    quantity: number;
    inumber: string;
    amount: number;

    rating: RatingProps;
}

interface RatingProps {
    rate: number;
    count: number;
}
