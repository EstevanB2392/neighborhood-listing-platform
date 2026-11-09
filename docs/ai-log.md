# AI Collaboration Log

| Tool | Prompt | Output Used | Output Rejected | Verification | Commit |
|---|---|---|---|---|---|
| ChatGPT | Explain in plain language why Next.js, TypeScript, and Tailwind CSS are a good stack for a neighborhood property listing platform. Briefly explain what each technology does and how they work together. | Used the explanation that Next.js provides application structure, TypeScript provides type checking, and Tailwind CSS provides responsive styling. | None. | Compared the explanation with the project requirements and Next.js setup options. | ba4a1e8 |
| Gemini | Explain in plain language why Next.js, TypeScript, and Tailwind CSS are a good stack for a neighborhood property listing platform. Briefly explain what each technology does and how they work together. | Used Gemini's examples of property data, responsive cards, SEO, and server rendering to understand how the stack could support a property platform. | Did not use the extra database and implementation suggestions because they were outside the current starter-app requirements. | Compared Gemini's response with ChatGPT's response and the Lab 1 requirements. | ba4a1e8 |
| Google AI Studio | Act as a senior teaching assistant. Propose a minimal Next.js App Router + TypeScript + Tailwind starter for a neighborhood property platform. Give a file plan, terminal commands, accessibility requirements, and a verification checklist. Do not give me a giant code dump. Do not include or invent credentials or secrets. | Used the recommendations for semantic HTML, descriptive image alt text, keyboard accessibility, and verification. | Rejected the suggested `--no-src-dir` setup because Lab 1 explicitly requires a `src` directory. Also did not install the additional suggested libraries because they were not required for the starter. | Configured create-next-app manually with TypeScript, ESLint, Tailwind CSS, App Router, and a `src` directory. Started the development server and verified the page returned HTTP 200. | ba4a1e8 |

## Midterm Practical Exam — Part 1

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Part 1 / ChatGPT | Asked how to set up the midterm exam using GitHub Codespaces instead of local VS Code. | Followed instructions to check Git status, create the exam branch, and push it to GitHub. | None. | Confirmed clean working tree, successful branch creation, and successful push in the terminal. | Pending |
| Part 1 / ChatGPT | Asked how to verify Git security settings. | Reviewed .gitignore and added dist/ to match exam requirements. | None. | Inspected .gitignore and confirmed environment files and build folders are ignored. | Pending |
| Part 1 / ChatGPT | Asked how to create and maintain the AI provenance journal. | Used the provided terminal commands and Markdown table format. | Did not replace the existing AI log because it contained previous lab records. | Opened docs/ai-log.md and verified existing entries were preserved. | Pending |

## Midterm Practical Exam — Parts 5 and 6

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
|---|---|---|---|---|---|
| Part 1 / ChatGPT | Asked for help setting up the exam branch and securing environment files. | Followed Git branching and .gitignore instructions. | No major suggestions rejected. | Verified branch, clean working tree, and successful push. | e0e44d1 |
| Part 5 / ChatGPT | Asked for help creating Zod validation and Supabase API routes. | Used the suggested schema, GET handler, POST handler, and authentication checks. | Did not treat untested database requests as successful because the services table was unavailable. | TypeScript and ESLint passed. Valid and invalid Zod payloads were tested. Unauthenticated POST returned HTTP 401. | 47a9cae |
| Part 6 / ChatGPT | Asked for help creating a reusable ServiceCard component. | Used the component structure, service information, and accessible booking button. | Left booking functionality disabled because it was not implemented. | Checked desktop and mobile display and basic keyboard navigation. | ef862f9 |
| Testing / ChatGPT | Asked for help documenting exam testing results. | Created a testing report covering API validation and UI tests. | Did not mark database integration as passed because GET returned HTTP 500. | Ran curl requests and reviewed TypeScript, ESLint, and UI results. | c4aaa9e |
| Part 6 Improvements / ChatGPT | Asked for help checking the component against the exam rubric. | Added semantic header, unordered specifications list, and responsive Tailwind grid. | Kept the existing working component rather than replacing the entire page. | TypeScript and ESLint passed after changes. | 82b7869 |

## Midterm Practical Exam — Parts 2, 3, and 4

Contributor: Ethan Franklin (ethanfranklinca)

### Original Request to ChatGPT

> Im doing this with a partner and we already have a repository that I was added to as a collaborator. We just added a branch called "exam/services-booking-eval" to do the assignment in. Im supposed to do parts 2, 3, and 4 and he does the rest. Walk me through every step, step by step for my parts and any other parts i need to have done. I also need to know any prerequisites I should have.

The table below summarizes the follow-up assistance and verification.

| Step / Tool | Prompt Summary | Model Output Used | Model Output Rejected & Rationale | Verification Method | Associated Git Commit |
|---|---|---|---|---|---|
| Part 2 / ChatGPT | Requested step-by-step help completing requirements for the assigned exam parts. | Used three user stories, Given/When/Then acceptance criteria, scope estimates, and database/API traceability. | Did not claim district or coverage-zone support because those entities are absent from the required schema. | Reviewed requirements against the assignment and confirmed the file was saved in GitHub. | 0dfa886 |
| Part 3 / ChatGPT | Requested browser-based guidance for creating the PostgreSQL migration. | Used DDL for all five tables, required foreign keys, checks, defaults, and immediate RLS activation. | Adapted the original local-terminal workflow to GitHub browser editing and Supabase SQL Editor because that was my working environment. | Executed the persistence SQL successfully in Supabase and verified RLS activation on all five tables. | 47eee1d |
| Part 4 / ChatGPT | Requested guidance implementing provider ownership, public reads, booking privacy, and elevated administration. | Used least-privilege grants and RLS policies in a separate versioned migration. | Did not treat an ordinary admin profile as equivalent to elevated service-role execution. | Executed the security migration successfully and tested anon, authenticated provider/client, and service_role database contexts. | 1fd781a |
| Part 4 Testing / ChatGPT | Requested step-by-step authorization tests and screenshot naming instructions. | Used SQL tests for public service reads, provider updates, client privacy, provider booking visibility, elevated access, anonymous bookings, categories, and provider lifecycle operations. | Did not use unrestricted SQL Editor results as proof of ordinary-user access; tests switched database roles and set user claims where required. | Compared actual results with expected counts; uploaded nine evidence screenshots. Test changes were rolled back. | d0bb5a3, 434f2c4, b1ed280 |
| Part 4 Audit / ChatGPT | Asked how to update the existing security audit without overwriting it. | Used targeted edits documenting successful booking inserts, role simulation, rollback behavior, and test limitations. | Did not replace the existing audit or claim unexecuted security tests had passed. | Compared the audit with completed SQL scripts and screenshots; distinguished database tests from API integration tests. | 2dd0cfe |

### Team Attribution

The existing security audit and RLS confirmation were also updated by
partner EstebanB2392 in commits 5b81e0f and 0565453. My audit corrections
are recorded in 2dd0cfe.
