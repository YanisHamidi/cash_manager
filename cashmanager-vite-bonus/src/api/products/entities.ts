type RestProducts = Readonly<{
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
}>;

type RestShop = Readonly<{
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  image: string;
}>;

type RestCreateProducts = Readonly<{
  name: string;
  description: string;
  image: string;
  price: string;
  shop: RestShop;
  id: number;
}>;

export type { RestProducts, RestCreateProducts };
