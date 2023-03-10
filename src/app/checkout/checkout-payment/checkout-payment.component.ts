import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm?:FormGroup;
  constructor(private toastr:ToastrService,
            private checkoutService:CheckoutService,
            private router:Router,
            private basketService:BasketService) { }

  ngOnInit(): void {
  }


  submitOrder()
  {
    const basket=this.basketService.getCurrentBsketValue();
    if(!basket) return;
    const orderToCreate= this.getOrderToCreate(basket);

    if(!orderToCreate) return;

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next:order=>{
        this.toastr.success('order created successfully');
        this.basketService.deleteLocalBasket();
        const navigationExtras:NavigationExtras ={state:order};
        this.router.navigate(['checkout/success'],navigationExtras);
      }
    })
  }

  private getOrderToCreate(basket:Basket)
  {
    const deliveryMethodId=this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shippToAddress= this.checkoutForm?.get('addressForm')?.value as Address;

    if(!deliveryMethodId || !shippToAddress) return;

    return {
      basketId:basket.id,
      deliveryMethodId:deliveryMethodId,
      shipToAddress:shippToAddress

    }
  }
}
