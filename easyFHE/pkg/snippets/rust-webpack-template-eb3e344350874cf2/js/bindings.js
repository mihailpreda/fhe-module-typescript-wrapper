import SEAL from 'node-seal';
let seal;
let parms;
let context;

const isCKKS = () => parms.scheme === seal.SchemeType.ckks;

/* SETUP */
/********************************************************************************************************* */

export const js_to_rust_initialize = async () => {
    seal = await SEAL();
    return seal;
};

export const js_to_rust_set_encryption_scheme = (scheme) => {
    switch (scheme) {
        case 'bfv':
            parms = seal.EncryptionParameters(seal.SchemeType.bfv);
            return parms;
        case 'ckks':
            parms = seal.EncryptionParameters(seal.SchemeType.ckks);
            return parms;
        case 'bgv':
            parms = seal.EncryptionParameters(seal.SchemeType.bgv);
            return parms;
        default:
            parms = seal.EncryptionParameters(seal.SchemeType.bfv);
            return parms;
    }
};

export const js_to_rust_setup_context = (polyModulusDegree, bitSizes, bitSize, securityLevel) => {
    switch (securityLevel) {
        case 'tc128':
            securityLevel = seal.SecurityLevel.tc128;
            break;
        case 'tc192':
            securityLevel = seal.SecurityLevel.tc192;
            break;
        case 'tc256':
            securityLevel = seal.SecurityLevel.tc256;
            break;
        default:
            securityLevel = seal.SecurityLevel.tc128;
            break;
    }
    // Set the PolyModulusDegree
    parms.setPolyModulusDegree(polyModulusDegree);

    // Create a suitable set of CoeffModulus primes
    parms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));

    if (!isCKKS()) {
        // Set the PlainModulus to a prime of bitSize 20.
        parms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));
    }

    context = seal.Context(
        parms, // Encryption Parameters
        true, // ExpandModChain
        securityLevel // Enforce a security level
    );

    // if (!context.parametersSet()) {
    //   throw new Error(
    //     'Could not set the parameters in the given context. Please try different encryption parameters.'
    //   );
    // }
    return context;
};

