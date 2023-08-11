import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  // token = '';
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products: Product[]) => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$.subscribe((data) => {
      this.profile = data;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    // this.authService
    //   .loginAndGet('TESTER@mail.com', '123456')
    //   .subscribe((user) => {
    //     this.profile = user;

    //   });

    this.authService.loginAndGet('john@mail.com', 'changeme').subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
  // getProfile() {
  //   this.authService.getProfile().subscribe((user) => {
  //     this.profile = user;
  //   });
  // }
}
