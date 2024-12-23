import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Product } from '../types/product'; // Ensure this path is correct
import { environment} from '../../environments/environment'; // Ensure this path is correct
import { Category } from '../types/category';
import { Brand } from '../types/brands';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() {}

  // Fetch new products
  getNewProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/customer/new-products');
  }

  // Fetch featured products
  getFeaturedProducts(){
    return this.http.get<Product[]>(environment.apiUrl + '/customer/featured-products');
  }

  getCategories(){
    return this.http.get<Category[]>(environment.apiUrl + '/customer/categories');
  }
  getBrands(){
    return this.http.get<Brand[]>(environment.apiUrl + '/customer/brands');
  }


  getProducts(
     searchTerm: string = '',
  categoryId: string = '',
  sortBy: string = '',
  sortOrder: number = 1,
  brandId: string = '',
  page: number = 1,
  pageSize: number = 10
  ) {
    // Correctly use backticks for template literals and remove trailing commas
    return this.http.get<Product[]>(`${environment.apiUrl}/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`);
  }

  getProductById(id:string){
    return this.http.get<Product>(environment.apiUrl + '/customer/product/'+ id);
  }


  
}
