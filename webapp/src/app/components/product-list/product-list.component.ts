import { Component, Inject, inject, Injector } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../types/category';
import { Brand } from '../../types/brands';
import {  FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,MatSelectModule,FormsModule,MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  customerService = inject(CustomerService);
  router=Inject (Router);

  
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = 'price';
  sortorder: number = -1;
  brandId: string = '';
  page = 1;
  pageSize = 10;
  products: any[] = [];
route=inject(ActivatedRoute);
category:Category[]=[];
brands:Brand[]=[];
  ngOnInit(){

    this.customerService.getCategories().subscribe(result=>{
      this.category=result;
    })

    this.customerService.getBrands().subscribe(result=>{
      this.brands=result;
    })
    
    this.route.queryParams.subscribe((x:any)=>{
      this.searchTerm=x.searchTerm || '';
      this.categoryId=x.categoryId || '';
      this.getProducts();
    })
  }

  getProducts(){
    this.customerService.getProducts(
      this.searchTerm,
      this.categoryId,
      this.sortBy,
      this.sortorder,
      this.brandId,
      this.page,
      this.pageSize
    ).subscribe((result) => {
      this.products = result;
      if(result.length<this.pageSize){
        this.isNext=false;
      }
    });
  }

  orderChange(event:any){
   this.sortBy='price';
   this.sortorder=event;
   this,this.getProducts();
  }

  isNext=true;
  pageChange(page:number){

    this.page=page;
    this.isNext=true;
    this.getProducts()
  }

}
