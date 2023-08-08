import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
// import { IProduct } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showImg = true;
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  token = '';
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

  constructor(private usersService: UsersService) {}
  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toogleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'TEST',
        email: 'TESTER@mail.com',
        password: '123456',
        avatar: 'https://source.unsplash.com/random',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }
}
