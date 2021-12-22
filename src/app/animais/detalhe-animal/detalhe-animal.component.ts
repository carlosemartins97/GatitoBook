import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private animaisSerivce: AnimaisService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.animalId = this.activateRoute.snapshot.params.animalId;
    this.animal$ = this.animaisSerivce.findById(this.animalId);
  }

  curtir() {
    this.animaisSerivce.curtir(this.animalId).subscribe((curtida) => {
      if(curtida) {
        this.animal$ = this.animaisSerivce.findById(this.animalId);
      }
    })
  }

  excluir() {
    this.animaisSerivce.deleteAnimal(this.animalId).subscribe(() => {
      this.router.navigate(['/animais/'])
    }, (error => {
      console.log(error);
    }))
  }

}
