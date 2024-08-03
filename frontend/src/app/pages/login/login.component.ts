import { Component } from '@angular/core';
import { PoPageLoginLiterals, PoPageLoginModule, PoPageLogin } from '@po-ui/ng-templates';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PoPageLoginModule    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu e-mail',
    passwordPlaceholder: 'Insira sua senha',
    submitLabel: 'Entrar',
    welcome: 'Olá, insira seu login e senha para aessar o sistema!',
  };

  async onSubmit(formData: PoPageLogin){
    const username = formData.login;
    const passwordd = formData.password;
    console.log(formData);
    

  }

  
}
