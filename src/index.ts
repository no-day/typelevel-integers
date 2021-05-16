/**
 * This module is about typelevel integers.
 *
 * It's main type is `Int`, a type that represents positive and negative
 * integers. But you'll also find `Nat` which contains natural numbers, which
 * are only the positive integers including zero.
 *
 * @since 1.0.0
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import * as T from 'typelevel-integers';
 *
 *   type A = T.FromDigits<[1, 3, 4]>;
 *   type B = T.FromDigits<[7, 8]>;
 *
 *   type Actual = T.Add<A, B>;
 *   type Expected = T.FromDigits<[2, 1, 2]>;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */

import { IsExact } from 'conditional-type-checks';

// -----------------------------------------------------------------------------
// Model
// -----------------------------------------------------------------------------

/**
 * TODO
 *
 * @since 1.0.0
 * @category Model
 */
export type Int<spec extends Spec = Spec> = Int_<spec>;

type Int_<spec extends Spec = Spec> = {
  readonly Int: unique symbol;
  internal: spec;
};

/**
 * TODO
 *
 * @since 1.0.0
 * @category Model
 */
export type Nat<digits extends Digits = Digits> = Nat_<digits>;

type Nat_<digits extends Digits = Digits> = Int<{
  sign: 'Positive';
  digits: digits;
}>;

type Spec = { sign: Sign; digits: Digits };

type Sign = 'Positive' | 'Negative';

/**
 * TODO
 *
 * @since 1.0.0
 * @category Model
 */
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type Digits = [Exclude<Digit, 0>, ...Digit[]] | [0];

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * TODO
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   import * as T from 'typelevel-integers';
 *
 *   type N = T.FromDigits<[1, 3, 5]>;
 */
export type FromDigits<ds extends Digits> = Returns<Int, FromDigits_<ds>>;

/**
 * TODO
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import * as T from 'typelevel-integers';
 *
 *   type Actual = T.FromNumber<12>;
 *   type Expected = T.FromDigits<[1, 2]>;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type FromNumber<n extends SmallNumber> = Returns<Int, FromNumber_<n>>;

// -----------------------------------------------------------------------------
// Destructors
// -----------------------------------------------------------------------------

/**
 * TODO
 *
 * @since 1.0.0
 * @category Destructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import * as T from 'typelevel-integers';
 *
 *   type Actual = T.ToDigits<T.FromDigits<[1, 7, 8]>>;
 *   type Expected = [1, 7, 8];
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type ToDigits<i extends Int> = Returns<Digit[], ToDigits_<i>>;

/**
 * TODO
 *
 * @since 1.0.0
 * @category Destructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import * as T from 'typelevel-integers';
 *
 *   type Actual = T.ToNumber<T.FromDigits<[1, 7]>>;
 *   type Expected = 17;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type ToNumber<
  n extends Int<{ sign: any; digits: SmallDigits }>
> = Returns<number, ToNumber_<n>>;

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * TODO
 *
 * @since 1.0.0
 * @category Operations
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import * as T from 'typelevel-integers';
 *
 *   type A = T.FromDigits<[1, 3, 4]>;
 *   type B = T.FromDigits<[7, 8]>;
 *
 *   type Actual = T.Add<A, B>;
 *   type Expected = T.FromDigits<[2, 1, 2]>;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type Add<n1 extends Int, n2 extends Int> = Returns<Int, Add_<n1, n2>>;

/**
 * TODO
 *
 * @since 1.0.0
 * @category Operations
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import * as T from 'typelevel-integers';
 *
 *   type Actual = T.Succ<T.FromDigits<[1, 2, 3]>>;
 *   type Expected = T.FromDigits<[1, 2, 4]>;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */
export type Succ<n extends Int> = Add<n, FromDigits<[1]>>;

/**
 * TODO
 *
 * @since 1.0.0
 * @category Operations
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import * as T from 'typelevel-integers';
 *
 *   type Actual = T.Eq<T.FromDigits<[1, 2, 3]>, T.FromDigits<[1, 2, 3]>>;
 *   type Expected = true;
 *
 *   assertType<IsExact<Actual, Expected>>(true);
 */

