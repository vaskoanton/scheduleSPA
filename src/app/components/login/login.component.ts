import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Router,ActivatedRoute } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { Roles } from '../../constants/roles';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitBtnDisabled: boolean = false;
  serverMessage: string;

  constructor(private fb: FormBuilder, 
    private loginService: LoginService,
    private authService: AuthService,
    private router:Router) { }

  ngOnInit() {
    this.initializeForm();
    this.authService.resetToken();
  }

  initializeForm(): void{
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required
       ]],
      password: ['', [
        Validators.required
      ]]
     });
  }

  onSubmit($event): void {
    $event.preventDefault();
    const controls = this.loginForm.controls;

     if (this.loginForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
       return;
      }

      this.isSubmitBtnDisabled = true;
      
      var user = new User();
      user.login = this.loginForm.controls['username'].value;
      user.password = this.loginForm.controls['password'].value;
      this.loginService.authorize(user).subscribe(token => {
        this.isSubmitBtnDisabled = false;

        this.authService.setToken(token.access_token);
        var tokenInfo = this.authService.decodeToken();
        if(tokenInfo.role == Roles.Admin){
          this.router.navigate(['admin']);
        }
        else{
          this.router.navigate(['main']);
        }
      }, error => {
        console.log(error);
        this.isSubmitBtnDisabled = false;

        if(error.hasOwnProperty('error') && typeof(error.error) == "object") this.serverMessage = error.statusText;
        else this.serverMessage = error.error;
      });
    }
    
    isRequired(inputName: string): boolean{
      return this.loginForm.controls[inputName].hasError('required');
    }

    hasError(inputName: string): boolean{
      return this.loginForm.controls[inputName].touched && !this.loginForm.controls[inputName].valid;
    }

}
