/* eslint-disable no-self-assign */
/* eslint-disable yoda */
/* eslint-disable dot-notation */
import proxy from './proxy'
;(function (scope) {
  if (scope['Proxy']) {
    return
  }
  scope.Proxy = proxy
  scope.Proxy['revocable'] = scope.Proxy.revocable
})(
  ('undefined' !== typeof process && '[object process]' === {}.toString.call(process)) ||
    ('undefined' !== typeof navigator && navigator.product === 'ReactNative')
    ? global
    : self
)
