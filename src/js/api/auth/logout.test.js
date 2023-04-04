/*global global*/
/*eslint no-undef: "error"*/
import { logout } from "./logout.js";
import { load, save } from "../../storage";

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

describe("Logout function", () => {
  it("clears the token from browser storage", () => {
    const key = "token";
    const value = "userTestAccessTokenScript";
    save(key, value);
    expect(load(key)).toEqual(value);
    logout();
    expect(load(key)).toEqual(null);
  });
});
