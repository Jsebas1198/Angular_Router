import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  //Contador para explicar la reactividad
  counter = 0;

  //Estado que controla si se muestra o no el menú
  activeMenu = false;

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  //Funcion que modifica el estado para mostrar o no el menú en celulares
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
