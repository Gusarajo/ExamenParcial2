import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonItem } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseService, Task } from '../base.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.page.html',
  styleUrls: ['./cal.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonGrid, IonRow, IonCol, IonItem]
})
export class CalPage implements OnInit {
  constructor(
    private alertController: AlertController,
    public reviewService: BaseService,
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.tasks$ = this.reviewService.getTasks();

  }
  NombreInput: string = "";
  ApellidoInput: string = "";
  MatriculaInput: string = "";
  CorreoInput: string = "";
  DAMMInput: string = "";
  OCAInput: string = "";
  PMPInput: string = "";
  MATEInput: string = "";
  M3DInput: string = "";
  tasks$: Observable<Task[]> = new Observable<Task[]>();

  async onSubmit() {
    if (this.NombreInput && this.ApellidoInput && this.MatriculaInput && this.CorreoInput && this.DAMMInput && this.OCAInput && this.PMPInput && this.MATEInput && this.M3DInput) {
      const newTask: Task = {
        Nombre: this.NombreInput,
        Apellido: this.ApellidoInput,
        Matricula: this.MatriculaInput,
        Correo: this.CorreoInput,
        DAMM: this.DAMMInput,
        OCA: this.OCAInput,
        PMP: this.PMPInput,
        MATE: this.MATEInput,
        M3D: this.M3DInput
      }
      await this.reviewService.addTask(newTask);
      this.NombreInput = "";
      this.ApellidoInput = "";
      this.MatriculaInput = "";
      this.CorreoInput = "";
      this.DAMMInput = "";
      this.OCAInput = "";
      this.PMPInput = "";
      this.MATEInput = "";
      this.M3DInput = "";

      const alert = await this.alertController.create({
        header: 'Calificacion agregada',
        message: 'Tu calificacion se agrego',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Tu calificacion no se pudo agregar',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  borrar(id: string) {
    this.reviewService.deleteTask(id);
    const alert = this.alertController.create({
      header: 'Calificacion fue borrada',
      message: 'Tu calificacion se borro',
      buttons: ['OK'],
    });
  }

  async Editar(id: string, task: Task) {
    const alert = await this.alertController.create({
      header: 'Editar calificacion',
      inputs: [
        {
          name: 'Nombre',
          type: 'text',
          placeholder: 'Apellido',
          value: task.Nombre
        },
        {
          name: 'Apellido',
          type: 'text',
          placeholder: 'Apellido',
          value: task.Apellido
        },
        {
          name: 'Matricula',
          type: 'text',
          placeholder: 'Matricula',
          value: task.Matricula
        },
        {
          name: 'Correo',
          type: 'text',
          placeholder: 'Correo',
          value: task.Correo
        },
        {
          name: 'DAMM',
          type: 'text',
          placeholder: 'DAMM',
          value: task.DAMM
        },
        {
          name: 'OCA',
          type: 'text',
          placeholder: 'OCA',
          value: task.OCA
        },
        {
          name: 'PMP',
          type: 'text',
          placeholder: 'PMP',
          value: task.PMP
        },
        {
          name: 'MATE',
          type: 'text',
          placeholder: 'MATE',
          value: task.MATE
        },
        {
          name: 'M3D',
          type: 'text',
          placeholder: 'M3D',
          value: task.M3D
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.Nombre && data.Apellido && data.Matricula && data.Correo && data.DAMM && data.OCA && data.PMP && data.MATE && data.M3D) {
              const updatedTask: Partial<Task> = {
                Nombre: data.Nombre,
                Apellido: data.Apellido,
                Matricula: data.Matricula,
                Correo: data.Correo,
                DAMM: data.DAMM,
                OCA: data.OCA,
                PMP: data.PMP,
                MATE: data.MATE,
                M3D: data.M3D
              };
              this.reviewService.updateTask(id, updatedTask);
              this.showAlert('Calificacion actualizada', 'La calificacion ha sido actualizada correctamente.');
            } else {
              this.showAlert('Error', 'Todos los campos son obligatorios.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  onSignUp() {
    this.authService.logout();
    this.router.navigateByUrl("register");
  }
}


