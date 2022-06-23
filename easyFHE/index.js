"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyFHE = exports.Setup = exports.Cipher = exports.Plain = exports.EasyPrecision = exports.EasySpeed = exports.EasySecurity = exports.EasyScheme = void 0;
const types_1 = require("./types");
var types_2 = require("./types");
Object.defineProperty(exports, "EasyScheme", { enumerable: true, get: function () { return types_2.EasyScheme; } });
Object.defineProperty(exports, "EasySecurity", { enumerable: true, get: function () { return types_2.EasySecurity; } });
Object.defineProperty(exports, "EasySpeed", { enumerable: true, get: function () { return types_2.EasySpeed; } });
Object.defineProperty(exports, "EasyPrecision", { enumerable: true, get: function () { return types_2.EasyPrecision; } });
class Plain {
    module;
    constructor(module) {
        this.module = module;
    }
    /**
     * Method that adds plain data to encrypted data
     * @param {EasyCipherText} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */
    add(cipherText, plainText) {
        return this.module.rust_add_plain(cipherText, plainText);
    }
    /**
     * Method that subtracts plain data to encrypted data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */
    sub(cipherText, plainText) {
        return this.module.rust_sub_plain(cipherText, plainText);
    }
    /**
     * Method that multiply encrypted data with plain data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */
    multiply(cipherText, plainText) {
        return this.module.rust_multiply_plain(cipherText, plainText);
    }
    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }
}
exports.Plain = Plain;
class Cipher {
    module;
    constructor(module) {
        this.module = module;
    }
    /**
     * Method that adds two ciphertexts
     * @param {EasyCipherText} cipherText1
     * @param {EasyCipherText} cipherText2
     * @returns {EasyCipherText}
     */
    add(cipherText1, cipherText2) {
        return this.module.rust_add_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that subtracts two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {EasyCipherText}
     */
    sub(cipherText1, cipherText2) {
        return this.module.rust_sub_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that multiplies two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {EasyCipherText}
     */
    multiply(cipherText1, cipherText2) {
        return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that squares a ciphertext
     * @param {string} cipherText
     * @returns {EasyCipherText}
     */
    square(cipherText) {
        return this.module.rust_square_cipher(cipherText);
    }
    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {string} cipherText
     * @param {number} power
     * @returns {EasyCipherText}
     */
    exponentiate(cipherText, power) {
        return this.module.rust_exponentiate_cipher(cipherText, power);
    }
    /**
     * Method that inverts all the values of a ciphertext
     * @param {string} cipherText
     * @returns {EasyCipherText}
     */
    negate(cipherText) {
        return this.module.rust_negate_cipher(cipherText);
    }
    // sumElements(cipherText: string, scheme: EasyScheme): EasyCipherText {
    //     return this.module.rust_sum_elements(cipherText, scheme);
    // }
    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }
}
exports.Cipher = Cipher;
class Setup {
    module;
    constructor(module) {
        this.module = module;
    }
    /**
     * Method that will initialize the bindings between EasyFHE, SEAL and node-seal
     * @returns
     */
    initialize() {
        return this.module.rust_initialize();
    }
    /**
     * Method that sets the homomorphic encryption scheme
     * @param {EasyScheme} scheme
     */
    setScheme(scheme) {
        this.module.rust_set_scheme(scheme);
    }
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {EasySecurity} security
     * @param { EasyPrecision } precision - precision in bits (only used for CKKS scheme)
     */
    setContext(polyModulusDegree, bitSizes, bitSize, security, precision = types_1.EasyPrecision.NORMAL) {
        this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, security, precision);
    }
    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { EasySecurity } security - security measured in bits
     * @param { EasySpeed } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     * @param { EasyPrecision } precision - precision in bits (only used for CKKS scheme)
     */
    fastSetup(scheme, security, processingSpeed, precision = types_1.EasyPrecision.NORMAL) {
        this.module.rust_fast_setup(scheme, security, processingSpeed, precision);
    }
    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }
}
exports.Setup = Setup;
class EasyFHE {
    static instance;
    module;
    Plain;
    Cipher;
    Setup;
    /**
     * Constructor will modify class prototype to be a singleton, because we need the configuration to persist across the application.
     * Constructor will be without any parameters because we want to initialize properties of the class in different phases of the application.
     * In order to leverage on V8 optimization all class attributes will be initialized in the constructors;
     */
    constructor(module) {
        this.module = module;
        if (!EasyFHE.instance) {
            EasyFHE.instance = this;
        }
        this.Plain = new Plain(this.module);
        this.Cipher = new Cipher(this.module);
        this.Setup = new Setup(this.module);
    }
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {[EasyPublicKey, EasySecretKey]}
     */
    generateKeys() {
        return this.module.rust_generate_keys();
    }
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} publicKey
     * @returns {EasyCipherText}
     */
    encrypt(array, publicKey) {
        return this.module.rust_encrypt(array, publicKey);
    }
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */
    decrypt(array, secretKey) {
        return this.module.rust_decrypt(array, secretKey);
    }
    /**
     * Deallocates the context
     */
    deallocateContext() {
        this.module.rust_deallocate_context();
    }
    /**
     * Deallocates the parameters
     */
    deallocateParameters() {
        this.module.rust_deallocate_parameters();
    }
    /**
     * Deallocates the SEAL library
     */
    deallocateSEAL() {
        this.module.rust_deallocate_seal();
    }
    /**
     * Deallocates the easyFHE module
     */
    deallocateLibrary() {
        this.Cipher.delete();
        this.Plain.delete();
        this.Setup.delete();
        this.module.rust_deallocate_library();
    }
}
exports.EasyFHE = EasyFHE;
/**
 * Method that will fetch a singleton instance of the WebAssembly module
 *
 * @returns Promise<EasyFHE>
 */
const getEasyFHE = function () {
    return new Promise((resolve, reject) => {
        (async () => {
            const module = (await Promise.resolve().then(() => require("./wasm/pkg/index.js")));
            const easyFHE = new EasyFHE(module);
            resolve(easyFHE);
        })();
    });
};
exports.default = getEasyFHE;
