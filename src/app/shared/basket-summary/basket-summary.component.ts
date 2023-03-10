import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from '../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
 @Output() addItem = new EventEmitter<BasketItem>();
 @Output() removeItem = new EventEmitter<{id:number,quantity:number}>();

 @Input() isBasket= true;
  constructor(public basketService:BasketService) { }

  ngOnInit(): void {
  }

  addBasketItem(item:BasketItem)
  {
    this.addItem.emit(item);
  }

  removeBasketItem(id:number,quantity=1)
  {
    this.removeItem.emit({id,quantity});
  }

}
