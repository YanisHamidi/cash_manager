type RestUserInfos = Readonly<{
  userId: number;
  email: string;
  firstname: string;
  lastname: string;
  valid: boolean;
  token: string;
}>;

type RestGetUserInfos = Readonly<{
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  valid: boolean;
}>;

export type { RestUserInfos, RestGetUserInfos };
