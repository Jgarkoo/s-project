import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RouterLink } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ConvertImgPipe } from './convert-img.pipe';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AddRecipeComponent, RecipeDetailsComponent, ConvertImgPipe, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
