import { BigtittleDirective } from './bigtittle.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('BigtittleDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const mockRenderer = {
      setStyle: jasmine.createSpy('setStyle')
    } as unknown as Renderer2;

    const directive = new BigtittleDirective(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});