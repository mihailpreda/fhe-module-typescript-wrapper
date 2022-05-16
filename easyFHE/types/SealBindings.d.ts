import * as CipherText from "node-seal/implementation/cipher-text";
import { Context } from "node-seal/implementation/context";
import { EncryptionParameters } from "node-seal/implementation/encryption-parameters";
import * as PublicKey from "node-seal/implementation/public-key";
import * as SecretKey from "node-seal/implementation/secret-key";
export declare type EasyCipherText = CipherText.CipherText;
export declare type EasyPublicKey = PublicKey.PublicKey;
export declare type EasySecretKey = SecretKey.SecretKey;
export declare type EasyContext = Context;
export declare type EasyEncryptionParameters = EncryptionParameters;
declare type Nullable<T> = T | null;
export declare class SealBindings {
    /**
     * @returns {Promise<Nullable<SealBindings>>}
     */
    rust_initialize(): Promise<Nullable<SealBindings>>;
    /**
     * @param {string} scheme
     */
    rust_set_scheme(scheme: string): void;
    /**
     * @param {number} poly_modulus_degree
     * @param {Int32Array} bit_sizes
     * @param {number} bit_size
     * @param {string} security_level
     * @param {number} precision
     */
    rust_setup_context(poly_modulus_degree: number, bit_sizes: Int32Array, bit_size: number, security_level: string, precision: number): void;
    /**
     * @param {string} scheme
     * @param {string} security_level
     * @param {string} processing_speed
     * @param {number} precision
     */
    rust_fast_setup(scheme: string, security_level: string, processing_speed: string, precision: number): void;
    /**
     * @returns {any[]}
     */
    rust_generate_keys(): [EasyPublicKey, EasySecretKey];
    /**
     * @param {Int32Array} array
     * @param {any} public_key
     * @returns {any}
     */
    rust_encrypt(array: Int32Array | Float64Array | Uint32Array, public_key: any): any;
    /**
     * @param {string} array
     * @param {any} secret_key
     * @returns {any}
     */
    rust_decrypt(array: string, secret_key: any): any;
    /**
     * @param {string} cipher_text1
     * @param {string} cipher_text2
     * @returns {any}
     */
    rust_add_ciphers(cipher_text1: string, cipher_text2: string): any;
    /**
     * @param {string} cipher_text1
     * @param {string} cipher_text2
     * @returns {any}
     */
    rust_sub_ciphers(cipher_text1: string, cipher_text2: string): any;
    /**
     * @param {string} cipher_text1
     * @param {string} cipher_text2
     * @returns {any}
     */
    rust_multiply_ciphers(cipher_text1: string, cipher_text2: string): any;
    /**
     * @param {string} cipher_text1
     * @returns {any}
     */
    rust_square_cipher(cipher_text1: string): any;
    /**
     * @param {string} cipher_text1
     * @param {number} power
     * @returns {any}
     */
    rust_exponentiate_cipher(cipher_text1: string, power: number): any;
    /**
     * @param {string} cipher_text1
     * @returns {any}
     */
    rust_negate_cipher(cipher_text1: string): any;
    /**
     * @param {string} cipher_text
     * @param {Int32Array} plain_text
     * @returns {any}
     */
    rust_add_plain(cipher_text: string, plain_text: Int32Array | Float64Array): any;
    /**
     * @param {string} cipher_text
     * @param {Int32Array} plain_text
     * @returns {any}
     */
    rust_sub_plain(cipher_text: string, plain_text: Int32Array | Float64Array): any;
    /**
     * @param {string} cipher_text
     * @param {Int32Array} plain_text
     * @returns {any}
     */
    rust_multiply_plain(cipher_text: string, plain_text: Int32Array | Float64Array): any;
    /**
     */
    rust_deallocate_context(): void;
    /**
     */
    rust_deallocate_parameters(): void;
    /**
     */
    rust_deallocate_seal(): void;
    /**
     */
    rust_deallocate_library(): void;
}
export {};
