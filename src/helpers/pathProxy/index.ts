type FieldPath<P, S> = {
  _PATH_: string & { _BRAND_: P & S }
}

type PathProxy<P, S> = FieldPath<P, S> & { [K in keyof S]: PathProxy<P, S[K]> }

const IdPath = { _PATH_: '' } as FieldPath<any, any>

export default function pathProxy<S, P = S>(
  parent: FieldPath<P, S> = IdPath as any
): PathProxy<P, S> {
  return new Proxy(parent as any, {
    get(target: any, key: any) {
      if (key in target) return target[key]
      return pathProxy<any, any>({
        _PATH_: `${parent._PATH_ && parent._PATH_ + '.'}${key}`
      } as any)
    }
  })
}
