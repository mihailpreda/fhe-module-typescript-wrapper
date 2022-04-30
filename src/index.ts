export class Plain {
    private module: any;

    constructor(module: any) {
        this.module = module;
    }
    /**
     * Method that adds plain data to encrypted data 
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */
    addCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array {
        return this.module.rust_add_plain(cipherText, plainText);
    }

    /**
     * Method that subtracts plain data to encrypted data 
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */

    subCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array {
        return this.module.rust_sub_plain(cipherText, plainText);
    }

    /**
     * Method that multiply encrypted data with plain data
     * @param {Int32Array} cipherText
     * @param {Int32Array} plainText
     * @returns {Uint8Array}
     */

    multiplyCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array {
        return this.module.rust_multiply_plain(cipherText, plainText);
    }

    /**
     * Method that deallocates the wasm module reference
     */
    delete() {
        this.module = null;
    }

};
export class Cipher {
    private module: any;

    constructor(module: any) {
        this.module = module;
    }
    /**
     * Method that adds two ciphertexts 
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */

    add(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array {
        return this.module.rust_add_ciphers(cipherText1, cipherText2);
    }

    /**
     * Method that subtracts two ciphertexts
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */

    sub(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array {
        return this.module.rust_sub_ciphers(cipherText1, cipherText2);
    }



    /**
     * Method that multiplies two ciphertexts
     * @param {Int32Array} cipherText1
     * @param {Int32Array} cipherText2
     * @returns {Uint8Array}
     */

    multiply(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array {
        return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
    }


    /**
     * Method that squares a ciphertext
     * @param {Int32Array} cipherText
     * @returns {Uint8Array}
     */

    square(cipherText: Int32Array): Uint8Array {
        return this.module.rust_square_cipher(cipherText);
    }


    /**
     * Method that exponentatiates a ciphertext to a certain power
     * @param {Int32Array} cipherText
     * @param {number} power
     * @returns {Uint8Array}
     */

    exponentiate(cipherText: Int32Array, power: number): Uint8Array {
        return this.module.rust_exponentiate_cipher(cipherText, power);
    }


    /**
     * Method that inverts all the values of a ciphertext
     * @param {Int32Array} cipherText
     * @returns {Uint8Array}
     */

    negate(cipherText: Int32Array): Uint8Array {
        return this.module.rust_negate_cipher(cipherText);
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
     * @param {'bfv' | 'bgv' | 'ckks'} scheme
     */
    setScheme(scheme: 'bfv' | 'bgv' | 'ckks'): void {
        this.module.rust_set_scheme(scheme);
    }
    /**
     * Method that sets the  security Context of the module
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {'tc128' | 'tc192' | 'tc256'} security_level
     */
    setContext(polyModulusDegree: number, bitSizes: Int32Array, bitSize: number, securityLevel: 'tc128' | 'tc192' | 'tc256'): void {
        this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, securityLevel);
    }

    /**
     * Method that will do the setup of the module in a very simplified way.
     * @param { 'bfv' | 'bgv' | 'ckks' } scheme - homomorphic scheme used
     * @param { 'tc128' | 'tc192' | 'tc256' } securityLevel - security measured in bits 
     * @param { 'veryFast' | 'fast' | 'normal' | 'slow' | 'verySlow' } processingSpeed - refers to the size of polymodulus degree, the greater the degree, the heavier the computational cost will be
     */
    fastSetup(scheme: 'bfv' | 'bgv' | 'ckks', securityLevel: 'tc128' | 'tc192' | 'tc256', processingSpeed: 'veryFast' | 'fast' | 'normal' | 'slow' | 'verySlow'): void {
        this.module.rust_fast_setup(scheme, securityLevel, processingSpeed);
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

    initialize(): Promise < FHEModule > {
        return this.module.rust_initialize();
    }

    /**
     * Method that generates a pair of (publicKey, secretKey) encryption keys
     * 
     * @returns {Array<Object>}
     */
    generateKeys(): Array < Object > {
        return this.module.rust_generate_keys();
    }
    /**
     * @param {Int32Array} array
     * @param {Object} publicKey
     * @returns {Uint8Array}
     */

    encrypt(array: Int32Array, publicKey: Object): Uint8Array {
        return this.module.rust_encrypt(array, publicKey);
    }

    /**
     * @param {Int32Array} array
     * @param {Object} secretKey
     * @returns {Uint8Array}
     */

    decrypt(array: Int32Array, secretKey: Object): Uint8Array {
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
const getFheModule = function(): Promise < FHEModule > {
    return new Promise((resolve, reject) => {
        (async () => {
            const module = await import('./pkg/index.js');
            const FheModule = new FHEModule(module);
            resolve(FheModule);
        })();
    })
}

export default getFheModule;