import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  //Estado que controla si se muestra o no el menú
  activeMenu = false;
  //Funcion que modifica el estado para mostrar o no el menú en celulares
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
