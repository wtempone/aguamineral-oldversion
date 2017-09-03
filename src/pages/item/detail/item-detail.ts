import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { Item } from '../../../providers/database/database-providers';
import { ItemService } from '../../../providers/database/database-providers';

import { Camera } from '@ionic-native/camera';


@Component({
  selector: 'page-item-detail', 
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  @ViewChild('fileInput') fileInput; 

  isReadyToSave: boolean;

  item: Item;
  update: boolean;

  form: FormGroup;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public itemService: ItemService,  navParams: NavParams) {
    if (navParams.get('item')) {
      this.form = formBuilder.group(navParams.get('item'));
      this.item = navParams.get('item');
      this.isReadyToSave = this.form.valid;
      this.update = true;
    } else {
      this.form = formBuilder.group({
        profilePic: [''],
        name: ['', Validators.required],
        about: ['']
      });      
    }
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {


      this.camera.getPicture({
        quality : 75, 
        destinationType : this.camera.DestinationType.DATA_URL, 
        sourceType : this.camera.PictureSourceType.CAMERA, 
        allowEdit : true,
        encodingType: this.camera.EncodingType.JPEG,
        targetWidth: 900,
        targetHeight: 900,
        saveToPhotoAlbum: false
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })

      
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
}
