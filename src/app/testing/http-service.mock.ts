import { Observable } from 'rxjs';

export class HTTPServiceMock {
  get(url: string): Observable<any> { return };
  post(): Observable<any> { return };
}
