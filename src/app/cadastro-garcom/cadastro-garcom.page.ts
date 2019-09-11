import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario';

@Component({
    selector: 'app-cadastro-garcom',
    templateUrl: './cadastro-garcom.page.html',
    styleUrls: ['./cadastro-garcom.page.scss'],
})
export class CadastroGarcomPage implements OnInit {

    public usuario: Usuario = new Usuario();

    constructor(private toast: ToastController,
    private router: Router,
    private alert: AlertController,
    private loading: LoadingController,
    private service: AuthService) { }

    public form: FormGroup = new FormGroup({
        nome: new FormControl(),
        email: new FormControl(),
        senha: new FormControl(),
        confirme: new FormControl(),
    })

    ngOnInit() {
    }

    public validarSenha(){
        if(!this.form.controls['senha'].invalid){
            let senha = this.form.controls['senha'].value;
            let confirme = this.form.controls['confirme'].value;
            if(senha != confirme){
                this.form.controls['confirme'].setErrors({'invalida': true})
            }else{
                this.form.controls['confirme'].setErrors(null)
            }
        }
    }

    public montarObj(){
        this.usuario.nome = this.form.controls['nome'].value
        this.usuario.email = this.form.controls['email'].value
        this.usuario.senha = this.form.controls['senha'].value
    }

    public async cadastrar(){
        if(this.form.invalid){
            const alert = await this.toast.create({message: 'Existem campos inválidos', duration: 5000, buttons:['Ok']});
            await alert.present();
            return;
        }

        this.montarObj();

        const load = await this.loading.create({message: 'Cadastrando...'})
        const success = await this.toast.create({message: 'Cadastrado com sucesso!', duration: 3000});
        const error = await this.alert.create({
            header: 'Ops!',
            message: 'Tivemos um problema ao realizar o seu cadastro, por favor tente novamente mais tarde!',
            buttons: [
                'Ok'
            ]
        })

        await load.present();
        this.service.singin(this.usuario).subscribe(() => {
            load.dismiss();
            success.present();
            this.router.navigateByUrl('login');
        }, () => {
            load.dismiss();
            error.present();
        })
    }

}
