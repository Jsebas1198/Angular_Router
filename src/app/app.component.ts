import { Component } from '@angular/core';
// import { IProduct } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showImg = true;
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  // products: IProduct[] = [
  //   {
  //     id: 1,
  //     name: 'Automobil de juguete',
  //     price: 100,
  //     image: 'https://source.unsplash.com/random',
  //   },
  //   {
  //     id: 2,
  //     name: 'Muñeca de trapo',
  //     price: 180,
  //     image: 'https://source.unsplash.com/random',
  //   },
  //   {
  //     id: 3,
  //     name: 'Pelota de futbol',
  //     price: 120,
  //     image: 'https://source.unsplash.com/random',
  //   },
  // ];

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toogleImg() {
    this.showImg = !this.showImg;
  }
}
