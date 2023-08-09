import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
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
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
  ) {}
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

  //Método para descargar un pdf con el método del fileService
  //El type para un archivo pdf es 'application/pdf'
  downloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  //Método para subir archivos
  onUpload(event: Event) {
    //Si es un input se verifican si hay archivos adjuntos y se selecciona solo un archivo
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    //Si existe file envia el archivo, si es tipo file es de tipo Blob por herencia
    if (file) {
      this.filesService.uploadFile(file).subscribe((rta) => {
        //Location es la url que devuelve la respuesta del servidor con la imagen, esto es lo que se renderiza
        this.imgRta = rta.location;
      });
    }
  }
}
