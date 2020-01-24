import { BehaviorSubject, Observable } from 'rxjs';

export abstract class BaseSubject<T> {

  protected abstract store: string;

  protected bs: BehaviorSubject<T>;
  state$: Observable<T>;
  state: T;
  previous: T;

  constructor(initialValue: Partial<T>) {
    this.bs = new BehaviorSubject<T>(initialValue as T);
    this.state$ = this.bs.asObservable();

    this.state = initialValue as T;
    this.previous = this.state as T;
    this.state$.subscribe(s => {
      this.state = s;
    });
  }

  patch(newValue: Partial<T>, event: string = "Not specified") {
    this.previous = this.state;
    const newState = Object.assign({}, this.state, newValue);
    this.bs.next(newState);
  }

  set(newValue: Partial<T>) {
    this.previous = this.state;
    const newState = Object.assign({}, newValue) as T;
    this.bs.next(newState);
  }
}