export const js_to_rust_fast_setup = (scheme = 'bfv', securityLevel = 'tc128', processingSpeed = 'normal') => {
    switch (scheme) {
        case 'bfv':
            parms = seal.EncryptionParameters(seal.SchemeType.bfv);
            break;
        case 'ckks':
            parms = seal.EncryptionParameters(seal.SchemeType.ckks);
            break;
        case 'bgv':
            parms = seal.EncryptionParameters(seal.SchemeType.bgv);
            break;
        default:
            parms = seal.EncryptionParameters(seal.SchemeType.bfv);
            break;
    }
    let polyModulusDegree;
    let bitSizes;
    let bitSize;
    let configurations = {
        bfv: {
            tc128: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [27],
                    bitSize: 20,
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [54],
                    bitSize: 20,
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [36, 36, 37],
                    bitSize: 20,
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [43, 43, 44, 44, 44],
                    bitSize: 20,
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [48, 48, 48, 49, 49, 49, 49, 49, 49],
                    bitSize: 20,
                },
            },
            tc192: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [19],
                    bitSize: 20,
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [37],
                    bitSize: 20,
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [25, 25, 25],
                    bitSize: 20,
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [38, 38, 38, 38],
                    bitSize: 20,
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [50, 50, 50, 50, 50, 50],
                    bitSize: 20,
                },
            },
            tc256: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [14],
                    bitSize: 20,
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [29],
                    bitSize: 20,
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [58],
                    bitSize: 20,
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [39, 39, 40],
                    bitSize: 20,
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [47, 47, 47, 48, 48],
                    bitSize: 20,
                },
            },
        },
        bgv: {
            tc128: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [27],
                    bitSize: 20,
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [54],
                    bitSize: 20,
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [36, 36, 37],
                    bitSize: 20,
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [43, 43, 44, 44, 44],
                    bitSize: 20,
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [48, 48, 48, 49, 49, 49, 49, 49, 49],
                    bitSize: 20,
                },
            },
            tc192: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [19],
                    bitSize: 20,
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [37],
                    bitSize: 20,
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [25, 25, 25],
                    bitSize: 20,
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [38, 38, 38, 38],
                    bitSize: 20,
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [50, 50, 50, 50, 50, 50],
                    bitSize: 20,
                },
            },
            tc256: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [14],
                    bitSize: 20,
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [29],
                    bitSize: 20,
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [58],
                    bitSize: 20,
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [39, 39, 40],
                    bitSize: 20,
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [47, 47, 47, 48, 48],
                    bitSize: 20,
                },
            },
        },
        ckks: {
            tc128: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [27],
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [54],
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [36, 36, 37],
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [43, 43, 44, 44, 44],
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [48, 48, 48, 49, 49, 49, 49, 49, 49],
                },
            },
            tc192: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [19],
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [37],
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [25, 25, 25],
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [38, 38, 38, 38],
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [50, 50, 50, 50, 50, 50],
                },
            },
            tc256: {
                veryFast: {
                    polyModulusDegree: 1024,
                    bitSizes: [14],
                },
                fast: {
                    polyModulusDegree: 2048,
                    bitSizes: [29],
                },
                normal: {
                    polyModulusDegree: 4096,
                    bitSizes: [58],
                },
                slow: {
                    polyModulusDegree: 8192,
                    bitSizes: [39, 39, 40],
                },
                verySlow: {
                    polyModulusDegree: 16384,
                    bitSizes: [47, 47, 47, 48, 48],
                },
            },
        },
    };
    switch (securityLevel) {
        case 'tc128':
            polyModulusDegree = configurations[scheme][securityLevel][processingSpeed].polyModulusDegree;
            bitSizes = configurations[scheme][securityLevel][processingSpeed].bitSizes;
            bitSize = configurations[scheme][securityLevel][processingSpeed].bitSize;
            securityLevel = seal.SecurityLevel.tc128;
            break;
        case 'tc192':
            polyModulusDegree = configurations[scheme][securityLevel][processingSpeed].polyModulusDegree;
            bitSizes = configurations[scheme][securityLevel][processingSpeed].bitSizes;
            bitSize = configurations[scheme][securityLevel][processingSpeed].bitSize;
            securityLevel = seal.SecurityLevel.tc192;
            break;
        case 'tc256':
            polyModulusDegree = configurations[scheme][securityLevel][processingSpeed].polyModulusDegree;
            bitSizes = configurations[scheme][securityLevel][processingSpeed].bitSizes;
            bitSize = configurations[scheme][securityLevel][processingSpeed].bitSize;
            securityLevel = seal.SecurityLevel.tc256;
            break;
        default:
            polyModulusDegree = configurations[scheme][securityLevel][processingSpeed].polyModulusDegree;
            bitSizes = configurations[scheme][securityLevel][processingSpeed].bitSizes;
            bitSize = configurations[scheme][securityLevel][processingSpeed].bitSize;
            securityLevel = seal.SecurityLevel.tc128;
            break;
    }
    // Set the PolyModulusDegree
    parms.setPolyModulusDegree(polyModulusDegree);

    // Create a suitable set of CoeffModulus primes
    parms.setCoeffModulus(seal.CoeffModulus.Create(polyModulusDegree, Int32Array.from(bitSizes)));

    if (!isCKKS()) {
        // Set the PlainModulus to a prime of bitSize 20.
        parms.setPlainModulus(seal.PlainModulus.Batching(polyModulusDegree, bitSize));
    }

    context = seal.Context(
        parms, // Encryption Parameters
        true, // ExpandModChain
        securityLevel // Enforce a security level
    );
    return [parms, context];
};

/********************************************************************************************************* */
/* BASIC */
/********************************************************************************************************* */
export const js_to_rust_generate_keys = () => {
    const keyGenerator = seal.KeyGenerator(context);
    const publicKey = keyGenerator.createPublicKey();
    const secretKey = keyGenerator.secretKey();
    return [publicKey, secretKey];
};
export const js_to_rust_encrypt = (plainText, publicKey) => {
    const encoder = isCKKS() ? seal.CKKSEncoder(context) : seal.BatchEncoder(context);

    const encryptor = seal.Encryptor(context, publicKey);
    // Create data to be encrypted
    const array = isCKKS() ? Float64Array.from(plainText) : Int32Array.from(plainText);

    // Encode the Array
    const encodedPlainText = isCKKS() ? encoder.encode(array, Math.pow(2, 20)) : encoder.encode(array);

    // Encrypt the PlainText
    const cipherText = encryptor.encrypt(encodedPlainText);

    //deallocate memory
    encoder.delete();
    encryptor.delete();

    return cipherText;
};

