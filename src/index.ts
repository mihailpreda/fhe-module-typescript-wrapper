import { generate_keypair, _encrypt, _decrypt, add_constant_to_cipher_text, subtract_constant_from_cipher_text, add_ciphers, multiply_cipher_by_constant, divide_cipher_by_constant, } from './wasm/fhe_module.js'
 
class FHEModule {
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
  generateKeys():number[][]{ 
    return this.module.generate_keypair();
  }
  encrypt(plainText: Uint8Array, publicKey: Uint8Array):Uint8Array{
    return this.module._encrypt(plainText,publicKey)

  }
  decrypt(encryptedText: Uint8Array, secretKey: Uint8Array):Uint8Array{
    return this.module._decrypt(encryptedText,secretKey);
  }
  addConstantToCipher(encryptedText: Uint8Array, constant: Uint8Array):Uint8Array{
    return this.module.add_constant_to_cipher_text(encryptedText,constant);
  }
  subtractConstantFromCipher(encryptedText: Uint8Array, constant: Uint8Array):Uint8Array{
    return this.module.subtract_constant_from_cipher_text(encryptedText,constant);
  }
  addCiphers(encryptedText1: Uint8Array, encryptedText2: Uint8Array): Uint8Array{
      return this.module.add_ciphers(encryptedText1,encryptedText2);
  }
  multiplyCipherByConstant(encryptedText: Uint8Array, constant: number):Uint8Array{
    return this.module.multiply_cipher_by_constant(encryptedText,constant);
  }
  divideCipherByConstant(encryptedText: Uint8Array, constant: number, iterations:number):Uint8Array{
    return this.module.divide_cipher_by_constant(encryptedText,constant,iterations);
  }
  
}


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
 

 