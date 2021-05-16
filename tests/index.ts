import { assert as assertType, IsExact } from 'conditional-type-checks';
import * as T from '../src';

namespace FromDigits {
  type N0 = T.FromDigits<[0]>;
  type N1 = T.FromDigits<[1]>;
  type N2 = T.FromDigits<[2]>;
  type N10 = T.FromDigits<[1, 0]>;
  type N20 = T.FromDigits<[2, 0]>;
  type N100 = T.FromDigits<[1, 0, 0]>;
  type N8194423290084842 = T.FromDigits<
    [8, 1, 9, 4, 4, 2, 3, 2, 9, 0, 0, 8, 4, 8, 4, 2]
  >;
}

namespace FromNumber {
  type N0 = T.FromNumber<0>;
  type N1 = T.FromNumber<1>;
  type N2 = T.FromNumber<2>;
  type N10 = T.FromNumber<10>;
  type N20 = T.FromNumber<20>;
}
