import { login } from "./login";
import { save } from "../../storage/index";

jest.mock("../../storage/index", () => ({
  save: jest.fn(),
}));

jest.mock("../constants.js", () => ({
  apiPath: "http://localhost/api",
}));

jest.mock("../headers.js", () => ({
  headers: () => ({
    "Content-Type": "application/json",
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        accessToken: "fake_access_token",
        user: { id: 1, name: "User Name" },
      }),
    statusText: "OK",
  }),
);

describe("login", () => {
  beforeEach(() => {
    fetch.mockClear();
    save.mockClear();
  });

  it("Saves the profile and token when the login is successful", async () => {
    const email = "test@example.com";
    const password = "correctPassword";

    const profile = await login(email, password);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost/api/social/auth/login",
      {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      },
    );

    expect(save).toHaveBeenCalledWith("token", "fake_access_token");

    expect(save).toHaveBeenCalledWith("profile", {
      user: { id: 1, name: "User Name" },
    });

    expect(profile.accessToken).toBeUndefined();

    expect(profile).toEqual({ user: { id: 1, name: "User Name" } });
  });

  it("Throws an error when the login is unsuccessful", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Unauthorized",
      }),
    );

    const email = "test@example.com";
    const password = "wrongPassword";

    await expect(login(email, password)).rejects.toThrow("Unauthorized");

    expect(save).not.toHaveBeenCalled();
  });
});
