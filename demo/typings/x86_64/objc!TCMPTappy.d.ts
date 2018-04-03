
declare class BasicNFCCommandResolver extends NSObject {

	static alloc(): BasicNFCCommandResolver; // inherited from NSObject

	static new(): BasicNFCCommandResolver; // inherited from NSObject

	readonly FAMILY_ID: NSArray<number>;

	resolveCommandWithMessageError(message: TCMPMessage): TCMPMessage;

	resolveResponseWithMessageError(message: TCMPMessage): TCMPMessage;
}

declare class BasicNfcApplicationErrorMessage extends NSObject implements TCMPMessage {

	static alloc(): BasicNfcApplicationErrorMessage; // inherited from NSObject

	static new(): BasicNfcApplicationErrorMessage; // inherited from NSObject

	readonly appErrorCode: number;

	readonly errorDescription: string;

	readonly internalErrorCode: number;

	readonly readerStatusCode: number;

	readonly commandCode: number; // inherited from TCMPMessage

	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage

	readonly payload: NSArray<number>; // inherited from TCMPMessage

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare class HDLCParseResult extends NSObject {

	static alloc(): HDLCParseResult; // inherited from NSObject

	static new(): HDLCParseResult; // inherited from NSObject

	constructor(o: { bytes: NSArray<number>; packets: NSArray<NSArray<number>>; remainder: NSArray<number>; });

	getBytes(): NSArray<number>;

	getPackets(): NSArray<NSArray<number>>;

	getRemainder(): NSArray<number>;

	initWithBytesPacketsRemainder(bytes: NSArray<number>, packets: NSArray<NSArray<number>>, remainder: NSArray<number>): this;
}

declare const enum LockingMode {

	DONT_LOCK_TAG = 0,

	LOCK_TAG = 1
}

declare class NDEFFoundResponse extends NSObject implements TCMPMessage {

	static alloc(): NDEFFoundResponse; // inherited from NSObject

	static new(): NDEFFoundResponse; // inherited from NSObject

	readonly ndefMessage: NSArray<number>;

	readonly tagCode: NSArray<number>;

	readonly tagType: TagTypes;

	readonly commandCode: number; // inherited from TCMPMessage

	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage

	readonly payload: NSArray<number>; // inherited from TCMPMessage

	constructor(o: { tagCode: NSArray<number>; tagType: number; ndefMessage: NSArray<number>; });

	initWithTagCodeTagTypeNdefMessage(tagCode: NSArray<number>, tagType: number, ndefMessage: NSArray<number>): this;

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare const enum PollingMode {

	PollForType1 = 1,

	PollForGeneral = 2
}

declare class RawTCMPMesssage extends NSObject implements TCMPMessage {

	static alloc(): RawTCMPMesssage; // inherited from NSObject

	static new(): RawTCMPMesssage; // inherited from NSObject

	readonly commandCode: number; // inherited from TCMPMessage

	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage

	readonly payload: NSArray<number>; // inherited from TCMPMessage

	constructor(o: { commandCode: number; commandFamily: NSArray<number>; payload: NSArray<number>; });

	constructor(o: { message: NSArray<number>; });

	initWithCommandCodeCommandFamilyPayload(commandCode: number, commandFamily: NSArray<number>, payload: NSArray<number>): this;

