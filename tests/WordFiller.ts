import "mocha";
import * as assert from "assert";
import {WordFiller} from "../dist/WordFiller";

describe("WordFiller",()=>{

	const SOURCE = "The quick brown fox didn't jump over the lazy dog's friend.";
	const filler = new WordFiller(SOURCE,1);

	console.log(filler.characters(200));

	it("should match characters(200)",()=>{
		assert.equal(filler.characters(200),"The fox jump The.  Fox quick jump quick The dog's quick didn't.  Jump over The.  Friend brown lazy quick lazy.  Jump friend quick the.  The over friend didn't.  Over lazy The the over friend fox brown");
	});

});