export const js_to_rust_decrypt = (cipherText, secretKey) => {
    //need to create a new CipherText with current context
    const preparedCipherText = seal.CipherText({
        context: context,
    });

    preparedCipherText.load(context, cipherText);

    const encoder = isCKKS() ? seal.CKKSEncoder(context) : seal.BatchEncoder(context);
    const decryptor = seal.Decryptor(context, secretKey);

    // Decrypt the CipherText
    const decryptedPlainText = decryptor.decrypt(preparedCipherText);

    // Decode the PlainText
    const decodedArray = encoder.decode(decryptedPlainText);

    //deallocate memory
    preparedCipherText.delete();
    encoder.delete();
    decryptor.delete();
    decryptedPlainText.delete();
    return decodedArray;
};

/********************************************************************************************************* */
/* CIPHER */
/********************************************************************************************************* */
export const js_to_rust_add_ciphers = (cipherText1, cipherText2) => {
    //need to create a new CipherText with current context
    const preparedCipherText1 = seal.CipherText({
        context: context,
    });
    const preparedCipherText2 = seal.CipherText({
        context: context,
    });
    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText1.load(context, cipherText1);
    preparedCipherText2.load(context, cipherText2);
    const evaluator = seal.Evaluator(context);
    evaluator.add(preparedCipherText1, preparedCipherText2, result);

    //deallocate memory
    preparedCipherText1.delete();
    preparedCipherText2.delete();
    evaluator.delete();

    return result;
};

export const js_to_rust_sub_ciphers = (cipherText1, cipherText2) => {
    //need to create a new CipherText with current context
    const preparedCipherText1 = seal.CipherText({
        context: context,
    });
    const preparedCipherText2 = seal.CipherText({
        context: context,
    });
    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText1.load(context, cipherText1);
    preparedCipherText2.load(context, cipherText2);
    const evaluator = seal.Evaluator(context);
    evaluator.sub(preparedCipherText1, preparedCipherText2, result);

    //deallocate memory
    preparedCipherText1.delete();
    preparedCipherText2.delete();
    evaluator.delete();

    return result;
};

export const js_to_rust_multiply_ciphers = (cipherText1, cipherText2) => {
    //need to create a new CipherText with current context
    const preparedCipherText1 = seal.CipherText({
        context: context,
    });
    const preparedCipherText2 = seal.CipherText({
        context: context,
    });
    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText1.load(context, cipherText1);
    preparedCipherText2.load(context, cipherText2);
    const evaluator = seal.Evaluator(context);
    evaluator.multiply(preparedCipherText1, preparedCipherText2, result);

    //deallocate memory
    preparedCipherText1.delete();
    preparedCipherText2.delete();
    evaluator.delete();

    return result;
};

export const js_to_rust_square_cipher = (cipherText1) => {
    //need to create a new CipherText with current context
    const preparedCipherText1 = seal.CipherText({
        context: context,
    });

    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText1.load(context, cipherText1);

    const evaluator = seal.Evaluator(context);
    evaluator.square(preparedCipherText1, result);

    //deallocate memory
    preparedCipherText1.delete();
    evaluator.delete();

    return result;
};

export const js_to_rust_exponentiate_cipher = (cipherText1, power) => {
    const keyGenerator = seal.KeyGenerator(context);
    const relinKeys = keyGenerator.createRelinKeys();
    //need to create a new CipherText with current context
    const preparedCipherText1 = seal.CipherText({
        context: context,
    });
    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText1.load(context, cipherText1);

    const evaluator = seal.Evaluator(context);
    evaluator.exponentiate(preparedCipherText1, power, relinKeys, result);

    //deallocate memory
    preparedCipherText1.delete();
    relinKeys.delete();
    keyGenerator.delete();
    evaluator.delete();

    return result;
};

