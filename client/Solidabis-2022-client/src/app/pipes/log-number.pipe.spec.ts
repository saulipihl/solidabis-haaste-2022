import { TestBed } from '@angular/core/testing';

import { LogNumberPipe } from './log-number.pipe';

describe('LogNumberPipe', () => {
  let pipe: LogNumberPipe = new LogNumberPipe();

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should process negative number correctly', () => {
    const value = pipe.transform(-1564);
    expect(value).toBe(0.00);
  });

  it('should process decimals correctly', () => {
    const value = pipe.transform(25.24786965413);
    expect(value).toBe(25.25);

    const value2 = pipe.transform(2);
    expect(value2).toBe(2);
  });
});
