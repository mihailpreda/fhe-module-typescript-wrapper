import { CipherText } from "node-seal/implementation/cipher-text";
import { PublicKey } from "node-seal/implementation/public-key";
import { SecretKey } from "node-seal/implementation/secret-key";
export declare enum Scheme {
    NONE = "none",
    BFV = "bfv",
    BGV = "bgv",
    CKKS = "ckks",
}
export declare enum Security {
    TC128 = "tc128",
    TC192 = "tc192",
    TC256 = "tc256",
}
export declare enum ProcessingSpeed {
    VERY_FAST = "veryFast",
    FAST = "fast",
    NORMAL = "normal",
    SLOW = "slow",
    VERY_SLOW = "verySlow",
}
export declare class Plain {
    private module;
    constructor(module: any);
    /**
     * Method that adds plain data to encrypted data
     * @param {CipherText} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */
    add(cipherText: string, plainText: Int32Array | Float64Array): CipherText;
    /**
     * Method that subtracts plain data to encrypted data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */
    sub(cipherText: string, plainText: Int32Array | Float64Array): CipherText;
    /**
     * Method that multiply encrypted data with plain data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */
    multiply(cipherText: string, plainText: Int32Array | Float64Array): CipherText;
    /**
     * Method that deallocates the wasm module reference
     */
    delete(): void;
}
export declare class Cipher {
    private module;
    constructor(module: any);
    /**
     * Method that adds two ciphertexts
     * @param {CipherText} cipherText1
     * @param {CipherText} cipherText2
     * @returns {CipherText}
     */
    add(cipherText1: string, cipherText2: string): CipherText;
    /**
     * Method that subtracts two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {CipherText}
     */
    sub(cipherText1: string, cipherText2: string): CipherText;
    /**
     * Method that multiplies two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {CipherText}
     */
    multiply(cipherText1: string, cipherText2: string): CipherText;
    /**
     * Method that squares a ciphertext
     * @param {string} cipherText
     * @returns {CipherText}
     */
    square(cipherText: string): CipherText;
    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {string} cipherText
     * @param {number} power
     * @returns {CipherText}
     */
    exponentiate(cipherText: string, power: number): CipherText;
    /**
     * Method that inverts all the values of a ciphertext
     * @param {string} cipherText
     * @returns {CipherText}
     */
    negate(cipherText: string): CipherText;
    sumElements(cipherText: string, scheme: Scheme): CipherText;
    /**
     * Method that deallocates the wasm module reference
     */
    delete(): void;
}
export declare class Setup {
    private module;
    constructor(module: any);
    /**
     * Method that sets the homomorphic encryption scheme
     * @param {Scheme} scheme
     */
    setScheme(scheme: Scheme): void;
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {Security} security_level
     */
    setContext(polyModulusDegree: number, bitSizes: Int32Array, bitSize: number, Security: Security): void;
    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { Security } Security - security measured in bits
     * @param { ProcessingSpeed } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     */
    fastSetup(scheme: Scheme, Security: Security, processingSpeed: ProcessingSpeed): void;
    /**
     * Method that deallocates the wasm module reference
     */
    delete(): void;
}
export declare class FHEModule {
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
    constructor(module: any);
    initialize(): Promise<FHEModule>;
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {[PublicKey, SecretKey]}
     */
    generateKeys(): [PublicKey, SecretKey];
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} publicKey
     * @returns {CipherText}
     */
    encrypt(array: Int32Array | Float64Array | Uint32Array, publicKey: PublicKey): CipherText;
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */
    decrypt(array: string, secretKey: SecretKey): Uint8Array;
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
    deallocateSealLibrary(): void;
    /**
     * Deallocates the FHE module
     */
    deallocateModule(): void;
}
/**
 * Method that initialize a singleton instance of FHEModule
 *
 * @returns Promise<FHEModule>
 */
declare const getFheModule: () => Promise<FHEModule>;
export default getFheModule;
