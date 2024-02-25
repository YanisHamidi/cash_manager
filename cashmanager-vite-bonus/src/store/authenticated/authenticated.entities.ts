type AuthenticatedState = Readonly<{
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  role: 'event-admin' | 'event-client' | 'super-admin';
}>;

export type { AuthenticatedState };
