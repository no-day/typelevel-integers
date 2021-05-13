/**
 * This module is about typelevel unsigned decimal integers.
 *
 * It's main type is `Binary`.
 *
 * You can construct a type that extends Binary as `[B1, B1, B0]` or equally as
 * `Parse<"110">`
 *
 * @since 1.0.0
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Add } from '@no-day/fp-ts-char/unsigned-decimal';
 *
 *   type A = FromDigits<[1, 3, 4]>;
 *   type B = FromDigits<[7, 8]>;
 *
 *   type Actual = Add<A, B>;
 *   type Expected = FromDigits<[2, 1, 2]>;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */

import * as Ops from './ops';
import { Returns } from './types';
import { IsExact } from 'conditional-type-checks';

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Model
 */
export type UnsignedDecimal<T extends Digits = Digits> = {
  readonly UnsignedDecimal: unique symbol;
  internal: T;
};

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Digits = [Exclude<Digit, 0>, ...Digit[]];

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Parse } from '@no-day/fp-ts-char/unsigned-decimal';
 *
 *   type N = FromDigits<[1, 3, 5]>;
 */
export type FromDigits<ds extends Digits> = Returns<
  UnsignedDecimal,
  FromDigits_<ds>
>;

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Print, FromDigits } from '@no-day/fp-ts-char/unsigned-decimal';
 *
 *   type Actual = Print<FromDigits<1, 5, 8>>;
 *   type Expected = '158';
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type Print<b extends UnsignedDecimal> = Returns<string, Print_<b>>;

// -----------------------------------------------------------------------------
// Destructors
// -----------------------------------------------------------------------------

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import {
 *     FromDigits,
 *     ToDigits,
 *   } from '@no-day/fp-ts-char/unsigned-decimal';
 *
 *   type Actual = ToDigits<FromDigits<[1, 7, 8]>>;
 *   type Expected = [1, 7, 8];
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type ToDigits<i extends UnsignedDecimal> = Returns<
  Digit[],
  ToDigits_<i>
>;

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Operations
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Add } from '@no-day/fp-ts-char/unsigned-decimal';
 *
 *   type A = FromDigits<[1, 3, 4]>;
 *   type B = FromDigits<[7, 8]>;
 *
 *   type Actual = Add<A, B>;
 *   type Expected = FromDigits<[2, 1, 2]>;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type Add<
  n1 extends UnsignedDecimal,
  n2 extends UnsignedDecimal
> = Returns<UnsignedDecimal, Add_<n1, n2>>;

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Operations
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Eq, Parse } from '@no-day/fp-ts-char/unsigned-decimal';
 *
 *   type Actual = Eq<FromDigits<[1, 2, 3]>, FromDigits<[1, 2, 3]>>;
 *   type Expected = true;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */

export type Eq<
  n1 extends UnsignedDecimal,
  n2 extends UnsignedDecimal
> = Returns<boolean, Eq_<n1, n2>>;

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const AddDigitsURI = 'UnignedDecimal.AddDigits';

type AddDigitsURI = typeof AddDigitsURI;

