describe("Noroff SoMe application: User login INVALID credentials", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.wait(500);
  });

  it("can login", () => {
    cy.get("#registerForm button")
      .contains("Login")
      .should("be.visible")
      .click();
    cy.wait(500);
    cy.get("input#loginEmail[type='email']").type(
      `cypressTestAccount@noroff.no`,
    );
    cy.get("input#loginPassword[type='password']").type(`wrongPassword123`);
    cy.get("#loginForm button").contains("Login").should("be.visible").click();
    cy.url().should("include", "profile");
  });
});
