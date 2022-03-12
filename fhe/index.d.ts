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
     *
     * @returns Array
     */
    generateKeys(): number[][];
    encrypt(plainText: Uint8Array, publicKey: Uint8Array): Uint8Array;
    decrypt(encryptedText: Uint8Array, secretKey: Uint8Array): Uint8Array;
    addConstantToCipher(encryptedText: Uint8Array, constant: Uint8Array): Uint8Array;
    subtractConstantFromCipher(encryptedText: Uint8Array, constant: Uint8Array): Uint8Array;
    addCiphers(encryptedText1: Uint8Array, encryptedText2: Uint8Array): Uint8Array;
    multiplyCipherByConstant(encryptedText: Uint8Array, constant: number): Uint8Array;
    divideCipherByConstant(encryptedText: Uint8Array, constant: number, iterations: number): Uint8Array;
}
declare const getFheModule: () => Promise<FHEModule>;
export default getFheModule;
