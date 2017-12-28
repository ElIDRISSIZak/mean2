import { Component } from '@angular/core';
//import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'authentification',
  templateUrl: './auth.component.html'
})
export class AuthentificationComponent {
  model: any = {};
  currentUser : any;
  message:string;
  constructor( private _http: Http , private router: Router ) {}
  /*login(){
    this.authService.login(this.model)
            .subscribe(user => {
                this.model = user;
		alert("seccess");
            });

}*/
  login(){
    var headers = new Headers();
    headers.append('content-type','application/json');
    return this._http.post('http://localhost:3000/api/authen', JSON.stringify(this.model), {headers:headers})
	.subscribe(data => {
                if(data){

			
			localStorage.setItem('currentUser', JSON.stringify((<any>data)._body));
			this.message = "Successfuly "+(<any>data)._body;
			this.router.navigate(['']);
                }else {
                    this.message = "Username or Password Invalid";

                }
            });
          //.map(res => res.json());
    

   }
  
}

