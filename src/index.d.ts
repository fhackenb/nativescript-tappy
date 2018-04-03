import { Common } from './tappy.common';
export declare class TappyBleScanner {
    constructor(centralManager: CBCentralManager);
    startScan(): boolean;
    stopScan(): any;
    centralManagerDidUpdateState(centralManager: CBCentralManager): any;
    setStatusListenerWithStatusReceived(statusReceived: any): any;
    setTappyFoundListenerWithListener(listener: any): any;
    state: any;
}
export declare class TappyBle {
    static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;
    connect(): any;
    disconnect(): any;
}
export declare class TappyBleDevice {
    deviceId: NSUUID;
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
export declare class TappyCentralManagerProvider {
    static shared(): TappyCentralManagerProvider;
    centralManager: any;
}
export declare class Tappy extends Common {
    scanner: TappyBleScanner;
    device: TappyBleDevice;
    private status;
    private tappyCentralManager;
    private tappyBle;
    private connectedStatus;
    constructor();
    logDetails(): void;
    connect(): void;
    disconnect(): void;
    startScan(): boolean;
    stopScan(): void;
}
