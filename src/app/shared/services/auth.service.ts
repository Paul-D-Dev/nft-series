import { Injectable }                                        from '@angular/core';
import detectEthereumProvider                                from '@metamask/detect-provider';
import { from, switchMap, Observable, BehaviorSubject, map } from 'rxjs';
import { maskAddress }                                       from '../utils/maskAddress';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  readonly metaAddress: BehaviorSubject<string> = new BehaviorSubject<string>('');
  readonly metaAddress$: Observable<string> = this.metaAddress.asObservable().pipe(map(address => maskAddress(address)));

  // source: https://eliteionic.com/tutorials/creating-web3-login-with-ethereum-metamask-firebase-auth/#building-the-frontend
  signInWithMetaMask(): Observable<any> {
    console.log('signInWithMetaMask')
    let ethereum: any;

    return from(detectEthereumProvider()).pipe(
      switchMap(async (provider) => {
        if (!provider) {
          throw new Error('Please install MetaMask');
        }

        ethereum = provider;
        return await ethereum.request({method: 'eth_requestAccounts'});
      }),
      switchMap(async (response: string[]) => {
        console.log(response);
        sessionStorage.setItem('publicKey', response[0])
        this.metaAddress.next(response[0]);
        // await ethereum.request({
        //   method: 'personal_sign',
        //   params: [
        //     response[0],
        //     ethereum.eth_accounts
        //   ]
        // })
      })
    )
  }

}
