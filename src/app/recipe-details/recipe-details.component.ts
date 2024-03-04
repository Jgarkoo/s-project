import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../server/recipe.service';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {

  id: string = '';
  editRecipeValue: any = [];
  recipeObj: any = '';
  recipe: any = {};
  showRecipe: boolean = false;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    this.id = this.route.snapshot.paramMap.get('id') || ' ';
  }

  ngOnInit() {
    this.editRecipeValue = [];
    this.recipeObj = '';
    this.recipeService.getSingleRecipe(this.id).subscribe(
      (recipe) => {
        this.recipe = recipe;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id).subscribe((id) => {
      this.id = this.id;
    },
      (err) => {
        console.log(err);

      })
  }

  callEditRecipe() {
    this.showRecipe = !this.showRecipe;
  }


  editRecipe() {
    this.recipe = this.editRecipeValue;
    console.log(this.editRecipe());

    this.recipeService.editRecipe(this.recipe, this.id).subscribe(res => {
      this.showRecipe = false;
    }, err => {
      alert("JG DIFF")
    })
  }

  onRecipeAdd(recipe: any) {
    this.recipe = {...this.recipe, ...recipe};
    this.showRecipe = false;
  }

}
