import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  constructor(public navCtrl: NavController, private navParams: NavParams,
              private view: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  closeModal() {
    this.view.dismiss();
  }

  saveRecord() {
    console.log(data.title);
  }

}
