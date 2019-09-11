import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(obj: {email: string, senha: string}): Observable<Response<{token: string}>>{
    return this.http.post<Response<any>>(environment.serverUrl + '/auth', obj);
  }

  public singin(obj: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(environment.serverUrl + '/auth/singin', obj);
  }
}
