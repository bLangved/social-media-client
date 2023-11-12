describe("Test for user logout", () => {
  // Logs in user, and checks for authtoken
  before(() => {
    cy.intercept("POST", "**/social/auth/login").as("loginRequest");
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
    cy.get("#loginEmail").type(Cypress.env("VALID_USERNAME"), { delay: 50 });
    cy.get("#loginPassword").type(Cypress.env("VALID_PASSWORD"), { delay: 50 });
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(1000);
    // Checking storage for authToken on login
    cy.window().then((window) => {
      const authToken =
        window.localStorage.getItem("token") ||
        window.sessionStorage.getItem("token");
      expect(authToken).to.be.a("string");
    });
    // Checking valid 200 GET request
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.wait(1000);
  });

  it("Sucsess. Logs out user from website", () => {
    cy.get('button[data-auth="logout"]').should("be.visible").click();
    cy.wait(1000);
    // Checking storage if authToken is removed on logout
    cy.window().then((window) => {
      const authToken =
        window.localStorage.getItem("token") ||
        window.sessionStorage.getItem("token");
      expect(authToken).to.be.null;
    });
    cy.location("pathname").should("eq", "/");
  });
});
