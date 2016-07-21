import {Component} from '@angular/core';


@Component({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html'
})
export class HelloIonicPage {
	messages: string[];
  constructor() {
  	this.messages = ['choose a plan', 'hi', 'hey there!','hello1', 'hi1', 'hey there!1','hello2', 'hi2', 'hey there!2'];
  }
}
