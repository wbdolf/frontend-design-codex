---
name: frontend-design-fusion
description: Design and implement frontend interfaces. Use when the user asks to build, redesign, restyle, modernize, or visually polish web components, pages, dashboards, apps, prototypes, games, hero sections, or existing UI, especially when they want non-generic AI aesthetics, strong typography, color, motion, layout, responsive behavior, and browser-verified implementation.
---

# Frontend Design Fusion

Use this skill to turn frontend requests into working, production-oriented UI with a clear aesthetic point of view. The goal is not to decorate a default layout. The goal is to design and implement an interface that feels specific to the product, audience, and interaction model.

Read linked guides under `references/` relative to this skill directory. Use the current host's available editor, shell, image and browser tools as the task requires. Existing project assets can supply the visual direction. When a capability is unavailable, complete the supported work and identify which requested outputs or runtime checks remain unverified.

## Scope the work

- A campaign, download, signup or product landing page needs a visitor decision. Use the [landing page guide](references/landing-pages.md) to shape its message and primary action.
- A multi-purpose home page needs clear routes to its major destinations. Apply the landing guide to individual campaigns when relevant.
- For a dashboard, editor or game, start with the task people repeat. Place its controls and feedback where the work happens.
- For multi-page workspaces, follow one record from discovery through a reversible change and back to its source. Pick the layout for each decision (comparison, investigation, assignment or conflict review). Keep identifiers, status meanings and units consistent across routes. Verify filtered returns, browser Back, reload and a direct detail link.

Choose the scope before applying the sections below.

- **Review only.** Report findings and supporting observations.
- **Local repair.** Reproduce the reported issue at its original viewport and state. Reuse the current design system, make the smallest change that resolves it, then retest the original case, adjacent layout and the other device size. For mobile overflow, check the widest affected content at the failing width, the neighboring breakpoint and desktop. Finish when the defect is resolved and nearby controls still work.
- **Focused visual iteration.** Use the selected sample, supplied reference or current screen as the baseline. Change the requested element and compare it in context at the same size and state. A local request can use the preview step below when the user asks to choose.
- **New design or full redesign.** Follow the full workflow below. For a redesign, inventory existing routes, labels, states and shortcuts first.

## Full design workflow

1. Identify the audience, primary action and observable success state. Write the brief below.
2. Use the supplied visual direction when it is clear. If the direction is open or the user requests a choice, use the preview procedure below.
3. Build on the project's design system and define the additional patterns needed for this design.
4. Implement the chosen direction in the existing stack. Verify the primary journey on desktop and mobile.
5. Fix task-blocking interactions and visible layout defects. Use the selected sample or reference to settle questions of aesthetic preference. If the user wants to change direction, identify the specific composition decision to revisit.
6. Hand off the working surface with evidence for the checks performed.

### Show directions the user can choose between

When the user asks to choose, or a new project's visual direction is undecided, show two or three labeled first-viewport mockups before building out the page. Use the same copy, source assets, data, initial state and viewport dimensions for every option. Present the actual rendered images side by side or as individually viewable previews. Vary the focal subject, its scale and position, or the placement and behavior of the main entry point. Each option should remain distinguishable if the typeface and colors are held constant.

For a text-heavy workbench, vary the reading order around the decision. A field matrix supports checking two values, a timeline supports following a handoff, and an evidence view supports tracing a finding to its source. Use one representative record in the same stage across all desktop and mobile previews. If the user then asks about a surface treatment, compare it on the selected layout with the content, type scale and geometry held steady.

Caption each preview with what the user sees first and how they start the primary task. When the user wants to pick, ask which sample to develop and wait for the choice. When the user delegates direction, identify the sample you recommend and continue. A clear reference or a local change goes directly to implementation unless the user requests alternatives.

## Design Pre-Analysis

For a new design or full redesign, record these points in a short working brief:

- Purpose: the problem the interface solves and the primary user.
- Context: landing page, operational app, dashboard, editor, commerce flow, game, or component.
- Tone: choose one precise direction, such as editorial utility, industrial control room, playful toy-like, luxury restraint, brutalist raw, retro-futuristic, organic/natural, art deco, dense analyst workspace, or calm enterprise tool.
- Differentiator: the one visual or interaction idea a user should remember.
- Constraints: framework, existing design system, accessibility, performance, content, data shape, and responsive requirements.

Use a concept image when composition or art direction is the open question. For an existing interface, start with its real screen and representative data. For a marketing claim about a product feature, prefer a real screenshot or working demonstration. Keep generated artwork illustrative.

## Visual Direction Rules

Commit to a direction that fits the domain. Do not mix several moods because they sound impressive.

