import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private accountService:AccountService,private router:Router) { }
  registerForm=this.fb.group({
    displayName:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required]
  })
  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.registerForm.value)
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/shop')
    })
  }

}
