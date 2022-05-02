const fs = require("fs");
const path = require("path");
const srcModuleName = "fhe-module-typescript-wrapper";
const destModuleName = "fhe-module-typescript-wrapper";
const src = path.join(path.dirname(fs.realpathSync(__filename)), "wasm", "pkg");
const dest = path.join(path.dirname(fs.realpathSync(__filename)), "easyFHE", "pkg");
/**
 *
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function (src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var destExists = fs.existsSync(dest);
    var isDirectory = exists && stats.isDirectory();
    if (destExists) fs.rmSync(dest, { recursive: true });
    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function (childItemName) {
            if (".gitignore" !== childItemName) {
                copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
            }
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};
copyRecursiveSync(src, dest);

console.log(`\n${srcModuleName} -> ${destModuleName}\npkg copied from \n${src} \nto\n ${dest} `);
