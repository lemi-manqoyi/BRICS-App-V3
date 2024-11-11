# Protection in the BRICS Banking App

## List of attcks that are safegaureded against

- Session Jacking
- Clickjacking
- SQL injection attacks
- Cross Site Scripting attacks(XSS)

## Session Jacking

-  HTTP-Only Cookies: The session and JWT tokens are stored in HTTP-only cookies, making them inaccessible to JavaScript.
-  Secure Cookies: Cookies are marked as secure in production mode, ensuring they are only sent over HTTPS connections.
-  sameSite: 'strict': This setting in the session configuration(CSRF)  blocks cookies from being sent with cross-site requests.
-  JWT Expiration: The JWT token has an expiration time, which limits the duration of a session in the scenario that a token is stolen.


## Clickjacking

- Embedding the target site in an <iframe>. 
- Helmet middleware includes built-in protection by setting HTTP headers.

## SQL injection attacks

- Mongoose ORM: Mongoose provides protection against NoSQL injection by using schema-based queries.

## Cross Site Scripting attacks(XSS)

-  Helmet Middleware: The helmet library sets HTTP headers to protect against common XSS attacks.
-  HTTP-Only Cookies: By storing sensitive tokens (JWT) in HTTP-only cookies, the code prevents tokens being accessed directly.
-  CSRF Protection: CSRF tokens are generated and validated with csurf, which prevents malicious sites from making requests on behalf of authenticated users.

## Additional security measures

-  Rate Limiting: The express-rate-limit middleware limits the number of requests a user can make within a certain time frame.
-  Password Validation: The validatePassword function enforces password complexity (minimum 8 characters, one uppercase letter, one special character.
-  Environment-Specific Configurations: In production mode, the code enforces secure settings like HTTPS redirection and secure cookies.


*** This document was created with the assistance of ChatGPT (OpenAI, 2024a) ***
*** OpenAI (2024). ChatGPT. [online] Chatgpt.com. Available at: https://chatgpt.com/c/67322cbd-0708-8010-90e9-c3d996f5a8c0 [Accessed 11 Nov. 2024]. ***
