describe("App should", () => {
  it("change path on navigate", () => {
    cy.visit("/");
    cy.contains("Europe").click();
    cy.url().should("include", "/europe");
  });
});
