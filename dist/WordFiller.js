(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "random-js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Random = require("random-js");
    var WORDS = /[a-z]+('[a-z]+)?/gi;
    var RandomIntegerSet = (function () {
        function RandomIntegerSet(min, max, seed) {
            if (seed === void 0) { seed = Math.random(); }
            this.min = min;
            this.max = max;
            this.randomizer = new Random(Random.engines.mt19937().seed(seed));
            this._numbers = [];
        }
        RandomIntegerSet.prototype.get = function (index) {
            var n = this._numbers;
            if (index < n.length)
                return n[index];
            for (var i = 0; n.length < index;) {
                this.nextInteger();
            }
            return this.nextInteger();
        };
        RandomIntegerSet.prototype.nextInteger = function () {
            var n = this.randomizer.integer(this.min, this.max);
            this._numbers.push(n);
            return n;
        };
        RandomIntegerSet.prototype.next = function () {
            return this.nextInteger();
        };
        return RandomIntegerSet;
    }());
    exports.RandomIntegerSet = RandomIntegerSet;
    var RandomWordSet = (function () {
        function RandomWordSet(source, seed) {
            if (seed === void 0) { seed = Math.random(); }
            if (!source)
                throw new Error("Must provide a source word set.");
            var words = Object.freeze(distinct(source.match(WORDS)));
            if (!words.length)
                throw new Error("Must provide a source word set.");
            this.randomIntegers = new RandomIntegerSet(0, words.length - 1, seed);
            this.words = words;
        }
        RandomWordSet.prototype.get = function (index) {
            return this.words[this.randomIntegers.get(index)];
        };
        RandomWordSet.prototype.next = function () {
            return this.words[this.randomIntegers.next()];
        };
        return RandomWordSet;
    }());
    exports.RandomWordSet = RandomWordSet;
    var SentenceCache = (function () {
        function SentenceCache(source, min, // min words per sentence
            max, // max words per sentence
            seed) {
            this.min = min;
            this.max = max;
            this._words = new RandomWordSet(source, seed);
            this._sentenceLengths = new RandomIntegerSet(min, max, seed);
            this._sentences = [];
        }
        SentenceCache.prototype.get = function (index) {
            var s = this._sentences;
            if (index < s.length)
                return s[index];
            for (var i = 0; s.length < index;) {
                this.next();
            }
            return this.next();
        };
        SentenceCache.prototype.next = function () {
            var len = this._sentenceLengths.next();
            var r = [], last = "";
            for (var i = 0; i < len; i++) {
                var next = void 0;
                while ((next = this._words.next()) == last) { }
                r.push(next);
                last = next;
            }
            var result = r.join(" ");
            result = result[0].toUpperCase() + result.substring(1) + ".";
            this._sentences.push(result);
            return result;
        };
        return SentenceCache;
    }());
    exports.SentenceCache = SentenceCache;
    var WordFiller = (function () {
        function WordFiller(source, seed) {
            if (seed === void 0) { seed = Math.random(); }
            this._sentencesCache = new SentenceCache(source, 3, 8, seed);
        }
        WordFiller.prototype.characters = function (length) {
            if (!isFinite(length))
                throw new Error("Must be a finite character length.");
            return this.sentences(Infinity, length);
        };
        WordFiller.prototype.words = function (count, characterLimit) {
            if (characterLimit === void 0) { characterLimit = Infinity; }
            if (!isFinite(length))
                throw new Error("Must be a finite word length.");
            return this.sentences(Infinity, Infinity, count);
        };
        WordFiller.prototype.getSentence = function (index) {
            return this._sentencesCache.get(index);
        };
        WordFiller.prototype.nextSentence = function () {
            return this._sentencesCache.next();
        };
        WordFiller.prototype.sentences = function (count, characterLimit, wordLimit) {
            if (characterLimit === void 0) { characterLimit = Infinity; }
            if (wordLimit === void 0) { wordLimit = Infinity; }
            if (characterLimit < 1)
                throw new Error("Must have a sentence length of at least 1.");
            if (wordLimit <= 1)
                throw new Error("Must have a word count of at least 1.");
            var result = "";
            for (var i = 0; i < count; i++) {
                var next = this._sentencesCache.get(i);
                if (isFinite(wordLimit)) {
                    wordLimit -= next.match(WORDS).length;
                    if (wordLimit < 0)
                        break;
                }
                result += " " + next + " ";
                if (characterLimit < result.length - 2 || wordLimit === 0)
                    break;
            }
            return result.substring(1, Math.min(result.length - 1, characterLimit + 1));
        };
        return WordFiller;
    }());
    exports.WordFiller = WordFiller;
    function distinct(source) {
        if (!source)
            return [];
        var seen = {};
        return source.filter(function (e) { return !(e in seen) && (seen[e] = true); });
    }
    exports.default = WordFiller;
});
//# sourceMappingURL=WordFiller.js.map