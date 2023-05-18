import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})

export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() recipeEmitter: EventEmitter<Recipe> = new EventEmitter<Recipe>();


  emitRecipe() {
    this.recipeEmitter.emit(this.recipe)
  }
}
