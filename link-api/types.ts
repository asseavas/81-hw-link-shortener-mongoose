export interface Link {
  _id: string;
  shortUrl: string;
  originalUrl: string;
}

export type LinkMutation = {
  shortUrl: string;
  originalUrl: string;
};
