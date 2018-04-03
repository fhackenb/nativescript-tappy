import { Common } from './tappy.common';

export declare class TappyBleScanner {
    constructor(centralManager: CBCentralManager);
    startScan();
    centralManagerDidUpdateState(centralManager: CBCentralManager);
    setStatusListener(statusReceived);
    setTappyFoundListener(listener);
    public state;
}

export declare class TappyBle {

}

export declare class TappyBleScannerStatus {
    static getString(): String;
}

export declare class TappyCentralManagerProvider {
    public static shared(): TappyCentralManagerProvider;
    public centralManager;
}



export class Tappy extends Common {

    private scanner: TappyBleScanner;
    private tappyCentralManager: CBCentralManager;

    logDetails() {
        console.log("in TappyPlugin log details!");
        console.log("TappyBle:");
        console.log(TappyBle);
        console.log("Scanner:");
        console.log(TappyBleScanner);
        // next step will be to figure out how to initialize a TappyBleScanner object
        this.tappyCentralManager = TappyCentralManagerProvider.shared().centralManager;
        // CBCentralManager.alloc().initWithDelegateQueue(this, null);
        console.log("tappyCentralManager:");
        console.log(JSON.stringify(this.tappyCentralManager));
        this.scanner = new TappyBleScanner(this.tappyCentralManager);
        console.log("scanner:");
        console.log(this.scanner);
        console.log("stringified:");
        console.log(JSON.stringify(this.scanner));
        // this.scanner.centralManagerDidUpdateState(this.tappyCentralManager);
        console.log("post did update state");
        // Doesn't work - this.scanner.setStatusListener is not a function
        // this.scanner.setStatusListener(this.tappyBleScannerStatusListener);
        // this.scanner.setTappyFoundListener(this.tappyBleFoundListener);
        console.log("set listeners. Now attempt to start scanning");
        // returns false every time - I think something about how I'm initializing the Core Bluetooth stuff is causing this
        let res = this.scanner.startScan();
        console.log("start scan res:");
        console.log(res);
        console.log("End");
    }

    public tappyBleScannerStatusListener() {
        console.log("status changed tappyBle!");
    }

    public tappyBleFoundListener() {
        console.log("found tappy?");
    }
}
