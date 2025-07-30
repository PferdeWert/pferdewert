PferdeWert Coding Guidelines for AI-Generated
 Code
 Frontend Best Practices
 • 
Always import all necessary modules and components: Ensure every React hook, component,
 or utility used in a file is imported at the top. AI-suggested code might use functions or
 components without adding imports, causing 
'X is not defined' errors. Double-check for
 missing imports. For example, the header component explicitly imports React hooks and Next.js
 components it uses (useState, useEffect, Image, Link, icons, etc.) . Including all dependencies
 1
 prevents runtime errors and ESLint 
no-undef violations.
 • 
• 
Remove unused variables and imports: AI-generated code might declare variables that remain
 unused or leave debug imports in place. Unused code triggers ESLint (
 no-unused-vars )
 warnings and can confuse readers. Clean up any variables, functions, or imports that aren't
 needed. In the webhook API, for instance, the developers commented out an import of log
 utilities when they decided to use console logs for debugging . By removing or commenting
 out unused code like this, you keep the codebase clean and free of lint errors.
 2
 Handle asynchronous calls properly (use await and try/catch): Always use 
for promises and handle errors gracefully. AI code may omit an 
async/await
 await , leading to unhandled
 promises or unpredictable behavior. In the frontend, wrap API calls in try/catch and await their
 results. For example, the form submission code waits for the 
/api/checkout response and
 checks 
3
 4
 res.ok before proceeding . If the response is not OK or the fetch fails, it catches the
 error and sets an error message for the user . This pattern ensures asynchronous operations
 (like network requests) complete before moving on, and that errors are not silently ignored.
 Always update UI state (e.g. show/hide loading spinners, display errors) in response to these
 outcomes, and use a 
finally block to reset loading state regardless of success or failure so
 the UI isn’t left in a loading state .
 4
 • 
• 
• 
Follow React Hooks rules and patterns: Keep React components predictable by adhering to
 Hook best practices. Always call hooks (useState, useEffect, etc.) at the top level of the
 component, not inside loops or conditionals (the ESLint rules-of-hooks will flag this). Also
 manage side effects carefully:
 UseEffect with cleanup: If an effect sets up an ongoing process (like an event listener, subscription,
 or timer), provide a cleanup function. For example, the Header component uses 
5
 useEffect to
 lock page scroll when the mobile menu opens, and cleans up by re-enabling scroll on unmount
 . Another effect in the Header listens for the Escape key to close the menu and removes the
 keydown listener in its cleanup
 6
 . AI might overlook such cleanups, so always include them to
 prevent memory leaks or unwanted behavior.
 Don’t make useEffect directly async: Instead, define an inner 
async function and call it inside
 useEffect. This avoids React console warnings and makes error handling easier. In the Ergebnis
 page, for instance, an inner 
fetchSession() function is declared and invoked inside a
 1
7
 useEffect to load data on mount . This approach allows use of try/catch inside the effect and
 avoids race conditions with stale state. Also, include all necessary dependencies in the
 dependency array of useEffect (the ESLint 
react-hooks/exhaustive-deps rule will remind
 you) so that effects run consistently and only when intended.
 • 
• 
• 
• 
• 
8
 Maintain consistent code style (quotations, formatting, etc.): Ensure the code style remains
 uniform, since AI tools might use different conventions. In PferdeWert’s codebase, Prettier is
 used to enforce formatting — for example, quotes, spacing, and semicolons are standardized on
 commit . Adhere to the established style: if the project prefers single quotes for strings (or
 vice versa), convert AI-generated snippets to match. In JSX attributes, use double quotes as per
 HTML conventions, and in TypeScript/JS code use the project’s preferred quote style consistently.
 Running the auto-formatter (Prettier) after integrating AI-written code is highly recommended;
 this will automatically fix quote inconsistencies and other formatting issues. Consistent style not
 only appeases linters but also makes the code easier to read and maintain for everyone on the
 team.
 Avoid banned or risky patterns (TypeScript-specific rules): The ESLint configuration disallows
 certain patterns that AI might introduce:
 No 
any types: Do not use the 
any type unless absolutely necessary. The rule 
eslint/no-explicit-any is enabled
 9
 , so using 
