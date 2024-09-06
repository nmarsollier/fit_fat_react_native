import { Subject, Subscription } from 'rxjs'

interface LastSubscription {
  last: Subscription | undefined
}

export type OnStateEvent<T> = (f: (event: T) => void) => void
export type OnEmitEvent<T> = (e: T) => void

export function newStateEventHandler<T>(): [
  onStateEvent: OnStateEvent<T>,
  emitEvent: OnEmitEvent<T>
] {
  const subject = new Subject<T>()
  const subscription: LastSubscription = { last: undefined }

  const onStateEvent = (f: (event: T) => void) => {
    if (subscription.last) {
      subscription.last.unsubscribe()
    }

    subscription.last = subject.subscribe({
      next: (v) => f(v)
    })
  }

  const emitEvent: OnEmitEvent<T> = (e) => {
    subject.next(e)
  }

  return [onStateEvent, emitEvent]
}
