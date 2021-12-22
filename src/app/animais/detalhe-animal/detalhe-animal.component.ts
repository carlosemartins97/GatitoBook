import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  animal$!: Observable<Animal>;
  animalId!: number;

  constructor(private animaisSerivce: AnimaisService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.animalId = this.activateRoute.snapshot.params.animalId;
    this.animal$ = this.animaisSerivce.findById(this.animalId);
  }

}
