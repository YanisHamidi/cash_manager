type RestShop = Readonly<{
  id: number;
  name: string;
  address: string;
  longitude: string;
  latitude: string;
  image: string;
}>;

type RestCreateShop = Readonly<{
  address: string;
  image: string;
  latitude: string;
  longitude: string;
  name: string;
  owner: Readonly<{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    valid: boolean;
  }>;
  id: number;
}>;

export type { RestShop, RestCreateShop };
