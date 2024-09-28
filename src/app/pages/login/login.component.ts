import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;


  onSubmit(): void {
    console.log('login');
    const rawForm = this.form.getRawValue()
    this.authService.login(
      rawForm.email,
      rawForm.password
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/home')
      }, error: (err) => {
        this.errorMessage = err.code
      }
    })
  }

}
