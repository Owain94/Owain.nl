import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WhatpulseService } from './whatpulse.service';

describe('The whatpulse service', () => {
  let whatpulseService: WhatpulseService;
  let httpMock: HttpTestingController;

  const username = 'Owain';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WhatpulseService
      ]
    });

    whatpulseService = TestBed.get(WhatpulseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should instantiate',
    inject([WhatpulseService], (service: WhatpulseService) => {
      expect(service instanceof WhatpulseService).toBeTruthy();
    })
  );

  describe('getStats()', () => {
    it('should return an Observable<{\'keys\': number, \'clicks\': number}>', (done: any) => {
      const mockResponse = {
        'Pulse-0': {
          'Keys': '200',
          'Clicks': '100'
        },
        'Pulse-1': {
          'Keys': '300',
          'Clicks': '200'
        }
      };

      whatpulseService.getStats().subscribe((res: {'keys': number, 'clicks': number}) => {
        console.log(res);
        expect(res.keys).toEqual('500');
        expect(res.clicks).toEqual('300');
        done();
      });

      const date: Date = new Date();
      const dateNow: number = Math.floor(date.getTime() / 1000);
      const monthAgo: number = Math.floor(date.setMonth(date.getMonth() - 1) / 1000);

      httpMock.expectOne(
        `//api.whatpulse.org/pulses.php?user=${username}&start=${monthAgo}&end=${dateNow}&format=json`
      ).flush(JSON.stringify(mockResponse));

      httpMock.verify();
    });

    it('should throw an Observable<error>', (done: any) => {
      whatpulseService.getStats().subscribe((res: {'error': boolean}) => {
        expect(res.error).toBeTruthy();
        done();
      });

      const date: Date = new Date();
      const dateNow: number = Math.floor(date.getTime() / 1000);
      const monthAgo: number = Math.floor(date.setMonth(date.getMonth() - 1) / 1000);

      const settingsRequest = httpMock.expectOne(
        `//api.whatpulse.org/pulses.php?user=${username}&start=${monthAgo}&end=${dateNow}&format=json`
      );
      settingsRequest.error(new ErrorEvent('error'));

      httpMock.verify();
    });
  });
});
