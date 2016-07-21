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
  storage: any; 

  constructor(private nav: NavController,private navParams: NavParams, private msgPushService: MsgPushService) {
  	//this.state = navParams.get('evt');
  	
    this.url = "https://middle-men.herokuapp.com/workflows/578fb63722a15900035742b1/workflow_states/578fb6a622a15900035742b3";
    if( navParams.get('evt') === undefined ) {
    }else{
    	this.url = navParams.get('evt');
    }
	    msgPushService.getMsg(this.url).subscribe(
	        data => {
              this.events = [];
          //    this.local = new Storage(LocalStorage);
          //    this.storage = new Storage(SqlStorage);
              data.workflow_events.forEach((evt) => {
                this.events.push(
                    new Event(evt.event, evt.url)
                  );
              });
              this.state = new State(this.events, data.content, "");
              /*this.storage.get('states').then((data) => {
                if (data != null) {
                  this.states = JSON.parse(data);
                }else{
                  this.states = []; 
                }
              });*/
              this.states = []; 
              this.states.push(this.state);
              /*console.log("------");
              console.log(this.states[0].title);
              console.log("------");*/
           //   this.storage.set('states', JSON.stringify(this.states));
	        //    console.log(JSON.stringify(this.states));
          },
          err => {
              console.log(err);
	        },
	        () => console.log('msg retrieved')
	    );

  }

  evtTapped(event, evt) {
    this.state = new State([], evt.title, "self");
   // console.log(this.state);
    this.storage = new Storage(SqlStorage);
    this.states.push(this.state);
    this.storage.set('states', JSON.stringify(this.states));
    this.msgPushService.getMsg(evt.url).subscribe(
          data => {
              this.events = [];
          //    this.local = new Storage(LocalStorage);
              data.workflow_events.forEach((evt) => {
                this.events.push(
                    new Event(evt.event, evt.url)
                  );
              });
              this.state = new State(this.events, data.content, "");
              /*this.storage.get('states').then((data) => {
                if (data != null) {
                  this.states = JSON.parse(data);
                }else{
                  this.states = []; 
                }
              });*/
              this.states.push(this.state);
              /*console.log("------");
              console.log(this.states[0].title);
              console.log("------");*/
              this.storage.set('states', JSON.stringify(this.states));
          //    console.log(JSON.stringify(this.states));
          },
          err => {
              console.log(err);
          },
          () => console.log('msg retrieved')
      );
    /*this.nav.push(MsgPushPage, {
      evt: evt.url
    });*/
  }
}
