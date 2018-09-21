pragma solidity ^0.4.0;
    
	//Smart contracts created for meat traceability for Sysco Foods. Network includes Farmer/ ProcessingHouse/ Warehouse/ Distributor/ Food Service Operator
	//Created on: Sep 7, 2018
	//Created by: RCLADM - Blockchain WG
	//PH - ProcessingHouse, WH - Warehouse, Dist - Distributor, FSO - Food Service Operator
	//Assumptions - 
	/*
"0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db","0x583031d1113ad414f02576bd6afabfb302140225","FMRID001","LOTID001","CertID001",20180830010101,false
"PHID001",20180921091010
	
	
	*/
	
contract farmerContract {
    
	//Contract between the Farmer and the processing House to agree on the the Lot created & sent by the Farmer.
	
	//variables declaration
	enum AssetState { ContractCreated, AssetCreated, TransfertoPH, LotApprovedbyPH, LotRejectedbyPH, InProgress, Completed, AcceptedRejectedlotCompleted }

    AssetState public state;
    address public  farmer;
    address public  processingHouse;
    address public  warehouse;
    address public  distributor;
    string public farmerID;
	string public lotID;
    string public phID;
    string public certificateID;
    
    bool public present;
    uint256 public timeIn;
    uint256 public timeOut;
	
    modifier isFarmer() {
        require(msg.sender == farmer);
        _;
    }

    modifier isProcessingHouse() {
        require(msg.sender == processingHouse);
        _;
    }

    modifier isWarehouse() {
        require(msg.sender == warehouse);
        _;
    }

    modifier isDistributor() {
        require(msg.sender == distributor);
        _;
    }	

    //inputs: "0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","FMRID001","LOTID001","PHID001","CertID001",20180830010101,20180830010110,false
	
	//constructor creation for farmer contract - called when Farmer initiates transaction by creating lotID
	constructor (address _farmer, address _processingHouse, address _warehouse, address _distributor, string _farmerID, string _lotID, string _certificateID, uint256 _timeIn, bool _present) public {
       
  	    farmer = _farmer;
        processingHouse = _processingHouse; 
        warehouse = _warehouse;
        distributor = _distributor;    
		
        state = AssetState.ContractCreated;
    }      

	//Farmer transfers the lot to the ProcessingHouse
	function createAsset(string _farmerID, string _lotID, string _certificateID, string _phID, uint256 _timeIn, uint256 _timeOut, bool _present) public isFarmer {        

		if (state != AssetState.ContractCreated) {
			revert();
		}

		farmerID = _farmerID; 
		lotID = _lotID;
		certificateID = _certificateID;
		timeIn = _timeIn;
		present = _present;				
						
        state = AssetState.AssetCreated;
    }    	    
	
	
	//Farmer transfers the lot to the ProcessingHouse
	function transferInitiate(string _phID, uint256 _timeOut) public isFarmer {        

		if (state != AssetState.AssetCreated) {
			revert();
		}
		phID = _phID;
		timeOut = _timeOut;
						
        state = AssetState.TransfertoPH;
    }    	
	
	//ProcessingHouse receives the lotID sent by the farmer after auditing
	function phreceiveLot() public isProcessingHouse {        

		if (state != AssetState.TransfertoPH) {
			revert();
		}			
        
		state = AssetState.LotApprovedbyPH;
		
    }    	
	//ProcessingHouse rejects the lot sent by the farmer in case if the quality of the meat is not good
	
	function phrejectLot() public isProcessingHouse {        

		if (state != AssetState.TransfertoPH) {
			revert();
		}
						
        state = AssetState.LotRejectedbyPH;
    }    		

}
