describe("User Login and Logout Flow", () => {
  before(() => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").should("be.visible");
    cy.get("#registerModal .btn-outline-success").click();
    cy.wait(500);
    cy.get("#loginEmail").type(Cypress.env("validUSERNAME"), { delay: 50 });
    cy.wait(100);
    cy.get("#loginPassword").type(Cypress.env("validPASSWORD"), { delay: 50 });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
    cy.url().should("include", "?view=profile&name=");
  });

  it("successfully logs out the user", () => {
    cy.wait(2000);
    cy.get('button[data-auth="logout"]').should("be.visible").click();
    cy.wait(1000);
    const baseUrl = Cypress.config("baseUrl");
    cy.url().should("equal", `${baseUrl}/`);
  });
});