export type Eq<n1 extends Int, n2 extends Int> = Returns<boolean, Eq_<n1, n2>>;

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

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
> = d1 extends 0
  ? { carry: carry; digit: d2 }
  : AddDigit<
      PrevDigit<d1>,
      NextDigit<d2>,
      Or<carry, Extends<NextDigit<d2>, 0>>
    >;

type AddDigits<n1 extends Digit[], n2 extends Digit[]> = n1 extends []
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
        digit extends Digit ? digit : never
      ]
    : never
  : // both full

    never;

// -----------------------------------------------------------------------------
// Internal Wrapper
// -----------------------------------------------------------------------------

type GetSign<n extends Int> = n['internal']['sign'];
type GetDigits<n extends Int> = n['internal']['digits'];

type Add_<n1 extends Int, n2 extends Int> = Match<
  [GetSign<n1>, GetSign<n2>],
  [
    [
      ['Positive', 'Positive'],
      Int<{
        sign: 'Positive';
        digits: AddDigits<GetDigits<n1>, GetDigits<n2>>;
      }>
    ],
    [
      ['Positive', any],
      Int<{
        sign: 'Positive';
        digits: AddDigits<GetDigits<n1>, GetDigits<n2>>;
      }>
    ]
  ]
>;

type Eq_<n1 extends Int, n2 extends Int> = IsExact<
  n1['internal'],
  n2['internal']
>;

type FromDigits_<ds extends Digits> = Int<{
  sign: 'Positive';
  digits: ds;
}>;

type ToDigits_<i extends Int> = i['internal']['digits'];

type SmallPosNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

type SmallPosDigits =
  | [1]
  | [2]
  | [3]
  | [4]
  | [5]
  | [6]
  | [7]
  | [8]
  | [9]
  | [1, 0]
  | [1, 1]
  | [1, 2]
  | [1, 3]
  | [1, 4]
  | [1, 5]
  | [1, 6]
  | [1, 7]
  | [1, 8]
  | [1, 9]
  | [2, 0];

type SmallDigits = [0] | SmallPosDigits;

type SmallNumber = 0 | SmallPosNumber;

type FromNumber_<n extends SmallNumber> = {
  0: FromDigits<[0]>;
  1: FromDigits<[1]>;
  2: FromDigits<[2]>;
  3: FromDigits<[3]>;
  4: FromDigits<[4]>;
  5: FromDigits<[5]>;
  6: FromDigits<[6]>;
  7: FromDigits<[7]>;
  8: FromDigits<[8]>;
  9: FromDigits<[9]>;
  10: FromDigits<[1, 0]>;
  11: FromDigits<[1, 1]>;
  12: FromDigits<[1, 2]>;
  13: FromDigits<[1, 3]>;
  14: FromDigits<[1, 4]>;
  15: FromDigits<[1, 5]>;
  16: FromDigits<[1, 6]>;
  17: FromDigits<[1, 7]>;
  18: FromDigits<[1, 8]>;
  19: FromDigits<[1, 9]>;
  20: FromDigits<[2, 0]>;
}[n];

type SmallInts = Int<{
  sign: any;
  digits: SmallDigits;
}>;

type ToNumber_<n extends SmallInts> = ToDigits<n> extends infer ds
  ? ds extends [0]
    ? 0
    : ds extends [1]
    ? 1
    : ds extends [2]
    ? 2
    : ds extends [3]
    ? 3
    : ds extends [4]
    ? 4
    : ds extends [5]
    ? 5
    : ds extends [6]
    ? 6
    : ds extends [7]
    ? 7
    : ds extends [8]
    ? 8
    : ds extends [9]
    ? 9
    : ds extends [1, 0]
    ? 10
    : ds extends [1, 1]
    ? 11
    : ds extends [1, 2]
    ? 12
    : ds extends [1, 3]
    ? 13
    : ds extends [1, 4]
    ? 14
    : ds extends [1, 5]
    ? 15
    : ds extends [1, 6]
    ? 16
    : ds extends [1, 7]
    ? 17
    : ds extends [1, 8]
    ? 18
    : ds extends [1, 9]
    ? 19
    : ds extends [2, 0]
    ? 20
    : never
  : never;

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

type Returns<T, H extends T> = H;
