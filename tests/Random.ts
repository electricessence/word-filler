import "mocha";
import * as assert from "assert";
import * as Random from "random-js";
// import {SmokeTest} from "../dist/index";

describe("WordFiller",()=>{


	it("Seed 1 results should be consistent",()=>{

		let r = new Random(Random.engines.mt19937().seed(1));
		assert.equal(r.integer(0,10),0);
		assert.equal(r.integer(0,10),3);
		assert.equal(r.integer(0,10),5);
		assert.equal(r.integer(0,10),0);

	});

	it("Seed 2 results should be consistent",()=>{

		let r = new Random(Random.engines.mt19937().seed(2));
		assert.equal(r.integer(0,10),3);
		assert.equal(r.integer(0,10),8);
		assert.equal(r.integer(0,10),5);
		assert.equal(r.integer(0,10),10);

	});

});
