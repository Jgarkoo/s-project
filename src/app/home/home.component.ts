import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../server/recipe.service';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  recipesData: any[] = [];
  ngOnInit(): void {
    this.recipeService.getRecipe().subscribe((data) => {
      this.recipesData = data;
    });
  }
}
