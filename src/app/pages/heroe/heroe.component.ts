import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm} from '@angular/forms';

import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  
  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id') || '';

    if( id !== 'nuevo' ) {
    
      this.heroesService.getHeroe(id)
        .subscribe( (resp: any) => {
          this.heroe = resp;
          this.heroe.id = id;
        })
    }
  } 

  guardarBD( form: NgForm ) {

    if ( form.invalid ) {
      console.log("Formulario no válido");
      return form.control.markAllAsTouched();
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();


    if ( this.heroe.id ) {
      this.heroesService.actualizarHeroe(this.heroe.id, {
        nombre: this.heroe.nombre,
        poder: this.heroe.poder,
        vivo: this.heroe.vivo
      })
      .subscribe( resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizó correctamente',
          icon: 'success'
        })
      })
    } else {
       this.heroesService.crearHeroe(this.heroe)
       .subscribe( resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se creó correctamente',
          icon: 'success'
        })
       })
    }

  }




}
