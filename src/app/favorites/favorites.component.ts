import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipe';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent {
  firestore = new FirebaseTSFirestore();
  user$ = this.authService.currentUser$;
  currentUserId: string | null = null;
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[]=[];

  constructor(public authService: AuthenticationService, private router: Router, private recipeService: RecipeService) {}

  getRecipes() {
    this.firestore.getCollection(
      {
        path: [this.currentUserId ?? ''],
        where: [],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let recipe = <Recipe>doc.data();
              recipe.id = doc.id
              if (recipe.isFavorite === true) {
                this.recipes.push(recipe);
                this.filteredRecipes.push(recipe);
              }
            });
        },
        onFail: err => {
        }
      }
    );
    return this.recipes;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserId = user.uid;
        this.getRecipes();
      }
    });
  }

  filterRecipes(filter: string) {
    this.filteredRecipes = this.recipeService.filterRecipes(filter, this.recipes)
  }
}