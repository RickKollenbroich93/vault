export type DB = {
  credentials: credential[];
};

export type credential = {
  credentials: [
    {
      service: string;
      username: string;
      password: string;
    }
  ];
};
