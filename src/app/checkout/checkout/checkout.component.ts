import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private fb:FormBuilder,private accountService:AccountService) { }
  
  checkoutForm= this.fb.group({
    addressForm:this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      street:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      zipCode:['',Validators.required]
    }),
    deliveryForm:this.fb.group({
      deliveryMethod:['',Validators.required]
    }),
    paymentForm:this.fb.group({
      nameOnCard:['',Validators.required]
    })
  })

  ngOnInit(): void {
    this.getAddressFormValues();
  }
  getAddressFormValues()
  {
    this.accountService.getUserAddress().subscribe({
      next:address=>{
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    })
  }
}
