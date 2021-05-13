import { assert as assertType, IsExact } from 'conditional-type-checks';
import {
  FromDigits,
  Print,
  Add,
  UnsignedDecimal,
  ToDigits,
} from '../src/unsigned-decimal';
import { Returns } from '../src/types';

type A = FromDigits<[1, 3, 4]>;
type B = FromDigits<[7, 8]>;

type Actual = Add<A, B>;
type Expected = FromDigits<[2, 1, 2]>;

assertType<IsExact<Actual, Expected>>(true);
