import { Common } from './tappy.common';

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

export declare class TappyCentralManagerProvider {
    public static shared(): TappyCentralManagerProvider;
    public centralManager;
}



export class Tappy extends Common {

    private scanner: TappyBleScanner;
    private tappyCentralManager: CBCentralManager;

    constructor() {
        super();
        console.log("Initializing tappy ios");
    }

    logDetails() {
        console.log("in TappyPlugin log details!");
        // initialize tappyCentralManager - this will handle all bluetooth stuff
        this.tappyCentralManager = TappyCentralManagerProvider.shared().centralManager;
        this.scanner = new TappyBleScanner(this.tappyCentralManager);
        console.log("Setting listeners");
        this.scanner.setStatusListenerWithStatusReceived( ( status: TappyBleScannerStatus ) => {
            console.log("Status changed tappyBle!");
            console.log("status:");
            console.log(JSON.stringify(status));
            if (status === TappyBleScannerStatus.STATUS_POWERED_ON) {
                console.log("It's powered on, so enable scan!");
                this.startScan();
                // setTimeout( () => {
                //     console.log("stopping scan now!");
                //     this.stopScan();
                // }, 5000);
            }
        });
        this.scanner.setTappyFoundListenerWithListener( (tappyDevice: TappyBleDevice) => {
            console.log("found tappy!");
            console.log("Device:");
            console.log(JSON.stringify(tappyDevice));
            // let name = tappyDevice.name;
            let deviceId = tappyDevice.deviceId;
            // console.log("Name:", name);
            console.log("Device id:", deviceId);
            this.connect(tappyDevice);
        });
    }

    public connect(tappyDevice: TappyBleDevice) {
        let tappyBle = TappyBle.getTappyBleWithCentralManagerDevice(this.tappyCentralManager, tappyDevice);
        console.log("TappyBle:");
        console.log(JSON.stringify(tappyBle));
        if (tappyBle) {
            console.log("Can proceed to connect");
            // TappyBleManager.shared()
        }
    }

    public startScan() {
        console.log("about to start scan");
        let res = this.scanner.startScan();
        console.log("start scan res:");
        console.log(res);
    }

    public stopScan() {
        console.log("Stop scan!");
        this.scanner.stopScan();
    }

}
