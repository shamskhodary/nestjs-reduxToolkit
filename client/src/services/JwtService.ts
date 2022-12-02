class JwtService {
  private static tokenName = 'token'

  public static get():string | null {
    return localStorage.getItem(this.tokenName)
  }

  public static set(token:string):void {
    return localStorage.setItem(this.tokenName, token)
  }

  public static clear():void {
    return localStorage.removeItem(this.tokenName)
  }
}

export default JwtService
