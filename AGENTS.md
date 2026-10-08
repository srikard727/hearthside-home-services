# AGENTS.md — Hearthside Home Services

## Project Purpose

Hearthside Home Services is a full-stack software engineering portfolio project built with Next.js and TypeScript.

The goal is to build a realistic home-services management platform where:

- Customers can browse services, request work, schedule appointments, track jobs, and leave reviews.
- Technicians can view assigned work, update job status, add notes, and complete service visits.
- Administrators can manage users, services, bookings, technician assignments, and operational data.

This project is also a learning project.

Code quality matters, but the user must understand the system being built. AI agents should therefore assist with implementation without replacing the user's understanding of the architecture, code, or engineering decisions.

---

# Current Project State

The repository currently begins as a mostly default Next.js application.

Do not assume that authentication, databases, APIs, booking logic, user roles, tests, or production infrastructure already exist.

Before modifying existing functionality:

1. Inspect the current repository.
2. Understand what already exists.
3. Preserve working code unless there is a clear reason to change it.
4. Prefer incremental changes over large rewrites.

---

# Primary Technology Direction

The intended stack is:

- Next.js
- TypeScript
- React
- Tailwind CSS
- PostgreSQL
- Prisma or Drizzle ORM
- Authentication
- Role-based authorization
- Server Components where appropriate
- Server Actions and/or API route handlers where appropriate
- Schema validation
- Automated testing
- GitHub Actions
- Production deployment

Do not introduce major frameworks, databases, ORMs, state-management libraries, authentication systems, or infrastructure tools without explaining why they are needed.

When multiple reasonable technologies exist, explain the tradeoffs before committing the project to one.

---

# Core Engineering Goal

This should not become a simple CRUD demo.

The finished project should demonstrate software engineering skills including:

- full-stack architecture
- relational database design
- authentication
- authorization
- role-based permissions
- API/backend design
- input validation
- business logic
- scheduling logic
- error handling
- testing
- maintainable TypeScript
- responsive user interfaces
- CI/CD
- deployment
- security awareness
- documentation

Avoid adding features only to make the project appear larger.

Prefer a smaller number of well-designed, tested features over many unfinished features.

---

# User Roles

The system should eventually support three primary roles.

## Customer

Customers should be able to:

- create an account
- sign in and sign out
- manage their profile
- browse available home services
- view service descriptions
- create service requests
- select an address
- choose an available appointment time
- describe the problem
- optionally upload relevant photos
- view upcoming and previous bookings
- track job status
- cancel or reschedule when allowed
- view technician/job updates
- leave a review after job completion

Customers must never be able to access another customer's private bookings or data.

---

## Technician

Technicians should be able to:

- sign in
- view jobs assigned to them
- view appointment details
- view customer-provided service information needed for the job
- update job status
- add service notes
- upload before/after documentation where appropriate
- mark work as completed
- view their schedule

Technicians must not be able to access administrative functionality unless explicitly authorized.

Technicians should only access customer information necessary to perform assigned work.

---

## Administrator

Administrators should eventually be able to:

- manage service offerings
- manage customers and technicians
- view bookings
- assign technicians
- modify booking status when appropriate
- resolve scheduling conflicts
- view operational dashboards
- review completed jobs
- manage service availability
- inspect reviews
- access audit information where implemented

Administrative capabilities must always be protected by server-side authorization.

Never rely only on hiding UI elements for security.

---

# Initial Domain Model

The exact schema may evolve, but the application will likely contain entities similar to:

## User

Possible fields:

- id
- name
- email
- password/account provider information
- role
- createdAt
- updatedAt

Roles may include:

- CUSTOMER
- TECHNICIAN
- ADMIN

---

## Service

Possible fields:

- id
- name
- slug
- description
- basePrice
- estimatedDuration
- active
- createdAt
- updatedAt

Examples:

- Plumbing
- Electrical
- HVAC
- Appliance Repair
- Cleaning
- Landscaping

Do not hard-code the service catalog throughout the application if it belongs in the database.

---

## Address

Possible fields:

- id
- userId
- street
- city
- state
- postalCode
- unit
- createdAt
- updatedAt

Consider whether customers may have multiple saved addresses.

---

## Booking

Possible fields:

