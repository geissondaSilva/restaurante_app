import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-cadastro-garcom',
    templateUrl: './cadastro-garcom.page.html',
    styleUrls: ['./cadastro-garcom.page.scss'],
})
export class CadastroGarcomPage implements OnInit {

    constructor() { }

    public form: FormGroup = new FormGroup({
        nome: new FormControl(),
        email: new FormControl(),
        senha: new FormControl(),
        confirme: new FormControl(),
    })

    ngOnInit() {
    }

}
