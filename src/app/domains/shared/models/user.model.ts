import { Event } from "./event.model";

export interface User {
  id?: number;
  username: string;
  email:string;
  password: string;
  events: Event[];
  createdEvents: Event[];
}