- id
- customerId
- serviceId
- technicianId
- addressId
- scheduledStart
- scheduledEnd
- description
- status
- createdAt
- updatedAt

Potential booking statuses:

- REQUESTED
- CONFIRMED
- ASSIGNED
- IN_PROGRESS
- COMPLETED
- CANCELLED

Do not allow arbitrary status transitions without considering business rules.

---

## JobUpdate

Possible fields:

- id
- bookingId
- technicianId
- message
- status
- createdAt

---

## Review

Possible fields:

- id
- bookingId
- customerId
- technicianId
- rating
- comment
- createdAt

A review should generally only be allowed for a completed booking.

---

# Architecture Principles

## Keep Responsibilities Clear

Separate:

- presentation/UI
- database access
- validation
- business logic
- authorization
- external-service integration

Avoid placing all application logic directly inside React components.

A page component should not become the database layer, business rules layer, validation layer, and UI all at once.

---

## Prefer Server-Side Enforcement

Important rules must be enforced server-side.

Examples:

- user permissions
- booking ownership
- technician assignment
- administrative actions
- status transitions
- scheduling conflicts
- review eligibility

Client-side checks may improve user experience but are not security boundaries.

---

## Avoid Premature Abstraction

Do not create generic repositories, service layers, factories, dependency-injection systems, or complex architectural patterns simply because they exist in enterprise applications.

Introduce abstractions when they solve an actual duplication, testing, maintenance, or architectural problem.

The user should be able to explain why every major abstraction exists.

---

# Database Guidelines

Use PostgreSQL as the primary production-style relational database unless the user deliberately chooses otherwise.

Use Prisma or Drizzle as the ORM.

Before creating the schema:

1. Identify entities.
2. Identify relationships.
3. Identify ownership.
4. Identify uniqueness requirements.
5. Identify deletion behavior.
6. Identify indexes that may matter.
7. Identify authorization implications.

Prefer proper relational modeling instead of storing complex application state in arbitrary JSON when normalized relational data is more appropriate.

Use migrations.

Do not manually mutate production schemas without migration history.

---

# Scheduling Requirements

Scheduling should eventually contain real business logic.

At minimum, the application should prevent obvious invalid bookings such as:

- appointment end before appointment start
- bookings in unavailable periods
- assigning one technician to overlapping appointments
- customers booking inactive services
- unauthorized users modifying bookings

A technician should not be double-booked.

Scheduling logic should be implemented in a reusable server-side function and covered by tests.

If race conditions become relevant, discuss database transactions or constraints rather than assuming a frontend availability check is sufficient.

---

# Authentication and Authorization

Authentication answers:

> Who is this user?

Authorization answers:

> What is this user allowed to do?

Keep these concepts separate.

Never assume authentication automatically implies permission.

Examples:

A customer may be authenticated but must not be able to:

- open another customer's booking
- assign technicians
- modify service definitions

A technician may be authenticated but must not be able to:

- edit arbitrary customer accounts
- see jobs belonging to unrelated technicians
- promote themselves to administrator

An administrator may have broader privileges, but those privileges must still be explicitly checked.

---

# Security Rules

Never commit:

- `.env`
- API keys
- database passwords
- authentication secrets
- private keys
- OAuth credentials
- access tokens

Use:

```text
.env.local
```

for local secrets and keep it in `.gitignore`.

Provide:

```text
.env.example
```

containing variable names with safe placeholder values.

If a secret is accidentally committed, removing the file in a later commit is not enough. The credential must be treated as exposed and rotated.

Validate all untrusted input.

Do not trust:

- URL parameters
- form values
- client-side role values
- browser-supplied user IDs
- uploaded file metadata

Authorization must use the authenticated server-side identity.

---

# Validation

Use schema validation for data entering the application.

Possible library:

- Zod

Examples that should be validated:

- registration data
- booking requests
- addresses
- technician updates
- reviews
- administrative service changes

Validation errors should be understandable to the user.

Do not duplicate validation rules unnecessarily across many files.

---

# TypeScript Guidelines

Prefer strong TypeScript types.

Avoid:

```ts
any
```

unless there is a documented reason.

Do not silence TypeScript errors simply to make the application compile.

Prefer:

