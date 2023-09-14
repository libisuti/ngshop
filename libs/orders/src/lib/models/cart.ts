export class CartItem {
    productId?: string;
    quantity?: number;
}
export class Cart {
    items?: CartItem[];
}

export class CartItemDetailed {
    product?: any;
    quantity?: number;
}
