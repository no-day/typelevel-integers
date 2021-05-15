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
export type UnsignedDecimal<spec extends Spec = Spec> = {
  readonly UnsignedDecimal: unique symbol;
  internal: spec;
};

export type Spec = { sign: Sign; digits: Digits };

type Sign = 'Positive' | 'Negative';

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Digits = [Exclude<Digit, 0>, ...Digit[]] | [0];

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
// export type Print<b extends UnsignedDecimal> = Returns<string, Print_<b>>;

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

type NextDigit<d extends Digit> = {
  0: 1;
  1: 2;
  2: 3;
  3: 4;
  4: 5;
  5: 6;
  6: 7;
  7: 8;
  8: 9;
  9: 0;
}[d];

type PrevDigit<d extends Digit> = {
  0: 9;
  1: 0;
  2: 1;
  3: 2;
  4: 3;
  5: 4;
  6: 5;
  7: 6;
  8: 7;
  9: 8;
}[d];

type AddDigit<
  d1 extends Digit,
  d2 extends Digit,
  carry extends boolean = false
> = Returns<
  { carry: boolean; digit: Digit },
  d1 extends 0
    ? { carry: carry; digit: d2 }
    : AddDigit<
        PrevDigit<d1>,
        NextDigit<d2>,
        Or<carry, Extends<NextDigit<d2>, 0>>
      >
>;

type AddDigits<n1 extends Digit[], n2 extends Digit[]> = Returns<
  Digit[],
  n1 extends []
    ? n2
    : // first empty

    n2 extends []
    ? n1
    : // second empty

    [n1, n2] extends [
        [...infer digits1, infer digit1],
        [...infer digits2, infer digit2]
      ]
    ? AddDigit<As<digit1, Digit>, As<digit2, Digit>> extends {
        carry: infer carry;
        digit: infer digit;
      }
      ? [
          ...AddDigits<
            As<digits1, Digit[]>,
            If<
              As<carry, boolean>,
              AddDigits<As<digits2, Digit[]>, [1]>,
              As<digits2, Digit[]>
            >
          >,
          digit
        ]
      : never
    : // both full

      never
>;

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

// -----------------------------------------------------------------------------
// Internal Wrapper
// -----------------------------------------------------------------------------

type GetSign<n extends UnsignedDecimal> = n['internal']['sign'];
type GetDigits<n extends UnsignedDecimal> = n['internal']['digits'];

// type Add_<n1 extends UnsignedDecimal, n2 extends UnsignedDecimal> = Switch<
//   [
//     [
//       When<
//         And<Extends<GetSign<n1>, 'Positive'>, Extends<GetSign<n2>, 'Positive'>>,
//         UnsignedDecimal<{
//           sign: 'Positive';
//           digits: AddDigits<GetDigits<n1>, GetDigits<n2>>;
//         }>
//       >
//     ],
//     [When<Extends<GetSign<n1>, 'Positive'>, 2>],
//     [When<Extends<GetSign<n2>, 'Positive'>, 3>]
//   ]
// >;

type Add_<n1 extends UnsignedDecimal, n2 extends UnsignedDecimal> = Match<
  [GetSign<n1>, GetSign<n2>],
  [
    [
      ['Positive', 'Positive'],
      UnsignedDecimal<{
        sign: 'Positive';
        digits: AddDigits<GetDigits<n1>, GetDigits<n2>>;
      }>
    ],
    [
      ['Positive', any],
      UnsignedDecimal<{
        sign: 'Positive';
        digits: AddDigits<GetDigits<n1>, GetDigits<n2>>;
      }>
    ]
  ]
>;

//UnsignedDecimal<{ sign: n1 extends [] ? n2 : never>;

type Eq_<n1 extends UnsignedDecimal, n2 extends UnsignedDecimal> = IsExact<
  n1['internal'],
  n2['internal']
>;

// type EnumFromTo_<from extends UnsignedDecimal, to extends UnsignedDecimal> = Eq<
//   from,
//   to
// > extends true
//   ? [to]
//   : [from, ...EnumFromTo_<Add<from, UnsignedDecimal<[1]>>, to>];

// type Print_<d extends UnsignedDecimal> = Ops.Print<
//   PrintDigitURI,
//   d['internal']['digits']
// >;

type FromDigits_<ds extends Digits> = UnsignedDecimal<{
  sign: 'Positive';
  digits: ds;
}>;

type ToDigits_<i extends UnsignedDecimal> = i['internal']['digits'];

// -----------------------------------------------------------------------------
// Util
// -----------------------------------------------------------------------------

type Extends<T, G> = T extends G ? true : false;

type Or<b1 extends boolean, b2 extends boolean> = b1 extends true
  ? true
  : b2 extends true
  ? true
  : false;

type And<b1 extends boolean, b2 extends boolean> = b1 extends true
  ? b2 extends true
    ? true
    : false
  : false;

type If<B extends boolean, X, Y> = B extends true ? X : Y;

type Switch<Cases extends any[]> = Cases extends [
  infer headCases,
  ...infer tailCases
]
  ? If<IsNever<headCases>, Switch<tailCases>, headCases>
  : never;

type IsNever<T> = [T] extends [never] ? true : false;

type When<B, T> = B extends true ? T : never;

type Unsnoc<T extends [any, ...any[]]> = T extends [...infer init, infer last]
  ? { init: init; last: last }
  : never;

type Match<T, Cases extends [T, any][]> = Cases extends [
  [infer a, infer b],
  ...infer tailCases
]
  ? T extends a
    ? b
    : Match<T, tailCases & [T, any][]>
  : never;

type As<T, G> = T extends G ? T : never;
