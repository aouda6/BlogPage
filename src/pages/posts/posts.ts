import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions, Alert, AlertController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController,
              public alertCtrl: AlertController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PostsPage');
  // }

  public add() {
    let alert = this.alertCtrl.create({
      title: "Add Product",
      message: "Enter a product and the price of that product",
      inputs: [
        {
          name: "product",
          placeholder: "Product Name"
        },
        {
          name: "price",
          placeholder: "Product Price"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            console.log({
              name: data.product,
              price: data.price
            });
          }
        }
      ]
    });
    alert.present();

  }

  // openModal() {
  //
  //   const myModalOptions: ModalOptions = {
  //     enableBackdropDismiss: false
  //   };
  //
  //   const myModal: Modal = this.modal.create('PostPage', {}, myModalOptions );
  //
  //   myModal.present();
  // }

}
