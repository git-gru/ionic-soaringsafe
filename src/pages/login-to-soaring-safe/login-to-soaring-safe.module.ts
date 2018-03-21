import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginToSoaringSafePage } from './login-to-soaring-safe';

@NgModule({
  declarations: [
    LoginToSoaringSafePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginToSoaringSafePage),
  ],
})
export class LoginToSoaringSafePageModule {}
