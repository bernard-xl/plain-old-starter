import whoami from './whoami';

test('whoami can answer who am I', () => {
  expect(whoami('React')).toEqual('This is React :)');
});
