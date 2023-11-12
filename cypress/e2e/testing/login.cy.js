describe("Test for user login", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/social/auth/login").as("loginRequest");
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").contains("Login").click();
    cy.wait(500);
    cy.get("#loginForm").should("be.visible");
  });

  it("Rejects. Neither username or password entered in input fields", () => {
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(500);
    cy.get("#loginEmail:invalid")
      .should("exist")
      .then(($input) => {
        const message = $input[0].validationMessage;
        cy.task("log", `Validation Message: ${message}`);
      });
    cy.wait(1000);
  });

  it("Rejects. No username, but random password entered in input fields", () => {
    cy.get("#loginPassword").type("password123", {
      delay: 50,
    });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(500);
    cy.get("#loginEmail:invalid")
      .should("exist")
      .then(($input) => {
        const message = $input[0].validationMessage;
        cy.task("log", `Validation Message: ${message}`);
      });
    cy.wait(1000);
  });

  it("Rejects. No password, and invalid username is entered in input fields", () => {
    cy.get("#loginEmail").type("invalid@email.no", { delay: 50 });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(500);
    cy.get("#loginEmail:invalid")
      .should("exist")
      .then(($input) => {
        const message = $input[0].validationMessage;
        cy.task("log", `Validation Message: ${message}`);
      });
    cy.wait(1000);
  });

  it("Rejects. No password, but valid username is entered in input fields", () => {
    cy.get("#loginEmail").type("test@test.no", { delay: 50 });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(500);
    cy.get("#loginPassword:invalid")
      .should("exist")
      .then(($input) => {
        const message = $input[0].validationMessage;
        cy.task("log", `Validation Message: ${message}`);
      });
    cy.wait(1000);
  });

  it("Rejects. Either username was not found, or password is incorrect. StatusCode 401", () => {
    cy.get("#loginEmail").type("invalid@noroff.no", { delay: 50 });
    cy.get("#loginPassword").type("wrongpassword123", {
      delay: 50,
    });
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
    });
    cy.wait(1000);
  });

  it("Accepts. Valid login credentials. StatusCode 200", () => {
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
