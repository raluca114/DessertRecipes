import { Component, Input, OnInit, ViewChild} from '@angular/core';

import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})

export class AddRecipeComponent{


  @ViewChild('nameInput') nameInput: any;
  @ViewChild('imageInput') imageInput: any;
  @ViewChild('ingredientsInput') ingredientsInput: any;
  @ViewChild('cookTimeInput') cookTimeInput: any;
  @ViewChild('servingsInput') servingsInput: any;
  @ViewChild('equipmentInput') equipmentInput: any;
  @ViewChild('instructionsInput') instructionsInput: any;

  
  isVisible = false;
  currentDate = new Date();
  
  formGroup: FormGroup;

  constructor(private recipeService: RecipeService, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      ingredients: ['', Validators.required],
      cookTime: ['', Validators.required],
      servings: ['', Validators.required],
      equipment: ['', Validators.required],
      instructions: ['', Validators.required]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(name: string, image: string, ingredients: string, cookTime: string, servings: string,
    equipment: string, instructions: string): void {
  
    const nameValue = this.nameInput.nativeElement.value;
    const imageValue = this.imageInput.nativeElement.value;
    const ingredientsValue = this.ingredientsInput.nativeElement.value;
    const cookTimeValue = this.cookTimeInput.nativeElement.value;
    const servingsValue = this.servingsInput.nativeElement.value;
    const equipmentValue = this.equipmentInput.nativeElement.value;
    const instructionsValue = this.instructionsInput.nativeElement.value;
  
    const recipe: Recipe = {
      id: '1',
      name: nameValue,
      image: imageValue,
      ingredients: ingredientsValue,
      cookTime: cookTimeValue,
      servings: servingsValue,
      equipment: equipmentValue,
      instructions: instructionsValue,
      isFavorite: false,
      date: this.currentDate.toString()
    };
    this.recipeService.addRecipe(recipe);
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.reloadPage();
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 1000);
}

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}