- SaaS, CRM, admin, analytics, and operational tools should be dense, calm, legible, and workflow-first.
- Consumer, brand, venue, editorial, and product pages should have a strong first-viewport signal and real visual assets.
- Games and playful demos can be more expressive, illustrated, and animated, but core rules and controls must work.
- Existing products should preserve recognizable information architecture before adding visual polish.

### Establish the focal point

Choose the subject that best demonstrates the page promise. At thumbnail size, check that its silhouette or main detail reads before surrounding panels, borders and labels. Adjust scale, crop, contrast and nearby empty space independently. Recompose for the narrow viewport and inspect the actual crop with the CTA visible. If a claim depends on a detail too small to see, show a close-up, an excerpt or a direct manipulation beside the claim.

For a brand, culture or music page, inspect the resting frame with controls and motion mentally removed. Look for a composed image: a recognizable subject, a clear light or color relationship, and space for type. Inspect the playing or interactive frame separately. Keep important details and text readable when feedback overlays the artwork.

### Change the focal point as work progresses

For a workbench with multiple stages, sketch the first visit, the key intermediate state and the completed result using representative data. For each frame, name the user's immediate decision and the visible evidence they need. Before work starts, group the input with the first available action. After a step succeeds, place its saved result beside the next action. At completion, give the outcome and its supporting values the strongest position. Keep recovery available when an operation fails and show the last confirmed record.

For handoffs and comparisons, identify the source of each value independently. Align corresponding fields and show meaningful values with raw detail collapsed. On a narrow comparison table, keep each field’s values adjacent. On a handoff timeline, keep the sender and receiver in sequence and show the same key fields in the same order in both nodes. Distinguish pending, empty and different values in text.

Review actual desktop and mobile frames at those stages with secondary details closed. Read the first visible action or conclusion and point to the evidence for it. If the title, an empty report or a secondary control draws attention first, revise the composition. For before-and-after reviews, use the same scenario, viewport, scroll position and stage in each pair.

### Compose the scene around an interaction

For a theater, exhibition, music page or other scene-led experience, plan the opening frame and its interaction together while choosing a direction. Mark the first thing the visitor sees, the object they can act on, the cue that makes it discoverable, the visible result and the route back. Record what should persist on return, including the scene, selection and keyboard focus.

For a theater, the lit rope beside the curtain can invite the visitor to raise it. A lit box then opens a side story. Closing the story restores the same act with focus on that box. Give a drag gesture an equivalent named control operable by tap, click and keyboard. In the browser, run the complete enter, act and return sequence separately with a mouse, touch input and the keyboard. Report which inputs were emulated or untested.

