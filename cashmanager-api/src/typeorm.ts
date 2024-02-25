import { Users } from './users/entities/user.entities';
import { Products } from './products/entities/products.entities';
import { Shops } from './shops/entities/shops.entities';
import { Orders } from './orders/entities/order.entities';

const entities = [Users, Products, Shops, Orders];

export { Users, Products, Shops, Orders };
export default entities;
