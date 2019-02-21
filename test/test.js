var assert = require("assert");
var cssfont64 = require("../index");
var fs = require("fs");
var path = require("path");
var Vinyl = require("vinyl");

describe("gulp-cssfont64", function() {
    describe("in buffer mode", function() {
        it("should encode fonts to base64 and generate a css file", function(done) {
            var filename = path.join(__dirname, "/fixtures/my+font.ttf");

            var input = new Vinyl({
                base: path.dirname(filename),
                path: filename,
                contents: new Buffer(fs.readFileSync(filename, "utf8"))
            });

            var stream = cssfont64();

            stream.on("data", function(newFile) {
                assert.equal(String(newFile.contents), fs.readFileSync(path.join(__dirname, "/fixtures/my+font.css"), "utf8"));
                done();
            });

            stream.write(input);
        });
    });
});
