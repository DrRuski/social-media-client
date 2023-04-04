/*global global*/
/*eslint no-undef: "error"*/
import { login } from "./login.js";
import { localStorageMock } from "../../test/localStorageMock.js";

const mockEmail = "johndoes@gmail.com";
const mockPassword = "john123";
const mockToken = "accessToken";
const mockTokenValue = "accessTokenMockValueScript";

function mockSuccessfulResponse() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () =>
      Promise.resolve({
        email: mockEmail,
        password: mockPassword,
        token: mockToken,
        value: mockTokenValue,
      }),
  });
}

// function mockUnsuccessfulResponse() {
//   return Promise.resolve({
//     ok: false,
//     status: 404,
//     statusText: "Not Valid Login",
//   });
// }

global.localStorage = new localStorageMock();

describe("Login function", () => {
  it("fetches user token and stores it in localStorage", async () => {
    global.fetch = jest.fn(() => mockSuccessfulResponse());
    const data = await login();
    expect(localStorage.getItem(data.token)).toEqual(data.value);
  });
});
