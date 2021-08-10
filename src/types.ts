export type DB = {
  credentials: Credential[];
};

export type Credential = {
  credentials: {
    service: string;
    username: string;
    password: string;
  };
};
