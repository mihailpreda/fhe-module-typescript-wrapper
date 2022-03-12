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
     *
     * @returns Array
     */
    generateKeys() {
        return this.module.generate_keypair();
    }
    encrypt(plainText, publicKey) {
        return this.module._encrypt(plainText, publicKey);
    }
    decrypt(encryptedText, secretKey) {
        return this.module._decrypt(encryptedText, secretKey);
    }
    addConstantToCipher(encryptedText, constant) {
        return this.module.add_constant_to_cipher_text(encryptedText, constant);
    }
    subtractConstantFromCipher(encryptedText, constant) {
        return this.module.subtract_constant_from_cipher_text(encryptedText, constant);
    }
    addCiphers(encryptedText1, encryptedText2) {
        return this.module.add_ciphers(encryptedText1, encryptedText2);
    }
    multiplyCipherByConstant(encryptedText, constant) {
        return this.module.multiply_cipher_by_constant(encryptedText, constant);
    }
    divideCipherByConstant(encryptedText, constant, iterations) {
        return this.module.divide_cipher_by_constant(encryptedText, constant, iterations);
    }
}
exports.FHEModule = FHEModule;
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
