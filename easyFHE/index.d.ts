import { PublicKey } from 'node-seal/implementation/public-key';
import { SecretKey } from 'node-seal/implementation/secret-key';
export declare class Plain {
    private module;
    constructor(module: any);
    /**
     * Method that adds plain data to encrypted data
     * @param {Int32Array} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {Uint8Array}
     */
    add(cipherText: Int32Array, plainText: Int32Array | Float64Array): Uint8Array;
    /**
     * Method that subtracts plain data to encrypted data
     * @param {Int32Array} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {Uint8Array}
     */
    sub(cipherText: Int32Array, plainText: Int32Array | Float64Array): Uint8Array;
    /**
     * Method that multiply encrypted data with plain data
     * @param {Int32Array} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {Uint8Array}
     */
    multiply(cipherText: Int32Array, plainText: Int32Array | Float64Array): Uint8Array;
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
     * @param {Int32Array | Float64Array} cipherText1
     * @param {Int32Array | Float64Array} cipherText2
     * @returns {Uint8Array}
     */
    add(cipherText1: Int32Array | Float64Array, cipherText2: Int32Array | Float64Array): Uint8Array;
    /**
     * Method that subtracts two ciphertexts
     * @param {Int32Array | Float64Array} cipherText1
     * @param {Int32Array | Float64Array} cipherText2
     * @returns {Uint8Array}
     */
    sub(cipherText1: Int32Array | Float64Array, cipherText2: Int32Array | Float64Array): Uint8Array;
    /**
     * Method that multiplies two ciphertexts
     * @param {Int32Array | Float64Array} cipherText1
     * @param {Int32Array | Float64Array} cipherText2
     * @returns {Uint8Array}
     */
    multiply(cipherText1: Int32Array | Float64Array, cipherText2: Int32Array | Float64Array): Uint8Array;
    /**
     * Method that squares a ciphertext
     * @param {Int32Array | Float64Array} cipherText
     * @returns {Uint8Array}
     */
    square(cipherText: Int32Array | Float64Array): Uint8Array;
    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {Int32Array | Float64Array} cipherText
     * @param {number} power
     * @returns {Uint8Array}
     */
    exponentiate(cipherText: Int32Array | Float64Array, power: number): Uint8Array;
    /**
     * Method that inverts all the values of a ciphertext
     * @param {Int32Array | Float64Array} cipherText
     * @returns {Uint8Array}
     */
    negate(cipherText: Int32Array | Float64Array): Uint8Array;
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
     * @param {'bfv' | 'bgv' | 'ckks'} scheme
     */
    setScheme(scheme: 'bfv' | 'bgv' | 'ckks'): void;
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {'tc128' | 'tc192' | 'tc256'} security_level
     */
    setContext(polyModulusDegree: number, bitSizes: Int32Array, bitSize: number, securityLevel: 'tc128' | 'tc192' | 'tc256'): void;
    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { 'tc128' | 'tc192' | 'tc256' } securityLevel - security measured in bits
     * @param { 'veryFast' | 'fast' | 'normal' | 'slow' | 'verySlow' } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     */
    fastSetup(scheme: 'bfv' | 'bgv' | 'ckks', securityLevel: 'tc128' | 'tc192' | 'tc256', processingSpeed: 'veryFast' | 'fast' | 'normal' | 'slow' | 'verySlow'): void;
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
     * @returns {Array<Object>}
     */
    generateKeys(): [PublicKey, SecretKey];
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} publicKey
     * @returns {Uint8Array}
     */
    encrypt(array: Int32Array | Float64Array, publicKey: PublicKey): Uint8Array;
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */
    decrypt(array: Int32Array | Float64Array, secretKey: SecretKey): Uint8Array;
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
