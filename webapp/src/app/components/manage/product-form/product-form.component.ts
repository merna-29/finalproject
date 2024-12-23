import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../types/brands';
import { Category } from '../../../types/category';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule,MatSelectModule,MatCheckboxModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured:[false],
    isNewProduct:[false]

  });

  categoryService = inject(CategoryService);
  brandService = inject(BrandService);
  productService=inject(ProductService);
  // router = inject(Router); // Inject Router
  brands: Brand[] = [];
  categories: Category[] = [];
  route = inject(ActivatedRoute); // Inject ActivatedRoute
  router = inject(Router); // Inject Router

  id!: string;

  
  // Method to handle form submission
  addProduct() {
    let value = this.productForm.value; // Get form values
    console.log(value); // Log the form data
    this.productService.addProduct(value as any).subscribe((result)=>{
      alert('Product Added'); 

    this.router.navigateByUrl('/admins/products');

    })
    
  }
  
  updateProduct() {
    // Get the form value
    let value = this.productForm.value;
    
    // Log the form data for debugging
    console.log(value);
    
    // Call the product service to update the product
    this.productService.updateProduct(this.id, value as any).subscribe(
      (result) => {
        // Show a success message when the product is updated
        alert('Product updated');
        
        // Navigate to the product list or admin page after updating
        this.router.navigateByUrl('/admin/products');
      });

  }
  
  
  ngOnInit() {
    this.addImage(); // Add initial image field

    // Fetch categories from the CategoryService
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });

    // Fetch brands from the BrandService
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      // If an ID exists, fetch the product by ID
      this.productService.getProductById(this.id).subscribe(result => {
        for (let index = 0; index < result.images.length; index++) {
          this.addImage();
        }
        

        this.productForm.patchValue(result as any);
      });
    } else {

      this.addImage(); 
    }
  }


  // Method to add a new image input dynamically
  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  // Getter for images FormArray
  get images(){
    return this.productForm.get('images') as FormArray;
  }

  deleteImage(){
    this.images.removeAt(this.images.controls.length-1)
  }
  


}
