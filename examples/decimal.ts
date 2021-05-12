import { assert as assertType, IsExact } from 'conditional-type-checks';
import { Parse, Print, Add } from '../src/unsigned-decimal';

type A = Parse<'3'>;
type B = Parse<'16'>;

type SumAB = Add<A, B>;

type Actual = Print<SumAB>;
type Expected = '19';

assertType<IsExact<Actual, Expected>>(true);
