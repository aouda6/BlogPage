import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage implements OnInit {

  posts: Observable<any[]>;
  keyNames: string[];
  postData: Object[];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController, public fdb: AngularFireDatabase) {

    this.posts = fdb.list('posts').valueChanges();
  }

  ngOnInit() {
    this.fdb.object('posts').valueChanges().forEach(rec => {
      if (rec) {
        this.keyNames = new Array(Object.keys(rec).length);
        this.keyNames = Object.keys(rec);

        this.postData = new Array(Object.keys(rec).length);
        for (var i = 0; i < Object.keys(rec).length; i++) {
          this.postData[i] = (rec[this.keyNames[i]]);
        }

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

  editPost(i) {
    let onePost = this.postData[i];
    let alert = this.alertCtrl.create({
      title: "Edit Post",
      message: "Edit your post",
      inputs: [
        {
          name: "title",
          value: onePost.title
        },
        {
          name: "body",
          value: onePost.body
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            this.fdb.object('posts/' + this.keyNames[i]).update({
              title: data.title,
              body: data.body
            });
          }
        }
      ]
    });
    alert.present();

  }
}