- explicit domain types
- inferred database/schema types where appropriate
- discriminated unions where useful
- typed function parameters
- typed return values for important domain functions

Keep types understandable.

Complex type gymnastics are not a goal of this project.

---

# Next.js Guidelines

Use modern Next.js patterns intentionally.

Prefer Server Components for content that does not require browser interaction.

Use Client Components only when browser-side functionality is necessary, such as:

- interactive forms
- local UI state
- event handlers
- browser APIs

Do not place `"use client"` at the top of large portions of the application simply to avoid understanding the server/client boundary.

Explain when a component needs to become a Client Component.

Use Next.js route handlers or Server Actions based on the needs of the feature, not arbitrarily.

---

# UI Requirements

The product should feel like a real service platform rather than a coursework demo.

The interface should eventually include:

- navigation
- landing page
- service catalog
- booking flow
- authentication screens
- customer dashboard
- technician dashboard
- admin dashboard
- empty states
- loading states
- error states
- responsive layouts

Accessibility should be considered.

Use semantic HTML.

Forms should have proper labels.

Interactive elements should support keyboard usage where practical.

Do not prioritize decorative animations over application functionality.

---

# Testing Strategy

Tests should be added as features are implemented, not postponed until the very end.

The project should eventually contain three useful levels of tests.

## Unit Tests

Use for isolated business logic such as:

- scheduling calculations
- pricing logic
- booking status transitions
- authorization helpers
- validation utilities

---

## Integration Tests

Use for workflows involving multiple application layers such as:

- booking creation
- database persistence
- authorization
- technician assignment
- review creation

---

## End-to-End Tests

Use Playwright or another appropriate browser-testing tool for important user flows.

Examples:

### Customer flow

```text
Register
→ Sign in
→ Browse service
→ Create booking
→ View booking
```

### Technician flow

```text
Sign in
→ Open assigned job
→ Start job
→ Add update
→ Complete job
```

### Admin flow

```text
Sign in
→ View unassigned booking
→ Assign technician
→ Verify assignment
```

Do not write meaningless tests purely to increase coverage numbers.

Tests should protect important behavior.

---

# CI/CD

The project should eventually use GitHub Actions.

At minimum, pull requests and pushes should run:

```text
install dependencies
        ↓
lint
        ↓
typecheck
        ↓
tests
        ↓
production build
```

CI should catch broken code before deployment.

Do not disable failing checks simply to make CI green.

Fix the underlying issue.

---

# Deployment

The frontend/application may be deployed with Vercel if appropriate.

The PostgreSQL database may use a managed service such as:

- Neon
- Supabase
- another appropriate PostgreSQL provider

Deployment decisions should be documented.

The application should have:

- production environment variables
- migration strategy
- error handling
- safe database access
- no hard-coded localhost dependencies

---

# Logging and Observability

As the project becomes larger, add meaningful server-side logging.

Useful events may include:

- booking creation
- booking cancellation
- technician assignment
- job status changes
- failed authorization
- external notification failures

Never log passwords, access tokens, or sensitive credentials.

Do not flood logs with meaningless debug output.

---

# Git Practices

Prefer focused commits.

Good examples:

```text
feat: add service catalog
feat: create booking schema and migration
feat: add technician assignment workflow
test: cover booking conflict detection
fix: prevent unauthorized booking access
docs: document local PostgreSQL setup
```

Avoid commit messages such as:

```text
stuff
update
changes
working
final
test
```

Do not rewrite large portions of working code unless the change has a clear engineering benefit.

---

# Agent Behavior

AI agents working in this repository must follow these rules.

## 1. Preserve the User's Learning

This project exists partly so the user can become a stronger software engineer.

Do not behave like an autonomous contractor whose only objective is to finish the product as quickly as possible.

When implementing nontrivial functionality:

- explain the approach
- identify the important files
- explain important architectural decisions
- point out unfamiliar concepts
- make the code understandable

The user should be able to explain the completed feature in an interview.

---

## 2. Prefer Incremental Work

Implement one coherent feature at a time.

Prefer:

```text
database setup
→ user model
→ authentication
→ authorization
→ service catalog
→ booking system
```

over attempting to build the entire product in one massive change.

Large changes are harder for the user to understand, test, and debug.

