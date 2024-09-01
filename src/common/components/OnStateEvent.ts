import { useMemo } from 'react'

import { Subject, Subscription } from 'rxjs'

interface LastSubscription {
  last: Subscription | undefined
}

export type OnStateEvent<T> = (f: (event: T) => void) => void
export type OnEmitEvent<T> = (e: T) => void

export function useStateEvent<T>(): [onStateEvent: OnStateEvent<T>, emitEvent: OnEmitEvent<T>] {
  const subject = useMemo(() => new Subject<any>(), [])
  const subscription = useMemo<LastSubscription>(() => {
    return {} as LastSubscription
  }, [])

  const onStateEvent: OnStateEvent<T> = useMemo(
    () => (f: (event: T) => void) => {
      if (subscription.last) {
        subscription.last.unsubscribe()
      }

      subscription.last = subject.subscribe({
        next: (v) => f(v)
      })
    },
    []
  )

  const emitEvent: OnEmitEvent<T> = useMemo(
    () => (e) => {
      subject.next(e)
    },
    []
  )

  return [onStateEvent, emitEvent]
}
