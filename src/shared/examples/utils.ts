

import { ProjectMetadata, RawObject } from "../types";
import {
  METADATA as aliceMetadata,
  NOTES as aliceNotes,
  CHAT as aliceChat,
  SUMMARIES as aliceSummaries,
} from "./alice_in_wonderland";

import {
  METADATA as anneMetadata,
  NOTES as anneNotes,
  CHAT as anneChat,
  SUMMARIES as anneSummaries,
} from "./anne_of_green_gables";

/** Example project info as stored (e.g., not yet in Note structure). */
export const EXAMPLE_PROJECTS: {
  metadata: ProjectMetadata,
  project: RawObject,
} [] = [
  {
    metadata: aliceMetadata,
    project: {
      "notes": aliceNotes,
      "chat": aliceChat,
      "tagSummaries": aliceSummaries,
    },
  },
  {
    metadata: anneMetadata,
    project: {
      "notes": anneNotes,
      "chat": anneChat,
      "tagSummaries": anneSummaries,
    },
  },
];