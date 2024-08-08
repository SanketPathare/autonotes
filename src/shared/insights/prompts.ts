

/** Functions that create prompts and process the corresponding responses.
 *  Fork this file to experiment with your own insights prompts.
 */

import { Note, WrappedInsight } from "../types";

/** Create notes string for prompts. */
function makeNotesString(notes: Note[]): string {
  let notesString = "";
  notes.forEach((note) => {
    notesString += `-- Note ID: ${note.id} --\n${note.title}\n${note.markdown}\n\n`;
  });
  return notesString;
}

/** Extract interesting quotes from notes. */
export function makeNotesToQuotesPrompt(notes: Note[]): string {
  const notesString = makeNotesString(notes);

  return `
[All Notes]
${notesString}

[Instructions]
You are a creative writer who is searching through this dataset of All Notes
for 3 interesting sentences from notes that will become quotes on social media.
These should sound beautiful or funny and be suited to Pinterest or a TEDx Talk.
Do not repeat the same quote twice.

Please return as a single JSON list that contains a JSON for each
quote, along with the note id that the quote is from. For example:

[{ "quote": "This is a quote", "id": "12345" }]

[Quotes]
[
    `;
}

/** Make observations across all notes. */
export function makeNotesToObservationsPrompt(
  notes: Note[],
  inputs: WrappedInsight[]
): string {
  const notesString = makeNotesString(notes);
  const questionsString = inputs
    .map((input) => `${input.id}. ${input.prompt}`)
    .join("\n");

  return `
[All Notes]
${notesString}

[Instructions]
You are a creative journalist who is searching through this dataset of All Notes
to better understand the person who wrote the notes. Answer the following
questions.

${questionsString}

Please return a map of the question number to its string response.
If the response has several parts, separate with commas.
If the answer cannot be found, do not return anything.
Do not repeat the question.
For example:

{ "1": "playing guitar, knitting, cooking", "2": "" }

[Observations]
{
  `;
}
