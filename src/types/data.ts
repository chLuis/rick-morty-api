export type CharacterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type PaginationType = {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export type DataType = {
  info: PaginationType;
  results?: CharacterType[];
}