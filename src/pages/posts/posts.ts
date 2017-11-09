import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PostsPage');
  // }

  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    }

    const myModal: Modal = this.modal.create('PostPage', myModalOptions );

    myModal.present();
  }

}