type AddDigits<d1, d2> = { a: [d1]; b: [d2] } extends infer d
  ? // 0
    d extends { a: [0]; b: [0] }
    ? [0]
    : d extends { a: [0]; b: [1] }
    ? [1]
    : d extends { a: [0]; b: [2] }
    ? [2]
    : d extends { a: [0]; b: [2] }
    ? [2]
    : d extends { a: [0]; b: [3] }
    ? [3]
    : d extends { a: [0]; b: [4] }
    ? [4]
    : d extends { a: [0]; b: [5] }
    ? [5]
    : d extends { a: [0]; b: [6] }
    ? [6]
    : d extends { a: [0]; b: [7] }
    ? [7]
    : d extends { a: [0]; b: [8] }
    ? [8]
    : d extends { a: [0]; b: [9] }
    ? [9]
    : // 1
    d extends { a: [1]; b: [0] }
    ? [1]
    : d extends { a: [1]; b: [1] }
    ? [2]
    : d extends { a: [1]; b: [2] }
    ? [3]
    : d extends { a: [1]; b: [3] }
    ? [4]
    : d extends { a: [1]; b: [4] }
    ? [5]
    : d extends { a: [1]; b: [5] }
    ? [6]
    : d extends { a: [1]; b: [6] }
    ? [7]
    : d extends { a: [1]; b: [7] }
    ? [8]
    : d extends { a: [1]; b: [8] }
    ? [9]
    : d extends { a: [1]; b: [9] }
    ? [1, 0]
    : // 2
    d extends { a: [2]; b: [0] }
    ? [2]
    : d extends { a: [2]; b: [1] }
    ? [3]
    : d extends { a: [2]; b: [2] }
    ? [4]
    : d extends { a: [2]; b: [3] }
    ? [5]
    : d extends { a: [2]; b: [4] }
    ? [6]
    : d extends { a: [2]; b: [5] }
    ? [7]
    : d extends { a: [2]; b: [6] }
    ? [8]
    : d extends { a: [2]; b: [7] }
    ? [9]
    : d extends { a: [2]; b: [8] }
    ? [1, 0]
    : d extends { a: [2]; b: [9] }
    ? [1, 1]
    : // 3
    d extends { a: [3]; b: [0] }
    ? [3]
    : d extends { a: [3]; b: [1] }
    ? [4]
    : d extends { a: [3]; b: [2] }
    ? [5]
    : d extends { a: [3]; b: [3] }
    ? [6]
    : d extends { a: [3]; b: [4] }
    ? [7]
    : d extends { a: [3]; b: [5] }
    ? [8]
    : d extends { a: [3]; b: [6] }
    ? [9]
    : d extends { a: [3]; b: [7] }
    ? [1, 0]
    : d extends { a: [3]; b: [8] }
    ? [1, 1]
    : d extends { a: [3]; b: [9] }
    ? [1, 2]
    : // 4
    d extends { a: [4]; b: [0] }
    ? [4]
    : d extends { a: [4]; b: [1] }
    ? [5]
    : d extends { a: [4]; b: [2] }
    ? [6]
    : d extends { a: [4]; b: [3] }
    ? [7]
    : d extends { a: [4]; b: [4] }
    ? [8]
    : d extends { a: [4]; b: [5] }
    ? [9]
    : d extends { a: [4]; b: [6] }
    ? [1, 0]
    : d extends { a: [4]; b: [7] }
    ? [1, 1]
    : d extends { a: [4]; b: [8] }
    ? [1, 2]
    : d extends { a: [4]; b: [9] }
    ? [1, 3]
    : // 5
    d extends { a: [5]; b: [0] }
    ? [5]
    : d extends { a: [5]; b: [1] }
    ? [6]
    : d extends { a: [5]; b: [2] }
    ? [7]
    : d extends { a: [5]; b: [3] }
    ? [8]
    : d extends { a: [5]; b: [4] }
    ? [9]
    : d extends { a: [5]; b: [5] }
    ? [1, 0]
    : d extends { a: [5]; b: [6] }
    ? [1, 1]
    : d extends { a: [5]; b: [7] }
    ? [1, 2]
    : d extends { a: [5]; b: [8] }
    ? [1, 3]
    : d extends { a: [5]; b: [9] }
    ? [1, 4]
    : // 6
    d extends { a: [6]; b: [0] }
    ? [6]
    : d extends { a: [6]; b: [1] }
    ? [7]
    : d extends { a: [6]; b: [2] }
    ? [8]
    : d extends { a: [6]; b: [3] }
    ? [9]
    : d extends { a: [6]; b: [4] }
    ? [1, 0]
    : d extends { a: [6]; b: [5] }
    ? [1, 1]
    : d extends { a: [6]; b: [6] }
    ? [1, 2]
    : d extends { a: [6]; b: [7] }
    ? [1, 3]
    : d extends { a: [6]; b: [8] }
    ? [1, 4]
    : d extends { a: [6]; b: [9] }
    ? [1, 5]
    : // 7
    d extends { a: [7]; b: [0] }
    ? [7]
    : d extends { a: [7]; b: [1] }
    ? [8]
    : d extends { a: [7]; b: [2] }
    ? [9]
    : d extends { a: [7]; b: [3] }
    ? [1, 0]
    : d extends { a: [7]; b: [4] }
    ? [1, 1]
    : d extends { a: [7]; b: [5] }
    ? [1, 2]
    : d extends { a: [7]; b: [6] }
    ? [1, 3]
    : d extends { a: [7]; b: [7] }
    ? [1, 4]
    : d extends { a: [7]; b: [8] }
    ? [1, 5]
    : d extends { a: [7]; b: [9] }
    ? [1, 6]
    : // 8
    d extends { a: [8]; b: [0] }
    ? [8]
    : d extends { a: [8]; b: [1] }
    ? [9]
    : d extends { a: [8]; b: [2] }
    ? [1, 0]
    : d extends { a: [8]; b: [3] }
    ? [1, 1]
    : d extends { a: [8]; b: [4] }
    ? [1, 2]
    : d extends { a: [8]; b: [5] }
    ? [1, 3]
    : d extends { a: [8]; b: [6] }
    ? [1, 4]
    : d extends { a: [8]; b: [7] }
    ? [1, 5]
    : d extends { a: [8]; b: [8] }
    ? [1, 6]
    : d extends { a: [8]; b: [9] }
    ? [1, 7]
    : // 9
    d extends { a: [9]; b: [0] }
    ? [9]
    : d extends { a: [9]; b: [1] }
    ? [1, 0]
    : d extends { a: [9]; b: [2] }
    ? [1, 1]
    : d extends { a: [9]; b: [3] }
    ? [1, 2]
    : d extends { a: [9]; b: [4] }
    ? [1, 3]
    : d extends { a: [9]; b: [5] }
    ? [1, 4]
    : d extends { a: [9]; b: [6] }
    ? [1, 5]
    : d extends { a: [9]; b: [7] }
    ? [1, 6]
    : d extends { a: [9]; b: [8] }
    ? [1, 7]
    : d extends { a: [9]; b: [9] }
    ? [1, 8]
    : never
  : never;

