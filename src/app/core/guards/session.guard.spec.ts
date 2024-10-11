import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SessionGuard } from './session.guard';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';

describe('SessionGuard', () => {
  let guard: SessionGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const cookieServiceMock = jasmine.createSpyObj('CookieService', ['check']);

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]), 
        SessionGuard,
        { provide: Router, useValue: routerMock },
        { provide: CookieService, useValue: cookieServiceMock }
      ],
    });

    guard = TestBed.inject(SessionGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call checkCookieSession in canActivate', () => {
    const checkCookieSessionSpy = spyOn(guard, 'checkCookieSession').and.returnValue(true);
    const result = guard.canActivate({} as any, {} as any);
    expect(checkCookieSessionSpy).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should navigate to /auth when checkCookieSession returns false (no token)', () => {
    cookieServiceSpy.check.and.returnValue(false);
    
    const result = guard.checkCookieSession();
    
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/', 'auth']);
  });

  it('should return true when checkCookieSession finds a token', () => {
    cookieServiceSpy.check.and.returnValue(true);
    
    const result = guard.checkCookieSession();
    
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled(); // No debe redirigir si hay token
  });

  it('should handle exceptions in checkCookieSession and return false', () => {
    cookieServiceSpy.check.and.throwError('Error simulada');

    const result = guard.checkCookieSession();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).not.toHaveBeenCalled(); // No navega si hay error
  });
});
