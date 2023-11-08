describe("User Login and Profile Access", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/social/auth/login").as("loginRequest");
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").should("be.visible");
    cy.get("#registerModal .btn-outline-success").click();
    cy.wait(500);
  });

  // When trying this in a regular browser, I get thrown an error (response.statusText). I don't get it here.
  it("rejects a user. Either username was not found or password is incorrect. StatusCode 401", () => {
    cy.get("#loginEmail").type("invalid@noroff.no", { delay: 50 });
    cy.get("#loginPassword").type("wrongpassword123", {
      delay: 50,
    });
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
    });
  });

  it("accepts user login with valid login credentials. StatusCode 200", () => {
    cy.get("#loginEmail").type(Cypress.env("VALID_USERNAME"), { delay: 50 });
    cy.get("#loginPassword").type(Cypress.env("VALID_PASSWORD"), { delay: 50 });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(500);
    cy.url().should("include", "?view=profile&name=");
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});
