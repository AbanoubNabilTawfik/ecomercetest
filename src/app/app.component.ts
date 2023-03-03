import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { Pagination } from './shared/models/pagination';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http:HttpClient,private basketService:BasketService) {

   }
  products: Product[] = [];

  ngOnInit(): void {
    this.http.get<Pagination<Product[]>>('https://localhost:7125/api/product?pageSize=50').subscribe({
      next: response => this.products = response.data,
      error: error => console.log(error), 
      complete: () => {
        console.log('request completed');
        console.log('extra statment');
      }
    })
    const basketId= localStorage.getItem("basket_Id");
    if(basketId) this.basketService.getBasket(basketId);
  }
  title = 'Shopping';
}
