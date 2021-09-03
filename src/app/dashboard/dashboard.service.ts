import { EventEmitter, Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})
export class PreloadService {
    
    cargando$ = new EventEmitter<boolean>();
    
    constructor( ) { }

}