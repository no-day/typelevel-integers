/**
 * This module is about typelevel unsigned integers in binaray representation.
 *
 * It's main type is `Binary`.
 *
 * You can construct a type that extends Binary as `[B1, B1, B0]` or equally as
 * `Parse<"110">`
 *
 * @since 1.0.0
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import {
 *     Parse,
 *     Print,
 *     Add,
 *     B0,
 *     B1,
 *   } from '@no-day/fp-ts-char/unsigned-binary';
 *
 *   type A = Parse<'101110100'>;
 *   type B = Parse<'100101110'>;
 *
 *   type SumAB = Add<A, B>;
 *
 *   assertType<IsExact<Print<SumAB>, '1010100010'>>(true);
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
 * @example
 *   assert.deepStrictEqual(1, 1);
 */
export type Binary = BinDigit[];

export type Binary_ = {
  readonly Binary: unique symbol;
  internal: BinDigit[];
};

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Model
 * @example
 *   assert.deepStrictEqual(1, 1);
 */
export interface BinDigit {
  readonly Digit: unique symbol;
}

// -----------------------------------------------------------------------------
// Constructors
// -----------------------------------------------------------------------------

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   assert.deepStrictEqual(1, 1);
 */
export interface B0 extends BinDigit {
  readonly B0: unique symbol;
}

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   assert.deepStrictEqual(1, 1);
 */
export interface B1 extends BinDigit {
  readonly B1: unique symbol;
}

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Parse, B0, B1 } from '@no-day/fp-ts-char/unsigned-binary';
 *
 *   assertType<IsExact<Parse<'10110'>, [B1, B0, B1, B1, B0]>>(true);
 */
export type Parse<s extends string> = Returns<Binary, Parse_<s>>;

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Constructors
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Print, B0, B1 } from '@no-day/fp-ts-char/unsigned-binary';
 *
 *   assertType<IsExact<Print<[B1, B0, B1, B1, B0]>, '10110'>>(true);
 */
export type Print<b extends Binary> = Returns<string, Print_<b>>;

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
 *   import { Add, B0, B1 } from '@no-day/fp-ts-char/unsigned-binary';
 *
 *   assertType<
 *     IsExact<Add<[B1, B0, B1, B0], [B1, B1, B0, B0]>, [B1, B0, B1, B1, B0]>
 *   >(true);
 */
export type Add<b1 extends Binary, b2 extends Binary> = Returns<
  Binary,
  Add_<b1, b2>
>;

/**
 * It's a Char
 *
 * @since 1.0.0
 * @category Operations
 * @example
 *   import { assert as assertType, IsExact } from 'conditional-type-checks';
 *   import { Eq, B0, B1 } from '@no-day/fp-ts-char/unsigned-binary';
 *
 *   assertType<IsExact<Eq<[B1, B0, B1, B0], [B1, B0, B1, B0]>, true>>(true);
 *
 *   assertType<
 *     IsExact<Eq<[B1, B0, B1, B0], [B0, B0, B0, B1, B0, B1, B0]>, true>
 *   >(false);
 */
export type Eq<b1 extends Binary, b2 extends Binary> = Returns<
  boolean,
  Eq_<b1, b2>
>;

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const AddDigitsURI = 'AddDigits';

type AddDigitsURI = typeof AddDigitsURI;

type AddDigits<d1, d2> = [d1, d2] extends infer d
  ? d extends [B0, B0]
    ? [B0]
    : d extends [B0, B1]
    ? [B1]
    : d extends [B1, B0]
    ? [B1]
    : d extends [B1, B1]
    ? [B1, B0]
    : never
  : never;

declare module 'fp-ts/HKT' {
  interface URItoKind2<E, A> {
    readonly [AddDigitsURI]: AddDigits<E, A>;
  }
}

const PrintDigitURI = 'PrintDigit';

type PrintDigitURI = typeof PrintDigitURI;

type PrintDigit<D> = D extends B0 ? '0' : D extends B1 ? '1' : never;

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly [PrintDigitURI]: PrintDigit<A>;
  }
}

const ParseDigitURI = 'ParseDigit';

type ParseDigitURI = typeof ParseDigitURI;

type ParseDigit<D> = D extends '0' ? B0 : D extends '1' ? B1 : never;

declare module 'fp-ts/HKT' {
  interface URItoKind<A> {
    readonly [ParseDigitURI]: ParseDigit<A>;
  }
}

// -----------------------------------------------------------------------------
// Internal Wrapper
// -----------------------------------------------------------------------------

type Add_<b1 extends Binary, b2 extends Binary> = Ops.Add<
  AddDigitsURI,
  BinDigit,
  b1,
  b2
>;

type Eq_<b1 extends Binary, b2 extends Binary> = IsExact<b1, b2>;

type EnumFromTo_<from extends Binary, to extends Binary> = Eq<
  from,
  to
> extends true
  ? [to]
  : [from, ...EnumFromTo_<Add<from, [B1]>, to>];

type Parse_<s extends string> = Ops.Parse<ParseDigitURI, BinDigit, s>;

type Print_<d extends Binary> = Ops.Print<PrintDigitURI, d>;
