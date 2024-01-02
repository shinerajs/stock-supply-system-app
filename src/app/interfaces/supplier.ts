export interface Supplier {
    id: string;
    name: string;
    product: string;
    quantity: string;
    inumber: string;
    amount: string;

    rating: RatingProps;
}

interface RatingProps {
    rate: number;
    count: number;
}
