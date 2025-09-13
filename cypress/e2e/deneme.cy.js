describe("Test setup", () => { 
  it("should pass basic assertion", () => {
    expect(true).to.equal(true);
  });
});

describe('Login Component Tests', () => {
  beforeEach(() => {
    // Navigate to your login page before each test
    cy.visit('http://localhost:5173/'); // Update with your actual login page URL
  });

  describe("Başarılı Giriş Senaryosu", () => {
    it("should log in successfully with valid credentials", () => { 
        // Fill in the email and password fields with valid data
        cy.get('[data-cy="email-input"]').type('erdem.guntay@wit.com.tr');
        cy.get('[data-cy="password-input"]').type('9fxIH0GXesEwH_I');
        cy.get('[data-cy="terms-checkbox"]').check(); // Check the terms checkbox
        cy.get('[data-cy="submit-button"]').click(); // Submit the form

        // Verify that the user is redirected to the success page
        cy.url().should('include', '/success');
        cy.visit('http://localhost:5173/success');
        cy.contains('Login Successful!'); // Check for success message
    });
    });
    describe("Başarısız Giriş Senaryosu", () => {
        describe("Geçersiz E-posta Formatı Geçerli Password Formatı", () => {
            it("should show error for invalid email format", () => {
                // Fill in the email field with an invalid email format
                cy.get('[data-cy="email-input"]').type('invalid-email');
                cy.get('[data-cy="password-input"]').type('ValidPass123!');
                cy.get('[data-cy="terms-checkbox"]').check();
                cy.get('[data-cy="submit-button"]').should("be.disabled"); // Submit the form
                // Verify that the appropriate error message is displayed
                cy.get('[data-cy="error-message-email"]').should('be.visible').and('contain', 'Please enter a valid email address!');
                // Ensure the URL has not changed to the success page
                cy.get
                cy.url().should('not.include', '/success');
                
            } );
        });
        describe("Geçersiz E-posta Formatı Geçersiz Password Formatı", () => {   
            it("should show error for invalid email and weak password", () => {     
                // Fill in the email field with an invalid email format and weak password
                cy.get('[data-cy="email-input"]').type('invalid-email');
                cy.get('[data-cy="password-input"]').type('123');
                cy.get('[data-cy="terms-checkbox"]').check();
                cy.get('[data-cy="submit-button"]').should("be.disabled");
                // Submit the form
                // Verify that the appropriate error messages are displayed
                cy.get('[data-cy="error-message-email"]').should('be.visible').and('contain', 'Please enter a valid email address!');
                
                cy.get('[data-cy="error-message-password"]').should('be.visible').and('contain', 'Not strong enough.'); 
                // Ensure the URL has not changed to the success page
            }); 
        });
        describe("Geçerli Eposta Geçersiz Şifre formatı", () => {
            it("should show error for weak password", () => {
                // Fill in the password field with a weak password
                cy.get('[data-cy="email-input"]').type('valid@email.com');
                cy.get('[data-cy="password-input"]').type('123');
                cy.get('[data-cy="terms-checkbox"]').check();
                cy.get('[data-cy="submit-button"]').should("be.disabled"); // Submit the form
                // Verify that the appropriate error message is displayed
                cy.get('[data-cy="error-message-password"]').should('be.visible').and('contain', 'Not strong enough.');
                // Ensure the URL has not changed to the success page
                cy.get('[data-cy="error-message-email"]').should('not.be.visible'); // Ensure email error message is not displayed

            });
        }); 
        describe("Kabul Edilmemiş Kullanım Şartları", () => {
            it("should show error when terms are not accepted", () => {
                // Fill in the email and password fields with valid data but do not check the terms checkbox
                cy.get('[data-cy="email-input"]').type('valid@email.com');
                cy.get('[data-cy="password-input"]').type('ValidPass123!'); 
                // Do not check the terms checkbox
                cy.get('[data-cy="submit-button"]').should("be.disabled"); // Submit the form
                // Verify that the appropriate error message is displayed
            });
        });
        describe("Geçersiz Giriş Bilgileri", () => {
            it("should redirect to error page with invalid credentials", () => {
                // Fill in the email and password fields with invalid data
                cy.get('[data-cy="email-input"]').type('notvalid@credential.com');
                cy.get('[data-cy="password-input"]').type('WrongPass123!');
                cy.get('[data-cy="terms-checkbox"]').check();
                cy.get('[data-cy="submit-button"]').click(); // Submit the form

                // Verify that the user is redirected to the error page 
                cy.url().should('include', '/error');
                cy.visit('http://localhost:5173/error');
                cy.contains("Login'de hata lütfen tekrar deneyiniz"); // Check for error message
            });
        });
    }); 
});