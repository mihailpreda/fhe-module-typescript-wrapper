export class FHEModule {
  static instance: FHEModule;
  private module: any;



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
  }
  initialize(): Promise < FHEModule > {
      return this.module.rust_initialize();
  }
  /**
   * @param {string} scheme
   */
  setScheme(scheme: string): void {
      this.module.rust_set_scheme(scheme);
  }
  /**
   * @param {number} poly_modulus_degree
   * @param {Int32Array} bit_sizes
   * @param {number} bit_size
   * @param {string} security_level
   */
  setupContext(polyModulusDegree: number, bitSizes: Int32Array, bitSize: number, securityLevel: string): void {
      this.module.rust_setup_context(polyModulusDegree, bitSizes, bitSize, securityLevel);
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
   * @param {Int32Array} cipherText1
   * @param {Int32Array} cipherText2
   * @returns {Uint8Array}
   */

  addCiphers(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array {
      return this.module.rust_add_ciphers(cipherText1, cipherText2);
  }

  /**
   * @param {Int32Array} cipherText1
   * @param {Int32Array} cipherText2
   * @returns {Uint8Array}
   */

  subCiphers(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array {
      return this.module.rust_sub_ciphers(cipherText1, cipherText2);
  }



  /**
   * @param {Int32Array} cipherText1
   * @param {Int32Array} cipherText2
   * @returns {Uint8Array}
   */

  multiplyCiphers(cipherText1: Int32Array, cipherText2: Int32Array): Uint8Array {
      return this.module.rust_multiply_ciphers(cipherText1, cipherText2);
  }


  /**
   * @param {Int32Array} cipherText1
   * @returns {Uint8Array}
   */

  squareCipher(cipherText1: Int32Array): Uint8Array {
      return this.module.rust_square_cipher(cipherText1);
  }


  /**
   * @param {Int32Array} cipherText1
   * @param {number} power
   * @returns {Uint8Array}
   */

  exponentiateCipher(cipherText1: Int32Array, power: number): Uint8Array {
      return this.module.rust_exponentiate_cipher(cipherText1, power);
  }


  /**
   * @param {Int32Array} cipherText1
   * @returns {Uint8Array}
   */

  negateCipher(cipherText1: Int32Array): Uint8Array {
      return this.module.rust_negate_cipher(cipherText1);
  }

  /**
   * @param {Int32Array} cipherText
   * @param {Int32Array} plainText
   * @returns {Uint8Array}
   */

  addPlainCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array {
      return this.module.rust_add_plain(cipherText, plainText);
  }

  /**
   * @param {Int32Array} cipherText
   * @param {Int32Array} plainText
   * @returns {Uint8Array}
   */

  subPlainCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array {
      return this.module.rust_sub_plain(cipherText, plainText);
  }



  /**
   * @param {Int32Array} cipherText
   * @param {Int32Array} plainText
   * @returns {Uint8Array}
   */

  multiplyPlainCipher(cipherText: Int32Array, plainText: Int32Array): Uint8Array {
      return this.module.rust_multiply_plain(cipherText, plainText);
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