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
  dataModel: Object[];

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController, public fdb: AngularFireDatabase) {

    // This observes any changes of the data in the database.
    this.posts = fdb.list('posts').valueChanges();
  }

  // This runs at the beginning of the component lifecycle.
  ngOnInit() {
    this.fdb.object('posts').valueChanges().forEach(rec => {
      // Upload the records from the database into the model. This includes
      // an array of keys and array of corresponding data.
      if (rec) {
        this.keyNames = new Array(Object.keys(rec).length);
        this.keyNames = Object.keys(rec);

        this.dataModel = new Array(Object.keys(rec).length);
        for (var i = 0; i < Object.keys(rec).length; i++) {
          this.dataModel[i] = (rec[this.keyNames[i]]);
        }
      }
    });
  }

  // A method to add a new blog post to the database. It uses ionic alert component to capture
  // user input.
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
          // Connects and pushes data to the database.
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

  // A method that deletes one individual record based on the record number i,
  // by which we get the primary key from the previously saved keys array.
  deletePost(i) {
    this.fdb.object('posts/' + this.keyNames[i]).remove();
  }

  // A method that modifies one individual blog post on the record number i
  // and saves it back to the database.
  editPost(i) {
    let onePost: Object = this.dataModel[i];
    let alert = this.alertCtrl.create({
      title: "Edit Post",
      message: "Edit your post",
      inputs: [
        {
          name: "title",
          value: onePost['title'] // Shows the existing title from the data model
        },
        {
          name: "body",
          value: onePost['body'] // Shows the existing body from the data model
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            // Connects and saves the new data to the database
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

