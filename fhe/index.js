"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Plain {
    constructor(module) {
        this.module = module;
    }
    /**
     * Method that adds plain data to encrypted data
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    addCipher(cipherText, plainText) {
        return this.module.rust_add_plain(cipherText, plainText);
    }
    /**
     * Method that subtracts plain data to encrypted data
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    subCipher(cipherText, plainText) {
        return this.module.rust_sub_plain(cipherText, plainText);
    }
    /**
     * Method that multiply encrypted data with plain data
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    multiplyCipher(cipherText, plainText) {
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
;
class Cipher {
    constructor(module) {
        this.module = module;
    }
    /**
     * Method that adds two ciphertexts
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    add(cipherText1, cipherText2) {
        return this.module.rust_add_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that subtracts two ciphertexts
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    sub(cipherText1, cipherText2) {
        return this.module.rust_sub_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that multiplies two ciphertexts
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    multiply(cipherText1, cipherText2) {
        return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
    }
    /**
     * Method that squares a ciphertext
     * @param {Int32Array} cipherText
     * @returns {Uint8Array}
     */
    square(cipherText) {
        return this.module.rust_square_cipher(cipherText);
    }
    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {Int32Array} cipherText
     * @param {number} power
     * @returns {Uint8Array}
     */
    exponentiate(cipherText, power) {
        return this.module.rust_exponentiate_cipher(cipherText, power);
    }
    /**
     * Method that inverts all the values of a ciphertext
     * @param {Int32Array} cipherText
     * @returns {Uint8Array}
     */
    negate(cipherText) {
        return this.module.rust_negate_cipher(cipherText);
    }
    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }
}
exports.Cipher = Cipher;
class Setup {
    constructor(module) {
        this.module = module;
    }
    /**
     * Method that sets the homomorphic encryption scheme
     * @param {'bfv' | 'bgv' | 'ckks'} scheme
     */
    setScheme(scheme) {
        this.module.rust_set_scheme(scheme);
    }
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {'tc128' | 'tc192' | 'tc256'} security_level
     */
    setContext(polyModulusDegree, bitSizes, bitSize, securityLevel) {
        this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, securityLevel);
    }
    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { 'tc128' | 'tc192' | 'tc256' } securityLevel - security measured in bits
     * @param { 'veryFast' | 'fast' | 'normal' | 'slow' | 'verySlow' } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     */
    fastSetup(scheme, securityLevel, processingSpeed) {
        this.module.rust_fast_setup(scheme, securityLevel, processingSpeed);
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
    initialize() {
        return this.module.rust_initialize();
    }
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {Array<Object>}
     */
    generateKeys() {
        return this.module.rust_generate_keys();
    }
    /**
     * @param {Int32Array} array
     * @param {Object} publicKey
     * @returns {Uint8Array}
     */
    encrypt(array, publicKey) {
        return this.module.rust_encrypt(array, publicKey);
    }
    /**
     * @param {Int32Array} array
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
        (() => __awaiter(this, void 0, void 0, function* () {
            const module = yield Promise.resolve().then(() => require('./pkg/index.js'));
            const FheModule = new FHEModule(module);
            resolve(FheModule);
        }))();
    });
};
exports.default = getFheModule;
