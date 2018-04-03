var Tappy = require("nativescript-tappy").Tappy;
var tappy = new Tappy();

describe("greet function", function() {
    it("exists", function() {
        expect(tappy.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(tappy.greet()).toEqual("Hello, NS");
    });
});