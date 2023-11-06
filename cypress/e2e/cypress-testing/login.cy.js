describe("User Login and Profile Access", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(1000);
    cy.get("#registerModal").should("be.visible");
    cy.get("#registerModal .btn-outline-success").click();
    cy.wait(500);
  });

  it("rejects a user with invalid login credentials", () => {
    // Fill in invalid data in input fields
    cy.get("#loginEmail").type(Cypress.env("notValidUSERNAME"), { delay: 50 });
    cy.wait(100);
    cy.get("#loginPassword").type(Cypress.env("notValidPASSWORD"), {
      delay: 50,
    });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
    cy.wait(2000);
  });

  it("allows a user with valid login credentials to access their profile", () => {
    // Fill in valid data in input-fields
    cy.get("#loginEmail").type(Cypress.env("validUSERNAME"), { delay: 50 });
    cy.get("#loginPassword").type(Cypress.env("validPASSWORD"), { delay: 50 });
    cy.wait(500);
    cy.contains('button[type="submit"]', "Login").click();
  });
});
