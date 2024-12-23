import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-brands-form',
  standalone: true,
  imports: [MatButtonModule ,MatInputModule,FormsModule],
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.scss'
})
export class BrandsFormComponent {
  name!: string;
  id!: string;
  brandsService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.brandsService.getBrandById(this.id).subscribe((result) => {
        this.name = result.name;
      });
    }
  }

  add() {
    this.brandsService.addBrand(this.name ).subscribe((result) => {
      alert('Brand Added');
      this.router.navigateByUrl('/admin/brands');
    });
  }

  update() {
    this.brandsService.updateBrand(this.id,this.name ).subscribe((result) => {
      alert('Brand Updated');
      this.router.navigateByUrl('/admin/brands');
    });
  }

}
