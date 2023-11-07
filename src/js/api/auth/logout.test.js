import { logout } from "./logout";

describe("logout functionality", () => {
  // Set up a mock storage object
  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key];
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      removeItem(key) {
        delete store[key];
      },
      clear() {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    // Clear mockLocalStorage and reset all mocks
    mockLocalStorage.clear();
    global.localStorage = mockLocalStorage;
  });

  test("Removes token and profile from storage when logout is called, and values are present", () => {
    // Pretend that localStorage already has the token and profile
    localStorage.setItem("token", "test-token");
    localStorage.setItem("profile", "test-profile");
    logout();
    expect(localStorage.getItem("token")).toBeUndefined();
    expect(localStorage.getItem("profile")).toBeUndefined();
  });

  test("Calling logout with an empty localStorage does not throw", () => {
    // This will test that the browser will not throw an error if localStorage should by some means be empty on logout.
    expect(localStorage.getItem("token")).toBeUndefined();
    expect(localStorage.getItem("profile")).toBeUndefined();
    const runLogout = () => logout();
    expect(runLogout).not.toThrow();
  });
});
