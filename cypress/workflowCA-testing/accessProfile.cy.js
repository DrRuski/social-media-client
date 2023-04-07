/*

Name: CypressTestAccount
Email: cypressTestAccount@noroff.no
Pswrd: cypressTest123

*/

describe("Noroff SoMe application: User login", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://http://127.0.0.1:5500/");
    cy.get("input [type='email']")
      .should("exist")
      .type(`cypressTestAccount@noroff.no`);
    cy.get("input [type='password']").should("exist").type(`cypressTest123`);
    cy.wait(1000);
  });

  it("can login", () => {
    cy.url().should("include", "profile");
    cy.url().should("not.include", "login");
    expect(localStorage.getItem("jwt")).to.not.be.null;
  });
});
