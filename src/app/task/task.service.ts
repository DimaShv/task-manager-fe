import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TaskDto} from './task.dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient) { }

  createTask(task: TaskDto): Observable<TaskDto> {
    return this.httpClient.post<TaskDto>(environment.url + '/api/v1/tasks', task);
  }

  updateTask(task: TaskDto): Observable<TaskDto> {
    return this.httpClient.put<TaskDto>(environment.url + '/api/v1/tasks/' + task.id, task);
  }

  getAllTasks(): Observable<TaskDto[]> {
    return this.httpClient.get<TaskDto[]>(environment.url + '/api/v1/tasks');
  }

  deleteTask(taskId: number): Observable<VoidFunction> {
    return this.httpClient.delete<VoidFunction>(environment.url + '/api/v1/tasks/' + taskId);
  }
}
