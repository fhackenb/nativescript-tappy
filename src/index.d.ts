import { Common } from './tappy.common';
export declare class BasicNFCCommandResolver extends NSObject {
    static alloc(): BasicNFCCommandResolver;
    static new(): BasicNFCCommandResolver;
    FAMILY_ID: NSArray<number>;
    resolveCommandWithMessageError(message: TCMPMessage): TCMPMessage;
    resolveResponseWithMessageError(message: TCMPMessage): TCMPMessage;
    getNdefTextPayloadJSONWithNdefResponse(ndefResponse: NDEFFoundResponse): string;
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
export declare class HDLCParseResult extends NSObject {
    static alloc(): HDLCParseResult;
    static new(): HDLCParseResult;
    constructor(o: {
        bytes: NSArray<number>;
        packets: NSArray<NSArray<number>>;
        remainder: NSArray<number>;
    });
    getBytes(): NSArray<number>;
    getPackets(): NSArray<NSArray<number>>;
    getRemainder(): NSArray<number>;
    initWithBytesPacketsRemainder(bytes: NSArray<number>, packets: NSArray<NSArray<number>>, remainder: NSArray<number>): this;
}
export declare const enum LockingMode {
    DONT_LOCK_TAG = 0,
    LOCK_TAG = 1,
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
export declare const enum PollingMode {
    PollForType1 = 1,
    PollForGeneral = 2,
}
export declare class RawTCMPMesssage extends NSObject implements TCMPMessage {
    static alloc(): RawTCMPMesssage;
    static new(): RawTCMPMesssage;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    constructor(o: {
        commandCode: number;
        commandFamily: NSArray<number>;
        payload: NSArray<number>;
    });
    constructor(o: {
        message: NSArray<number>;
    });
    initWithCommandCodeCommandFamilyPayload(commandCode: number, commandFamily: NSArray<number>, payload: NSArray<number>): this;
    initWithMessageError(message: NSArray<number>): this;
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
    constructor(o: {
        timeout: number;
        pollingMode: PollingMode;
    });
    initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class ScanTagCommand extends NSObject implements TCMPMessage {
    static alloc(): ScanTagCommand;
    static getCommandCode(): number;
    static new(): ScanTagCommand;
    pollingMode: PollingMode;
    timeout: number;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    constructor(o: {
        timeout: number;
        pollingMode: PollingMode;
    });
    initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class StreamTagCommand extends NSObject implements TCMPMessage {
    static alloc(): StreamTagCommand;
    static getCommandCode(): number;
    static new(): StreamTagCommand;
    pollingMode: PollingMode;
    timeout: number;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    constructor(o: {
        timeout: number;
        pollingMode: PollingMode;
    });
    initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
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
    setResponseListenerJSONWithListener(listener: (p1: TCMPMessage, p2: string) => void): void;
    setResponseListenerWithListener(listener: (p1: TCMPMessage, p2: any) => void): void;
    setStatusListenerWithListner(listner: (p1: TappyStatus) => void): void;
    setUnparsablePacketListenerWithListener(listener: (p1: NSArray<number>) => void): void;
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
    constructor(o: {
        timeout: number;
        pollingMode: PollingMode;
    });
    initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class StopCommand extends NSObject implements TCMPMessage {
    static alloc(): StopCommand;
    static getCommandCode(): number;
    static new(): StopCommand;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class TCMP extends NSObject {
    static alloc(): TCMP;
    static new(): TCMP;
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
export declare var TCMPTappyVersionNumber: number;
export declare var TCMPTappyVersionString: interop.Reference<number>;
export declare class TCMPUtils extends NSObject {
    static alloc(): TCMPUtils;
    static calculateCRCWithData(data: NSArray<number>): NSArray<number>;
    static containsHdlcEndpointWithPacket(packet: NSArray<number>): boolean;
    static hdlcDecodePacketWithFrameError(frame: NSArray<number>): NSArray<number>;
    static hdlcEncodePacketWithPacket(packet: NSArray<number>): NSArray<number>;
    static new(): TCMPUtils;
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
export declare class TappyBle extends SerialTappy {
    static alloc(): TappyBle;
    static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;
    static new(): TappyBle;
}
export declare class TappyBleCommunicator extends NSObject {
    static alloc(): TappyBleCommunicator;
    static getTappyBleCommunicatorWithCentralManagerDeviceId(centralManager: CBCentralManager, deviceId: NSUUID): TappyBleCommunicator;
    static new(): TappyBleCommunicator;
    error: NSError;
    state: TappyStatus;
    centralManagerDidConnectPeripheral(central: CBCentralManager, peripheral: CBPeripheral): void;
    centralManagerDidDisconnectPeripheralError(central: CBCentralManager, peripheral: CBPeripheral, error: NSError): void;
    centralManagerDidFailToConnectPeripheralError(central: CBCentralManager, peripheral: CBPeripheral, error: NSError): void;
    centralManagerDidUpdateState(central: CBCentralManager): void;
    close(): void;
    connect(): void;
    disconnect(): void;
    getDeviceDescription(): string;
    peripheralDidDiscoverCharacteristicsForServiceError(peripheral: CBPeripheral, service: CBService, error: NSError): void;
    peripheralDidDiscoverServices(peripheral: CBPeripheral, error: NSError): void;
    peripheralDidUpdateValueForCharacteristicError(peripheral: CBPeripheral, characteristic: CBCharacteristic, error: NSError): void;
    peripheralDidWriteValueForCharacteristicError(peripheral: CBPeripheral, characteristic: CBCharacteristic, error: NSError): void;
    removeDataListener(): void;
    removeStatusListener(): void;
    sendBytesWithData(data: NSArray<number>): void;
    setDataListenerWithReceivedBytes(listener: (p1: NSArray<number>) => void): void;
    setStatusListenerWithStatusReceived(listener: (p1: TappyStatus) => void): void;
}
export declare class TappyBleDevice extends NSObject {
    static alloc(): TappyBleDevice;
    static new(): TappyBleDevice;
    deviceId: NSUUID;
    deviceName: string;
    name(): string;
}
export declare class TappyBleDeviceDefinition extends NSObject {
    static alloc(): TappyBleDeviceDefinition;
    static getRxCharacteristicUuid(): CBUUID;
    static getSerialServiceUuid(): CBUUID;
    static getTxCharacteristicUuid(): CBUUID;
    static isTappyDeviceNameWithDevice(device: CBPeripheral): boolean;
    static new(): TappyBleDeviceDefinition;
}
export declare class TappyBleScanner extends NSObject {
    static alloc(): TappyBleScanner;
    static new(): TappyBleScanner;
    centralManager: CBCentralManager;
    state: TappyBleScannerStatus;
    statusListener: (p1: TappyBleScannerStatus) => void;
    tappyFoundListener: (p1: TappyBleDevice, p2: string) => void;
    constructor(o: {
        centralManager: CBCentralManager;
    });
    centralManagerDidDiscoverPeripheralAdvertisementDataRSSI(central: CBCentralManager, peripheral: CBPeripheral, advertisementData: NSDictionary<string, any>, RSSI: number): void;
    centralManagerDidUpdateState(central: CBCentralManager): void;
    initWithCentralManager(centralManager: CBCentralManager): this;
    removeStatusListener(): void;
    removeTappyFoundListener(): void;
    setStatusListenerWithStatusReceived(listener: (p1: TappyBleScannerStatus) => void): void;
    setTappyFoundListenerJSONWithListener(listener: (p1: TappyBleDevice, p2: string) => void): void;
    setTappyFoundListenerWithListener(listener: (p1: TappyBleDevice, p2: string) => void): void;
    startScan(): boolean;
    stopScan(): void;
}
export declare const enum TappyBleScannerStatus {
    STATUS_CLOSED = 1,
    STATUS_SCANNING = 2,
    STATUS_POWERED_OFF = 3,
    STATUS_POWERED_ON = 4,
    STATUS_RESETTING = 5,
    STATUS_NOT_AUTHORIZED = 6,
    STATUS_NOT_SUPPORTED = 7,
    STATUS_UNKNOWN = 8,
}
export declare class TappyCentralManagerProvider extends NSObject {
    static alloc(): TappyCentralManagerProvider;
    static new(): TappyCentralManagerProvider;
    static shared(): TappyCentralManagerProvider;
    centralManager: CBCentralManager;
}
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
export declare var TappySerialCommunicator: {
    prototype: TappySerialCommunicator;
};
export declare const enum TappyStatus {
    STATUS_DISCONNECTED = 1,
    STATUS_CONNECTING = 2,
    STATUS_READY = 3,
    STATUS_DISCONNECTING = 4,
    STATUS_CLOSED = 5,
    STATUS_ERROR = 6,
    STATUS_NOT_READY_TO_CONNECT = 7,
    STATUS_COMMUNICATOR_ERROR = 8,
}
export declare class WriteNDEFTextCommand extends NSObject implements TCMPMessage {
    static alloc(): WriteNDEFTextCommand;
    static new(): WriteNDEFTextCommand;
    lockFlag: LockingMode;
    text: NSArray<number>;
    timeout: number;
    commandCode: number;
    commandFamily: NSArray<number>;
    payload: NSArray<number>;
    constructor(o: {
        timeout: number;
        lockTag: LockingMode;
        text: string;
    });
    initWithTimeoutLockTagText(timeout: number, lockTag: LockingMode, text: string): this;
    parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
export declare class Tappy extends Common {
    scanner: TappyBleScanner;
    device: TappyBleDevice;
    private status;
    private tappyCentralManager;
    private tappyBle;
    private connectedStatus;
    private timeout;
    private readWristbandCommand;
    private scanTagCommand;
    private streamTagCommand;
    private stopCommand;
    constructor();
    connect(): void;
    setResponseListener(): void;
    disconnect(): void;
    startScan(): boolean;
    stopScan(): void;
    writeNDEF(text: string, timeout?: number, lockTag?: LockingMode): Boolean;
    readNDEF(): Boolean;
    stop(): Boolean;
    scanTag(): Boolean;
    streamTag(): boolean;
}
