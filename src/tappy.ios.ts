import { Common } from './tappy.common';

// definitions

export declare class TappyBleScanner {
    constructor(centralManager: CBCentralManager);
    startScan(): boolean;
    stopScan();
    centralManagerDidUpdateState(centralManager: CBCentralManager);
    setStatusListenerWithStatusReceived(statusReceived);
    setTappyFoundListenerWithListener(listener);
    public state;
}

export declare class TappyBle {
    static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;
    connect();
    disconnect();
}

export declare class TappyBleDevice {
    public deviceId: NSUUID;
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
	readonly lockFlag: LockingMode;
	readonly text: NSArray<number>;
	readonly timeout: number;
	readonly commandCode: number;
	readonly commandFamily: NSArray<number>;
	readonly payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

export declare class ScanNDEFCommand extends NSObject implements TCMPMessage {
	static alloc(): ScanNDEFCommand;
	static getCommandCode(): number;
	static new(): ScanNDEFCommand;
	readonly pollingMode: PollingMode;
	readonly timeout: number;
	readonly commandCode: number;
	readonly commandFamily: NSArray<number>;
	readonly payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare class StreamNDEFCommand extends NSObject implements TCMPMessage {
	static alloc(): StreamNDEFCommand;
	static getCommandCode(): number;
	static new(): StreamNDEFCommand;
	readonly pollingMode: PollingMode;
	readonly timeout: number;
	readonly commandCode: number;
	readonly commandFamily: NSArray<number>;
	readonly payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}


export class Tappy extends Common {

    public scanner: TappyBleScanner;
    public device: TappyBleDevice;
    private status: number;
    private tappyCentralManager: CBCentralManager;
    private tappyBle: TappyBle;
    private connectedStatus = TappyStatus.STATUS_DISCONNECTED;


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
                eventName: "statusUpdated",
                object: this,
                status: this.status
            };
            this.notify(statusUpdatedEvent);
        });

        this.scanner.setTappyFoundListenerWithListener( (tappyDevice: TappyBleDevice) => {
            console.log("Found tappy:");
            console.log(JSON.stringify(tappyDevice));
            let name = tappyDevice.name();
            console.log("!!Name:", name);
            this.device = tappyDevice;
            const tappyFoundEvent = {
                eventName: "tappyFound",
                object: this,
                device: this.device
            };
            this.notify(tappyFoundEvent);
            // let name = tappyDevice.name;
            // let deviceId = tappyDevice.deviceId;
            // console.log("Name:", name);
            // console.log("Device ID:", deviceId);
            // this.connect(tappyDevice);
        });


    }

    logDetails() {
        console.log("in TappyPlugin log details!");
        // initialize tappyCentralManager - this will handle all bluetooth stuff
        // this.tappyCentralManager = TappyCentralManagerProvider.shared().centralManager;
        // this.scanner = new TappyBleScanner(this.tappyCentralManager);
        // console.log("Setting listeners");
        // this.scanner.setStatusListenerWithStatusReceived( ( status: TappyBleScannerStatus ) => {
        //     console.log("Status changed tappyBle!");
        //     console.log("status:");
        //     console.log(status);
        //     if (status === TappyBleScannerStatus.STATUS_POWERED_ON) {
        //         console.log("It's powered on, so enable scan!");
        //         this.startScan();
        //         // setTimeout( () => {
        //         //     console.log("stopping scan now!");
        //         //     this.stopScan();
        //         // }, 5000);
        //     }
        // });
        // this.scanner.setTappyFoundListenerWithListener( (tappyDevice: TappyBleDevice) => {
        //     console.log("found tappy!");
        //     console.log("Device:");
        //     console.log(JSON.stringify(tappyDevice));
        //     let name = tappyDevice.name();
        //     console.log("!!Name:", name);
        //     let deviceId = tappyDevice.deviceId;
        //     // console.log("Name:", name);
        //     console.log("Device ID:", deviceId);
        //     // this.connect(tappyDevice);
        // });
    }

    public connect() {
        let tappyBle = TappyBle.getTappyBleWithCentralManagerDevice(this.tappyCentralManager, this.device);
        console.log("TappyBle:");
        console.log(JSON.stringify(tappyBle));
        if (tappyBle) {
            console.log("Can proceed to connect");
            this.tappyBle = tappyBle;
            // TappyBleManager.shared().tappyBle?.setStatusListener(listner: tappyStatusListener)
            // TappyBleManager.shared().tappyBle?.connect()
            // this.tappyBle.setStatusListener( (status: TappyStatus) => {
            //     console.log("Set status listener:");
            //     console.log(status);
            // });
            console.log("attempting to connect");
            let isConnected = this.tappyBle.connect();
            // undefined - we need the status listener to tell when / if it connects
            console.log("Is connected:", isConnected);
        }
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

    writeNDEF(text: string) {
        let writeText: WriteNDEFTextCommand;
    }

}
