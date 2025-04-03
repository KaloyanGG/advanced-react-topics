describe("Recipes website", () => {
  it("Shows error boundary when server not working", () => {
    // Intercept the request and force it to reject
    cy.intercept("GET", "http://192.168.1.12:3000/recipesCount", {
      statusCode: 500, // Simulate a server error
      body: { message: "Internal Server Error" }, // Optional: Custom error message
    });

    cy.intercept("GET", "http://192.168.1.12:3000/recipes?page=1?&limit=3", {
      statusCode: 500, // Simulate a server error
      body: { message: "Internal Server Error" }, // Optional: Custom error message
    });

    // Visit the application
    cy.visit("http://localhost:5173");

    // See a "There was an error" message in a h1 without a class
    cy.get("h1").contains("There was an error");

    // Press button with test "Refresh" and again see the same message
    cy.get("button").contains("Refresh").click();
    cy.get("h1").contains("There was an error");
  });
  it("Shows error boundary then shows the recipes", () => {
    // Intercept the request and force it to reject
    cy.intercept(
      {
        method: "GET",
        url: "http://192.168.1.12:3000/recipesCount",
        times: 1, // Intercept only once
      },
      {
        statusCode: 500, // Simulate a server error
        body: { message: "Internal Server Error" },
      }
    );

    cy.intercept(
      {
        method: "GET",
        url: "http://192.168.1.12:3000/recipes?page=1?&limit=3",
        times: 1, // Intercept only once
      },
      {
        statusCode: 500, // Simulate a server error
        body: { message: "Internal Server Error" },
      }
    );

    cy.visit("http://localhost:5173");
    cy.get("h1").contains("There was an error");
    cy.get("button").contains("Refresh").click();
    cy.get("h2").contains("Spaghetti Carbonara");
  });
  it("Likes the recipe and navigates to login", () => {
    cy.visit("http://localhost:5173");
    // click button with class name "like"
    cy.get("button.like").first().click();
    //check navigation to login page
    cy.url().should("include", "/login");
    // see a span with text "You have to login first"
    cy.get("span.notification").contains("You have to login first");
  });
  it("Goes to register page, reset form button works, sees error for different passwords, then registers, then goes to login page", () => {
    cy.intercept(
      {
        method: "POST",
        url: "http://192.168.1.12:3000/auth/register",
      },
      {
        statusCode: 201,
      }
    );
    cy.visit("http://localhost:5173");
    // Navigate to register page
    cy.get("a").contains("Register").click();
    cy.get("label").contains("Repeat password");

    // Check if reset button works
    cy.get("input[name='email']").type("reset-button-test-email");
    cy.get("button[type='reset']").click();
    cy.get("input[name='email']").should("have.value", "");
    // Fill in form and show error for passwords mismatch
    cy.get("input[name='email']").type("testuser");
    cy.get("input[name='password']").type("testpassword");
    cy.get("input[name='repeatPassword']").type("differentpassword");
    cy.get("button[type='submit']").click();
    cy.get("p.error").contains("Passwords do not match");
    // Fill in form and submit
    cy.get("input[name='repeatPassword']").clear().type("testpassword");
    cy.get("button[type='submit']").click();
    // Show notification for successful registration
    cy.get("span.notification").contains("Registration successful");
    // Navigate to login page
    cy.url().should("include", "/login");
  });
});
