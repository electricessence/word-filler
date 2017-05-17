(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mocha"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("mocha");
    // import {SmokeTest} from "../dist/index";
    describe("WordFiller", function () {
        // it("should say 'hello world'",()=>{
        //
        // 	SmokeTest.HelloWorld();
        // 	assert.ok(true);
        //
        // });
    });
});
//# sourceMappingURL=WordFiller.js.map