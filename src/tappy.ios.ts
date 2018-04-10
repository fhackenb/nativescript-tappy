import { Common } from './tappy.common';




// definitions


export declare class BasicNFCCommandResolver extends NSObject {
	static alloc(): BasicNFCCommandResolver; // inherited from NSObject
	static new(): BasicNFCCommandResolver; // inherited from NSObject
	public FAMILY_ID: NSArray<number>;
	resolveCommandWithMessageError(message: TCMPMessage): TCMPMessage;
	resolveResponseWithMessageError(message: TCMPMessage): TCMPMessage;
	getNdefTextPayloadJSONWithNdefResponse(ndefResponse: NDEFFoundResponse): string;
}

export declare class BasicNfcApplicationErrorMessage extends NSObject implements TCMPMessage {
	static alloc(): BasicNfcApplicationErrorMessage; // inherited from NSObject
	static new(): BasicNfcApplicationErrorMessage; // inherited from NSObject
	public appErrorCode: number;
	public errorDescription: string;
	public internalErrorCode: number;
	public readerStatusCode: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class HDLCParseResult extends NSObject {
	static alloc(): HDLCParseResult; // inherited from NSObject
	static new(): HDLCParseResult; // inherited from NSObject
	constructor(o: { bytes: NSArray<number>; packets: NSArray<NSArray<number>>; remainder: NSArray<number>; });
	getBytes(): NSArray<number>;
	getPackets(): NSArray<NSArray<number>>;
	getRemainder(): NSArray<number>;
	initWithBytesPacketsRemainder(bytes: NSArray<number>, packets: NSArray<NSArray<number>>, remainder: NSArray<number>): this;
}

export declare const enum LockingMode {
	DONT_LOCK_TAG = 0,
	LOCK_TAG = 1
}

export declare class NDEFFoundResponse extends NSObject implements TCMPMessage {
	static alloc(): NDEFFoundResponse; // inherited from NSObject
	static new(): NDEFFoundResponse; // inherited from NSObject
	public ndefMessage: NSArray<number>;
	public tagCode: NSArray<number>;
	public tagType: TagTypes;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { tagCode: NSArray<number>; tagType: number; ndefMessage: NSArray<number>; });
	initWithTagCodeTagTypeNdefMessage(tagCode: NSArray<number>, tagType: number, ndefMessage: NSArray<number>): this;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare const enum PollingMode {
	PollForType1 = 1,
	PollForGeneral = 2
}

export declare class RawTCMPMesssage extends NSObject implements TCMPMessage {
	static alloc(): RawTCMPMesssage; // inherited from NSObject
	static new(): RawTCMPMesssage; // inherited from NSObject
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { commandCode: number; commandFamily: NSArray<number>; payload: NSArray<number>; });
	constructor(o: { message: NSArray<number>; });
	initWithCommandCodeCommandFamilyPayload(commandCode: number, commandFamily: NSArray<number>, payload: NSArray<number>): this;
	initWithMessageError(message: NSArray<number>): this;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class ScanNDEFCommand extends NSObject implements TCMPMessage {
	static alloc(): ScanNDEFCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): ScanNDEFCommand; // inherited from NSObject
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { timeout: number; pollingMode: PollingMode; });
	initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class SerialTappy extends NSObject {
	static alloc(): SerialTappy; // inherited from NSObject
	static new(): SerialTappy; // inherited from NSObject
	constructor(o: { communicator: TappySerialCommunicator; });
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
	static alloc(): StreamNDEFCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): StreamNDEFCommand; // inherited from NSObject
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { timeout: number; pollingMode: PollingMode; });
	initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class StopCommand extends NSObject implements TCMPMessage {
	static alloc(): StopCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): StopCommand; // inherited from NSObject
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class TCMP extends NSObject {
	static alloc(): TCMP; // inherited from NSObject
	static new(): TCMP; // inherited from NSObject
}

export declare interface TCMPMessage {
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
	static alloc(): TCMPUtils; // inherited from NSObject
	static calculateCRCWithData(data: NSArray<number>): NSArray<number>;
	static containsHdlcEndpointWithPacket(packet: NSArray<number>): boolean;
	static hdlcDecodePacketWithFrameError(frame: NSArray<number>): NSArray<number>;
	static hdlcEncodePacketWithPacket(packet: NSArray<number>): NSArray<number>;
	static new(): TCMPUtils; // inherited from NSObject
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
	TAG_TYPE_NOT_RECOGNIZED = 255
}

