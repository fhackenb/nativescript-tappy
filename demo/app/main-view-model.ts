import { Observable } from 'tns-core-modules/data/observable';
import { Tappy } from 'nativescript-tappy';

export class HelloWorldModel extends Observable {
  public message: string;
  private tappy: Tappy;

  constructor() {
    super();

    this.tappy = new Tappy();
    this.message = this.tappy.message;
    this.tappy.logDetails();
    console.log("Post log details!");
  }
}
