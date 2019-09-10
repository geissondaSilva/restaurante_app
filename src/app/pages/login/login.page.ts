import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private router: Router, private service: AuthService) { }

    public form: FormGroup = new FormGroup({
        email: new FormControl(),
        senha: new FormControl(),
    })

    ngOnInit() {
    }

    public cadastrar() {
        this.router.navigateByUrl('cadastro-garcom')
    }

    public entrar(){
        if(this.form.invalid){
            return;
        }

        this.service.login(this.form.value).subscribe(res => {
            console.log(res)
        }, error => {
            console.log(error)
        })
    }

}
