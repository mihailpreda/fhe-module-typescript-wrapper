export declare type BatchEncoderDependencyOptions = {
    readonly Exception: Exception;
    readonly MemoryPoolHandle: MemoryPoolHandle;
    readonly PlainText: PlainTextConstructorOptions;
    readonly Vector: VectorConstructorOptions;
};
export declare type BatchEncoderDependencies = {
    ({ Exception, MemoryPoolHandle, PlainText, Vector }: BatchEncoderDependencyOptions): BatchEncoderConstructorOptions;
};
export declare type BatchEncoderConstructorOptions = {
    (context: Context): BatchEncoder;
};
export declare type BatchEncoderTypes = Int32Array | Uint32Array | BigInt64Array | BigUint64Array;
export declare type BatchEncoder = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly encode: (array: BatchEncoderTypes, plainText?: PlainText) => PlainText | void;
    readonly decode: (plainText: PlainText, signed?: boolean, pool?: MemoryPoolHandle) => Int32Array | Uint32Array;
    readonly decodeBigInt: (
        plainText: PlainText,
        signed?: boolean,
        pool?: MemoryPoolHandle
    ) => BigInt64Array | BigUint64Array;
    readonly slotCount: number;
};
export declare const BatchEncoderInit: ({ loader }: LoaderOptions) => BatchEncoderDependencies;
export declare type CipherTextDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly ParmsIdType: ParmsIdTypeConstructorOptions;
    readonly MemoryPoolHandle: MemoryPoolHandle;
    readonly Vector: VectorConstructorOptions;
};
export declare type CipherTextDependencies = {
    ({
        Exception,
        ComprModeType,
        ParmsIdType,
        MemoryPoolHandle,
        Vector,
    }: CipherTextDependencyOptions): CipherTextConstructorOptions;
};
export declare type CipherTextConstructorOptions = {
    ({
        context,
        parmsId,
        sizeCapacity,
        pool,
    }?: {
        context?: Context;
        parmsId?: ParmsIdType;
        sizeCapacity?: number;
        pool?: MemoryPoolHandle;
    }): CipherText;
};
export declare type CipherText = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly reserve: (context: Context, capacity: number) => void;
    readonly resize: (size: number) => void;
    readonly release: () => void;
    readonly coeffModulusSize: number;
    readonly polyModulusDegree: number;
    readonly size: number;
    readonly sizeCapacity: number;
    readonly isTransparent: boolean;
    readonly isNttForm: boolean;
    readonly parmsId: ParmsIdType;
    readonly scale: number;
    readonly setScale: (scale: number) => void;
    readonly pool: MemoryPoolHandle;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (context: Context, encoded: string) => void;
    readonly loadArray: (context: Context, array: Uint8Array) => void;
    readonly copy: (cipher: CipherText) => void;
    readonly clone: () => CipherText;
    readonly move: (cipher: CipherText) => void;
};
export declare const CipherTextInit: ({ loader }: LoaderOptions) => CipherTextDependencies;
export declare type CKKSEncoderDependencyOptions = {
    readonly Exception: Exception;
    readonly MemoryPoolHandle: MemoryPoolHandle;
    readonly PlainText: PlainTextConstructorOptions;
    readonly Vector: VectorConstructorOptions;
};
export declare type CKKSEncoderDependencies = {
    ({ Exception, MemoryPoolHandle, PlainText, Vector }: CKKSEncoderDependencyOptions): CKKSEncoderConstructorOptions;
};
export declare type CKKSEncoderConstructorOptions = {
    (context: Context): CKKSEncoder;
};
export declare type CKKSEncoderTypes = Float64Array;
export declare type CKKSEncoder = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly encode: (
        array: CKKSEncoderTypes,
        scale: number,
        plainText?: PlainText,
        pool?: MemoryPoolHandle
    ) => PlainText | void;
    readonly decode: (plainText: PlainText, pool?: MemoryPoolHandle) => CKKSEncoderTypes;
    readonly slotCount: number;
};
export declare const CKKSEncoderInit: ({ loader }: LoaderOptions) => CKKSEncoderDependencies;

