import { assert as assertType, IsExact } from 'conditional-type-checks';
import { FromDigits, Add } from '../src';

namespace TestAdd_0_0 {
  type A = FromDigits<[0]>;
  type B = FromDigits<[0]>;

  type Actual = Add<A, B>;
  type Expected = FromDigits<[0]>;

  assertType<IsExact<Actual, Expected>>(true);
}
