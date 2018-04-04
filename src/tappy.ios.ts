import { Common } from './tappy.common';

// definitions
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
	setResponseListenerWithListener(listener: (p1: TCMPMessage) => void): void;
	setStatusListenerWithListner(listner: (p1: TappyStatus) => void): void;
	setUnparsablePacketListenerWithListener(listener: (p1: NSArray<number>) => void): void;
}


export declare class TappyBleScanner {
    constructor(centralManager: CBCentralManager);
    tappyFoundListener: (p1: TappyBleDevice) => void;
    startScan(): boolean;
    stopScan();
    centralManagerDidUpdateState(centralManager: CBCentralManager);
    setStatusListenerWithStatusReceived(statusReceived);
    setTappyFoundListenerWithListener(listener);
    public state;
}

export declare class TappyBle extends SerialTappy{
    static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;
    connect();
    disconnect();
}

export declare class TappyBleDevice extends NSObject{
    public deviceId: NSUUID;
    public deviceName: string;
	public name(): string;
}

export declare enum TappyBleScannerStatus {
    STATUS_CLOSED = 1,
    STATUS_SCANNING = 2,
    STATUS_POWERED_OFF = 3,
    STATUS_POWERED_ON = 4,
    STATUS_RESETTING = 5,
    STATUS_NOT_AUTHORIZED = 6,
    STATUS_NOT_SUPPORTED = 7,
    STATUS_UNKNOWN = 8
}

export declare enum LockingMode {
	DONT_LOCK_TAG = 0,
	LOCK_TAG = 1
}

