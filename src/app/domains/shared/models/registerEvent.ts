export interface RegisterEvent {
  id?: number;
  title: string;
  description: string;
  start_time: string;
  finish_time: string;
  category: string;
  type: string;
  location: string;
  creator_id?: number;
}
