import {Event} from './Event';

export class State {
  id: string;
  events: Array<Event>;
  title: string;
  sent_by: string

  constructor( id: string, events: Array<Event>, title: string, sent_by: string){
    this.id = id;
    this.events = events;
    this.title = title;
    this.sent_by = sent_by;
  }
}