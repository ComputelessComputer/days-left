import { atom } from "jotai";

export type Step = "intro" | "birth" | "age" | "calculate";

export const stepAtom = atom<Step>("intro");
export const dateOfBirthAtom = atom<string>("");
export const expectedAgeAtom = atom<number | null>(null);
export const currentAgeAtom = atom<number | null>(null);
