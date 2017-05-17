/// <reference types="random-js" />
import * as Random from "random-js";
export declare class RandomIntegerSet {
    readonly min: number;
    readonly max: number;
    protected readonly randomizer: Random;
    constructor(min: number, max: number, seed?: number);
    private readonly _numbers;
    get(index: number): number;
    private nextInteger();
    next(): number;
}
export declare class RandomWordSet {
    private readonly randomIntegers;
    private readonly words;
    constructor(source: string, seed?: number);
    get(index: number): string;
    next(): string;
}
export declare class SentenceCache {
    readonly min: number;
    readonly max: number;
    private readonly _words;
    private readonly _sentenceLengths;
    private readonly _sentences;
    constructor(source: string, min: number, max: number, seed: number);
    get(index: number): string;
    next(): string;
}
export declare class WordFiller {
    private readonly _sentencesCache;
    constructor(source: string, seed?: number);
    characters(length: number): string;
    words(count: number, characterLimit?: number): string;
    getSentence(index: number): string;
    nextSentence(): string;
    sentences(count: number, characterLimit?: number, wordLimit?: number): string;
}
export default WordFiller;
