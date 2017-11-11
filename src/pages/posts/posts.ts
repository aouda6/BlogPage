import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {query} from "@angular/core/src/animation/dsl";


@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {

  posts: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public fdb: AngularFireDatabase) {

    this.posts = fdb.list('posts').valueChanges();

  }

  public addItem() {
    let alert = this.alertCtrl.create({
      title: "Add New Post",
      message: "Enter a title and body of your post",
      inputs: [

        {
          name: "title",
          placeholder: "Add Title"
        },
        {
          name: "body",
          placeholder: "Add Body"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Post",
          handler: data => {

            let newPost = {
              title: data.title,
              body: data.body
            };
            this.fdb.list('posts').push({
                title: data.title,
                body: data.body
          }).then(
              (rec) => {
                console.log(rec.key);

              }
            );

          }
        }
      ]
    });
    alert.present();
  }

  deletePost(i) {
var list = this.fdb.object('posts').valueChanges();
    list.forEach(rec => {
      let keyNames = Object.keys(rec);
      console.log('key:', keyNames[i]);
    });

    // this.fdb.object('posts').valueChanges().forEach(rec => {
    //   if (rec) {
    //
    //     let keyNames = Object.keys(rec);
    //     this.fdb.object('posts/' + keyNames[i]).remove();
    //
    //   }
    //
    // });


  //






   //  this.fdb.list('posts').remove(data[i].key);

    //  this.fdb.list('posts').remove(rec[i].key).then(rec => {


    //
  }

}

// ionViewDidLoad() {
//   console.log('ionViewDidLoad PostsPage');
// }


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

