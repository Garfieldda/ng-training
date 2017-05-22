import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiService, ApiResponseConfigInterfaced } from '../../shared/shared.barrel';
import { Task } from '../task.barrel';

@Injectable()
export class TaskService {

  public constructor(private _apiService: ApiService) {
    //
  }

  public list(responseConfig: ApiResponseConfigInterfaced): void {
    this._apiService.request(
      {
        method: 'Get',
        url: 'task'
      },
      responseConfig
    );
  }

  public create(task: Task, responseConfig: ApiResponseConfigInterfaced): void {
    this._apiService.request(
      {
        method: 'Post',
        url: 'task',
        body: task
      },
      responseConfig
    )
  }

  public update(task: Task, responseConfig: ApiResponseConfigInterfaced): void {
    this._apiService.request(
      {
        method: 'Patch',
        url: 'task/' + task.id,
        body: task
      },
      responseConfig
    )
  }

  public delete(task: Task, responseConfig: ApiResponseConfigInterfaced): void {
    this._apiService.request(
      {
        method: 'Delete',
        url: 'task/' + task.id
      },
      responseConfig
    );
  }

}
