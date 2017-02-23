import 'jest';
import <%= classname %> from '../src/<%= filename %>';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('should construct', () => {
  const sut = new <%= classname %>();

  expect(sut).toBeTruthy();
});