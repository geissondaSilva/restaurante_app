import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private router: Router, private service: AuthService,
    private toast: ToastController,
    private alert: AlertController,
    private loading: LoadingController) { }

    public form: FormGroup = new FormGroup({
        email: new FormControl(),
        senha: new FormControl(),
    })

    ngOnInit() {
    }

    public cadastrar() {
        this.router.navigateByUrl('cadastro-garcom')
    }

    public async entrar(){
        if(this.form.invalid){
            const alert = await this.toast.create({message: 'Existem campos inválidos', duration: 5000, buttons:['Ok']});
            await alert.present();
            return;
        }

        const load = await this.loading.create({message: 'Entrando...'})
        const error = await this.alert.create({
            header: 'Ops!',
            message: 'Houve problemas em realizar seu login, verifique se o email e senha estão corretos',
            buttons: [
                'Ok'
            ]
        })

        await load.present();
        this.service.login(this.form.value).subscribe(res => {
            load.dismiss();
            localStorage.setItem('token', res.data.token)
            this.router.navigateByUrl('home');
        }, () => {
            load.dismiss();
            error.present();
        })
    }

}
