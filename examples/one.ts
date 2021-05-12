import { assert as assertType, IsExact } from 'conditional-type-checks';
import { Parse, Print, Add, B0, B1 } from '../src/unsigned-binary';

type A = Parse<'101110100'>;
type B = Parse<'1011101000'>;

type SumAB = Add<A, B>;

type Actual = Print<SumAB>;
type Expected = '10001011100';

assertType<IsExact<Actual, Expected>>(true);
