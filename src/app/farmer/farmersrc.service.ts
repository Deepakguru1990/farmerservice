import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})

export class FarmerSrc {

  web3: any;
  CounterContract: any;
  contractInstance: any;
  count: number;
  lastTransactionID: any;

  constructor(private http: Http) {

    this.lastTransactionID = '';
    this.http.get('assets/abiDefinition.json').subscribe(abi => {
      // const abi = JSON.parse('[{"constant":false,"inputs":[],"name":"decrement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"counts","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCounts","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"increment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      // this.CounterContract = this.web3.eth.contract(abi);
      this.CounterContract = this.web3.eth.contract(abi.json());
      this.contractInstance = this.CounterContract.at('0xd22b9ceaf89a58fd756710e749b73d59d2776ff4');
      this.count = this.contractInstance.getCounts.call().toString();
    });
  }

  createAsset() {
    this.contractInstance.createAsset({ from: this.web3.eth.accounts[0] }, this.handler.bind(this));
    this.count = this.contractInstance.getCounts.call().toString();
  }

  transferInitiate() {
    this.contractInstance.transferInitiate({ from: this.web3.eth.accounts[0] }, this.handler.bind(this));
    this.count = this.contractInstance.getCounts.call().toString();
  }

  phreceiveLot() {
    this.contractInstance.phreceiveLot({ from: this.web3.eth.accounts[0] }, this.handler.bind(this));
    this.count = this.contractInstance.getCounts.call().toString();
  }

  phrejectLot() {
    this.contractInstance.phrejectLot({ from: this.web3.eth.accounts[0] }, this.handler.bind(this));
    this.count = this.contractInstance.getCounts.call().toString();
  }

  handler(error, result) {
    console.info(error);
    console.info(result);
    this.lastTransactionID = result;
  }

}
