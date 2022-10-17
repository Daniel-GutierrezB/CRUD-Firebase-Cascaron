import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-45467-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {

  }

  crearHeroe( heroe: HeroeModel) {

    return this.http.post(`${this.url}/heroes.json`, heroe)
              .pipe(
                map((resp: any) => {
                  heroe.id = resp.name;
                  return heroe;
                })
              );
  }

  actualizarHeroe( id: any, heroe: { nombre: string; poder: string; vivo: boolean; }) {

    return this.http.put(`${this.url}/heroes/${id}.json`, heroe);
  }

  borrarHeroe( id: string ) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe( id: string ) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
              .pipe(                
                // map(resp => this.crearArrayHeroes(resp)) - Es lo mismo 
                map(this.crearArrayHeroes),
                delay(500)
              );
  }

  private crearArrayHeroes( heroesObj: any) {

    const heroes: HeroeModel[] = [];

    if( heroesObj === null) return []; 

    if ( !heroesObj ) return heroes;
      
  
    for (const key in heroesObj) {
      heroesObj[key].id = key;
      heroes.push(heroesObj[key]);
    }

    return heroes;
  }
}