proper interfaces, generics, or the 
@typescript
any will trigger a lint error. Instead, use
 unknown type and then narrow it. For example, rather than
 casting to 
any to access a property, extend the type definition or use optional chaining. In our
 code, global browser objects are given proper types in the declaration files instead of using 
(window as any) casts
 10
 compile time that an 
. Adopting this practice ensures type safety and catches errors at
 any would hide.
 No CommonJS 
require in front-end/TS files: Use ES6 import syntax for modules. The project
 enables 
@typescript-eslint/no-require-imports , so calls to 
are flagged. AI might suggest 
require() in TypeScript
 require() out of habit or when mixing Node contexts, but in
 our Next.js setup you should use 
import/export . For instance, instead of 
CookieConsent = require("@/components/CookieConsent") , use 
const 
import 
CookieConsent from "@/components/CookieConsent";
 11
 . This keeps the code
 consistent and works with tree-shaking and TypeScript module resolution.
 Respect lint feedback: After pasting AI-generated code, run 
npm run lint (or the equivalent)
 and fix issues it reports. Our project uses lint-staged and Husky to automatically lint and format
 f
 iles on commit
 12
 , meaning any lingering issues like unused variables, missing imports, or
 style deviations will be caught. It’s easier to address those before committing: for example, if the
 linter warns about a missing dependency in useEffect or an unused variable that the AI
 introduced, correct it per the guideline (add the dependency, remove the variable, etc.) before it
 becomes a problem in code review.
 Backend (API) Best Practices
 • 
Validate inputs and fail fast: Backend API routes should always validate incoming data before
 processing. AI-generated server code might assume inputs are well-formed, but our codebase
 defends against bad data. Use schemas or explicit checks to validate request payloads and query
 params, and respond with an error if something is missing or invalid. PferdeWert uses Zod for
 runtime validation. For example, the session API endpoint defines a schema for 
and uses 
session_id
 safeParse to ensure the query parameter exists and meets the criteria . If
 validation fails, it immediately returns a 400 response with an error message . Emulate this
 14
 13
 2
pattern: define the expected shape of 
req.body or 
req.query (using Zod or similar) and
 verify it at the top of your handler. This prevents downstream code from operating on undefined
 or incorrect values and makes error handling straightforward.
 • 
• 
• 
• 
• 
Import required libraries and types in API files: Just like on the frontend, every external or
 internal module used in a backend function must be imported. Common AI omissions include
 forgetting to import Next.js types, database utilities, or config values. For instance, if an API
 handler uses 
NextApiRequest /
 15
 NextApiResponse in its function signature, it must import
 those types from Next . Similarly, using any helper (like our Mongo helper or logging
 functions) requires an import. The checkout API route, for example, imports 
ObjectId , our 
Stripe , 
15
 getCollection DB helper, and logging utilities at the top . Skipping an
 import will lead to a ReferenceError or TypeScript error. After letting an AI generate a handler, go
 through each identifier and ensure its import is present (and no imports are left unused).
 Use 
async/await and handle promises in server logic: Do not fire off asynchronous
 operations without awaiting them in Node/Next API code. Each database call or external API call
 should be awaited so that you can handle its result or any error before continuing. In the
 checkout endpoint, for example, the code awaits the Stripe checkout session creation, then
 awaits the MongoDB insertion, before sending the response . This sequential awaiting
 ensures that the operations have completed successfully (or throws an error to be caught) by the
 time you respond to the client. If those were not awaited, the server might respond before the
 operations finish, or unhandled promise rejections could occur later. Likewise, in the Stripe
 webhook handler, the code awaits the fetch call to our FastAPI service and then awaits
 response.json() before proceeding to use that data . Always await promises, and if an
 operation can be done in parallel, manage that explicitly (Promise.all with proper error handling)
 rather than neglecting an await. This way, the server logic remains reliable and predictable.
 16
 18
 17
 Surround external calls with try/catch and return errors appropriately: Robust error
 handling is crucial on the backend. Any call to a database, third-party API (like Stripe or OpenAI),
 or any code that could throw should be wrapped in a 
