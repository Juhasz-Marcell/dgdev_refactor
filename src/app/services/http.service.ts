import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { SmtpEmailBodyDTO } from '../models/SmtpEmailBodyDTO';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  sendSmtpEmail(dto: SmtpEmailBodyDTO): Observable<never>{
    const headers = this.generateHeaders();
    return this.http.post<never>(`${environment.serverUrl}/api/smtp/send-email`,dto, {headers});
  }

  private generateHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('DgDev_Permission_Key', environment.domainApiKey)

  }
}