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
  it("Likes the recipe and navigates to login, sees notification, closes it", () => {
    cy.visit("http://localhost:5173");
    // click button with class name "like"
    cy.get("button.like").first().click();
    //check navigation to login page
    cy.url().should("include", "/login");
    // see a span with text "You have to login first"
    cy.get("span.notification").contains("You have to login first");
    // close notification
    cy.get("svg.close-notification").click();
    // check if the notification is gone
    cy.get("span.notification").should("not.exist");
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

  it("Tries to log in, sees error invalid credentials, logs in, sees notification, sees recipes, sees 'hi' message, user is in local storage", () => {
    cy.visit("http://localhost:5173/login");
    // Fill in form and submit
    cy.get("input[name='email']").type("testuser");
    cy.get("input[name='password']").type("testpassword");
    cy.get("button[type='submit']").click();
    // Show error for invalid credentials
    cy.get("p.error").contains("Invalid credentials");
    // Intercept next request and force it to resolve
    cy.intercept(
      {
        method: "POST",
        url: "http://192.168.1.12:3000/auth/login",
      },
      {
        statusCode: 200,
        body: {
          email: "testuser@email.com",
        },
      }
    );
    // Submit the form again
    cy.get("button[type='submit']").click();
    // Show notification for successful login
    cy.get("span.notification").contains("Login successful");
    // Show recipes
    cy.get("h2").contains("Spaghetti Carbonara");
    // Sees text Hi testuser
    cy.get("p.current-user").contains("Hi, testuser");
    // Check if the user object exists in localStorage
    cy.window().then((window) => {
      const user = window.localStorage.getItem("user");
      expect(user).to.not.be.null; // Ensure user is not null
    });
  });
  describe("Logged in activities", () => {
    // Login before each test
    beforeEach(() => {
      cy.visit("http://localhost:5173/login");
      // Intercept the login request and force it to resolve
      cy.intercept(
        {
          method: "POST",
          url: "http://192.168.1.12:3000/auth/login",
        },
        {
          statusCode: 200,
          body: {
            email: "testuser@email.com",
          },
        }
      );
      // Fill in form and submit
      cy.get("input[name='email']").type("testuser");
      cy.get("input[name='password']").type("testpassword");
      cy.get("button[type='submit']").click();
    });
    it("Goes to recipes, likes a recipe, sees animation, favourite's number is 1, goes to the next one's recipe details, scrolls to the previous, previous is liked", () => {
      cy.visit("http://localhost:5173");
      // Click like button
      cy.get("button.like").first().click();
      // Click on the second "Read recipe" button
      cy.get("button.read-recipe-button").eq(1).click();
      // Sees animation
      cy.get("button.like").first().should("have.class", "animate");
      // Sees 1 favorite in the nav
      cy.get("span.badge").contains("1");
      // Click on the previous recipe
      cy.wait(1000);
      cy.get("div.outside").eq(1).click();
      // Check if the 3rd recipe is liked
      cy.get("button.like").eq(2).find("svg").should("have.class", "liked");
      // Make the window to phone size
      cy.viewport("iphone-x");
      // Refresh page
      cy.reload();
      // Check if the <strong> contains "Loading"
      cy.get("strong").contains("Loading");
    });
    it.only("Logs out, backs to login page, sees notification, 'hi' message changes, localstorage is clean", () => {
      // Click on the logout link
      cy.get("a").contains("Logout").click();
      // Check if the URL is the login page
      cy.url().should("include", "/login");
      // Check if the notification is visible
      cy.get("span.notification").contains("Logout successful");
      // Check if "Hi, guest!" is visible
      cy.get("p.current-user").contains("Hi, guest!");
      // Check if the user object is removed from localStorage
      cy.window().then((window) => {
        const user = window.localStorage.getItem("user");
        expect(user).to.be.null; // Ensure user is null
      });
      // Check if the favorites badge has zero it it
      cy.get("span.badge").contains("0");
    });
  });
});
