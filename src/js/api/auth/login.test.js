/*global global*/
/*eslint no-undef: "error"*/
import { login } from "./login.js";

const mockUserProfile = {
  key: "token",
  value: "userTestAccessTokenScript",
};

function mockResponse() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve(mockUserProfile),
  });
}

class localStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new localStorageMock();

describe("Login function", () => {
  it("fetches user token and stores it in localStorage", async () => {
    global.fetch = jest.fn(() => mockResponse());
    const profile = await login();
    expect(localStorage.getItem(profile.key)).toEqual(profile.value);
  });
});
