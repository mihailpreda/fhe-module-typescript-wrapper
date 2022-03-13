export class FHEModule {
  static instance: FHEModule;
  private module: any;
  /**
   * Constructor will modify class prototype to be a singleton, because we need the configuration to persist across the application.
   * Constructor will be without any parameters because we want to initialize properties of the class in different phases of the application.
   * In order to leverage on V8 optimization all class attributes will be initialized in the constructors;
   */
    constructor(module: any) {
       this.module=module;
      if (!FHEModule.instance) {
          FHEModule.instance = this;
      }
  }
  /**
   * 
   * @returns Array
   */
  generateKeys():number[][]{ 
    return this.module.generate_keypair();
  }
  /**
   * Method that encrypts an array of Uint8Array with publicKey
   * @param {Uint8Array} plainText 
   * @param {Uint8Array} publicKey 
   * @returns {Uint8Array}
   */
  encrypt(plainText: Uint8Array, publicKey: Uint8Array):Uint8Array{
    return this.module._encrypt(plainText,publicKey)

  }
  /**
   * Method that decrypts an array of Uint8Array with secretKey
   * @param {Uint8Array} encryptedText 
   * @param {Uint8Array} secretKey 
   * @returns {Uint8Array}
   */
  decrypt(encryptedText: Uint8Array, secretKey: Uint8Array):Uint8Array{
    return this.module._decrypt(encryptedText,secretKey);
  }
  /**
   * Method that adds a constant value to an already encrypted value
   * The underlying process of addition is done by vector addition (element by element)
   * @param {Uint8Array} encryptedText 
   * @param {Uint8Array} constant 
   * @returns {Uint8Array}
   */
  addConstantToCipher(encryptedText: Uint8Array, constant: Uint8Array):Uint8Array{
    return this.module.add_constant_to_cipher_text(encryptedText,constant);
  }
  /**
   * Method that subtracts a constant value to an already encrypted value
   * The underlying process of subtraction is done by vector subtraction (element by element)
   * @param {Uint8Array} encryptedText 
   * @param {Uint8Array} constant 
   * @returns {Uint8Array}
   */
  subtractConstantFromCipher(encryptedText: Uint8Array, constant: Uint8Array):Uint8Array{
    return this.module.subtract_constant_from_cipher_text(encryptedText,constant);
  }
  /**
   * Method that adds homomorphically 2 already encrypted ciphers.
   * The ciphers must be encrypted with the same publicKey
   * @param {Uint8Array} encryptedText1 
   * @param {Uint8Array} encryptedText2 
   * @returns {Uint8Array}
   */
  addCiphers(encryptedText1: Uint8Array, encryptedText2: Uint8Array): Uint8Array{
      return this.module.add_ciphers(encryptedText1,encryptedText2);
  }
  /**
   * 
   * @param {Uint8Array} encryptedText 
   * @param {number} constant 
   * @returns {Uint8Array}
   */
  multiplyCipherByConstant(encryptedText: Uint8Array, constant: number):Uint8Array{
    return this.module.multiply_cipher_by_constant(encryptedText,constant);
  }
  /**
   * 
   * @param {Uint8Array} encryptedText 
   * @param {number} constant 
   * @param {number} iterations 
   * @returns @param {Uint8Array} returnedValue
   */
  divideCipherByConstant(encryptedText: Uint8Array, constant: number, iterations:number):Uint8Array{
    return this.module.divide_cipher_by_constant(encryptedText,constant,iterations);
  }
  
}

/**
 * 
 * @returns {Promise<FHEModule>}
 */
const getFheModule = function():Promise<FHEModule> {
    return new Promise((resolve,reject)=>{
      (async ()=>{
        const module = await import('./wasm/fhe_module.js');
        const FheModule = new FHEModule(module);
        resolve(FheModule);
      })();
    })
}

export default getFheModule;
 

 