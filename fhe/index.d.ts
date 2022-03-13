export declare class FHEModule {
    static instance: FHEModule;
    private module;
    /**
     * Constructor will modify class prototype to be a singleton, because we need the configuration to persist across the application.
     * Constructor will be without any parameters because we want to initialize properties of the class in different phases of the application.
     * In order to leverage on V8 optimization all class attributes will be initialized in the constructors;
     */
    constructor(module: any);
    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns Array
     */
    generateKeys(): number[][];
    /**
     * Method that encrypts an array of Uint8Array with publicKey
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array} plainText
     * @param {Uint8Array} publicKey
     * @returns Uint8Array
     */
    encrypt(plainText: Uint8Array, publicKey: Uint8Array): Uint8Array;
    /**
     * Method that decrypts an array of Uint8Array with secretKey
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array} encryptedText
     * @param {Uint8Array} secretKey
     * @returns Uint8Array
     */
    decrypt(encryptedText: Uint8Array, secretKey: Uint8Array): Uint8Array;
    /**
     * Method that adds a constant value to an already encrypted value
     * The underlying process of addition is done by vector addition (element by element)
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array} encryptedText
     * @param {Uint8Array} constant
     * @returns Uint8Array
     */
    addConstantToCipher(encryptedText: Uint8Array, constant: Uint8Array): Uint8Array;
    /**
     * Method that subtracts a constant value to an already encrypted value
     * The underlying process of subtraction is done by vector subtraction (element by element)
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array} encryptedText
     * @param {Uint8Array} constant
     * @returns Uint8Array
     */
    subtractConstantFromCipher(encryptedText: Uint8Array, constant: Uint8Array): Uint8Array;
    /**
     * Method that adds homomorphically 2 already encrypted ciphers.
     * The ciphers must be encrypted with the same publicKey
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array} encryptedText1
     * @param {Uint8Array} encryptedText2
     * @returns Uint8Array
     */
    addCiphers(encryptedText1: Uint8Array, encryptedText2: Uint8Array): Uint8Array;
    /**
     * Method that multiplies an already encrypted cipher by a constant.
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array} encryptedText
     * @param {number} constant
     * @returns Uint8Array
     */
    multiplyCipherByConstant(encryptedText: Uint8Array, constant: number): Uint8Array;
    /**
     * Method that divides an already encrypted cipher by a constant.
     * This method is implemented as a repeated subtraction
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array} encryptedText -encrypted
     * @param {Uint8Array} constant - constant
     * @param {number} iterations - number of times the subtraction must take place
     * @returns Uint8Array
     */
    divideCipherByConstant(encryptedText: Uint8Array, constant: Uint8Array, iterations: number): Uint8Array;
    /**
     * Rerandomize a ciphertext in-place. The resulting ciphertext will decrypt
     * to the same plaintext, while being unlinkable to the input ciphertext.
     * To guarantee the accuracy of the results, any operation must be done in the range [0,255]
     * @param {Uint8Array}  encryptedText
     * @param {Uint8Array} publicKey
     * @returns Uint8Array
     */
    rerandomize(encryptedText: Uint8Array, publicKey: Uint8Array): Uint8Array;
}
/**
 * Method that initialize a singleton instance of FHEModule
 *
 * @returns Promise<FHEModule>
 */
declare const getFheModule: () => Promise<FHEModule>;
export default getFheModule;
