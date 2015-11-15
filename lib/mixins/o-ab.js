'use strict';

module.exports = ab;

/**
 * When on a root element the signature is
 * `<selector>, <prop>, <value>, [template]`
 * the dark class will be appended to the parent-most
 * (left-most) selector, so `a b c` will become `a.dark b c`.
 *
 * When inside a rule the signature is
 * `<prop>, <value>, [template]`
 * the dark class will be appended to the child-most
 * (right-most) selector, so `a b c` will become `a b c.dark`.
 *
 * Using an optional template, any occurance of `$$` will
 * be replaced with `value`, for example:
 * `mixin ab .selector, border, $blue, 1px solid $$`
 */
function ab(mixin, selector, prop, value, template) {

  const isInRoot = mixin.parent.type === 'root';

  if (!isInRoot) {
    template = value;
    value = prop;
    prop = selector;
  }

  let a = `$${value}`;
  let b = `$b-${value}`;
  if (template) {
    a = template.replace('$$', `$${value}`);
    b = template.replace('$$', `$b-${value}`);
  }

  if (isInRoot) {
    let sel = selector.split(' ');
    if (sel.length > 1) {
      // TODO: check for >, +, and -
      sel[0] = sel[0] + '.dark ';
    }
    sel = sel.join('');

    return {
      [selector]: {
        [prop]: a
      },
      [sel]: {
        [prop]: b
      }
    };
  }

  return {
    [prop]: a,
    '&.dark': {
      [prop]: b
    }
  };
}