export declare class TagWrittenResponse extends NSObject implements TCMPMessage {
	static alloc(): TagWrittenResponse; // inherited from NSObject
	static getCommandCode(): number;
	static new(): TagWrittenResponse; // inherited from NSObject
	public tagCode: NSArray<number>;
	public tagType: TagTypes;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { tagCode: NSArray<number>; tagType: TagTypes; });
	initWithTagCodeTagType(tagCode: NSArray<number>, tagType: TagTypes): this;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class TappyBle extends SerialTappy {
	static alloc(): TappyBle; // inherited from NSObject
	static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;
	static new(): TappyBle; // inherited from NSObject
}

export declare class TappyBleCommunicator extends NSObject {
	static alloc(): TappyBleCommunicator; // inherited from NSObject
	static getTappyBleCommunicatorWithCentralManagerDeviceId(centralManager: CBCentralManager, deviceId: NSUUID): TappyBleCommunicator;
	static new(): TappyBleCommunicator; // inherited from NSObject
	error: NSError;
	public state: TappyStatus;
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
	static alloc(): TappyBleDevice; // inherited from NSObject
	static new(): TappyBleDevice; // inherited from NSObject
	deviceId: NSUUID;
	deviceName: string;
	name(): string;
}

export declare class TappyBleDeviceDefinition extends NSObject {
	static alloc(): TappyBleDeviceDefinition; // inherited from NSObject
	static getRxCharacteristicUuid(): CBUUID;
	static getSerialServiceUuid(): CBUUID;
	static getTxCharacteristicUuid(): CBUUID;
	static isTappyDeviceNameWithDevice(device: CBPeripheral): boolean;
	static new(): TappyBleDeviceDefinition; // inherited from NSObject
}

export declare class TappyBleScanner extends NSObject {
	static alloc(): TappyBleScanner; // inherited from NSObject
	static new(): TappyBleScanner; // inherited from NSObject
	centralManager: CBCentralManager;
	state: TappyBleScannerStatus;
	statusListener: (p1: TappyBleScannerStatus) => void;
	tappyFoundListener: (p1: TappyBleDevice, p2: string) => void;
	constructor(o: { centralManager: CBCentralManager; });
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
	STATUS_UNKNOWN = 8
}

export declare class TappyCentralManagerProvider extends NSObject {
	static alloc(): TappyCentralManagerProvider; // inherited from NSObject
	static new(): TappyCentralManagerProvider; // inherited from NSObject
	static shared(): TappyCentralManagerProvider;
	centralManager: CBCentralManager;
}

export declare interface TappySerialCommunicator {
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
	STATUS_COMMUNICATOR_ERROR = 8
}

export declare class WriteNDEFTextCommand extends NSObject implements TCMPMessage {
	static alloc(): WriteNDEFTextCommand; // inherited from NSObject
	static new(): WriteNDEFTextCommand; // inherited from NSObject
	public lockFlag: LockingMode;
	public text: NSArray<number>;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { timeout: number; lockTag: LockingMode; text: string; });
	initWithTimeoutLockTagText(timeout: number, lockTag: LockingMode, text: string): this;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}



export class Tappy extends Common {

    public scanner: TappyBleScanner;
    public device: TappyBleDevice;
    private status: number;
    private tappyCentralManager: CBCentralManager;
    private tappyBle: TappyBle;
    private connectedStatus = TappyStatus.STATUS_DISCONNECTED;
    private timeout = 0;
    private readWristbandCommand : StreamNDEFCommand = new StreamNDEFCommand({timeout: 0, pollingMode: PollingMode.PollForGeneral});
	private stopCommand : StopCommand = new StopCommand();


    constructor() {
        super();
        this.tappyCentralManager = TappyCentralManagerProvider.shared().centralManager;
        this.scanner = new TappyBleScanner( {centralManager: this.tappyCentralManager });
        this.scanner.setStatusListenerWithStatusReceived( ( status: TappyBleScannerStatus ) => {
            this.status = status;
            // need to throw this
            const statusUpdatedEvent = {
                eventName: "bleStatusUpdated",
                object: this,
                status: this.status
            };
            this.notify(statusUpdatedEvent);
        });
		
        this.scanner.setTappyFoundListenerJSONWithListener( (tappyDevice: TappyBleDevice, json: string) => {
            try {
                this.device = tappyDevice;
				if (json) {
					let data = JSON.parse(json);
					this.device.deviceName = data.deviceName;
					this.device.deviceId = data.deviceId;
					const tappyFoundEvent = {
						eventName: "tappyFound",
						object: this,
						device: this.device
					};
                	this.notify(tappyFoundEvent);	
				}
            } catch( err ) {
                console.log("tappy found err :");
                console.log(JSON.stringify(err));
            }
        });


    }