declare module 'fp-ts/HKT' {
  interface URItoKind2<E, A> {
    readonly [AddDigitsURI]: AddDigits<E, A>;
  }
}

const PrintDigitURI = 'UnignedDecimal.PrintDigit';

type PrintDigitURI = typeof PrintDigitURI;

type PrintDigit<D> = D extends 0
  ? '0'
  : D extends 1
  ? '1'
  : D extends 2
  ? '2'
  : D extends 3
  ? '3'
  : D extends 4
  ? '4'
  : D extends 5
  ? '5'
  : D extends 6
  ? '6'
  : D extends 7
  ? '7'
  : D extends 8
  ? '8'
  : D extends 9
  ? '9'
  : never;

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly [PrintDigitURI]: PrintDigit<A>;
  }
}

const ParseDigitURI = 'UnignedDecimal.ParseDigit';

type ParseDigitURI = typeof ParseDigitURI;

type ParseDigit<D> = D extends '0'
  ? 0
  : D extends '1'
  ? 1
  : D extends '2'
  ? 2
  : D extends '3'
  ? 3
  : D extends '4'
  ? 4
  : D extends '5'
  ? 5
  : D extends '6'
  ? 6
  : D extends '7'
  ? 7
  : D extends '8'
  ? 8
  : D extends '9'
  ? 9
  : never;

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly [ParseDigitURI]: ParseDigit<A>;
  }
}

// -----------------------------------------------------------------------------
// Internal Wrapper
// -----------------------------------------------------------------------------

type Add_<
  n1 extends UnsignedDecimal,
  n2 extends UnsignedDecimal
> = UnsignedDecimal<
  Ops.Add<AddDigitsURI, Digit, n1['internal'], n2['internal']>
>;

type Eq_<n1 extends UnsignedDecimal, n2 extends UnsignedDecimal> = IsExact<
  n1['internal'],
  n2['internal']
>;

type EnumFromTo_<from extends UnsignedDecimal, to extends UnsignedDecimal> = Eq<
  from,
  to
> extends true
  ? [to]
  : [from, ...EnumFromTo_<Add<from, UnsignedDecimal<[1]>>, to>];

type Print_<d extends UnsignedDecimal> = Ops.Print<
  PrintDigitURI,
  d['internal']
>;

type FromDigits_<ds extends Digits> = UnsignedDecimal<ds>;

type ToDigits_<i extends UnsignedDecimal> = i['internal'];
