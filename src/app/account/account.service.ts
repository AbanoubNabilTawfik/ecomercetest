import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl=environment.apiUrl;
  private currentUserSource= new ReplaySubject<User|null>(1);
  currentUser$=this.currentUserSource.asObservable();
  constructor(private http:HttpClient,private router:Router) { }

  loadCurrentUser(token:string|null)
  {
    if(token==null)
    {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers= new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);

    return this.http.get<User>(this.baseUrl +'account' ,{headers}).pipe(
      map(user=>{
        if(user)
        {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
          return user;
        }
        else
        {
          return null;
        }
       
      })
    )
  }

  register(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map(user => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    )
  }


  
  login(values:any)
  {
    return this.http.post<User>(this.baseUrl+'account/login',values).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
        return user;
      })
    )
  }

  logout()
  {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string)
  {
    return this.http.get<boolean>(this.baseUrl+'account/emailexists?email='+email);
  }
}