---

## 3. Do Not Hide Complexity

If a feature involves an important concept such as:

- transactions
- race conditions
- session management
- relational modeling
- authorization
- caching
- asynchronous processing

explain the concept rather than hiding it behind generated code.

---

## 4. Do Not Overengineer

Do not introduce:

- microservices
- Kubernetes
- event streaming
- message brokers
- elaborate design patterns
- distributed systems infrastructure

unless the actual application develops a need for them.

The objective is professional software engineering, not maximizing technology count.

---

## 5. Explain Major Dependencies

Before adding a significant dependency, state:

- what problem it solves
- why the existing stack is insufficient
- what alternatives exist
- what maintenance/security implications it introduces

Minor development dependencies do not require extensive discussion.

---

## 6. Keep the Project Resume-Defensible

The user intends to discuss this project during software engineering interviews.

Therefore, code should favor understandable engineering decisions over unnecessary cleverness.

The user should eventually be able to explain:

- the system architecture
- database schema
- authentication strategy
- authorization strategy
- Next.js server/client boundaries
- booking workflow
- scheduling conflict prevention
- testing strategy
- CI/CD
- deployment
- important tradeoffs

---

## 7. Never Fabricate Metrics

Do not invent:

- performance improvements
- user counts
- latency measurements
- availability percentages
- test coverage
- throughput
- business outcomes

If the project later includes measurements, record the real experiment or benchmark methodology.

---

## 8. Maintain Documentation

As substantial features are completed, update the README.

The README should eventually explain:

- project purpose
- screenshots
- live deployment
- architecture
- technology stack
- features
- role/permission model
- database design
- local setup
- environment variables
- testing
- deployment
- engineering decisions
- future work

Do not leave the default `create-next-app` README once meaningful development begins.

---

# Suggested Development Roadmap

This roadmap is directional and may change as the project develops.

## Phase 1 — Foundation

- replace default Next.js landing content
- update project metadata
- create project layout/navigation
- establish folder conventions
- configure database
- configure ORM
- create initial schema
- create `.env.example`
- document local setup

---

## Phase 2 — Authentication

- user registration
- login/logout
- sessions
- protected routes
- role model
- customer/technician/admin authorization helpers

---

## Phase 3 — Service Catalog

- Service database model
- service listing
- service details
- admin service management
- active/inactive services

---

## Phase 4 — Customer Booking

- saved addresses
- booking form
- booking validation
- appointment date/time
- service description/problem details
- booking persistence
- customer booking dashboard

---

## Phase 5 — Technician Workflow

- technician profiles
- technician availability
- assignment
- technician dashboard
- job status transitions
- technician notes
- completion workflow

---

## Phase 6 — Scheduling

- appointment durations
- technician schedule
- overlapping appointment detection
- rescheduling
- cancellations
- availability calculation
- scheduling tests

---

## Phase 7 — Reviews and History

- completed-job reviews
- ratings
- customer service history
- technician job history

---

## Phase 8 — Admin Operations

- admin dashboard
- unassigned jobs
- technician assignments
- user management
- service management
- operational summaries

---

## Phase 9 — Quality

- unit tests
- integration tests
- Playwright E2E tests
- accessibility review
- loading/error states
- security review
- responsive UI review

---

## Phase 10 — Delivery

- GitHub Actions
- production database
- deployment
- migration verification
- logging
- production environment configuration
- final README
- architecture diagram
- screenshots/demo

---

# Definition of Done for a Feature

A feature is not complete merely because the UI appears to work.

A substantial feature should normally satisfy:

- functionality works
- TypeScript passes
- input is validated
- authorization is enforced
- errors are handled
- database behavior is correct
- relevant tests exist
- linting passes
- production build succeeds
- documentation is updated where necessary

---

# Final Project Standard

The finished Hearthside Home Services project should demonstrate that the user can design and explain a production-style full-stack web application.

The project should prioritize:

1. correctness
2. understandability
3. security
4. maintainability
5. testing
6. user experience
7. deployment quality

The objective is not merely to have a functioning website.

The objective is to create a project that the user can confidently open during a software engineering interview and explain:

> what was built, how it was designed, why those decisions were made, what problems occurred, how they were solved, and what would be improved next.