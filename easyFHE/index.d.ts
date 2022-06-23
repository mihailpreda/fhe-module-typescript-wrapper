import * as CipherText from "node-seal/implementation/cipher-text";
import { Context } from "node-seal/implementation/context";
import { EncryptionParameters } from "node-seal/implementation/encryption-parameters";
import * as PublicKey from "node-seal/implementation/public-key";
import * as SecretKey from "node-seal/implementation/secret-key";
import { EasyScheme, EasySecurity, EasySpeed, EasyPrecision } from "./types";
export { EasyScheme, EasySecurity, EasySpeed, EasyPrecision } from "./types";
export declare type EasyCipherText = CipherText.CipherText;
export declare type EasyPublicKey = PublicKey.PublicKey;
export declare type EasySecretKey = SecretKey.SecretKey;
export declare type EasyContext = Context;
export declare type EasyEncryptionParameters = EncryptionParameters;
export declare type Nullable<T> = T | null;
declare type SealBindings = any;
export declare class Plain {
    private module;
    constructor(module: SealBindings);
    /**
     * Method that adds plain data to encrypted data
     * @param {EasyCipherText} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */
    add(cipherText: string, plainText: Int32Array | Float64Array): EasyCipherText;
    /**
     * Method that subtracts plain data to encrypted data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */
    sub(cipherText: string, plainText: Int32Array | Float64Array): EasyCipherText;
    /**
     * Method that multiply encrypted data with plain data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */
    multiply(cipherText: string, plainText: Int32Array | Float64Array): EasyCipherText;
    /**
     * Method that deallocates the wasm module reference
     */
    delete(): void;
}
export declare class Cipher {
    private module;
    constructor(module: SealBindings);
    /**
     * Method that adds two ciphertexts
     * @param {EasyCipherText} cipherText1
     * @param {EasyCipherText} cipherText2
     * @returns {EasyCipherText}
     */
    add(cipherText1: string, cipherText2: string): EasyCipherText;
    /**
     * Method that subtracts two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {EasyCipherText}
     */
    sub(cipherText1: string, cipherText2: string): EasyCipherText;
    /**
     * Method that multiplies two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {EasyCipherText}
     */
    multiply(cipherText1: string, cipherText2: string): EasyCipherText;
    /**
     * Method that squares a ciphertext
     * @param {string} cipherText
     * @returns {EasyCipherText}
     */
    square(cipherText: string): EasyCipherText;
    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {string} cipherText
     * @param {number} power
     * @returns {EasyCipherText}
     */
    exponentiate(cipherText: string, power: number): EasyCipherText;
    /**
     * Method that inverts all the values of a ciphertext
     * @param {string} cipherText
     * @returns {EasyCipherText}
     */
    negate(cipherText: string): EasyCipherText;
    /**
     * Method that deallocates the wasm module reference
     */
    delete(): void;
}
export declare class Setup {
    private module;
    constructor(module: SealBindings);
    /**
     * Method that will initialize the bindings between EasyFHE, SEAL and node-seal
     * @returns
     */
    initialize(): Promise<SealBindings>;
    /**
     * Method that sets the homomorphic encryption scheme
     * @param {EasyScheme} scheme
     */
    setScheme(scheme: EasyScheme): void;
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {EasySecurity} security
     * @param { EasyPrecision } precision - precision in bits (only used for CKKS scheme)
     */
    setContext(polyModulusDegree: number, bitSizes: Int32Array, bitSize: number, security: EasySecurity, precision?: EasyPrecision): void;
    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { EasySecurity } security - security measured in bits
     * @param { EasySpeed } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     * @param { EasyPrecision } precision - precision in bits (only used for CKKS scheme)
     */
    fastSetup(scheme: EasyScheme, security: EasySecurity, processingSpeed: EasySpeed, precision?: EasyPrecision): void;
    /**
     * Method that deallocates the wasm module reference
     */
    delete(): void;
}
export declare class EasyFHE {
    private static instance;
    private module;
    Plain: Plain;
    Cipher: Cipher;
    Setup: Setup;
    /**
     * Constructor will modify class prototype to be a singleton, because we need the configuration to persist across the application.
     * Constructor will be without any parameters because we want to initialize properties of the class in different phases of the application.
     * In order to leverage on V8 optimization all class attributes will be initialized in the constructors;
     */
    constructor(module: SealBindings);
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {[EasyPublicKey, EasySecretKey]}
     */
    generateKeys(): [EasyPublicKey, EasySecretKey];
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} publicKey
     * @returns {EasyCipherText}
     */
    encrypt(array: Int32Array | Float64Array | Uint32Array, publicKey: EasyPublicKey): EasyCipherText;
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */
    decrypt(array: string, secretKey: EasySecretKey): Uint8Array;
    /**
     * Deallocates the context
     */
    deallocateContext(): void;
    /**
     * Deallocates the parameters
     */
    deallocateParameters(): void;
    /**
     * Deallocates the SEAL library
     */
    deallocateSEAL(): void;
    /**
     * Deallocates the easyFHE module
     */
    deallocateLibrary(): void;
}
/**
 * Method that will fetch a singleton instance of the WebAssembly module
 *
 * @returns Promise<EasyFHE>
 */
declare const getEasyFHE: () => Promise<EasyFHE>;
export default getEasyFHE;