try/catch . This ensures that if
 something goes wrong, you can log the error and inform the client instead of crashing or
 hanging. Our API routes consistently catch errors and return an HTTP 500 with a JSON error
 message or similar. For instance, the checkout route wraps the core logic in a try/catch: if
 anything fails, it logs an error with 
19
 error() and responds with a generic "Interner
 Serverfehler" message . Similarly, the webhook code catches any exceptions during
 processing and ends the response with a 500 status and error message . When integrating
 20
 AI-written code, make sure it follows this pattern. If the AI omitted a try/catch around an 
await
 call, add one. Use our logging (see next point) inside catches for visibility. The key is that no
 promise rejections or thrown errors should escape your function; they should all be caught and
 translated into an appropriate 
res.status(...).json() or 
res.end() response.
 Ensure every API code path sends a response (avoid hanging requests): A common oversight
 in AI-generated backend code is failing to return after sending a response or not handling all
 logical branches, which can lead to requests that never get a reply. Make sure that for every
 possible route through your code, the request is answered exactly once. In practice, this means: 
Return after sending a response: Once you call 
res.json() or 
res.end() , immediately
 return from the handler to stop execution. For example, in the session endpoint, if the 
session_id validation fails, the code returns a 400 response and a 
return statement to exit
 the function
 14
 . In the webhook handler, if the required GPT result is missing, it logs an error
 3
and return res.status(500).end() immediately, so it doesn’t continue processing .
 Every if that sends a response in our code is followed by a return. This prevents multiple
 responses or further logic running unexpectedly. 
Handle success and error branches: Ensure that both the "happy path" and error conditions
 culminate in a response. For instance, after successfully updating the database in the webhook,
 the code calls res.status(200).end("Done") and returns . In the catch block for any
 error, it returns a 500 status . As a result, the client will always get either a 200 or some error
 status, and the function will not keep running after that. Review AI outputs for any code path
 that might skip sending a response (for example, missing an else after an if that doesn’t
 cover all cases, or forgetting to return after res.send). Adding explicit returns and an else
 or default case to cover all scenarios will satisfy ESLint (which might warn about inconsistent
 returns) and, more importantly, ensure no request hangs waiting for a response.
 Use the provided logging utilities for consistent logs: Instead of scattering console.log
 calls in the code, use the structured logging functions (log, info, warn, error) from our
 custom logger (@/lib/log). These utilities are designed to only output in development (when
 NODE_ENV === "development") , which helps keep production logs clean and
 relevant. AI-generated code often uses raw console.log or console.error; convert those
 to our logger for consistency. For example, use warn() to log recoverable issues or bad user
 input (as seen when the checkout handler logs an invalid HTTP method or missing field ) and
 error() to log exceptions or critical failures (like catching an error during checkout processing
 ). The benefit is twofold: our logs have a uniform format/prefix, and we avoid exposing
 verbose logs in production unless needed. Of course, during development or debugging, you
 might temporarily use console.log, but remember to remove or replace them with the
 appropriate log/info/warn/error calls before committing. This keeps the codebase
 professional and the output manageable.
 Keep backend code style consistent with the frontend: Just because this is server-side code
 doesn’t mean style conventions can be relaxed. The same Prettier and ESLint rules apply to
 backend files. Run the formatter on API files so that indentation, quotes, etc., match the project
 standards. For example, if the frontend code uses single quotes, do so in API code as well for
 string literals (the lint-staged setup will format both frontend and backend files on commit ).
 Consistent formatting and conventions across the whole project make it easier to read and
 reduce the cognitive load when switching between front and back end. Additionally, avoid
 patterns in server code that are banned in the frontend (like any or require in our
 TypeScript files), since our config spans the entire repo. By maintaining the same strictness and
 style in Node code, you ensure that AI contributions don’t introduce style regressions or lint
 errors on the server side either.
 By following these project-specific best practices, you can significantly reduce the common ESLint errors
 and bugs that occur when using AI agents (like CustomGPT or Claude) to generate code. Always review
 and test AI-written code with these guidelines in mind to maintain the quality and reliability of the
 PferdeWert 

 READ my TYPESCRIPT_GUIDELINES.md FILE AS WELL AND FOLLOW THESE INSTRUCTIONS AS WELL!!