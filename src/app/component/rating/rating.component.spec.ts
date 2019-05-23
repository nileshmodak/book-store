import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 5 input radios for star rating', () => {
    const fixture = TestBed.createComponent(RatingComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('input[type="radio"]').length).toEqual(5);
  });

  it('should call onClick handler', async(() => {
    spyOn(component, 'onClick');
  
    let button = fixture.debugElement.nativeElement.querySelector('label');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.onClick).toHaveBeenCalled();
    });
  }));

});