Anchor a scene entrance to architecture the visitor can recognize at both viewport sizes. Match its scale, support, light and occlusion to its surroundings. Make the object itself a labeled focusable target. For a journey into another space, find its position in the rendered crop, carry one landmark across the threshold and reverse the path on exit. Preserve the originating scene, scroll position and focus. See the [curtain and balcony case](references/case-review.md#幕布的重量与包厢的入口).

## Style Range Matrix

Use these families as starting points when developing alternatives. Tie each candidate to the audience, task and composition.

Useful direction families:

- Editorial utility: strong type hierarchy, restrained color, print-like rhythm, useful for publishing, research, documentation, and serious brand sites.
- Industrial control room: dense rows, hard dividers, status color, mono details, useful for operations, monitoring, logistics, and infrastructure tools.
- Playful toy-like: chunky controls, kinetic motion, friendly color, useful for education, kids, games, and creative demos.
- Luxury restraint: large negative space, tactile imagery, refined typography, useful for fashion, fragrance, hospitality, and premium products.
- Brutalist raw: exposed grids, sharp contrast, direct labeling, useful for experimental portfolios, events, and opinionated cultural work.
- Retro-futuristic: period-specific type, geometric panels, glow used sparingly, useful for music, games, hardware, and speculative products.
- Organic/natural: soft asymmetry, material texture, botanical or earthy color, useful for wellness, food, environment, and handmade products.
- Art deco: geometric ornament, high contrast, vertical rhythm, useful for venues, editorial campaigns, and premium event pages.
- Dense analyst workspace: compact tables, filters, inspectors, charts, and keyboard-friendly flows for professional tools.
- Clinical calm: high legibility, neutral surfaces, trustworthy states, useful for healthcare, finance, security, and compliance.

## Anti-Generic UI Rules

Avoid generic AI frontend habits. Inspect the patterns relevant to the page and fix the ones that interfere with its purpose:

1. Do not default to purple-blue gradients on white backgrounds.
2. Do not default to Inter, Roboto, Arial, or system fonts when a distinctive but readable font pairing is appropriate.
3. Do not use repeated card grids as the main structure unless cards are the actual interaction model.
4. Do not add hero eyebrow labels, pill soup, fake badges, fake metrics, or logo clouds unless the brief or reference requires them.
5. Do not make every section a centered headline plus three cards.
6. Do not make dashboard data into marketing cards when tables, timelines, maps, charts, or inspectors are the real workflow.
7. Do not add decorative glows, blobs, or gradients that do not clarify hierarchy or brand.
8. Do not use stock-like generic imagery that could fit any product.
9. Do not let browser-default control typography appear in buttons, tabs, inputs, sidebars, toolbars, table cells, or status bars.
10. Do not ship inert controls in app UI; tabs, filters, selections, drawers, and primary actions need visible state.
11. Do not use tiny low-contrast text to make the design look polished while hurting readability.
12. Do not use the same type scale, radius, shadows, and palette across unrelated prompts.
13. Do not hide weak hierarchy behind excessive animation.
14. Do not use a static screenshot as app UI; keep navigation, text, controls, forms, and tables code-native.
15. Do not change a true white reference background into cream or gray unless the concept calls for it.

## Design System Extraction

For a new design or full redesign, record the existing tokens and any additions needed for the chosen direction:

- Colors: background, surface, text, muted text, border, accent, semantic states, shadows.
- Typography: display, heading, body, label, caption, control text, weights, line heights, and fallback fonts.
- Spacing: page gutters, section rhythm, grid columns, panel padding, control heights, row density.
- Shape: radii, borders, dividers, elevation, media frame treatment.
- Components: buttons, links, tabs, filters, rows, cards only where necessary, tables, charts, forms, modals, empty states.
- Motion: page entrance, hover/focus, selection, reveal, loading, and reduced-motion behavior.
- Assets: real or generated images, product renders, icons, logos, textures, diagrams, sprites, and their crop/aspect rules.

Map recurring text roles such as headings, body copy, field labels and numeric values to the existing type scale. Check them with actual page text, including long labels and CJK fallback glyphs when applicable. Repeated UI must use shared tokens or reusable components. Differences should be named variants, not one-off copied styling.

### Choose glass for a text-heavy surface

Use light frosting when a panel boundary helps the reader group related evidence, such as the saved record and the received record on a timeline. Prefer a solid reading surface for dense row scanning, extended code or backgrounds whose contrast varies under the text. Keep the text opaque and blur the backdrop. Provide a legible solid fill when blur is unavailable or the reader requests reduced transparency.

On mobile, give the background highlight its own layer. Reduce its opacity or move its brightest edge away from labels and values. Review the actual narrow crop at normal size with raw detail closed: can the reader name an item sent, find what arrived and tell whether they match? If the highlight draws the eye first, soften it again. See the [two-round workbench case](references/workbench-handoff.md) for the three compositions, material comparison and verification example.

### Glass buttons at rest and on press

When a workbench calls for glass controls, inspect the resting button on its actual background with the pointer away. Let the surface pick up the panel tint. Use a narrow reflection near the lit edge and a softer inner rim on the opposite edge to suggest thickness. Keep the label opaque and the center quiet. Check a close-up for material, then a full desktop and mobile frame for hierarchy. Give the next task action clear contrast. If an auxiliary action draws the eye before the data, narrow the highlight and soften the shadow while retaining the translucent center and edge reflection.

On press, compress the surface layer slightly and let it settle after one small rebound. Keep the label, focus ring and hit area stable. Verify mouse press, touch contact, release and cancellation. Preserve native keyboard activation. With reduced motion, show contact through an inset shadow or tone change. See the [worked glass button example](references/workbench-handoff.md#玻璃按钮的静止按压与整页验收) for measured values and the reading check.

### Choose corner radii by role

Start with the project’s component tokens. For new controls, choose the silhouette from the action, control height, density and visual language. A round transport button can distinguish a single icon action; a text CTA may use square or gently rounded corners. Give a segmented selector one group outline, an inset active shape and a visible selected state. Related inner and outer corners should follow their inset. Objects such as paper, data plots and photos can retain their own geometry. Check the label padding, focus ring and hit area with keyboard and touch. Capture the choice as a reusable token when it repeats.

## Implementation Rules

- Follow the repo's framework, routing, component, state, styling, lint, and accessibility patterns.
- For a new complex frontend without an existing stack, default to React + Vite. For a simple static proof, HTML/CSS/JS is acceptable.
- Build the real usable surface first. Do not wrap a future app in a marketing shell unless the user asked for a landing page.
- Preserve user-provided copy, required data, navigation labels, CTA labels, states, and workflows.
- Prefer existing icon libraries when they match the direction; otherwise write small, clean SVGs with consistent optical size.
- Use CSS variables or theme tokens for all recurring colors, spacing, and typography.
- Keep text readable at common desktop and mobile widths. Fix wrapping, clipping, and overlap before final handoff.
- Add accessibility basics: semantic landmarks, button labels, focus states, sufficient contrast, and `prefers-reduced-motion`.
- Keep dependencies local to the project. Do not add a package unless it materially improves the result and the user or repo allows it.

## Responsive Rules

Check at least one desktop and one mobile viewport.

- First viewport must fit without clipped primary content.
- Navigation must collapse or simplify cleanly.
- Tables, inspectors, editors, and dashboards must preserve scanning value; do not turn every dense surface into stacked cards automatically.
- Buttons and controls need stable sizes and tap targets.
- Hero or main workspace text must not overlap imagery, charts, or controls.
- Fixed or sticky headers count against viewport height.

## Motion Rules

Identify the event, the element that changes and what the user learns. Examples include a layer returning to registration, a drawer revealing its source selection, and a playhead tracking audible time. Use an immediate change when movement adds no information. Keep a still resting state legible.

- When the hero depicts a changing source such as sound, telemetry or a simulation, decide what in the visual can respond to the source itself. Map one perceptible property to actual values. Verify with two contrasting inputs and a paused state. Give the visitor a meaningful way to explore the change when the product supports it.
- Tie continuous feedback to the underlying value and stop it when activity pauses or ends. Keep gestures interruptible and handle rapid switching.
- Use a short transition for discrete changes. Keep content and the primary action available throughout.
- Test keyboard and touch input, rapid reversal and reduced motion. With reduced motion, remove decorative interpolation and preserve state labels and essential progress.

When a subject should feel physical, identify the part that initiates movement, the mass it carries, and the part that follows or settles. Observe a reference at normal speed. Use a short synchronized comparison at the same scale to inspect the silhouette, travel and recovery. Separate the subject from the background when the subject needs to travel through the scene. Define the cue, force, recovery and trailing response in that order. While the source is playing, track a recognizable feature against a fixed landmark on both layouts. Check the direction and distance in screen pixels, including the time after the cue ends. Repeat with the camera locked if camera motion hides the action.

For a pulled material, connect pointer travel to visible slack take-up, local tension and movement at the attachment. Let the body and the weighted free edge follow with different delays and settle under damping. Keep a seam or hem visible to judge deformation. Test a short pull and release, a committed pull, cancellation and a reduced-motion equivalent with the same final state.

For a motion-heavy landing page, measure the resources requested before the primary action, during playback, and under reduced motion. Keep a useful still available while optional animation layers load. Review a worked example in [the print and music page critique](references/case-review.md).

## Workflow and scheduling rules

For queues, assignments and schedules, read the project's requirements and existing conflict logic before labeling a record actionable or a resource available. Check interval endpoints, setup and cleanup buffers, time zone and status transitions where relevant. Verify a boundary case against the stated rule. If sources disagree or omit a rule that changes eligibility, flag the case as unresolved until the rule is clarified. For related operational screens, consult the [port workspace case](references/port-operations.md) as needed.

## Browser Verification

Match verification to scope. A local repair uses the reproduction and regression checks above. For a new design or redesign, verify the running product through its normal entry point in the user-facing preview.

1. Start the local dev server when needed and record the URL.
2. Open the local target with the host’s browser or the project’s browser automation. Use an available recorder for motion evidence.
3. Check desktop and mobile widths.
4. Follow the primary action through to its promised destination or visible result. On forms, try invalid input and correct it. For data views, exercise a relevant empty, pending or error state when it can be reproduced. Use local or simulated data for transactions.
5. Inspect typography, color, spacing, responsive behavior, icon treatment and asset loading. Reach the main control by keyboard and check its visible focus. Where motion reveals content, check that reduced motion leaves the content visible.
6. Capture a screenshot when practical and compare it against the concept, reference, or written visual direction.
7. Continue until the primary action works and affected layouts are legible and free of clipping or overflow. Compare aesthetic feedback against the selected preview or supplied reference.

## Handoff

Final response should be concise and evidence-based:

- Files changed.
- Browser URL or static file path.
- Build/test/lint commands run and their result.
- Desktop and mobile verification method.
- Core interaction path verified.
- The visual observations that affected the result. Include the viewport and action for any remaining issue.
- Intentional deviations or remaining limitations.

Do not claim visual success without browser evidence when the task involves a runnable UI.
