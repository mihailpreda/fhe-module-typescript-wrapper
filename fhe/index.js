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
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns Array
     */
    generateKeys() {
        return this.module.generate_keypair();
    }
    /**
     * Method that encrypts an array of Uint8Array with publicKey
     * @param {Uint8Array} plainText
     * @param {Uint8Array} publicKey
     * @returns Uint8Array
     */
    encrypt(plainText, publicKey) {
        return this.module._encrypt(plainText, publicKey);
    }
    /**
     * Method that decrypts an array of Uint8Array with secretKey
     * @param {Uint8Array} encryptedText
     * @param {Uint8Array} secretKey
     * @returns Uint8Array
     */
    decrypt(encryptedText, secretKey) {
        return this.module._decrypt(encryptedText, secretKey);
    }
    /**
     * Method that adds a constant value to an already encrypted value
     * The underlying process of addition is done by vector addition (element by element)
     * @param {Uint8Array} encryptedText
     * @param {Uint8Array} constant
     * @returns Uint8Array
     */
    addConstantToCipher(encryptedText, constant) {
        return this.module.add_constant_to_cipher_text(encryptedText, constant);
    }
    /**
     * Method that subtracts a constant value to an already encrypted value
     * The underlying process of subtraction is done by vector subtraction (element by element)
     * @param {Uint8Array} encryptedText
     * @param {Uint8Array} constant
     * @returns Uint8Array
     */
    subtractConstantFromCipher(encryptedText, constant) {
        return this.module.subtract_constant_from_cipher_text(encryptedText, constant);
    }
    /**
     * Method that adds homomorphically 2 already encrypted ciphers.
     * The ciphers must be encrypted with the same publicKey
     * @param {Uint8Array} encryptedText1
     * @param {Uint8Array} encryptedText2
     * @returns Uint8Array
     */
    addCiphers(encryptedText1, encryptedText2) {
        return this.module.add_ciphers(encryptedText1, encryptedText2);
    }
    /**
     * Method that multiplies an already encrypted cipher by a constant.
     * @param {Uint8Array} encryptedText
     * @param {number} constant
     * @returns Uint8Array
     */
    multiplyCipherByConstant(encryptedText, constant) {
        return this.module.multiply_cipher_by_constant(encryptedText, constant);
    }
    /**
     * Method that divides an already encrypted cipher by a constant.
     * This method is implemented as a repeated subtraction
     * @param {Uint8Array} encryptedText -encrypted
     * @param {number} constant - constant
     * @param {number} iterations - number of times the subtraction must take place
     * @returns Uint8Array
     */
    divideCipherByConstant(encryptedText, constant, iterations) {
        return this.module.divide_cipher_by_constant(encryptedText, constant, iterations);
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
            const module = yield Promise.resolve().then(() => require('./wasm/fhe_module.js'));
            const FheModule = new FHEModule(module);
            resolve(FheModule);
        }))();
    });
};
exports.default = getFheModule;