    public connect() {
        let tappyBle = TappyBle.getTappyBleWithCentralManagerDevice(this.tappyCentralManager, this.device);
        if (tappyBle) {
            this.tappyBle = tappyBle;
            let currentStatus = this.tappyBle.getLatestStatus();
            this.tappyBle.setStatusListenerWithListner( (status: TappyStatus) => {
                const tappyStatusUpdatedEvent = {
                    eventName: "tappyStatusUpdated",
                    object: this,
                    status: status
                };
                this.notify(tappyStatusUpdatedEvent);
            });
            this.tappyBle.connect();
        }
    }



    public setResponseListener() {
        if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
            this.tappyBle.setResponseListenerJSONWithListener( (tcmpResponse: any, data) => {
				try{
					let basicNFCResolver: BasicNFCCommandResolver = new BasicNFCCommandResolver();
					let resolvedResponse: TCMPMessage = basicNFCResolver.resolveResponseWithMessageError(tcmpResponse);
					// now need to determine the response type
					let responseName = resolvedResponse.toString();
					let dataObj = JSON.parse(data);

					if (responseName.includes("NDEFFoundResponse")) {
						let payload = dataObj.payload;
						let tagCode = NSArray.arrayWithObject(0x00);
						let tagType = TagTypes.TAG_UNKNOWN;
						let ndefMessage = NSArray.arrayWithObject(0xD0);
						let tagReadResponse : NDEFFoundResponse = new NDEFFoundResponse({tagCode, tagType, ndefMessage});
						tagReadResponse.parsePayloadWithPayloadError(payload) //no need to handle exception here since the resolver would not have returned otherwise
						// now need to parse the payload
						try {
							let ndefDataString = basicNFCResolver.getNdefTextPayloadJSONWithNdefResponse(tagReadResponse);
							if (ndefDataString) {
								let ndefData = JSON.parse(ndefDataString);
								dataObj.ndefText = ndefData.ndef.slice(6, ndefData.ndef.length);
								dataObj.tagCode = ndefData.tagCode;
								
								const ndefFoundResponseEvent = {
									eventName: "ndefFoundResponse",
									object: this,
									ndefData: dataObj
								};
								this.notify(ndefFoundResponseEvent);
							}
						} catch (err) {
							console.log("NDEF data string error...");
							console.log(err);
						}
					} else if (responseName.includes("BasicNfcApplicationErrorMessage")) {
						// notify error
						const writtenResponseEvent = {
							eventName: "writtenResponse",
							object: this,
							success: false
						};
						this.notify(writtenResponseEvent);
					} else if (responseName.includes("TagWrittenResponse")) {
						// notify success
						const writtenResponseEvent = {
							eventName: "writtenResponse",
							object: this,
							success: true
						};
						this.notify(writtenResponseEvent);
					} else {
						// unknown error
						const writtenResponseEvent = {
							eventName: "writtenResponse",
							object: this,
							success: false
						};
						this.notify(writtenResponseEvent);
					}
				} catch (err) {
					console.log("Caught error in responseListener");
					console.log(JSON.stringify(err));
					console.log(err);
				}
            });
        }
    }


    public disconnect() {
        this.tappyBle.disconnect();
    }

    public startScan(): boolean {
        let res = this.scanner.startScan();
        return res;
    }

    public stopScan() {
        this.scanner.stopScan();
    }

    public writeNDEF(text: string, timeout = 0, lockTag = LockingMode.DONT_LOCK_TAG): Boolean {
		if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
        	let writeCommand : WriteNDEFTextCommand = new WriteNDEFTextCommand({timeout, lockTag, text});
			this.tappyBle.sendMessageWithMessage(writeCommand);
			return true;
		} else {
			return false;
		}
    }

    public readNDEF(): Boolean {
		if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
        	this.tappyBle.sendMessageWithMessage(this.readWristbandCommand);
			return true;
		} else {
			return false;
		}
    }

	public stop(): Boolean {
		if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
			this.tappyBle.sendMessageWithMessage(this.stopCommand);
			return true;
		} else {
			return false;
		}
	}

}
