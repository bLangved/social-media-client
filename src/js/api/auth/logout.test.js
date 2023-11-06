import { logout } from "./logout";
import { remove } from "../../storage/index";

jest.mock("../../storage/index", () => ({
  remove: jest.fn(),
}));

describe("logout functionality", () => {
  beforeEach(() => {
    remove.mockClear();
  });

  test("should remove the token and profile from storage", () => {
    logout();

    expect(remove).toHaveBeenCalledTimes(2);
    expect(remove).toHaveBeenCalledWith("token");
    expect(remove).toHaveBeenCalledWith("profile");
  });
});
