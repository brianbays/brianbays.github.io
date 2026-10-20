UPLOAD TO THE ROOT OF YOUR WEBSITE REPOSITORY

1. Extract this ZIP.
2. Open your website repository on GitHub at its TOP LEVEL (where your homepage index.html and assets folder live).
3. Choose Add file > Upload files.
4. Drag in the extracted index.html file, playground folder, and world-capitals-quiz folder together. Keep the folder structure. Do NOT put everything inside the quiz folder.
5. Commit the upload and allow GitHub Pages to deploy. Keep all other website files and assets.

Included paths:
index.html                         Your current homepage with only a discreet footer Playground link added.
playground/index.html              New games/apps landing page.
playground/world.svg               Matching map artwork.
world-capitals-quiz/               Updated quiz, study key, data and existing licenses.

The Playground uses your existing assets/style.css and assets/favicon.svg. Those assets are not replaced.
The homepage was fetched from the live site on October 19, 2026. If you edit it again before uploading, merge this one link into its footer instead of replacing newer work:
<p><a href="playground/" style="color:var(--muted);font-size:13px">Playground</a></p>

Quiz changes:
- Warm charcoal, cream and sage colors matching the main website.
- Include territories is OFF by default. 197 country entries; 245 with the checkbox on.
- The game's 197-entry convention includes Palestine, Vatican City, Kosovo and Taiwan. Other entries are optional; this is a game grouping, not a statement about political status.
- Changing the checkbox resets the current round. Questions, choices and suggestions all follow the selected scope.
- Study key retains all 245 entries, with optional entries marked.
- Detailed coastlines and automatic close-up insets for 76 small locations, including Saint Lucia and Micronesia. The inset focuses on the capital's island/local area, not every island in a scattered archipelago.
- Main map remains available for wider context, with existing drag, pinch, wheel and reset controls.

Verified locally: both question-pool counts, checkbox reset, navigation from homepage to Playground to quiz, Saint Lucia/Micronesia inset rendering, phone-width layout, coordinate-data parity, and existing map math/gesture-handler tests. No new physical-phone test was performed.

No live website changes have been made by this package. Uploading and committing these files publishes the changes through your existing GitHub Pages workflow.
