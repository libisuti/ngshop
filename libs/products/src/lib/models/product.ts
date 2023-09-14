import { Categoryfollow } from './categoryfollow';

export class Product {
    id?: string;
    name?: string;
    description?: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price?: number;
    category?: Categoryfollow;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}
