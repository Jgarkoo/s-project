import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {RecipeService} from "../server/recipe.service";
import { Recipe } from "../model/recipe";
import {map} from "rxjs";
@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnChanges {
  addRecipeForm  = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    ingredients: new FormControl('', [Validators.required, Validators.minLength(10)]),
    instructions: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })
  img:string | null = null;
  successMessage = false;

  imgSrc: any;

  @Input() recipeId!: string;

  @Output() recipeAdd = new EventEmitter()

  @Input() recipe!: Recipe; 

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['recipe'] && this.recipe){
        this.addRecipeForm.get('title')?.setValue(this.recipe.title)
        this.addRecipeForm.get('description')?.setValue(this.recipe.description)
        this.addRecipeForm.get('ingredients')?.setValue(this.recipe.ingredients)
        this.addRecipeForm.get('instructions')?.setValue(this.recipe.instructions)
      }
  }

  constructor(private recipeService : RecipeService) {
  }
  addIngredient() {
    if (!this.addRecipeForm.valid) {
      return;
    }

    const request : Recipe = this.addRecipeForm.value as Recipe;
    request.image = this.img || '';

    this.recipeService.addRecipe(request).subscribe({
      next: (result) => {
        this.addRecipeForm.reset();
        this.img = null;
        this.successMessage = true;
        setTimeout(() => {
          this.successMessage = false;
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = btoa(reader.result as string);
      this.img = base64String;
    };
    reader.readAsBinaryString(file);

  }

  editRecipe() {
    if (!this.addRecipeForm.valid) {
      return;
    }
    const request : Recipe = this.addRecipeForm.value as Recipe;
    if(this.img){
      request.image = this.img || '';
    }

    this.recipeService.editRecipe(request, this.recipeId).subscribe({
      next: (result) => {
        this.recipeAdd.emit(request)
        this.img = null;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
