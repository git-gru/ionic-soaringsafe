import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
// import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-create-child-profile',
  templateUrl: 'create-child-profile.html',
})
export class CreateChildProfilePage {
  profileName: string = '';

  constructor(public navCtrl: NavController, public toastCtrl:ToastController,
    // , public storage:Storage
    ) {
  }
  goToPickChildAvatar(){
    //Create a toaster
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom',
      closeButtonText: 'Close',
      showCloseButton: true
    });
    
    //Check if ProfileName Empty
    if(this.profileName.length < 1) {
      toaster.setMessage('Profile Name Required');
      toaster.present();
    } else {
      //Set Profile Name to local storage
      // this.storage.set('profleName', this.profileName);
      // navigate to Pickchild avatar page
      this.navCtrl.push('PickChildAvatarPage', {pName: this.profileName});
    }
  }
}
