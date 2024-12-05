import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoayudaComponent } from './videoayuda.component';

describe('VideoayudaComponent', () => {
  let component: VideoayudaComponent;
  let fixture: ComponentFixture<VideoayudaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoayudaComponent]
    });
    fixture = TestBed.createComponent(VideoayudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