export declare type CoeffModulusDependencyOptions = {
    readonly Exception: Exception;
    readonly SecurityLevel: SecurityLevel;
    readonly Vector: VectorConstructorOptions;
};
export declare type CoeffModulusDependencies = {
    ({ Exception, SecurityLevel, Vector }: CoeffModulusDependencyOptions): CoeffModulusConstructorOptions;
};
export declare type CoeffModulusConstructorOptions = {
    (): CoeffModulus;
};
export declare type CoeffModulus = {
    readonly MaxBitCount: (polyModulusDegree: number, securityLevel?: SecurityLevel) => number;
    readonly BFVDefault: (polyModulusDegree: number, securityLevel?: SecurityLevel) => Vector;
    readonly Create: (polyModulusDegree: number, bitSizes: Int32Array) => Vector;
};
export declare const CoeffModulusInit: ({ loader }: LoaderOptions) => CoeffModulusDependencies;

export declare type ComprModeTypeDependencies = {
    (): ComprModeTypeConstructorOptions;
};
export declare type ComprModeTypeConstructorOptions = {
    (): ComprModeType;
};
export declare type ComprModeType = {
    readonly none: any;
    readonly zlib: any;
    readonly zstd: any;
};
export declare const ComprModeTypeInit: ({ loader }: LoaderOptions) => ComprModeTypeDependencies;
export declare const INSTANCE_DELETED = "Instance was deleted";
export declare const UNSUPPORTED_VECTOR_TYPE = "Unsupported vector type";
export declare const UNSUPPORTED_BITSIZES_TYPE = "Unsupported argument type! `bitSizes` must be an Int32Array";
export declare const UNSUPPORTED_BATCH_ENCODE_ARRAY_TYPE =
    "Unsupported array type! `array` must be of type Int32Array, Uint32Array, BigInt64Array, or BigUint64Array.";
export declare const UNSUPPORTED_CKKS_ENCODE_ARRAY_TYPE =
    "Unsupported array type! `array` must be of type Float64Array.";
export declare const INVALID_PLAIN_CONSRUCTOR_OPTIONS = "Must specify a (coeffCount), (coeffCount, capacity)";
export declare const INVALID_CIPHER_CONSTRUCTOR_OPTIONS =
    "Must specify a (context), (context, parmsId), or (context, parmsId, sizeCapacity)";

export declare type ContextDataDependencyOptions = {
    readonly Exception: Exception;
    readonly EncryptionParameters: EncryptionParametersConstructorOptions;
    readonly ParmsIdType: ParmsIdTypeConstructorOptions;
    readonly EncryptionParameterQualifiers: EncryptionParameterQualifiersConstructorOptions;
};
export declare type ContextDataDependencies = {
    ({
        Exception,
        EncryptionParameters,
        ParmsIdType,
        EncryptionParameterQualifiers,
    }: ContextDataDependencyOptions): ContextDataConstructorOptions;
};
export declare type ContextDataConstructorOptions = {
    (): ContextData;
};
export declare type ContextData = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly parms: EncryptionParameters;
    readonly parmsId: ParmsIdType;
    readonly qualifiers: EncryptionParameterQualifiers;
    readonly totalCoeffModulusBitCount: number;
    readonly prevContextData: ContextData;
    readonly nextContextData: ContextData;
    readonly chainIndex: number;
};
export declare const ContextDataInit: ({ loader }: LoaderOptions) => ContextDataDependencies;

export declare type ContextDependencyOptions = {
    readonly ParmsIdType: ParmsIdTypeConstructorOptions;
    readonly ContextData: ContextDataConstructorOptions;
    readonly SecurityLevel: SecurityLevel;
};
export declare type ContextDependencies = {
    ({ ParmsIdType, ContextData, SecurityLevel }: ContextDependencyOptions): ContextConstructorOptions;
};
export declare type ContextConstructorOptions = {
    (encryptionParams: EncryptionParameters, expandModChain?: boolean, securityLevel?: SecurityLevel): Context;
};
export declare type Context = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly toHuman: () => string;
    readonly getContextData: (parmsId: ParmsIdType) => ContextData;
    readonly keyContextData: ContextData;
    readonly firstContextData: ContextData;
    readonly lastContextData: ContextData;
    readonly parametersSet: () => boolean;
    readonly keyParmsId: ParmsIdType;
    readonly firstParmsId: ParmsIdType;
    readonly lastParmsId: ParmsIdType;
    readonly usingKeyswitching: boolean;
};
export declare const ContextInit: ({ loader }: LoaderOptions) => ContextDependencies;

