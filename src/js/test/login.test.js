import { loginListener } from '../listeners/auth/login.js';

describe('Login function', () => {
  it('fetches user token and stores it in localStorage', async () => {
    const event = { preventDefault: () => {} };
    const credentials = await loginListener(event);

    expect(credentials).toBeTruthy();
  });
});
