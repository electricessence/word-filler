(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mocha", "assert", "../dist/WordFiller"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("mocha");
    var assert = require("assert");
    var WordFiller_1 = require("../dist/WordFiller");
    describe("WordFiller", function () {
        var SOURCE = "The quick brown fox didn't jump over the lazy dog's friend.";
        var filler = new WordFiller_1.WordFiller(SOURCE, 1);
        console.log(filler.characters(200));
        it("should match characters(200)", function () {
            assert.equal(filler.characters(200), "The fox jump The.  Fox quick jump quick The dog's quick didn't.  Jump over The.  Friend brown lazy quick lazy.  Jump friend quick the.  The over friend didn't.  Over lazy The the over friend fox brown");
        });
    });
});
//# sourceMappingURL=WordFiller.js.map