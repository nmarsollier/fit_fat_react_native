import { useMemo } from 'react';

import { Subject, Subscription } from 'rxjs';
interface LastSubscription {
  last: Subscription | undefined;
}

export function useOnStateEvent(): [
  onStateEvent: (event: any) => void,
  emitEvent: (e: any) => void,
] {
  const subject = useMemo(() => new Subject<any>(), []);
  const subscription = useMemo<LastSubscription>(() => {
    return {} as LastSubscription;
  }, []);

  const onStateEvent = (f: (event: any) => void) => {
    if (subscription.last) {
      subscription.last.unsubscribe();
    }

    subscription.last = subject.subscribe({
      next: v => f(v),
    });
  };

  const emitEvent = (e: any) => {
    subject.next(e);
  };

  return [onStateEvent, emitEvent];
}
