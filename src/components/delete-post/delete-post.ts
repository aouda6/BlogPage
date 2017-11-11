import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the DeletePostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'delete-post',
  templateUrl: 'delete-post.html'
})
export class DeletePostComponent {


  constructor(public fdb: AngularFireDatabase) {

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
