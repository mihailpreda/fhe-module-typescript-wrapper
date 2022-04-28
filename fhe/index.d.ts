export declare class FHEModule {
    static instance: FHEModule;
    private module;
    /**
     * Constructor will modify class prototype to be a singleton, because we need the configuration to persist across the application.
     * Constructor will be without any parameters because we want to initialize properties of the class in different phases of the application.
     * In order to leverage on V8 optimization all class attributes will be initialized in the constructors;
     */
    constructor(module: any);
    initialize(): Promise<FHEModule>;
    /**
     * @param {string} scheme
     */
    setScheme(scheme: string): void;
    /**
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {string} security_level
     */
    setupContext(polyModulusDegree: number, bitSizes: Int32Array, bitSize: number, securityLevel: string): void;
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {Array<Object>}
     */
    generateKeys(): Array<Object>;
    /**
     * @param {Int32Array} array
     * @param {Object} publicKey
     * @returns {Uint8Array}
     */
    encrypt(array: Int32Array, publicKey: Object): Uint8Array;
    /**
     * @param {Int32Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */
    decrypt(array: Int32Array, secretKey: Object): Uint8Array;
    /**
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    addCiphers(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array;
    /**
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    subCiphers(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array;
    /**
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */
    multiplyCiphers(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array;
    /**
     * @param {Int32Array} cipherText1
     * @returns {Uint8Array}
     */
    squareCipher(cipherText1: Int32Array): Uint8Array;
    /**
     * @param {Int32Array} cipherText1
     * @param {number} power
     * @returns {Uint8Array}
     */
    exponentiateCipher(cipherText1: Int32Array, power: number): Uint8Array;
    /**
     * @param {Int32Array} cipherText1
     * @returns {Uint8Array}
     */
    negateCipher(cipherText1: Int32Array): Uint8Array;
    /**
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    addPlainCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array;
    /**
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    subPlainCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array;
    /**
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    multiplyPlainCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array;
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
