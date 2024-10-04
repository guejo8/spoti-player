import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SessionGuard } from './session.guard'; 
describe('SessionGuard', () => {
  let guard: SessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]), 
        SessionGuard, 
      ],
    });

    guard = TestBed.inject(SessionGuard); 
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