export const js_to_rust_negate_cipher = (cipherText1) => {
    //need to create a new CipherText with current context
    const preparedCipherText1 = seal.CipherText({
        context: context,
    });

    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText1.load(context, cipherText1);

    const evaluator = seal.Evaluator(context);
    evaluator.negate(preparedCipherText1, result);

    //deallocate memory
    preparedCipherText1.delete();
    evaluator.delete();

    return result;
};

/********************************************************************************************************* */
/* PLAIN */
/********************************************************************************************************* */
export const js_to_rust_add_plain = (cipherText, plainText) => {
    //need to create a new CipherText with current context
    const preparedCipherText = seal.CipherText({
        context: context,
    });
    const encoder = isCKKS() ? seal.CKKSEncoder(context) : seal.BatchEncoder(context);
    const preparedPlainText = encoder.encode(plainText);
    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText.load(context, cipherText);

    const evaluator = seal.Evaluator(context);
    evaluator.addPlain(preparedCipherText, preparedPlainText, result);

    //deallocate memory
    preparedCipherText.delete();
    encoder.delete();
    preparedPlainText.delete();
    evaluator.delete();

    return result;
};

export const js_to_rust_sub_plain = (cipherText, plainText) => {
    //need to create a new CipherText with current context
    const preparedCipherText = seal.CipherText({
        context: context,
    });
    const encoder = isCKKS() ? seal.CKKSEncoder(context) : seal.BatchEncoder(context);
    const preparedPlainText = encoder.encode(plainText);
    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText.load(context, cipherText);

    const evaluator = seal.Evaluator(context);
    evaluator.subPlain(preparedCipherText, preparedPlainText, result);

    //deallocate memory
    preparedCipherText.delete();
    encoder.delete();
    preparedPlainText.delete();
    evaluator.delete();

    return result;
};

export const js_to_rust_multiply_plain = (cipherText, plainText) => {
    //need to create a new CipherText with current context
    const preparedCipherText = seal.CipherText({
        context: context,
    });
    const encoder = isCKKS() ? seal.CKKSEncoder(context) : seal.BatchEncoder(context);
    const preparedPlainText = encoder.encode(plainText);
    const result = seal.CipherText({
        context: context,
    });
    preparedCipherText.load(context, cipherText);

    const evaluator = seal.Evaluator(context);
    evaluator.multiplyPlain(preparedCipherText, preparedPlainText, result);

    //deallocate memory
    preparedCipherText.delete();
    encoder.delete();
    preparedPlainText.delete();
    evaluator.delete();

    return result;
};
/********************************************************************************************************* */
/* MEMORY MANAGEMENT */
/********************************************************************************************************* */
export const js_to_rust_deallocate_context = () => {
    context.delete();
};

export const js_to_rust_deallocate_parameters = () => {
    parms.delete();
};

export const js_to_rust_deallocate_seal_library = () => {
    seal.delete();
};

export const js_to_rust_deallocate_module = () => {
    js_to_rust_deallocate_context();
    js_to_rust_deallocate_parameters();
    seal = null;
};
/********************************************************************************************************* */
/* Experimental */
/********************************************************************************************************* */
export const js_to_rust_sum_elements = (cipherText1, scheme) => {
    let schemeType;
    switch (scheme) {
        case 'bfv':
            schemeType = seal.SchemeType.bfv;
            break;
        case 'ckks':
            schemeType = seal.SchemeType.ckks;
            break;
        case 'bgv':
            schemeType = seal.SchemeType.bgv;
            break;
        default:
            schemeType = seal.SchemeType.bfv;
            break;
    }
    const keyGenerator = seal.KeyGenerator(context);
    const galoisKeys = keyGenerator.createGaloisKeys();
    const preparedCipherText1 = seal.CipherText({ context: context });
    const result = seal.CipherText({ context: context });
    preparedCipherText1.load(context, cipherText1);

    const evaluator = seal.Evaluator(context);

    evaluator.sumElements(preparedCipherText1, galoisKeys, schemeType, result);
    return result;
};
