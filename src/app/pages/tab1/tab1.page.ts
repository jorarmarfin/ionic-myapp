import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public deseosservice:DeseosService,
    private router:Router, 
    private alertcontroller:AlertController) {

  }
  async AgregarLista(){
    
      const alert = await this.alertcontroller.create({
        cssClass: 'my-custom-class',
        header: 'Nueva Lista',
        inputs:[
          {
            name:'titulo',
            type:'text',
            placeholder: 'Nombre de la lista'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: ()=>{
              console.log('Cancelar');
            }
          },
          {
            text:'Crear',
            handler:(data) =>{
              if (data.titulo.length ===0) {
                return;
              }
              const listaid = this.deseosservice.crearLista(data.titulo);
              this.router.navigateByUrl(`/tabs/tab1/agregar/${listaid}`);
  
            }
          }
        ]
      });
  
      await alert.present();
    
  }
  listaSeleccionada(lista: Lista){
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }

}
