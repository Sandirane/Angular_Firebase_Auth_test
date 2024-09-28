import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngFirebaseAuth';

  constructor(public authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.currentUserSig();
  }

  logout() {
    this.authService.logout()
    .subscribe(() => {
      console.log('Utilisateur déconnecté');
      this.router.navigateByUrl('/login')
    });
  }
}
