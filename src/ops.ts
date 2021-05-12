/**
 * It's a module!
 *
 * @since 1.0.0
 * @example
 *   console.log('hello');
 */

import { Kind, Kind2, URIS, URIS2, URItoKind2 } from 'fp-ts/HKT';
import { As, Returns } from './types';

/**
 * It's a module!
 *
 * @since 1.0.0
 * @example
 *   console.log('hello');
 */
export type Add<
  AddDigitsURI extends URIS2,
  Digit,
  n1 extends Digit[],
  n2 extends Digit[]
> = Returns<Digit[], Add_<AddDigitsURI, n1, n2>>;

/**
 * It's a module!
 *
 * @since 1.0.0
 * @example
 *   console.log('hello');
 */
export type Parse<
  ParseDigitURI extends URIS,
  Digit,
  s extends string
> = Returns<Digit[], Parse_<ParseDigitURI, s>>;

/**
 * It's a module!
 *
 * @since 1.0.0
 * @example
 *   console.log('hello');
 */
export type Print<PrintDigitURI extends URIS, Digit> = Returns<
  string,
  Print_<PrintDigitURI, Digit>
>;

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

type Add_<AddDigitsURI extends URIS2, n1, n2> = n1 extends []
  ? n2
  : n2 extends []
  ? n1
  : { n1: n1; n2: n2 } extends {
      n1: [...infer initDigits1, infer lastDigit1];
      n2: [...infer initDigits2, infer lastDigit2];
    }
  ? Kind2<AddDigitsURI, lastDigit1, lastDigit2> extends [
      ...infer initDigits,
      infer lastDigit
    ]
    ? [
        ...Add_<
          AddDigitsURI,
          initDigits,
          Add_<AddDigitsURI, initDigits1, initDigits2>
        >,
        lastDigit
      ]
    : never
  : never;

type Print_<PrintDigitURI extends URIS, N> = N extends [
  ...infer init,
  infer last
]
  ? `${Print_<PrintDigitURI, init>}${As<string, Kind<PrintDigitURI, last>>}`
  : '';

type Parse_<
  ParseDigitURI extends URIS,
  S
> = S extends `${infer head}${infer tail}`
  ? [Kind<ParseDigitURI, head>] extends [never]
    ? 'never'
    : [Kind<ParseDigitURI, head>, ...Parse_<ParseDigitURI, tail>]
  : [];
