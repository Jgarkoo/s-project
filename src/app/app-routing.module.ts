import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    title: 'home',
    component: HomeComponent,
  },

  {
    path: 'recipe',
    title: 'add-recipe',
    component: AddRecipeComponent,
  },
  {
    path: 'recipe/:id',
    title: 'recipe-details',
    component: RecipeDetailsComponent,
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
