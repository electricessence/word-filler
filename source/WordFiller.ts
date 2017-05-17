import * as Random from "random-js";

const WORDS = /[a-z]+('[a-z]+)?/gi;

export class RandomIntegerSet {
	protected readonly randomizer:Random;
	constructor(
		public readonly min:number,
		public readonly max:number,
		seed:number = Math.random())
	{
		this.randomizer = new Random(Random.engines.mt19937().seed(seed));
		this._numbers = [];
	}

	private readonly _numbers:number[];

	get(index:number):number
	{
		const n = this._numbers;
		if(index<n.length)
			return n[index];

		for(let i = 0;n.length<index;)
		{
			this.nextInteger();
		}
		return this.nextInteger();
	}

	private nextInteger():number
	{
		let n = this.randomizer.integer(this.min,this.max);
		this._numbers.push(n);
		return n;
	}

	next():number
	{
		return this.nextInteger();
	}
}

export class RandomWordSet {

	private readonly randomIntegers:RandomIntegerSet;
	private readonly words:ReadonlyArray<string>;
	constructor(
		source:string,
		seed:number = Math.random())
	{
		if(!source)
			throw new Error("Must provide a source word set.");

		const words = Object.freeze(distinct(source.match(WORDS)));
		if(!words.length)
			throw new Error("Must provide a source word set.");

		this.randomIntegers = new RandomIntegerSet(0,words.length-1,seed);

		this.words = words;
	}

	get(index:number):string
	{
		return this.words[this.randomIntegers.get(index)];
	}

	next():string
	{
		return this.words[this.randomIntegers.next()];
	}
}

export class SentenceCache {


	private readonly _words:RandomWordSet;
	private readonly _sentenceLengths:RandomIntegerSet;
	private readonly _sentences:string[];
	constructor(
		source:string,
		public readonly min:number, // min words per sentence
		public readonly max:number, // max words per sentence
		seed:number
	)
	{
		this._words = new RandomWordSet(source,seed);
		this._sentenceLengths = new RandomIntegerSet(min,max,seed);
		this._sentences = [];
	}

	get(index:number):string
	{
		const s = this._sentences;
		if(index<s.length)
			return s[index];

		for(let i = 0;s.length<index;)
		{
			this.next();
		}
		return this.next();
	}


	next():string
	{
		const len = this._sentenceLengths.next();
		let r:string[] = [], last:string = "";
		for(let i = 0;i<len;i++)
		{
			let next;
			while((next = this._words.next())==last) {}
			r.push(next);
			last = next;
		}

		let result = r.join(" ");

		result = result[0].toUpperCase() + result.substring(1) + ".";
		this._sentences.push(result);
		return result;
	}
}

export class WordFiller {

	private readonly _sentencesCache:SentenceCache;
	constructor(
		source:string,
		seed:number = Math.random())
	{
		this._sentencesCache = new SentenceCache(source,3,8,seed);
	}

	characters(length:number):string
	{
		if(!isFinite(length))
			throw new Error("Must be a finite character length.");
		return this.sentences(Infinity,length);
	}

	words(count:number, characterLimit:number = Infinity):string
	{
		if(!isFinite(length))
			throw new Error("Must be a finite word length.");
		return this.sentences(Infinity,Infinity,count);
	}

	getSentence(index:number):string
	{
		return this._sentencesCache.get(index);
	}

	nextSentence():string
	{
		return this._sentencesCache.next();
	}

	sentences(count:number, characterLimit:number = Infinity, wordLimit:number = Infinity):string
	{
		if(characterLimit<1)
			throw new Error("Must have a sentence length of at least 1.");

		if(wordLimit<=1)
			throw new Error("Must have a word count of at least 1.");

		let result = "";

		for(let i = 0;i<count;i++)
		{
			let next = this._sentencesCache.get(i);
			if(isFinite(wordLimit))
			{
				wordLimit -= next.match(WORDS)!.length;
				if(wordLimit<0)
					break;
			}

			result += " " + next + " ";
			if(characterLimit<result.length-2 || wordLimit===0)
				break;
		}

		return result.substring(1,Math.min(result.length-1,characterLimit+1));
	}
}


function distinct(source:RegExpMatchArray|null):string[]
{
	if(!source) return [];
	const seen:any = {};
	return source.filter(e => !(e in seen) && (seen[e] = true));
}

export default WordFiller;