import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})

export class EditRecipeComponent implements OnInit {
  currentUserId: string | null = null;
  recipeId:string | null = null;
  currentRecipe: Recipe | null = null;

  constructor(public authService:AuthenticationService, private route: ActivatedRoute, private recipeService:RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getCurrentUserId().subscribe(currentUserId => {
      if (currentUserId) {
        this.currentUserId = currentUserId;
        this.route.params.subscribe((params) => {
          const id = params['id'];
          this.recipeId = id;
          this.recipeService.getRecipeById(this.currentUserId!, this.recipeId!)
            .then((recipe) => {
              if (recipe) {
                this.currentRecipe = recipe;
                console.log('Recipe found:', this.currentRecipe);
              } else {
                console.log('Recipe not found');
              }
            })
            .catch((error) => {
              console.error('Error retrieving recipe:', error);
            });
        });
      } 
    });
  }
  
  updateRecipe(recipe: Recipe): void {
    if (!this.currentUserId || !this.recipeId) {
      console.error('Collection path/Recipe ID is not defined.');
      return;
    }

    this.recipeService.updateRecipe(this.currentUserId, this.recipeId, recipe)
      .then(() => {
        console.log('Recipe updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating recipe:', error);
      });
  }
 
}
