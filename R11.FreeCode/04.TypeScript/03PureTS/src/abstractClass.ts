abstract class TakePhoto {
  constructor(
    public cameraMode: string,
    public filter: string) { }

  abstract getSepia(): void
  getReelTime(): number {
    return 8
  }

}
// error ---> cannot create an instance of an abstract class
//const hc = new TakePhoto("test", "test")

class Mobile extends TakePhoto {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burst: number
  ) {
    super(cameraMode, filter)
  }

  getSepia(): void {

  }
}

const m1 = new Mobile("test", "test", 1)
m1.getReelTime()