describe("App should", () => {
  it("change path on navigate", () => {
    cy.visit("/");
    cy.contains("Europe").click();
    cy.url().should("include", "/europe");
  });
  it("serialize filter on URL", () => {
    cy.visit("/");
    cy.get("input").type(12345);
    cy.get("select").select("<");
    cy.url({ decode: true }).should("contain", "operator=<");
    cy.url().should("contain", "population=12345");
  });
});
