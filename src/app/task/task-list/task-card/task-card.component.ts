import {Component, Input, OnInit} from '@angular/core';
import {TaskDto} from '../../task.dto';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task: TaskDto;

  constructor() { }

  ngOnInit(): void {
  }

}
