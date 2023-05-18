import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MainRoutingModule } from './main-routing.module';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { HomeComponent } from '../home/home.component';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { SearchComponent } from '../search/search.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';


@NgModule({
  declarations: [
    WelcomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomeComponent,
    AddRecipeComponent, 
    RecipesComponent,
    NavbarComponent,
    RecipeCardComponent,
    FavoritesComponent,
    SearchComponent,
    EditRecipeComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    MatProgressSpinnerModule
  ]
})
export class MainModule {

 }
   