import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { HomeComponent } from '../home/home.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { FavoritesComponent } from '../favorites/favorites.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';


const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  { path: "", component: WelcomePageComponent, ...canActivate(redirectToHome) },
  { path: "login", component: LoginPageComponent, ...canActivate(redirectToHome) },
  { path: "register", component: RegisterPageComponent, ...canActivate(redirectToHome) },
  { path: "home", component: HomeComponent, ...canActivate(redirectToLogin) },
  { path: "home/edit/:id", component: EditRecipeComponent},
  { path: "home/favorites", component: FavoritesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }


