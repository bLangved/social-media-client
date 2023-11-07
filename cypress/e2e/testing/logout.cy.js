describe("User Login and Logout Flow", () => {
  before(() => {
    cy.intercept("POST", "**/social/auth/login").as("loginRequest");
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").should("be.visible");
    cy.get("#registerModal .btn-outline-success").click();
    cy.wait(500);
    cy.get("#loginEmail").type(Cypress.env("validUSERNAME"), { delay: 50 });
    cy.get("#loginPassword").type(Cypress.env("validPASSWORD"), { delay: 50 });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(500);
    cy.url().should("include", "?view=profile&name=");
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });

  it("successfully logs out the user from website", () => {
    cy.wait(2000);
    cy.get('button[data-auth="logout"]').should("be.visible").click();
    cy.wait(1000);
    cy.location("pathname").should("eq", "/");
  });
});
