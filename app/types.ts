export type Entry = {
  id: string;
  created_at: string;
  title: string | null;
  content: string;
  date: string;
  user_id: string;
  asset_urls: string[];
};
