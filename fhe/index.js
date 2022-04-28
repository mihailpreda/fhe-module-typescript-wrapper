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
    }
    initialize() {
        return this.module.rust_initialize();
    }
    /**
     * @param {string} scheme
     */
    setScheme(scheme) {
        this.module.rust_set_scheme(scheme);
    }
    /**
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {string} security_level
     */
    setupContext(polyModulusDegree, bitSizes, bitSize, securityLevel) {
        this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, securityLevel);
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
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    addCiphers(cipherText1, cipherText2) {
        return this.module.rust_add_ciphers(cipherText1, cipherText2);
    }
    /**
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    subCiphers(cipherText1, cipherText2) {
        return this.module.rust_sub_ciphers(cipherText1, cipherText2);
    }
    /**
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    multiplyCiphers(cipherText1, cipherText2) {
        return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
    }
    /**
     * @param {Int32Array} cipherText1
     * @returns {Uint8Array}
     */
    squareCipher(cipherText1) {
        return this.module.rust_square_cipher(cipherText1);
    }
    /**
     * @param {Int32Array} cipherText1
     * @param {number} power
     * @returns {Uint8Array}
     */
    exponentiateCipher(cipherText1, power) {
        return this.module.rust_exponentiate_cipher(cipherText1, power);
    }
    /**
     * @param {Int32Array} cipherText1
     * @returns {Uint8Array}
     */
    negateCipher(cipherText1) {
        return this.module.rust_negate_cipher(cipherText1);
    }
    /**
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    addPlainCipher(cipherText, plainText) {
        return this.module.rust_add_plain(cipherText, plainText);
    }
    /**
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    subPlainCipher(cipherText, plainText) {
        return this.module.rust_sub_plain(cipherText, plainText);
    }
    /**
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    multiplyPlainCipher(cipherText, plainText) {
        return this.module.rust_multiply_plain(cipherText, plainText);
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
