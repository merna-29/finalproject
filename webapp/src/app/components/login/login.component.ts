import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule ,MatButtonModule,ReactiveFormsModule,ReactiveFormsModule,MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder = inject(FormBuilder);
  loginForm = this.formbuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]

  });
  authService = inject(AuthService);
  router=inject(Router);
  snackBar = inject(MatSnackBar);

login() {
  if (this.loginForm.invalid) {
    this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
    return;
  }

  this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
    .subscribe(
      (result: any) => {
        console.log(result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.router.navigateByUrl('/');
      },
      (error: any) => {
        console.error(error);
        if (error.status === 401) {
          this.snackBar.open('Incorrect email or password.', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Incorrect email or password.', 'Close', { duration: 3000 });
        }
      }
    );
}


}
