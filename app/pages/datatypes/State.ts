import {Event} from './Event';

export class State {
  events: Array<Event>;
  title: string;
  sent_by: string

  constructor(events: Array<Event>, title: string, sent_by: string){
    this.events = events;
    this.title = title;
    this.sent_by = sent_by;
  }
}