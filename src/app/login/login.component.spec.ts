import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

export class AuthServiceMock  {
  protected login(username: string, password: string) { }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [FormsModule],
      providers: [
        {provide: AuthService, useValue: new AuthServiceMock() }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeTruthy();
  });


  it('login successfull', async (done) => {
    spyOn(component.auth, 'login').and.returnValue(Promise.resolve("Token"));
    component.username = 'Mike';
    component.password = '1234';
    let res = await component.login();

    expect(component.auth.login).toHaveBeenCalledTimes(1);
    expect(res).toEqual("Token")
    done();
  });

  it('login failed', async () => {
    spyOn(component.auth, 'login').and.returnValue(Promise.reject('Fake Error'));

    component.username = 'Mike';
    component.password = '12344';
    try {
      await component.login();
    } catch (err) {
      expect(component.auth.login).toHaveBeenCalledTimes(1);
    }
  });

});
