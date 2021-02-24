import { TestBed } from '@angular/core/testing';

import { GlobalTaskService } from './global-task.service';

describe('GlobalTaskService', () => {
  let service: GlobalTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
