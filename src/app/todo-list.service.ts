import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

constructor(private http: HttpClient) { }

getAllTask():Observable<any>{
  return this.http.get("http://localhost:3000/tasks",{responseType:'json'})
}

addNewTask(body:any):Observable<any>{
  return this.http.post<any>("http://localhost:3000/tasks/addTask",body,{responseType:'json'})
}

updateTask(body:any){
  return this.http.patch("http://localhost:3000/tasks/updateTask/"+body.id,{taskName:body.name} )
}

deleteTask(body:any){
  return this.http.delete("http://localhost:3000/tasks/deleteTask/"+body.id)
}

updateStatus(body:any){
 return this.http.patch("http://localhost:3000/tasks/updateStatus/"+body.id,{isCompleted:body.complete})
}
}
