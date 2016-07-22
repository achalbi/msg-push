import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MsgPushService} from '../services/MsgPushService';
import {Event} from '../datatypes/Event';
import {State} from '../datatypes/State';
import {Storage, LocalStorage, SqlStorage} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/msg-push/msg-push.html', 
  providers: [MsgPushService]
})

export class MsgPushPage {
	messages: string[];
  state: State;
	states: Array<State>;
	events: Array<Event>;
  url: string;
  local: any; 
  storage: Storage; 

  constructor(private nav: NavController,private navParams: NavParams, private msgPushService: MsgPushService) {
    //this.state = navParams.get('evt');
    this.storage = new Storage(SqlStorage);
    //this.storage.clear();
    this.storage.get('states').then((data) => {
                if (data != null) {
                  this.states = JSON.parse(data);
                }else{
                  this.states = []; 
                  this.url = "https://middle-men.herokuapp.com/workflows/578fb63722a15900035742b1/workflow_states/578fb6a622a15900035742b3";
                  this.pushMsg(this.url);
                }
    });

  }

  pushMsg(url){
         this.msgPushService.getMsg(url).subscribe(
          data => {
              this.events = [];
              data.workflow_events.forEach((evt) => {
                this.events.push(
                    new Event(evt.id['$oid'], evt.event, evt.url)
                  );
              });
              this.state = new State(data.id["$oid"], this.events, data.content, "");
              this.states.push(this.state);
              this.storage.set('states', JSON.stringify(this.states));
          },
          err => {
              console.log(err);
          },
          () => console.log('msg retrieved')
      );
  }

  evtTapped(event, evt) {
    this.state = new State("state-"+evt.id['$oid'], [], evt.title, "self");
    this.states.push(this.state);
    this.storage.set('states', JSON.stringify(this.states));
    this.pushMsg(evt.url);
    /*this.nav.push(MsgPushPage, {
      evt: evt.url
    });*/
  }

  trackByStates(index: number, state: State) { return state.id; }
}
