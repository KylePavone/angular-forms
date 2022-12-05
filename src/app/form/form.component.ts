import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup;
  inputValue: AbstractControl;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'name': ['', Validators.compose([Validators.required, myValidator])]
    });
    this.inputValue = this.myForm.controls['name'];

    this.inputValue.valueChanges.subscribe((value) => console.log(value));
    this.myForm.valueChanges.subscribe((form) => console.log(form))
  };


  whenSubmit(value: string): void {
    console.log('Sended ', value);
  }


 


  onSubmit(elem: HTMLInputElement): void {
    if (elem.value.length > 10) {
      console.log('Validation error');
      let checkError = document.querySelector(".error");
      if (!checkError) {
        let errElement = `<div class="error" style="color:red;">Too long</div>`;
        let formElement = document.querySelector("form");
        formElement?.insertAdjacentHTML("beforeend", errElement);
      }
    } else {
      console.log('Sended ', elem.value);
      let errElement = document.querySelector(".error");
      if (errElement) {
        errElement?.parentNode?.removeChild(errElement);
        elem.value = '';
      }
    }
  }
} 

function myValidator(v: FormControl): { [s: string]: boolean } {
  if (v.value === "suka") {
    return { invalidValue: true};
  }
  return { invalidValue: false};
}
