"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FHEModule = exports.Setup = exports.Cipher = exports.Plain = exports.Precision = exports.ProcessingSpeed = exports.Security = exports.Scheme = void 0;
var Scheme;
(function (Scheme) {
    Scheme["NONE"] = "none";
    Scheme["BFV"] = "bfv";
    Scheme["BGV"] = "bgv";
    Scheme["CKKS"] = "ckks";
})(Scheme = exports.Scheme || (exports.Scheme = {}));
var Security;
(function (Security) {
    Security["TC128"] = "tc128";
    Security["TC192"] = "tc192";
    Security["TC256"] = "tc256";
})(Security = exports.Security || (exports.Security = {}));
var ProcessingSpeed;
(function (ProcessingSpeed) {
    ProcessingSpeed["VERY_FAST"] = "veryFast";
    ProcessingSpeed["FAST"] = "fast";
    ProcessingSpeed["NORMAL"] = "normal";
    ProcessingSpeed["SLOW"] = "slow";
    ProcessingSpeed["VERY_SLOW"] = "verySlow";
})(ProcessingSpeed = exports.ProcessingSpeed || (exports.ProcessingSpeed = {}));
var Precision;
(function (Precision) {
    Precision[Precision["LOW"] = Math.pow(2, 10)] = "LOW";
    Precision[Precision["NORMAL"] = Math.pow(2, 20)] = "NORMAL";
    Precision[Precision["HIGH"] = Math.pow(2, 30)] = "HIGH";
})(Precision = exports.Precision || (exports.Precision = {}));
class Plain {
    module;
    constructor(module) {
        this.module = module;
    }
    /**
     * Method that adds plain data to encrypted data
     * @param {CipherText} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */
    add(cipherText, plainText) {
        return this.module.rust_add_plain(cipherText, plainText);
    }
    /**
     * Method that subtracts plain data to encrypted data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */
    sub(cipherText, plainText) {
        return this.module.rust_sub_plain(cipherText, plainText);
    }
    /**
     * Method that multiply encrypted data with plain data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
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
     * @param {CipherText} cipherText1
     * @param {CipherText} cipherText2
     * @returns {CipherText}
     */
    add(cipherText1, cipherText2) {
        return this.module.rust_add_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that subtracts two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {CipherText}
     */
    sub(cipherText1, cipherText2) {
        return this.module.rust_sub_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that multiplies two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {CipherText}
     */
    multiply(cipherText1, cipherText2) {
        return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that squares a ciphertext
     * @param {string} cipherText
     * @returns {CipherText}
     */
    square(cipherText) {
        return this.module.rust_square_cipher(cipherText);
    }
    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {string} cipherText
     * @param {number} power
     * @returns {CipherText}
     */
    exponentiate(cipherText, power) {
        return this.module.rust_exponentiate_cipher(cipherText, power);
    }
    /**
     * Method that inverts all the values of a ciphertext
     * @param {string} cipherText
     * @returns {CipherText}
     */
    negate(cipherText) {
        return this.module.rust_negate_cipher(cipherText);
    }
    // sumElements(cipherText: string, scheme: Scheme): CipherText {
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
     * method that will initialize the bindings between EasyFHE, SEAL and node-seal
     * @returns
     */
    initialize() {
        return this.module.rust_initialize();
    }
    /**
     * Method that sets the homomorphic encryption scheme
     * @param {Scheme} scheme
     */
    setScheme(scheme) {
        this.module.rust_set_scheme(scheme);
    }
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {Security} security
     * @param { Precision } precision - precision in bits (only used for CKKS scheme)
     */
    setContext(polyModulusDegree, bitSizes, bitSize, security, precision = Precision.NORMAL) {
        this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, security, precision);
    }
    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { Security } security - security measured in bits
     * @param { ProcessingSpeed } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     * @param { Precision } precision - precision in bits (only used for CKKS scheme)
     */
    fastSetup(scheme, security, processingSpeed, precision = Precision.NORMAL) {
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
class FHEModule {
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
        if (!FHEModule.instance) {
            FHEModule.instance = this;
        }
        this.Plain = new Plain(this.module);
        this.Cipher = new Cipher(this.module);
        this.Setup = new Setup(this.module);
    }
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {[PublicKey, SecretKey]}
     */
    generateKeys() {
        return this.module.rust_generate_keys();
    }
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} publicKey
     * @returns {CipherText}
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
    deallocateSealLibrary() {
        this.module.rust_deallocate_seal_library();
    }
    /**
     * Deallocates the FHE module
     */
    deallocateModule() {
        this.module.rust_deallocate_module();
        this.module = null;
        this.Cipher.delete();
        this.Plain.delete();
        this.Setup.delete();
    }
}
exports.FHEModule = FHEModule;
/**
 * Method that initialize a singleton instance of FHEModule
 *
 * @returns Promise<FHEModule>
 */
const getFheModule = function () {
    return new Promise((resolve, reject) => {
        (async () => {
            const module = await Promise.resolve().then(() => require("./wasm/pkg/index.js"));
            const FheModule = new FHEModule(module);
            resolve(FheModule);
        })();
    });
};
exports.default = getFheModule;
