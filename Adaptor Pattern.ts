interface ICommand {
  run(): void;
  undo(): void;
}

interface ILightCommand extends ICommand {
  run(): void;
  undo(): void;
}

interface IRemoteControl {
  setCommand(_command: ICommand, i: number): void;
  pressButton(i: number): void;
}

class Light {
  on(): void {
    console.log("Light is turning :  On");
  }

  off(): void {
    console.log("Light is turning : Off");
  }
}

class RemoteControl implements IRemoteControl {
  private commands: ICommand[] = [];
  private trackIndex: boolean[] = [];
  private limit: number;
  constructor(_limit: number) {
    this.limit = _limit;
    this.commands = new Array(this.limit).fill(null);
    this.trackIndex = new Array(this.limit).fill(false);
  }

  setCommand(_command: ICommand, i: number): void {
    if (i > 0 && i <= this.limit) {
      if (this.commands[i] !== null) {
        delete this.commands[i];
      }
      this.commands[i] = _command;
    } else {
      console.log(
        `We have only ${this.limit} slot, you want to get ${i}th slot.So choose slot between 1 to ${this.limit}.`,
      );
    }
  }

  pressButton(i: number): void {
    if (i > 0 && i < this.limit) {
      if (this.commands[i] !== null) {
        if (!this.trackIndex[i]) {
          this.commands[i].run();
        } else {
          this.commands[i].undo();
        }
        this.trackIndex[i] = !this.trackIndex[i];
      } else {
        console.log("Command not set for this button.");
      }
    } else {
      console.log("You entered out of the slot");
    }
  }
}

class LightCommand implements ICommand {
  private light: Light;

  constructor(_light: Light) {
    this.light = _light;
  }

  run(): void {
    this.light.on();
  }

  undo(): void {
    this.light.off();
  }
}

const l = new Light();

const LightC = new LightCommand(l);
const rc = new RemoteControl(3);
rc.setCommand(LightC, 1);
rc.pressButton(1);
rc.pressButton(13);