export declare enum TappyStatus {
	STATUS_DISCONNECTED = 1,
	STATUS_CONNECTING = 2,
	STATUS_READY = 3,
	STATUS_DISCONNECTING = 4,
	STATUS_CLOSED = 5,
	STATUS_ERROR = 6,
	STATUS_NOT_READY_TO_CONNECT = 7,
	STATUS_COMMUNICATOR_ERROR = 8
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

export declare const enum PollingMode {
	PollForType1 = 1,
	PollForGeneral = 2
}

export declare class TappyCentralManagerProvider {
    public static shared(): TappyCentralManagerProvider;
    public centralManager;
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

export declare class WriteNDEFTextCommand extends NSObject implements TCMPMessage {
	static alloc(): WriteNDEFTextCommand; 
	static new(): WriteNDEFTextCommand;
	public lockFlag: LockingMode;
	public text: NSArray<number>;
	public timeout: number;
	public commandCode: number;
	public commandFamily: NSArray<number>;
	public payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class ScanNDEFCommand extends NSObject implements TCMPMessage {
	static alloc(): ScanNDEFCommand;
	static getCommandCode(): number;
	static new(): ScanNDEFCommand;
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number;
	public commandFamily: NSArray<number>;
	public payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class StreamNDEFCommand extends NSObject implements TCMPMessage {
	static alloc(): StreamNDEFCommand;
	static getCommandCode(): number;
	static new(): StreamNDEFCommand;
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number;
	public commandFamily: NSArray<number>;
	public payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class BasicNfcApplicationErrorMessage extends NSObject implements TCMPMessage {
	static alloc(): BasicNfcApplicationErrorMessage;
	static new(): BasicNfcApplicationErrorMessage;
	public appErrorCode: number;
	public errorDescription: string;
	public internalErrorCode: number;
	public readerStatusCode: number;
	public commandCode: number;
	public commandFamily: NSArray<number>;
	public payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
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

export declare class NDEFFoundResponse extends NSObject implements TCMPMessage {
	static alloc(): NDEFFoundResponse;
	static new(): NDEFFoundResponse;
	public ndefMessage: NSArray<number>;
	public tagCode: NSArray<number>;
	public tagType: TagTypes;
	public commandCode: number;
	public commandFamily: NSArray<number>;
	public payload: NSArray<number>;
	constructor(o: { tagCode: NSArray<number>; tagType: number; ndefMessage: NSArray<number>; });
	initWithTagCodeTagTypeNdefMessage(tagCode: NSArray<number>, tagType: number, ndefMessage: NSArray<number>): this;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}


export class Tappy extends Common {

    public scanner: TappyBleScanner;
    public device: TappyBleDevice;
    private status: number;
    private tappyCentralManager: CBCentralManager;
    private tappyBle: TappyBle;
    private connectedStatus = TappyStatus.STATUS_DISCONNECTED;
    private readWristbandCommand : StreamNDEFCommand = new StreamNDEFCommand();


    constructor() {
        super();
        console.log("Initializing tappy ios");
        this.tappyCentralManager = TappyCentralManagerProvider.shared().centralManager;
        this.scanner = new TappyBleScanner(this.tappyCentralManager);
        console.log("Setting listeners");
        this.scanner.setStatusListenerWithStatusReceived( ( status: TappyBleScannerStatus ) => {
            console.log("Status changed TappyBle:");
            console.log(status);
            this.status = status;
            // need to throw this
            const statusUpdatedEvent = {
                eventName: "bleStatusUpdated",
                object: this,
                status: this.status
            };
            this.notify(statusUpdatedEvent);
        });

        // this.scanner.setTappyFoundListenerWithListener( );

        this.scanner.setTappyFoundListenerWithListener( (tappyDevice, name) => {
            console.log("Found tappy [any]:");
            console.log(JSON.stringify(tappyDevice));
            console.log("Name:", name);
            try {
                // console.dir(tappyDevice);
                // console.log("Attempting to loop through keys");
                // for (var key in tappyDevice) {
                //     console.log("key:", key);
                //     // console.log("value:");
                //     // console.dir(tappyDevice[key]);
                // }
                // console.log("Post loop through keys");

                this.device = tappyDevice;
                this.device.deviceName = name;
                const tappyFoundEvent = {
                    eventName: "tappyFound",
                    object: this,
                    device: this.device
                };
                console.log("notifying");
                this.notify(tappyFoundEvent);
                console.log("post notify");
            } catch( err ) {
                console.log("err:");
                console.log(JSON.stringify(err));
            }
        });


    }

    public connect() {
        let tappyBle = TappyBle.getTappyBleWithCentralManagerDevice(this.tappyCentralManager, this.device);
        console.log("TappyBle:");
        console.log(JSON.stringify(tappyBle));
        if (tappyBle) {
            console.log("Can proceed to connect");
            this.tappyBle = tappyBle;
            let currentStatus = this.tappyBle.getLatestStatus();
            console.log("setting status listener...");
            console.log("currentStatus:", currentStatus);
            this.tappyBle.setStatusListenerWithListner( (status: TappyStatus) => {
                const tappyStatusUpdatedEvent = {
                    eventName: "tappyStatusUpdated",
                    object: this,
                    status: status
                };
                console.log("notifying:", status);
                this.notify(tappyStatusUpdatedEvent);
            });
            console.log("attempting to connect");
            let isConnected = this.tappyBle.connect();
            // undefined - we need the status listener to tell when / if it connects
            console.log("Is connected:", isConnected);
        }
    }



    public setResponseListener() {
        console.log("setting response listener!");
        if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
            console.log("setting the listener");
            this.tappyBle.setResponseListenerWithListener( (tcmpResponse: any) => {
                console.log("Response listener");
                console.log(JSON.stringify(tcmpResponse));
                // now need to determine the response type
                let type = typeof tcmpResponse; // object
                console.log("Type is:");
                console.log(type);

                console.log("Dirred:");
                console.dir(tcmpResponse);

                console.log("Instanceof check:");
                console.log("Payload:");
                console.log(tcmpResponse.payload);
                console.log(JSON.stringify(tcmpResponse.payload));
                console.log("About to enter try{}catch...");
                try {
                    

                    if (tcmpResponse instanceof BasicNfcApplicationErrorMessage || tcmpResponse.appErrorCode) {
                        console.log("It's a BasicNfcApplicationErrorMessage!");
                    } else if (tcmpResponse instanceof NDEFFoundResponse || tcmpResponse.ndefMessage) {
                        console.log("It's a NDEFFoundResponse!");
                    } else if (tcmpResponse instanceof TagWrittenResponse || tcmpResponse.payload) {
                        console.log("It's a TagWrittenResponse!");
                    } 
                    else {
                        // it is returning here 
                        // typeof is "object"
                        console.log("Instanceof was unhelpful");
                    }
                    console.log("Defining tag type");
                    let tagType: number = TagTypes.TAG_UNKNOWN;
                    console.log(tagType);
                    // let array = [0x00,0x00,0x00,0x00,0x00,0x00,0x00];
                    let tagCode: NSArray<number> = null;// NSArray.arrayWithObjects(0x00);
                    console.log("Defined tagCode:");
                    console.dir(tagCode);
                    //NSArray.arrayWithArray([0x00,0x00,0x00,0x00,0x00,0x00,0x00]);
                    let ndefMessage: NSArray<number> = null; //NSArray.arrayWithObjects(0xD0);
                    console.log("ndefMessage:");
                    console.dir(ndefMessage);
                    let tagReadResponse: NDEFFoundResponse = new NDEFFoundResponse({tagCode, tagType, ndefMessage });
                    console.log("tag read response:");
                    console.dir(tagReadResponse);
                    // it is crashing on below line b/c payload is null
                    tagReadResponse.parsePayloadWithPayloadError(tcmpResponse.payload);
                    let textRead = this.getNdefTextPayload(tagReadResponse);

                } catch (err) {
                    console.log("Caught error");
                    console.log(JSON.stringify(err));
                }
            });
        }
    }


    public getNdefTextPayload(tagReadResponse) {
        console.log("get NDEF Payload:");
        console.log(JSON.stringify(tagReadResponse));
    }

    public disconnect() {
        console.log("Disconnect from tappy");
        this.tappyBle.disconnect();
    }

    public startScan(): boolean {
        console.log("about to start scan");
        let res = this.scanner.startScan();
        console.log("start scan res:");
        console.log(res);
        return res;
    }

    public stopScan() {
        console.log("Stop scan!");
        this.scanner.stopScan();
    }

    public writeNDEF(text: string) {
        let writeText: WriteNDEFTextCommand;
    }

    public readNDEF() {
        console.log("read wristband command:");
        console.log(this.readWristbandCommand);
        console.log(JSON.stringify(this.readWristbandCommand));
        this.tappyBle.sendMessageWithMessage(this.readWristbandCommand);
    }

}
