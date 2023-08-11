/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  //Comentamos esta seccion porque ya no se utiliza, era solo para entender conceptos anteriores, se explica en el Notion
  // counter = 0;
  //Para apagar el setInterval que sigue corriendo auque la imagen haya sido destruida

  // counterFn: number | undefined;

  //1.
  //Antes del render
  //No se corre asincronia y solo ocurre una vez
  constructor() {
    // console.log('constructor', 'imgValue =>', this.img);
  }
  //2.
  //Corre antes del render
  //Su objetivo principal es actualizar cambios en los inputs => Ocurre  muchas veces, todas las veces que actualicemos los componenets
  //Aca se deben de detectar los cambios de los inputs y no en el ngOnInit
  ngOnChanges(changes: SimpleChanges) {
    // console.log('ngOnChanges', 'imgValue =>', this.img);
    // console.log('changes', changes);
  }

  //3.
  //Antes del render
  //Si se corre cosas asincronas acá
  //Se hacen fetch, llamadas  a APIs
  //Corre una sola vez
  ngOnInit(): void {
    // console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000);
  }
  //4.
  //Corre despues de que todo esta renderizado
  //Si queremos manipular a los hijos,  aca se manipulan
  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
  }

  //5.
  //Se ejecutra solo cuando se elimina un componente
  ngOnDestroy(): void {
    // console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  img: string = '';
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('solo cambio la imagen =>', this.img);
  }
  @Input() alt = '';
  @Output() loaded = new EventEmitter<string>();
  imgDefault = '../../../assets/images/default.jpg';
  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    // console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
