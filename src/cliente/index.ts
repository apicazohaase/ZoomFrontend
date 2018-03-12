import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiClientService {
    private domain = 'http://173.193.79.109:31090';

    constructor(private http: HttpClient, @Optional() @Inject('domain') domain: string){
        if(domain){
            this.domain = domain;
        }
    }

    public login(data:any): Observable<HttpResponse<any>>{
        let uri = '/api/Login';
        let headers = new HttpHeaders();
        let params = new HttpParams();
        return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(data));
    }

    public Register(data:any): Observable<HttpResponse<any>>{
        let uri = '/api/Register';
        let headers = new HttpHeaders();
        let params = new HttpParams();
        return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(data));
    }

    private sendRequest<T>(method: string, uri:string, headers: HttpHeaders, params: HttpParams, body:any): Observable<HttpResponse<T>> {
        if (method === 'post'){
            return this.http.post<T>(this.domain + uri, body, {headers: headers.set('Content-Type', 'application/json'), params: params, observe: 'response'});
        } else if(method === 'get'){
            return this.http.get<T>(this.domain + uri, {headers: headers.set('Accept', 'application/json'), params: params, observe: 'response'});
        }

        if(method === 'get'){
            return this.http.get<T>(this.domain + uri, {headers: headers.set('Accept', '*/*'), params: params, observe: 'response'});

    }
}
}