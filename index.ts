import { CipherText } from "node-seal/implementation/cipher-text";
import { PublicKey } from "node-seal/implementation/public-key";
import { SecretKey } from "node-seal/implementation/secret-key";
export enum Scheme {
    NONE = "none",
    BFV = "bfv",
    BGV = "bgv",
    CKKS = "ckks",
}
export enum Security {
    TC128 = "tc128",
    TC192 = "tc192",
    TC256 = "tc256",
}
export enum ProcessingSpeed {
    VERY_FAST = "veryFast",
    FAST = "fast",
    NORMAL = "normal",
    SLOW = "slow",
    VERY_SLOW = "verySlow",
}
export class Plain {
    private module: any;

    constructor(module: any) {
        this.module = module;
    }
    /**
     * Method that adds plain data to encrypted data
     * @param {CipherText} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */
    add(cipherText: string, plainText: Int32Array | Float64Array): CipherText {
        return this.module.rust_add_plain(cipherText, plainText);
    }

    /**
     * Method that subtracts plain data to encrypted data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */

    sub(cipherText: string, plainText: Int32Array | Float64Array): CipherText {
        return this.module.rust_sub_plain(cipherText, plainText);
    }

    /**
     * Method that multiply encrypted data with plain data
     * @param {string} cipherText
     * @param {Int32Array | Float64Array} plainText
     * @returns {CipherText}
     */

    multiply(cipherText: string, plainText: Int32Array | Float64Array): CipherText {
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
     * @param {CipherText} cipherText1
     * @param {CipherText} cipherText2
     * @returns {CipherText}
     */

    add(cipherText1: string, cipherText2: string): CipherText {
        return this.module.rust_add_ciphers(cipherText1, cipherText2);
    }

    /**
     * Method that subtracts two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {CipherText}
     */

    sub(cipherText1: string, cipherText2: string): CipherText {
        return this.module.rust_sub_ciphers(cipherText1, cipherText2);
    }

    /**
     * Method that multiplies two ciphertexts
     * @param {string} cipherText1
     * @param {string} cipherText2
     * @returns {CipherText}
     */

    multiply(cipherText1: string, cipherText2: string): CipherText {
        return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
    }

    /**
     * Method that squares a ciphertext
     * @param {string} cipherText
     * @returns {CipherText}
     */

    square(cipherText: string): CipherText {
        return this.module.rust_square_cipher(cipherText);
    }

    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {string} cipherText
     * @param {number} power
     * @returns {CipherText}
     */

    exponentiate(cipherText: string, power: number): CipherText {
        return this.module.rust_exponentiate_cipher(cipherText, power);
    }

    /**
     * Method that inverts all the values of a ciphertext
     * @param {string} cipherText
     * @returns {CipherText}
     */

    negate(cipherText: string): CipherText {
        return this.module.rust_negate_cipher(cipherText);
    }

    sumElements(cipherText: string, scheme: Scheme): CipherText {
        return this.module.rust_sum_elements(cipherText, scheme);
    }
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
     * Method that sets the homomorphic encryption scheme
     * @param {Scheme} scheme
     */
    setScheme(scheme: Scheme): void {
        this.module.rust_set_scheme(scheme);
    }
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {Security} security_level
     */
    setContext(
        polyModulusDegree: number,
        bitSizes: Int32Array,
        bitSize: number,
        Security: Security
    ): void {
        this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, Security);
    }

    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { Security } Security - security measured in bits
     * @param { ProcessingSpeed } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     */
    fastSetup(scheme: Scheme, Security: Security, processingSpeed: ProcessingSpeed): void {
        this.module.rust_fast_setup(scheme, Security, processingSpeed);
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

    initialize(): Promise<FHEModule> {
        return this.module.rust_initialize();
    }

    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     *
     * @returns {[PublicKey, SecretKey]}
     */
    generateKeys(): [PublicKey, SecretKey] {
        return this.module.rust_generate_keys();
    }
    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} publicKey
     * @returns {CipherText}
     */

    encrypt(array: Int32Array | Float64Array | Uint32Array, publicKey: PublicKey): CipherText {
        return this.module.rust_encrypt(array, publicKey);
    }

    /**
     * @param {Int32Array | Float64Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */

    decrypt(array: string, secretKey: SecretKey): Uint8Array {
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
    deallocateSealLibrary(): void {
        this.module.rust_deallocate_seal_library();
    }
    /**
     * Deallocates the FHE module
     */
    deallocateModule(): void {
        this.module.rust_deallocate_module();
        this.module = null;
        this.Cipher.delete();
        this.Plain.delete();
        this.Setup.delete();
    }
}

/**
 * Method that initialize a singleton instance of FHEModule
 *
 * @returns Promise<FHEModule>
 */
const getFheModule = function (): Promise<FHEModule> {
    return new Promise((resolve, reject) => {
        (async () => {
            const module = await import("./src/pkg/index.js");
            const FheModule = new FHEModule(module);
            resolve(FheModule);
        })();
    });
};

export default getFheModule;
