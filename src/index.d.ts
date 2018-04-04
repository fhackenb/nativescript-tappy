import { Common } from './tappy.common';
export interface TappySerialCommunicator {
    state: TappyStatus;
    close(): void;
    connect(): void;
    disconnect(): void;
    getDeviceDescription(): string;
    removeDataListener(): void;
    removeStatusListener(): void;
    sendBytesWithData(data: NSArray<number>): void;
    setDataListenerWithReceivedBytes(listener: (p1: NSArray<number>) => void): void;
    setStatusListenerWithStatusReceived(listener: (p1: TappyStatus) => void): void;
}
export declare class SerialTappy extends NSObject {
    static alloc(): SerialTappy;
    static new(): SerialTappy;
    constructor(o: {
        communicator: TappySerialCommunicator;
    });
    close(): void;
    connect(): void;
    disconnect(): void;
    getCommunicator(): TappySerialCommunicator;
    getDeviceDescription(): string;
    getLatestStatus(): TappyStatus;
    initWithCommunicator(communicator: TappySerialCommunicator): this;
    receiveBytesWithData(data: NSArray<number>): void;
    removeAllListeners(): void;
    removeResponseListener(): void;
    removeStatusListener(): void;
    removeUnparsablePacketListener(): void;
    sendMessageWithMessage(message: TCMPMessage): void;
    setResponseListenerWithListener(listener: (p1: TCMPMessage) => void): void;
    setStatusListenerWithListner(listner: (p1: TappyStatus) => void): void;
    setUnparsablePacketListenerWithListener(listener: (p1: NSArray<number>) => void): void;
}
export declare class TappyBleScanner {
    constructor(centralManager: CBCentralManager);
    tappyFoundListener: (p1: TappyBleDevice) => void;
    startScan(): boolean;
    stopScan(): any;
    centralManagerDidUpdateState(centralManager: CBCentralManager): any;
    setStatusListenerWithStatusReceived(statusReceived: any): any;
    setTappyFoundListenerWithListener(listener: any, name: any): any;
    state: any;
}
export declare class TappyBle extends SerialTappy {
    static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;
    connect(): any;
    disconnect(): any;
}
export declare class TappyBleDevice extends NSObject {
    deviceId: NSUUID;
    deviceName: string;
    name(): string;
}
export declare enum TappyBleScannerStatus {
    STATUS_CLOSED = 1,
    STATUS_SCANNING = 2,
    STATUS_POWERED_OFF = 3,
    STATUS_POWERED_ON = 4,
    STATUS_RESETTING = 5,
    STATUS_NOT_AUTHORIZED = 6,
    STATUS_NOT_SUPPORTED = 7,
    STATUS_UNKNOWN = 8,
}
export declare enum LockingMode {
    DONT_LOCK_TAG = 0,
    LOCK_TAG = 1,
}
export declare enum TappyStatus {
    STATUS_DISCONNECTED = 1,
    STATUS_CONNECTING = 2,
    STATUS_READY = 3,
    STATUS_DISCONNECTING = 4,
    STATUS_CLOSED = 5,
    STATUS_ERROR = 6,
    STATUS_NOT_READY_TO_CONNECT = 7,
    STATUS_COMMUNICATOR_ERROR = 8,
}
export declare const enum TagTypes {
    TAG_UNKNOWN = 0,
    MIFARE_ULTRALIGHT = 1,
    NTAG203 = 2,
    MIFARE_ULTRALIGHT_C = 3,
    MIFARE_STD_CLASSIC_1K = 4,
    MIFARE_STD_CLASSIC_4K = 5,
    MIFARE_DESFIRE_EV1_2K = 6,
    TYPE_2_TAG = 7,
    MIFARE_PLUS_2K_CL2 = 8,
    MIFARE_PLUS_4K_CL2 = 9,
    MIFARE_MINI = 10,
    OTHER_TYPE4 = 11,
    MIFARE_DESFIRE_EV1_4K = 12,
    MIFARE_DESFIRE_EV1_8K = 13,
    MIFARE_DESFIRE = 14,
    TOPAZ_512 = 15,
    NTAG_210 = 16,
    NTAG_212 = 17,
    NTAG_213 = 18,
    NTAG_215 = 19,
    NTAG_216 = 20,
    TAG_TYPE_NOT_RECOGNIZED = 255,
}
export declare const enum PollingMode {
    PollForType1 = 1,
    PollForGeneral = 2,
}
export declare class TappyCentralManagerProvider {
    static shared(): TappyCentralManagerProvider;
    centralManager: any;
}
export interface TCMPMessage {
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare var TCMPMessage: {
    prototype: TCMPMessage;
};
export declare class WriteNDEFTextCommand extends NSObject implements TCMPMessage {
    static alloc(): WriteNDEFTextCommand;
    static new(): WriteNDEFTextCommand;
    lockFlag: LockingMode;
    text: NSArray<number>;
    timeout: number;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class ScanNDEFCommand extends NSObject implements TCMPMessage {
    static alloc(): ScanNDEFCommand;
    static getCommandCode(): number;
    static new(): ScanNDEFCommand;
    pollingMode: PollingMode;
    timeout: number;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class StreamNDEFCommand extends NSObject implements TCMPMessage {
    static alloc(): StreamNDEFCommand;
    static getCommandCode(): number;
    static new(): StreamNDEFCommand;
    pollingMode: PollingMode;
    timeout: number;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class BasicNfcApplicationErrorMessage extends NSObject implements TCMPMessage {
    static alloc(): BasicNfcApplicationErrorMessage;
    static new(): BasicNfcApplicationErrorMessage;
    appErrorCode: number;
    errorDescription: string;
    internalErrorCode: number;
    readerStatusCode: number;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class TagWrittenResponse extends NSObject implements TCMPMessage {
    static alloc(): TagWrittenResponse;
    static getCommandCode(): number;
    static new(): TagWrittenResponse;
    tagCode: NSArray<number>;
    tagType: TagTypes;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    constructor(o: {
        tagCode: NSArray<number>;
        tagType: TagTypes;
    });
    initWithTagCodeTagType(tagCode: NSArray<number>, tagType: TagTypes): this;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class NDEFFoundResponse extends NSObject implements TCMPMessage {
    static alloc(): NDEFFoundResponse;
    static new(): NDEFFoundResponse;
    ndefMessage: NSArray<number>;
    tagCode: NSArray<number>;
    tagType: TagTypes;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    constructor(o: {
        tagCode: NSArray<number>;
        tagType: number;
        ndefMessage: NSArray<number>;
    });
    initWithTagCodeTagTypeNdefMessage(tagCode: NSArray<number>, tagType: number, ndefMessage: NSArray<number>): this;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class Tappy extends Common {
    scanner: TappyBleScanner;
    device: TappyBleDevice;
    private status;
    private tappyCentralManager;
    private tappyBle;
    private connectedStatus;
    private readWristbandCommand;
    constructor();
    connect(): void;
    setResponseListener(): void;
    getNdefTextPayload(tagReadResponse: any): void;
    disconnect(): void;
    startScan(): boolean;
    stopScan(): void;
    writeNDEF(text: string): void;
    readNDEF(): void;
}
