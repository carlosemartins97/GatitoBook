import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() animalId!: number;

  comentarios$!: Observable<Comentarios>;

  comentarioForm = new FormGroup({
    comentario: new FormControl('', [Validators.maxLength(300)])
  })

  constructor(
    private comentarioService: ComentariosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscaComentario(this.animalId);
  }

  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    
    this.comentarios$ = this.comentarioService
      .incluiComentario(this.animalId, comentario)
      .pipe(switchMap(() => this.comentarioService.buscaComentario(this.animalId)),
      tap(() => {
        this.comentarioForm.reset();
        alert('Comentário publicado');
      })
      )
  }

}
