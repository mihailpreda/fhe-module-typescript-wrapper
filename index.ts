import * as CipherText from "node-seal/implementation/cipher-text";
import { Context } from "node-seal/implementation/context";
import { EncryptionParameters } from "node-seal/implementation/encryption-parameters";
import * as PublicKey from "node-seal/implementation/public-key";
import * as SecretKey from "node-seal/implementation/secret-key";
import { EasyScheme, EasySecurity, EasySpeed, EasyPrecision } from "./types";
export { EasyScheme, EasySecurity, EasySpeed, EasyPrecision } from "./types";
export type EasyCipherText = CipherText.CipherText;
export type EasyPublicKey = PublicKey.PublicKey;
export type EasySecretKey = SecretKey.SecretKey;
export type EasyContext = Context;
export type EasyEncryptionParameters = EncryptionParameters;
export class Plain {
    private module: any;

    constructor(module: any) {
        this.module = module;
    }
    /**
     * Method that adds plain data to encrypted data
     * @param {EasyCipherText} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */
    add(cipherText: string, plainText: Int32Array | Float64Array): EasyCipherText {
        return this.module.rust_add_plain(cipherText, plainText);
    }

    /**
     * Method that subtracts plain data to encrypted data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */

    sub(cipherText: string, plainText: Int32Array | Float64Array): EasyCipherText {
        return this.module.rust_sub_plain(cipherText, plainText);
    }

    /**
     * Method that multiply encrypted data with plain data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {EasyCipherText}
     */

    multiply(cipherText: string, plainText: Int32Array | Float64Array): EasyCipherText {
        return this.module.rust_multiply_plain(cipherText, plainText);
    }

    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }
}
export class Cipher {
    private module: any;

    constructor(module: any) {
        this.module = module;
    }
    /**
     * Method that adds two ciphertexts
     * @param {EasyCipherText} cipherText1
     * @param {EasyCipherText} cipherText2
     * @returns {EasyCipherText}
     */

    add(cipherText1: string, cipherText2: string): EasyCipherText {
        return this.module.rust_add_ciphers(cipherText1, cipherText2);
    }

    /**
     * Method that subtracts two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {EasyCipherText}
     */

    sub(cipherText1: string, cipherText2: string): EasyCipherText {
        return this.module.rust_sub_ciphers(cipherText1, cipherText2);
    }

    /**
     * Method that multiplies two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {EasyCipherText}
     */

    multiply(cipherText1: string, cipherText2: string): EasyCipherText {
        return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
    }

    /**
     * Method that squares a ciphertext
     * @param {string} cipherText
     * @returns {EasyCipherText}
     */

    square(cipherText: string): EasyCipherText {
        return this.module.rust_square_cipher(cipherText);
    }

    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {string} cipherText
     * @param {number} power
     * @returns {EasyCipherText}
     */

    exponentiate(cipherText: string, power: number): EasyCipherText {
        return this.module.rust_exponentiate_cipher(cipherText, power);
    }

    /**
     * Method that inverts all the values of a ciphertext
     * @param {string} cipherText
     * @returns {EasyCipherText}
     */

    negate(cipherText: string): EasyCipherText {
        return this.module.rust_negate_cipher(cipherText);
    }

    // sumElements(cipherText: string, scheme: EasyScheme): EasyCipherText {
    //     return this.module.rust_sum_elements(cipherText, scheme);
    // }
    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }
}

export class Setup {
    private module: any;
    constructor(module: any) {
        this.module = module;
    }
    /**
     * Method that will initialize the bindings between EasyFHE, SEAL and node-seal
     * @returns
     */
    initialize(): Promise<FHEModule> {
        return this.module.rust_initialize();
    }
    /**
     * Method that sets the homomorphic encryption scheme
     * @param {EasyScheme} scheme
     */
    setScheme(scheme: EasyScheme): void {
        this.module.rust_set_scheme(scheme);
    }
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {EasySecurity} security
     * @param { EasyPrecision } precision - precision in bits (only used for CKKS scheme)
     */
    setContext(
        polyModulusDegree: number,
        bitSizes: Int32Array,
        bitSize: number,
        security: EasySecurity,
        precision = EasyPrecision.NORMAL
    ): void {
        this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, security, precision);
    }

    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { EasySecurity } security - security measured in bits
     * @param { EasySpeed } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     * @param { EasyPrecision } precision - precision in bits (only used for CKKS scheme)
     */
    fastSetup(
        scheme: EasyScheme,
        security: EasySecurity,
        processingSpeed: EasySpeed,
        precision = EasyPrecision.NORMAL
    ): void {
        this.module.rust_fast_setup(scheme, security, processingSpeed, precision);
    }

    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }
}
export class FHEModule {
    private static instance: FHEModule;
    private module: any;
    public Plain: Plain;
    public Cipher: Cipher;
    public Setup: Setup;
    /**
     * Constructor will modify class prototype to be a singleton, because we need the configuration to persist across the application.
     * Constructor will be without any parameters because we want to initialize properties of the class in different phases of the application.
     * In order to leverage on V8 optimization all class attributes will be initialized in the constructors;
     */

    constructor(module: any) {
        this.module = module;
        if (!FHEModule.instance) {
            FHEModule.instance = this;
        }
        this.Plain = new Plain(this.module);
        this.Cipher = new Cipher(this.module);
        this.Setup = new Setup(this.module);
    }

    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {[EasyPublicKey, EasySecretKey]}
     */
    generateKeys(): [EasyPublicKey, EasySecretKey] {
        return this.module.rust_generate_keys();
    }
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} publicKey
     * @returns {EasyCipherText}
     */

    encrypt(array: Int32Array | Float64Array | Uint32Array, publicKey: EasyPublicKey): EasyCipherText {
        return this.module.rust_encrypt(array, publicKey);
    }

    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */

    decrypt(array: string, secretKey: EasySecretKey): Uint8Array {
        return this.module.rust_decrypt(array, secretKey);
    }

    /**
     * Deallocates the context
     */
    deallocateContext(): void {
        this.module.rust_deallocate_context();
    }

    /**
     * Deallocates the parameters
     */
    deallocateParameters(): void {
        this.module.rust_deallocate_parameters();
    }
    /**
     * Deallocates the SEAL library
     */
    deallocateSEAL(): void {
        this.module.rust_deallocate_seal();
    }
    /**
     * Deallocates the FHE module
     */
    deallocateLibrary(): void {
        this.Cipher.delete();
        this.Plain.delete();
        this.Setup.delete();
        this.module.rust_deallocate_library();
    }
}

/**
 * Method that will fetch a singleton instance of the WebAssembly module
 *
 * @returns Promise<FHEModule>
 */
const getFheModule = function (): Promise<FHEModule> {
    return new Promise((resolve, reject) => {
        (async () => {
            const module = await import("./wasm/pkg/index.js");
            const FheModule = new FHEModule(module);
            resolve(FheModule);
        })();
    });
};

export default getFheModule;
