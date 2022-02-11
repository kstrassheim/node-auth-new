import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public username = '';
  public password = '';
  ngOnInit(): void {
  }

  public async login() {
    try {
      let res = await this.auth.login(this.username, this.password)
      alert(`Username ${this.username} - ${res}`);
      return res;
    }
    catch (err)
    {
      alert("Failed");
    }
    
  }
}
