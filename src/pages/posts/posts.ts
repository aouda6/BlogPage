import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {AngularFireDatabase, QueryFn} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {query} from "@angular/core/src/animation/dsl";


@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage implements OnInit {

  posts: Observable<any[]>;
  keyNames: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public fdb: AngularFireDatabase) {

    this.posts = fdb.list('posts').valueChanges();

  }
  ngOnInit() {
    this.fdb.object('posts').valueChanges().forEach(rec => {
      if (rec) {
      this.keyNames = new Array(Object.keys(rec).length);
      this.keyNames = Object.keys(rec);
    }
    });
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
          })

          }
        }
      ]
    });
    alert.present();
  }

  deletePost(i) {
    this.fdb.object('posts/' + this.keyNames[i]).remove();
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

