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

export class HelloWorldModel extends Observable {
  @Prop() public message: string = "Initializing Bluetooth...";
  @Prop() private canScan: Boolean = false;
  @Prop() private isScanning: Boolean = false;
  @Prop() private canConnect: Boolean = false;
  @Prop() private isConnected: Boolean = false;

  private tappy: Tappy;
  private devices: any[];

  constructor() {
    super();

    console.log("Init Tappy");
    this.tappy = new Tappy();
    // event listeners here
    console.log("Defining listeners now");
    this.defineListeners();
    // this.tappy.logDetails();
    console.log("Fin!");
  }

  private defineListeners() {
    this.tappy.on("statusUpdated", (eventData: any) => {
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
      console.log("found device:");
      console.log(JSON.stringify(device));
      this.canConnect = true;
    });

  }

  connectTappy() {
    console.log("Connect to tappy:");
    // first stop scanning
    this.stopScan();
    this.tappy.connect();
    // there is no listener yet - so do a quick timeout to simulate connected
    setTimeout( () => {
      console.log("simulating connected after 5 seconds");
      this.isConnected = true;
      this.canScan = false;
    }, 5000);
  }

  disconnectTappy() {
    console.log("Disconnect!");
    this.tappy.disconnect();
    this.canScan = true;
    this.isConnected = false;
  }


  startScan() {
    console.log("starting scan:");
    let res = this.tappy.startScan();
    console.log("Scan res:", res);
  }

  stopScan() {
    console.log("Stop scan!");
    let res = this.tappy.stopScan();
  }

  testRW() {
    let text = "70cbe99a-3764-11e8-b467-0ed5f89f718b";
    // this.tappy.
  }

}