	initWithMessageError(message: NSArray<number>): this;

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare class ScanNDEFCommand extends NSObject implements TCMPMessage {

	static alloc(): ScanNDEFCommand; // inherited from NSObject

	static getCommandCode(): number;

	static new(): ScanNDEFCommand; // inherited from NSObject

	readonly pollingMode: PollingMode;

	readonly timeout: number;

	readonly commandCode: number; // inherited from TCMPMessage

	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage

	readonly payload: NSArray<number>; // inherited from TCMPMessage

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare class SerialTappy extends NSObject {

	static alloc(): SerialTappy; // inherited from NSObject

	static new(): SerialTappy; // inherited from NSObject

	close(): void;

	connect(): void;

	disconnect(): void;

	getDeviceDescription(): string;

	receiveBytesWithData(data: NSArray<number>): void;

	removeAllListeners(): void;

	removeResponseListener(): void;

	removeStatusListener(): void;

	removeUnparsablePacketListener(): void;

	sendMessageWithMessage(message: TCMPMessage): void;

	setResponseListenerWithListener(listener: (p1: TCMPMessage) => void): void;

	setUnparsablePacketListenerWithListener(listener: (p1: NSArray<number>) => void): void;
}

declare class StreamNDEFCommand extends NSObject implements TCMPMessage {

	static alloc(): StreamNDEFCommand; // inherited from NSObject

	static getCommandCode(): number;

	static new(): StreamNDEFCommand; // inherited from NSObject

	readonly pollingMode: PollingMode;

	readonly timeout: number;

	readonly commandCode: number; // inherited from TCMPMessage

	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage

	readonly payload: NSArray<number>; // inherited from TCMPMessage

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare class TCMP extends NSObject {

	static alloc(): TCMP; // inherited from NSObject

	static new(): TCMP; // inherited from NSObject
}

interface TCMPMessage {

	commandCode: number;

	commandFamily: NSArray<number>;

	payload: NSArray<number>;

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
declare var TCMPMessage: {

	prototype: TCMPMessage;
};

declare var TCMPTappyVersionNumber: number;

declare var TCMPTappyVersionString: interop.Reference<number>;

declare class TCMPUtils extends NSObject {

	static alloc(): TCMPUtils; // inherited from NSObject

	static calculateCRCWithData(data: NSArray<number>): NSArray<number>;

	static containsHdlcEndpointWithPacket(packet: NSArray<number>): boolean;

	static hdlcDecodePacketWithFrameError(frame: NSArray<number>): NSArray<number>;

	static hdlcEncodePacketWithPacket(packet: NSArray<number>): NSArray<number>;

	static new(): TCMPUtils; // inherited from NSObject
}

declare const enum TagTypes {

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

	TAG_TYPE_NOT_RECOGNIZED = 255
}

declare class TagWrittenResponse extends NSObject implements TCMPMessage {

	static alloc(): TagWrittenResponse; // inherited from NSObject

	static getCommandCode(): number;

	static new(): TagWrittenResponse; // inherited from NSObject

	readonly tagCode: NSArray<number>;

	readonly tagType: TagTypes;

	readonly commandCode: number; // inherited from TCMPMessage

	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage

	readonly payload: NSArray<number>; // inherited from TCMPMessage

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare class TappyBle extends SerialTappy {

	static alloc(): TappyBle; // inherited from NSObject

	static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;

	static new(): TappyBle; // inherited from NSObject
}

declare class TappyBleDevice extends NSObject {

	static alloc(): TappyBleDevice; // inherited from NSObject

	static new(): TappyBleDevice; // inherited from NSObject

	deviceId: NSUUID;

	name(): string;
}

declare class TappyBleDeviceDefinition extends NSObject {

	static alloc(): TappyBleDeviceDefinition; // inherited from NSObject

	static getRxCharacteristicUuid(): CBUUID;

	static getSerialServiceUuid(): CBUUID;

	static getTxCharacteristicUuid(): CBUUID;

	static isTappyDeviceNameWithDevice(device: CBPeripheral): boolean;

	static new(): TappyBleDeviceDefinition; // inherited from NSObject
}

declare class TappyBleScanner extends NSObject {

	static alloc(): TappyBleScanner; // inherited from NSObject

	static new(): TappyBleScanner; // inherited from NSObject

	constructor(o: { centralManager: CBCentralManager; });

	centralManagerDidDiscoverPeripheralAdvertisementDataRSSI(central: CBCentralManager, peripheral: CBPeripheral, advertisementData: NSDictionary<string, any>, RSSI: number): void;

	centralManagerDidUpdateState(central: CBCentralManager): void;

	initWithCentralManager(centralManager: CBCentralManager): this;

	removeStatusListener(): void;

	removeTappyFoundListener(): void;

	setStatusListenerWithStatusReceived(listener: (p1: TappyBleScannerStatus) => void): void;

	setTappyFoundListenerWithListener(listener: (p1: TappyBleDevice) => void): void;

	startScan(): boolean;

	stopScan(): void;
}

declare const enum TappyBleScannerStatus {

	STATUS_CLOSED = 1,

	STATUS_SCANNING = 2,

	STATUS_POWERED_OFF = 3,

	STATUS_POWERED_ON = 4,

	STATUS_RESETTING = 5,

	STATUS_NOT_AUTHORIZED = 6,

	STATUS_NOT_SUPPORTED = 7,

	STATUS_UNKNOWN = 8
}

declare class TappyCentralManagerProvider extends NSObject {

	static alloc(): TappyCentralManagerProvider; // inherited from NSObject

	static new(): TappyCentralManagerProvider; // inherited from NSObject

	static shared(): TappyCentralManagerProvider;

	centralManager: CBCentralManager;
}

declare const enum TappyStatus {

	STATUS_DISCONNECTED = 1,

	STATUS_CONNECTING = 2,

	STATUS_READY = 3,

	STATUS_DISCONNECTING = 4,

	STATUS_CLOSED = 5,

	STATUS_ERROR = 6,

	STATUS_NOT_READY_TO_CONNECT = 7,

	STATUS_COMMUNICATOR_ERROR = 8
}

declare class WriteNDEFTextCommand extends NSObject implements TCMPMessage {

	static alloc(): WriteNDEFTextCommand; // inherited from NSObject

	static new(): WriteNDEFTextCommand; // inherited from NSObject

	readonly lockFlag: LockingMode;

	readonly text: NSArray<number>;

	readonly timeout: number;

	readonly commandCode: number; // inherited from TCMPMessage

	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage

	readonly payload: NSArray<number>; // inherited from TCMPMessage

	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}
