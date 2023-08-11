import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { WebsiteRoutingModule } from './website-routing.module';
import { register } from 'swiper/element/bundle';

import { NavComponent } from './components/nav/nav.component';

import { HomeComponent } from './pages/home/home.component';

import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';

register();

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    MycartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SweetAlert2Module,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebsiteModule {}
