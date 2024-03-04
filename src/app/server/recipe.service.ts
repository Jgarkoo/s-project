import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeURL: string;

  constructor(private http: HttpClient) {
    this.recipeURL = 'http://localhost:3000/recipe-output';
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.recipeURL, recipe);
  }

  getRecipe(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipeURL);
  }
  getSingleRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeURL + '/' + id);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.recipeURL + '/' + id);
  }

  editRecipe(recipe: Recipe, id: string): Observable<Recipe> {
    return this.http.put<Recipe>(this.recipeURL + '/' + id, recipe);
  }
}