export declare type DecryptorDependencyOptions = {
    readonly Exception: Exception;
    readonly PlainText: PlainTextConstructorOptions;
};
export declare type DecryptorDependencies = {
    ({ Exception, PlainText }: DecryptorDependencyOptions): DecryptorConstructorOptions;
};
export declare type DecryptorConstructorOptions = {
    (context: Context, secretKey: SecretKey): Decryptor;
};
export declare type Decryptor = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly decrypt: (cipherText: CipherText, plainText?: PlainText) => PlainText | void;
    readonly invariantNoiseBudget: (cipherText: CipherText) => number;
};
export declare const DecryptorInit: ({ loader }: LoaderOptions) => DecryptorDependencies;

export declare type EncryptionParameterQualifiersDependencies = {
    (): EncryptionParameterQualifiersConstructorOptions;
};
export declare type EncryptionParameterQualifiersConstructorOptions = {
    (): EncryptionParameterQualifiers;
};
export declare type EncryptionParameterQualifiers = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly parametersSet: () => boolean;
    readonly usingFFT: boolean;
    readonly usingNTT: boolean;
    readonly usingBatching: boolean;
    readonly usingFastPlainLift: boolean;
    readonly usingDescendingModulusChain: boolean;
    readonly securityLevel: SecurityLevel;
};
export declare const EncryptionParameterQualifiersInit: () => EncryptionParameterQualifiersDependencies;

export declare type EncryptionParametersDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly Modulus: ModulusConstructorOptions;
    readonly SchemeType: SchemeType;
    readonly ParmsIdType: ParmsIdTypeConstructorOptions;
    readonly Vector: VectorConstructorOptions;
};
export declare type EncryptionParametersDependencies = {
    ({
        Exception,
        ComprModeType,
        Modulus,
        SchemeType,
        Vector,
    }: EncryptionParametersDependencyOptions): EncryptionParametersConstructorOptions;
};
export declare type EncryptionParametersConstructorOptions = {
    (schemeType?: SchemeType): EncryptionParameters;
};
export declare type EncryptionParameters = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly setPolyModulusDegree: (polyModulusDegree: number) => void;
    readonly setCoeffModulus: (coeffModulus: Vector) => void;
    readonly setPlainModulus: (plainModulus: Modulus) => void;
    readonly scheme: SchemeType;
    readonly polyModulusDegree: number;
    readonly coeffModulus: BigUint64Array;
    readonly plainModulus: Modulus;
    readonly parmsId: ParmsIdType;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (encoded: string) => void;
    readonly loadArray: (array: Uint8Array) => void;
};
export declare const EncryptionParametersInit: ({ loader }: LoaderOptions) => EncryptionParametersDependencies;

export declare type EncryptorDependencyOptions = {
    readonly Exception: Exception;
    readonly MemoryPoolHandle: MemoryPoolHandle;
    readonly CipherText: CipherTextConstructorOptions;
    readonly Serializable: SerializableConstructorOptions;
};
export declare type EncryptorDependencies = {
    ({
        Exception,
        MemoryPoolHandle,
        CipherText,
        Serializable,
    }: EncryptorDependencyOptions): EncryptorConstructorOptions;
};
export declare type EncryptorConstructorOptions = {
    (context: Context, publicKey: PublicKey, secretKey?: SecretKey): Encryptor;
};
export declare type Encryptor = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly encrypt: (plainText: PlainText, cipherText?: CipherText, pool?: MemoryPoolHandle) => CipherText | void;
    readonly encryptSerializable: (plainText: PlainText, pool?: MemoryPoolHandle) => Serializable;
    readonly encryptSymmetric: (
        plainText: PlainText,
        cipherText?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly encryptSymmetricSerializable: (plainText: PlainText, pool?: MemoryPoolHandle) => Serializable;
    readonly encryptZero: (cipherText?: CipherText, pool?: MemoryPoolHandle) => CipherText | void;
    readonly encryptZeroSerializable: (pool?: MemoryPoolHandle) => Serializable;
};
export declare const EncryptorInit: ({ loader }: LoaderOptions) => EncryptorDependencies;

