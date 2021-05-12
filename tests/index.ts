import * as $ from '../src/unsigned-binary';
import {
  AssertTrue,
  AssertFalse,
  assert,
  IsExact,
  Has,
} from 'conditional-type-checks';

namespace Model {
  namespace Binary {
    // It exists
    assert<IsExact<$.Binary, $.Binary>>(true);
  }

  namespace BinDigit {
    // It exists
    assert<IsExact<$.BinDigit, $.BinDigit>>(true);
  }
}

namespace Constructors {
  namespace B0 {
    // It extends BinDigit
    assert<Has<$.B0, $.BinDigit>>(true);
  }

  namespace B1 {
    // It extends BinDigit
    assert<Has<$.B1, $.BinDigit>>(true);
  }

  namespace Parse {
    // It parses a string with binary integers
    assert<IsExact<$.Parse<'11010'>, [$.B1, $.B1, $.B0, $.B1, $.B0]>>(true);
  }
}
