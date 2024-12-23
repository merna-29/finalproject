import { Component, inject } from '@angular/core';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,FormsModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  customerService = inject(CustomerService); // Using Angular's inject function
    // categoryService=inject(CategoryService);
    categoryList: Category[] = []; // Initialize the category list
    authService=inject(AuthService);
    searchTerm!:string;

    ngOnInit() {
        this.customerService.getCategories().subscribe((result: Category[]) => {
            this.categoryList = result; // Assign the result to categoryList
        });
    }

    router=inject(Router);
    onSearch(e:any){
      if(e.target.value){
        this.router.navigateByUrl("/products?searchTerm="+e.target.value)
      }

    }


    searchCategory(id:string){
      this.searchTerm ="";
      this.router.navigateByUrl("/products?categoryId="+id!)
    }
    logout(){
      this.authService.logout();
      this.router.navigateByUrl("/login")
    }
}
