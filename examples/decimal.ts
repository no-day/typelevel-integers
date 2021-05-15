import { assert as assertType, IsExact } from 'conditional-type-checks';
import {
  FromDigits,
  Add,
  UnsignedDecimal,
  ToDigits,
} from '../src/unsigned-decimal';
import { Returns } from '../src/types';

const gen = {
  add: () => `

namespace TestAdd_0_0 {
  type A = FromDigits<[0]>;
  type B = FromDigits<[0]>;

  type Actual = Add<A, B>;
  type Expected = FromDigits<[0]>;

  assertType<IsExact<Actual, Expected>>(true);
}
 
`,
};

// GEN(add):start

// GEN(add):end
