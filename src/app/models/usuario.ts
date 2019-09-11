import { TipoGrupo } from './tipo-grupo';

export class Usuario{
    public email: string;
    public nome: string;
    public senha: string;
    public grupo: TipoGrupo;
    public ativo: boolean = true;
}