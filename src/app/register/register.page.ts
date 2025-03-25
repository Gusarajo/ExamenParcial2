import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class RegisterPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
  ) { }
  ngOnInit() {
  }
  emailInput: string = '';
  passwordInput: string = '';
  async onSubmit() {




    try {
      await this.authService.register(this.emailInput, this.passwordInput);
      const alert = await this.alertController.create({
        header: 'Sesion creada',
        message: 'Tu sesion a sido creada con exito',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigateByUrl("home");
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tu sesion no se pudo iniciar ',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  onSignUp() {
    this.router.navigateByUrl("home");
  }
}

