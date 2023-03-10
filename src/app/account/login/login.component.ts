import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private accountService:AccountService,private router:Router,private activatedRoute:ActivatedRoute) {
    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
   }
  returnUrl:string="";
  loginForm= new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })


  ngOnInit(): void {
  }

  onSubmit()
  {
    this.accountService.login(this.loginForm.value).subscribe({
      next:user=>this.router.navigateByUrl(this.returnUrl)
    })
  }

}