export declare type EvaluatorDependencyOptions = {
    readonly Exception: Exception;
    readonly MemoryPoolHandle: MemoryPoolHandle;
    readonly CipherText: CipherTextConstructorOptions;
    readonly PlainText: PlainTextConstructorOptions;
};
export declare type EvaluatorDependencies = {
    ({ Exception, MemoryPoolHandle, CipherText, PlainText }: EvaluatorDependencyOptions): EvaluatorConstructorOptions;
};
export declare type EvaluatorConstructorOptions = {
    (context: Context): Evaluator;
};
export declare type Evaluator = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly negate: (encrypted: CipherText, destination?: CipherText) => CipherText | void;
    readonly add: (a: CipherText, b: CipherText, destination?: CipherText) => CipherText | void;
    readonly sub: (a: CipherText, b: CipherText, destination?: CipherText) => CipherText | void;
    readonly multiply: (
        a: CipherText,
        b: CipherText,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly square: (encrypted: CipherText, destination?: CipherText, pool?: MemoryPoolHandle) => CipherText | void;
    readonly relinearize: (
        encrypted: CipherText,
        relinKeys: RelinKeys,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly cipherModSwitchToNext: (
        encrypted: CipherText,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly cipherModSwitchTo: (
        encrypted: CipherText,
        parmsId: ParmsIdType,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly plainModSwitchToNext: (plain: PlainText, destination?: PlainText) => PlainText | void;
    readonly plainModSwitchTo: (plain: PlainText, parmsId: ParmsIdType, destination?: PlainText) => PlainText | void;
    readonly rescaleToNext: (
        encrypted: CipherText,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly rescaleTo: (
        encrypted: CipherText,
        parmsId: ParmsIdType,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly exponentiate: (
        encrypted: CipherText,
        exponent: number,
        relinKeys: RelinKeys,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly addPlain: (encrypted: CipherText, plain: PlainText, destination?: CipherText) => CipherText | void;
    readonly subPlain: (encrypted: CipherText, plain: PlainText, destination?: CipherText) => CipherText | void;
    readonly multiplyPlain: (
        encrypted: CipherText,
        plain: PlainText,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly plainTransformToNtt: (
        plain: PlainText,
        parmsId: ParmsIdType,
        destinationNtt?: PlainText,
        pool?: MemoryPoolHandle
    ) => PlainText | void;
    readonly cipherTransformToNtt: (encrypted: CipherText, destinationNtt?: CipherText) => CipherText | void;
    readonly cipherTransformFromNtt: (encryptedNtt: CipherText, destination?: CipherText) => CipherText | void;
    readonly applyGalois: (
        encrypted: CipherText,
        galoisElt: number,
        galoisKeys: GaloisKeys,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly rotateRows: (
        encrypted: CipherText,
        steps: number,
        galoisKeys: GaloisKeys,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly rotateColumns: (
        encrypted: CipherText,
        galoisKeys: GaloisKeys,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly rotateVector: (
        encrypted: CipherText,
        steps: number,
        galoisKeys: GaloisKeys,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly complexConjugate: (
        encrypted: CipherText,
        galoisKeys: GaloisKeys,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly sumElements: (
        encrypted: CipherText,
        galoisKeys: GaloisKeys,
        scheme: SchemeType,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly dotProduct: (
        a: CipherText,
        b: CipherText,
        relinKeys: RelinKeys,
        galoisKeys: GaloisKeys,
        scheme: SchemeType,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
    readonly dotProductPlain: (
        a: CipherText,
        b: PlainText,
        galoisKeys: GaloisKeys,
        scheme: SchemeType,
        destination?: CipherText,
        pool?: MemoryPoolHandle
    ) => CipherText | void;
};
export declare const EvaluatorInit: ({ loader }: LoaderOptions) => EvaluatorDependencies;

export declare type ExceptionDependencies = {
    (): ExceptionConstructorOptions;
};
export declare type ExceptionConstructorOptions = {
    (): Exception;
};
export declare type SealError = number | Error | string;
export declare type Exception = {
    readonly safe: (e: SealError) => Error;
};
export declare const ExceptionInit: ({ loader }: LoaderOptions) => ExceptionDependencies;

export declare type GaloisKeysDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly Vector: VectorConstructorOptions;
};
export declare type GaloisKeysDependencies = {
    ({ Exception, ComprModeType, Vector }: GaloisKeysDependencyOptions): GaloisKeysConstructorOptions;
};
export declare type GaloisKeysConstructorOptions = {
    (): GaloisKeys;
};
export declare type GaloisKeys = {
    readonly instance: Instance;
    readonly inject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly size: number;
    readonly getIndex: (galoisElt: number) => number;
    readonly hasKey: (galoisElt: number) => boolean;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (context: Context, encoded: string) => void;
    readonly loadArray: (context: Context, array: Uint8Array) => void;
    readonly copy: (key: GaloisKeys) => void;
    readonly clone: () => GaloisKeys;
    readonly move: (key: GaloisKeys) => void;
};
export declare const GaloisKeysInit: ({ loader }: LoaderOptions) => GaloisKeysDependencies;

export declare type KeyGeneratorDependencyOptions = {
    readonly Exception: Exception;
    readonly PublicKey: PublicKeyConstructorOptions;
    readonly SecretKey: SecretKeyConstructorOptions;
    readonly RelinKeys: RelinKeysConstructorOptions;
    readonly GaloisKeys: GaloisKeysConstructorOptions;
    readonly Serializable: SerializableConstructorOptions;
};
export declare type KeyGeneratorDependencies = {
    ({
        Exception,
        PublicKey,
        SecretKey,
        RelinKeys,
        GaloisKeys,
        Serializable,
    }: KeyGeneratorDependencyOptions): KeyGeneratorConstructorOptions;
};
export declare type KeyGeneratorConstructorOptions = {
    (context: Context, secretKey?: SecretKey): KeyGenerator;
};
export declare type KeyGenerator = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly secretKey: () => SecretKey;
    readonly createPublicKeySerializable: () => Serializable;
    readonly createPublicKey: () => PublicKey;
    readonly createRelinKeysSerializable: () => Serializable;
    readonly createRelinKeys: () => RelinKeys;
    readonly createGaloisKeysSerializable: (steps?: Int32Array) => Serializable;
    readonly createGaloisKeys: (steps?: Int32Array) => GaloisKeys;
};
export declare const KeyGeneratorInit: ({ loader }: LoaderOptions) => KeyGeneratorDependencies;

export declare type MemoryPoolHandleDependencies = {
    (): MemoryPoolHandleConstructorOptions;
};
export declare type MemoryPoolHandleConstructorOptions = {
    (): MemoryPoolHandle;
};
export declare type MemoryPoolHandle = {
    readonly global: any;
    readonly threadLocal: any;
};
export declare const MemoryPoolHandleInit: ({ loader }: LoaderOptions) => MemoryPoolHandleDependencies;

export declare type ModulusDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly Vector: VectorConstructorOptions;
};
export declare type ModulusDependencies = {
    ({ Exception, ComprModeType, Vector }: ModulusDependencyOptions): ModulusConstructorOptions;
};
export declare type ModulusConstructorOptions = {
    (value: BigInt): Modulus;
};
export declare type Modulus = {
    readonly instance: Instance;
    readonly inject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly setValue: (value: BigInt) => void;
    readonly value: BigInt;
    readonly bitCount: number;
    readonly isZero: boolean;
    readonly isPrime: boolean;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (encoded: string) => void;
    readonly loadArray: (array: Uint8Array) => void;
};
export declare const ModulusInit: ({ loader }: LoaderOptions) => ModulusDependencies;

export declare type ParmsIdTypeDependencyOptions = {
    readonly Exception: Exception;
};
export declare type ParmsIdTypeDependencies = {
    ({ Exception }: ParmsIdTypeDependencyOptions): ParmsIdTypeConstructorOptions;
};
export declare type ParmsIdTypeConstructorOptions = {
    (): ParmsIdType;
};
export declare type ParmsIdType = {
    readonly instance: Instance;
    readonly inject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly values: BigUint64Array;
};
export declare const ParmsIdTypeInit: ({ loader }: LoaderOptions) => ParmsIdTypeDependencies;

export declare type PlainModulusDependencyOptions = {
    readonly Exception: Exception;
    readonly Modulus: ModulusConstructorOptions;
    readonly Vector: VectorConstructorOptions;
};
export declare type PlainModulusDependencies = {
    ({ Exception, Modulus, Vector }: PlainModulusDependencyOptions): PlainModulusConstructorOptions;
};
export declare type PlainModulusConstructorOptions = {
    (): PlainModulus;
};
export declare type PlainModulus = {
    readonly Batching: (polyModulusDegree: number, bitSize: number) => Modulus;
    readonly BatchingVector: (polyModulusDegree: number, bitSizes: Int32Array) => Vector;
};
export declare const PlainModulusInit: ({ loader }: LoaderOptions) => PlainModulusDependencies;

export declare type PlainTextDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly ParmsIdType: ParmsIdTypeConstructorOptions;
    readonly MemoryPoolHandle: MemoryPoolHandle;
    readonly Vector: VectorConstructorOptions;
};
export declare type PlainTextDependencies = {
    ({
        Exception,
        ComprModeType,
        ParmsIdType,
        MemoryPoolHandle,
        Vector,
    }: PlainTextDependencyOptions): PlainTextConstructorOptions;
};
export declare type PlainTextConstructorOptions = {
    ({ capacity, coeffCount, pool }?: { capacity?: number; coeffCount?: number; pool?: MemoryPoolHandle }): PlainText;
};
export declare type PlainText = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly reserve: (capacity: number) => void;
    readonly shrinkToFit: () => void;
    readonly release: () => void;
    readonly resize: (coeffCount: number) => void;
    readonly setZero: () => void;
    readonly isZero: boolean;
    readonly capacity: number;
    readonly coeffCount: number;
    readonly significantCoeffCount: number;
    readonly nonzeroCoeffCount: number;
    readonly toPolynomial: () => string;
    readonly isNttForm: boolean;
    readonly parmsId: ParmsIdType;
    readonly scale: number;
    readonly setScale: (scale: number) => void;
    readonly pool: MemoryPoolHandle;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (context: Context, encoded: string) => void;
    readonly loadArray: (context: Context, array: Uint8Array) => void;
    readonly copy: (plain: PlainText) => void;
    readonly clone: () => PlainText;
    readonly move: (plain: PlainText) => void;
};
export declare const PlainTextInit: ({ loader }: LoaderOptions) => PlainTextDependencies;

export declare type PublicKeyDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly Vector: VectorConstructorOptions;
};
export declare type PublicKeyDependencies = {
    ({ Exception, ComprModeType, Vector }: PublicKeyDependencyOptions): PublicKeyConstructorOptions;
};
export declare type PublicKeyConstructorOptions = {
    (): PublicKey;
};
export declare type PublicKey = {
    readonly instance: Instance;
    readonly inject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (context: Context, encoded: string) => void;
    readonly loadArray: (context: Context, array: Uint8Array) => void;
    readonly copy: (key: PublicKey) => void;
    readonly clone: () => PublicKey;
    readonly move: (key: PublicKey) => void;
};
export declare const PublicKeyInit: ({ loader }: LoaderOptions) => PublicKeyDependencies;

export declare type RelinKeysDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly Vector: VectorConstructorOptions;
};
export declare type RelinKeysDependencies = {
    ({ Exception, ComprModeType, Vector }: RelinKeysDependencyOptions): RelinKeysConstructorOptions;
};
export declare type RelinKeysConstructorOptions = {
    (): RelinKeys;
};
export declare type RelinKeys = {
    readonly instance: Instance;
    readonly inject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly size: number;
    readonly getIndex: (keyPower: number) => number;
    readonly hasKey: (keyPower: number) => boolean;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (context: Context, encoded: string) => void;
    readonly loadArray: (context: Context, array: Uint8Array) => void;
    readonly copy: (key: RelinKeys) => void;
    readonly clone: () => RelinKeys;
    readonly move: (key: RelinKeys) => void;
};
export declare const RelinKeysInit: ({ loader }: LoaderOptions) => RelinKeysDependencies;

export declare type SchemeTypeDependencies = {
    (): SchemeTypeConstructorOptions;
};
export declare type SchemeTypeConstructorOptions = {
    (): SchemeType;
};
export declare type SchemeType = {
    readonly none: any;
    readonly bfv: any;
    readonly ckks: any;
    readonly bgv: any;
};
export declare const SchemeTypeInit: ({ loader }: LoaderOptions) => SchemeTypeDependencies;

export declare type Instance = any;
export declare type Loader = any;
export declare type Library = any;
export declare type Dependencies = any;
export declare type LoaderOptions = {
    readonly loader: Loader;
};
export declare type SEALLibrary = {
    readonly BatchEncoder: BatchEncoderConstructorOptions;
    readonly CipherText: CipherTextConstructorOptions;
    readonly CKKSEncoder: CKKSEncoderConstructorOptions;
    readonly CoeffModulus: CoeffModulus;
    readonly ComprModeType: ComprModeType;
    readonly ContextData: ContextDataConstructorOptions;
    readonly Context: ContextConstructorOptions;
    readonly Decryptor: DecryptorConstructorOptions;
    readonly EncryptionParameterQualifiers: EncryptionParameterQualifiersConstructorOptions;
    readonly EncryptionParameters: EncryptionParametersConstructorOptions;
    readonly Encryptor: EncryptorConstructorOptions;
    readonly Evaluator: EvaluatorConstructorOptions;
    readonly Exception: Exception;
    readonly GaloisKeys: GaloisKeysConstructorOptions;
    readonly KeyGenerator: KeyGeneratorConstructorOptions;
    readonly MemoryPoolHandle: MemoryPoolHandle;
    readonly Modulus: ModulusConstructorOptions;
    readonly ParmsIdType: ParmsIdTypeConstructorOptions;
    readonly PlainText: PlainTextConstructorOptions;
    readonly PlainModulus: PlainModulus;
    readonly PublicKey: PublicKeyConstructorOptions;
    readonly RelinKeys: RelinKeysConstructorOptions;
    readonly SchemeType: SchemeType;
    readonly SecretKey: SecretKeyConstructorOptions;
    readonly SecurityLevel: SecurityLevel;
    readonly Serializable: SerializableConstructorOptions;
    readonly Vector: VectorConstructorOptions;
    readonly Version: string;
};
declare type SEALConstructorOptions = {
    readonly BatchEncoder: BatchEncoderDependencies;
    readonly CipherText: CipherTextDependencies;
    readonly CKKSEncoder: CKKSEncoderDependencies;
    readonly CoeffModulus: CoeffModulusDependencies;
    readonly ComprModeType: ComprModeTypeDependencies;
    readonly ContextData: ContextDataDependencies;
    readonly Context: ContextDependencies;
    readonly Decryptor: DecryptorDependencies;
    readonly EncryptionParameterQualifiers: EncryptionParameterQualifiersDependencies;
    readonly EncryptionParameters: EncryptionParametersDependencies;
    readonly Encryptor: EncryptorDependencies;
    readonly Evaluator: EvaluatorDependencies;
    readonly Exception: ExceptionDependencies;
    readonly GaloisKeys: GaloisKeysDependencies;
    readonly KeyGenerator: KeyGeneratorDependencies;
    readonly MemoryPoolHandle: MemoryPoolHandleDependencies;
    readonly Modulus: ModulusDependencies;
    readonly ParmsIdType: ParmsIdTypeDependencies;
    readonly PlainText: PlainTextDependencies;
    readonly PlainModulus: PlainModulusDependencies;
    readonly PublicKey: PublicKeyDependencies;
    readonly RelinKeys: RelinKeysDependencies;
    readonly SchemeType: SchemeTypeDependencies;
    readonly SecretKey: SecretKeyDependencies;
    readonly SecurityLevel: SecurityLevelDependencies;
    readonly Serializable: SerializableDependencies;
    readonly Vector: VectorDependencies;
};
export declare const SEALConstructor: ({
    BatchEncoder,
    CipherText,
    CKKSEncoder,
    CoeffModulus,
    ComprModeType,
    ContextData,
    Context,
    Decryptor,
    EncryptionParameterQualifiers,
    EncryptionParameters,
    Encryptor,
    Evaluator,
    Exception,
    GaloisKeys,
    KeyGenerator,
    MemoryPoolHandle,
    Modulus,
    ParmsIdType,
    PlainText,
    PlainModulus,
    PublicKey,
    RelinKeys,
    SchemeType,
    SecretKey,
    SecurityLevel,
    Serializable,
    Vector,
}: SEALConstructorOptions) => SEALLibrary;
export {};

export declare type SecretKeyDependencyOptions = {
    readonly Exception: Exception;
    readonly ComprModeType: ComprModeType;
    readonly Vector: VectorConstructorOptions;
};
export declare type SecretKeyDependencies = {
    ({ Exception, ComprModeType, Vector }: SecretKeyDependencyOptions): SecretKeyConstructorOptions;
};
export declare type SecretKeyConstructorOptions = {
    (): SecretKey;
};
export declare type SecretKey = {
    readonly instance: Instance;
    readonly inject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
    readonly load: (context: Context, encoded: string) => void;
    readonly loadArray: (context: Context, array: Uint8Array) => void;
    readonly copy: (key: SecretKey) => void;
    readonly clone: () => SecretKey;
    readonly move: (key: SecretKey) => void;
};
export declare const SecretKeyInit: ({ loader }: LoaderOptions) => SecretKeyDependencies;

export declare type SecurityLevelDependencies = {
    (): SecurityLevelConstructorOptions;
};
export declare type SecurityLevelConstructorOptions = {
    (): SecurityLevel;
};
export declare type SecurityLevel = {
    readonly none: any;
    readonly tc128: any;
    readonly tc192: any;
    readonly tc256: any;
};
export declare const SecurityLevelInit: ({ loader }: LoaderOptions) => SecurityLevelDependencies;

export declare type SerializableDependencyOptions = {
    readonly Exception: Exception;
    readonly Vector: VectorConstructorOptions;
    readonly ComprModeType: ComprModeType;
};
export declare type SerializableDependencies = {
    ({ Exception, Vector, ComprModeType }: SerializableDependencyOptions): SerializableConstructorOptions;
};
export declare type SerializableConstructorOptions = {
    (): Serializable;
};
export declare type Serializable = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly save: (compression?: ComprModeType) => string;
    readonly saveArray: (compression?: ComprModeType) => Uint8Array;
};
export declare const SerializableInit: () => SerializableDependencies;

export declare type VectorDependencyOptions = {
    readonly Exception: Exception;
};
export declare type VectorDependencies = {
    ({ Exception }: VectorDependencyOptions): VectorConstructorOptions;
};
export declare type VectorConstructorOptions = {
    (): Vector;
};
export declare type Vector = {
    readonly instance: Instance;
    readonly unsafeInject: (instance: Instance) => void;
    readonly delete: () => void;
    readonly from: (array: VectorTypes, type?: StringTypes) => Instance;
    readonly type: string;
    readonly setType: (type: StringTypes) => void;
    readonly size: number;
    readonly getValue: (index: number) => number;
    readonly resize: (size: number, fill: number) => void;
    readonly toArray: () => VectorTypes;
};
export declare type VectorTypes = Uint8Array | Int32Array | Uint32Array | Float64Array | BigInt64Array | BigUint64Array;
export declare type StringTypes =
    | "Uint8Array"
    | "Int32Array"
    | "Uint32Array"
    | "Float64Array"
    | "BigInt64Array"
    | "BigUint64Array"
    | "Modulus";
export declare const VectorInit: ({ loader }: LoaderOptions) => VectorDependencies;
