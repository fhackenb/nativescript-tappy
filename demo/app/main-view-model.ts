import { Observable } from 'tns-core-modules/data/observable';
import { Tappy } from 'nativescript-tappy';

export function Prop() {
	return (target: Observable, propertyKey: string) => {
		Object.defineProperty(target, propertyKey, {
			get() {
				return this["_" + propertyKey];
			},
			set(value) {
				if (this["_" + propertyKey] === value) {
					return;
				}

				this["_" + propertyKey] = value;
				this.notifyPropertyChange(propertyKey, value);
			},
			enumerable: true,
			configurable: true
		});
	};
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
	STATUS_COMMUNICATOR_ERROR = 8
}

export class HelloWorldModel extends Observable {
  @Prop() public message: string = "Initializing Bluetooth...";
  @Prop() private canScan: Boolean = false;
  @Prop() private isScanning: Boolean = false;
  @Prop() private canConnect: Boolean = false;
  @Prop() private isConnected: Boolean = false;
  @Prop() private isReading: Boolean = false;

  private tappy: Tappy;
  private devices: any[];
  private connectedDevice: any;

  constructor() {
    super();

    console.log("Init Tappy!");
    this.tappy = new Tappy();
    // event listeners here
    console.log("Defining listeners now");
    this.defineListeners();
    // this.tappy.logDetails();
    console.log("Fin");
  }

  private defineListeners() {
    this.tappy.on("bleStatusUpdated", (eventData: any) => {
      let status = eventData.status;
      if (status === TappyBleScannerStatus.STATUS_POWERED_ON) {
        this.message = "Bluetooth Enabled. Tap to scan";
        this.canScan = true;
        this.isScanning = false;
      } else if (status === TappyBleScannerStatus.STATUS_POWERED_OFF ) {
        this.message = "Bluetooth Disabled. Enable bluetooth to scan!";
        this.canScan = false;
        this.isScanning = false;
      } else if (status === TappyBleScannerStatus.STATUS_SCANNING) {
        this.message = "Scanning for TappyBle devices ...";
        this.canScan = false;
        this.isScanning = true;
      } else {
        this.message = "Could not access bluetooth. Error code: " + status;
        this.canScan = false;
        this.isScanning = false;
      }
    });

    this.tappy.on("tappyFound", (eventData: any) => {
      let device = eventData.device;
      console.log("Found device:");
      console.log(device.deviceName);
      let name = device.deviceName;
      this.connectedDevice = device;
      console.log("Found device:" + name);
      this.canConnect = true;
      this.message = "Found device: " + name;
    });

    this.tappy.on("tappyStatusUpdated", (eventData: any) => {
       console.log("Tappy Status updated:");
       let status = eventData.status;
       console.log(status);
       if (status === TappyStatus.STATUS_CONNECTING) {
         this.message = "Connecting....";
       } else if (status === TappyStatus.STATUS_READY) {
        this.message = "Connected to " + this.connectedDevice.deviceName;
        this.isConnected = true;
        this.canScan = false;
        this.tappy.setResponseListener();
       }
    });

    this.tappy.on("writtenResponse", (eventData: any) => {
      let success = eventData.success;
      console.log("Written response:");
      console.log(eventData.success);
      if (success) {
        this.message = "Connected to " + this.connectedDevice.deviceName;
        alert("Write success!")
      } else {
        this.message = "Error writing to NFC. Please try again (slowly)";
        alert("Write error");
        setTimeout( () => {
          this.write();
        }, 2000);
      }
    });

    // on wristband data read
    this.tappy.on("ndefFoundResponse", (eventData: any) => {
      console.log("NDEF Data found!");
      let data = eventData.ndefData;
      console.log(JSON.stringify(data));
      alert("Found NDEF data: " + data.ndefText);
    });

  }

  connectTappy() {
    console.log("Connect to tappy!");
    // first stop scanning
    this.stopScan();
    this.tappy.connect();
  }

  disconnectTappy() {
    console.log("Disconnect Now!");
    this.tappy.disconnect();
    this.canScan = true;
    this.isConnected = false;
    this.message = "Bluetooth Enabled. Tap to scan";
  }


  startScan() {
    console.log("Starting scan");
    let res = this.tappy.startScan();
    console.log("Scan res:", res);
  }

  stopScan() {
    console.log("Stop scan!");
    let res = this.tappy.stopScan();
  }

  read() {
    console.log("Read!");
    this.isReading = true;
    this.tappy.readNDEF();
  }

  stop() {
    console.log("Stopping now ~~~~~~~~ ");
    this.tappy.stop();
    this.isReading = false;
  }

  write() {
    console.log("Do Write!!!");
    let text = "70cbe99a-3764-11e8-b467-0ed5f89f718b";
    this.message = "Writing text " + text + " ...";
    this.tappy.writeNDEF(text);
  }


}
