import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {TaskDto} from '../task.dto';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: TaskDto[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }

}
