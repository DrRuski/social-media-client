import { login } from "./login.js";
import { localStorageMock } from "../../test/localStorageMock.js";
import { load } from "../../storage/load.js";

const mockEmail = "johndoes@gmail.com";
const mockPassword = "john123";
const mockWrongPassword = "john321";
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

function mockUnsuccessfulResponse() {
  return Promise.resolve({
    ok: false,
    status: 401,
    statusText: "Invalid credentials",
  });
}

global.localStorage = new localStorageMock();

describe("Login function", () => {
  it("fetches and saves token key", async () => {
    global.fetch = jest.fn(() => mockSuccessfulResponse());
    const data = await login();
    expect(load(data.token)).toBeDefined();
  });

  it("fetches and saves token value", async () => {
    global.fetch = jest.fn(() => mockSuccessfulResponse());
    const data = await login();
    expect(load(data.token)).toEqual(data.value);
  });

  it("throws error on invalid credentials", async () => {
    global.fetch = jest.fn(() => mockUnsuccessfulResponse());
    await expect(login(mockEmail, mockWrongPassword)).rejects.toThrow(
      "Invalid credentials",
    );
  });
});
