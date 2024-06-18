// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AmazonSupplyChain {
    enum Role { None, Manufacturer, Seller, Consumer }

    struct User {
        Role role;
        string name;
        string email;
        string phoneNumber;
    }

    struct Brand {
        bytes32 id;
        string name;
        address manufacturer;
        bool isWhitelisted;
        string logoIpfsHash;
    }

    struct Product {
        bytes32 id;
        string name;
        bytes32 brandId;
        address manufacturer;
        address currentOwner;
        string details;
        bytes32 uniqueHash;
    }

    struct OwnerInfo {
        Role role;
        address ownerAddress;
    }

    struct OwnershipRequest {
        address requester;
        bool isPending;
    }

    address public admin;
    uint256 public brandCounter;
    uint256 public productCounter;

    mapping(address => User) private users;
    mapping(bytes32 => Brand) private brands;
    mapping(bytes32 => Product) private products;
    mapping(bytes32 => bytes32) private productHashes;
    mapping(bytes32 => address[]) private productOwners;
    mapping(string => string) private ipfsHash; // map(uniquelogo=>ipfshash)
    mapping(string => address) private emailToUser; // map email to user address
    mapping(bytes32 => OwnershipRequest) private ownershipRequests; // map uniqueHash to ownership request

    event UserRegistered(address indexed user, Role role, string name, string email, string phoneNumber);
    event BrandRegistered(bytes32 indexed brandId, string name, address indexed manufacturer, string logoIpfsHash);
    event BrandWhitelisted(bytes32 indexed brandId, address indexed manufacturer);
    event BrandRemovedFromWhitelist(bytes32 indexed brandId, address indexed manufacturer);
    event ProductRegistered(bytes32 indexed productId, string name, bytes32 brandId, address indexed manufacturer, string details, bytes32 uniqueHash);
    event OwnershipRequested(bytes32 indexed productId, address indexed from, address indexed to, bytes32 uniqueHash);
    event OwnershipTransferred(bytes32 indexed productId, address indexed from, address indexed to, bytes32 uniqueHash);
    event ProductVerified(bytes32 indexed productId, address indexed verifier);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyManufacturer() {
        require(users[msg.sender].role == Role.Manufacturer, "Only manufacturers can perform this action");
        _;
    }

    modifier userRegistered() {
        require(users[msg.sender].role != Role.None, "User is not registered");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerUser(Role _role, string memory _name, string memory _email, string memory _phoneNumber) public {
        require(users[msg.sender].role == Role.None, "User already registered");
        require(emailToUser[_email] == address(0), "Email already in use");

        users[msg.sender] = User(_role, _name, _email, _phoneNumber);
        emailToUser[_email] = msg.sender;

        emit UserRegistered(msg.sender, _role, _name, _email, _phoneNumber);
    }

    function registerBrand(string memory _name, string memory _logoIpfsHash) public onlyManufacturer returns (bytes32) {
        require(bytes(ipfsHash[_name]).length == 0, "Brand already registered!");

        bytes32 brandId = keccak256(abi.encodePacked(_name, msg.sender, block.timestamp));
        brandCounter++;
        brands[brandId] = Brand(brandId, _name, msg.sender, false, _logoIpfsHash);
        ipfsHash[_name] = _logoIpfsHash;
        emit BrandRegistered(brandId, _name, msg.sender, _logoIpfsHash);
        return brandId;
    }

    function getIPFSHash(string memory _brandName) public view onlyAdmin returns (string memory) {
        require(bytes(ipfsHash[_brandName]).length > 0, "File not found");
        return ipfsHash[_brandName];
    }

    function isBrandStored(string memory _brandName) public view returns(bool) {
        return bytes(ipfsHash[_brandName]).length > 0;
    }

    function whitelistBrand(bytes32 _brandId) public onlyAdmin {
        require(brands[_brandId].manufacturer != address(0), "Brand does not exist");
        brands[_brandId].isWhitelisted = true;
        emit BrandWhitelisted(_brandId, brands[_brandId].manufacturer);
    }

    function removeWhitelistedBrand(bytes32 _brandId) public onlyAdmin {
        require(brands[_brandId].manufacturer != address(0), "Brand does not exist");
        require(brands[_brandId].isWhitelisted, "Brand is not whitelisted");
        brands[_brandId].isWhitelisted = false;
        emit BrandRemovedFromWhitelist(_brandId, brands[_brandId].manufacturer);
    }

    function registerProduct(string memory _name, string memory _details, bytes32 _brandId) public onlyManufacturer returns (bytes32) {
        require(brands[_brandId].manufacturer == msg.sender, "You do not own this brand");
        require(brands[_brandId].isWhitelisted, "Brand is not whitelisted");

        bytes32 uniqueHash = keccak256(abi.encodePacked(_name, _details, block.timestamp));
        bytes32 productId = keccak256(abi.encodePacked(_name, msg.sender, block.timestamp, productCounter));
        productCounter++;
        products[productId] = Product(productId, _name, _brandId, msg.sender, msg.sender, _details, uniqueHash);
        productHashes[uniqueHash] = productId;
        productOwners[productId].push(msg.sender);
        emit ProductRegistered(productId, _name, _brandId, msg.sender, _details, uniqueHash);
        return uniqueHash;
    }

    error productNotFound(string errorMessage);

    function requestOwnership(bytes32 _uniqueHash) public userRegistered {
        bytes32 productId = productHashes[_uniqueHash];
        if(productId==0){
            revert productNotFound({
                errorMessage:"Product Not found"
            });
        }
        require(products[productId].currentOwner != msg.sender, "Cannot request ownership from yourself");

        ownershipRequests[_uniqueHash] = OwnershipRequest(msg.sender, true);

        emit OwnershipRequested(productId, msg.sender, products[productId].currentOwner, _uniqueHash);
    }
    

    function approveOwnership(bytes32 _uniqueHash) public {
        bytes32 productId = productHashes[_uniqueHash];
        if(productId==0){
            revert productNotFound({
                errorMessage:"Product Not found"
            });
        }
        require(products[productId].currentOwner == msg.sender, "Only the current owner can approve the transfer");
        require(ownershipRequests[_uniqueHash].isPending, "No pending ownership request");

        address requester = ownershipRequests[_uniqueHash].requester;

       

        products[productId].currentOwner = requester;
        productOwners[productId].push(requester);

        ownershipRequests[_uniqueHash].isPending = false;

        if(users[requester].role==Role.Consumer){
            delete products[productId];
            delete productHashes[_uniqueHash];
            productCounter--;

        }

        emit OwnershipTransferred(productId, msg.sender, requester, _uniqueHash);
    }

    function verifyProduct(bytes32 _uniqueHash) public view returns (bool) {
        bytes32 productId = productHashes[_uniqueHash];
        if(productId==0){
            revert productNotFound({
                errorMessage:"Product Not found"
            });
        }

        address[] memory owners = productOwners[productId];
        bool flag = false;

        for (uint256 i = 0; i < owners.length; i++) {
            if (users[owners[i]].role == Role.Manufacturer) {
                bytes32 brandId = products[productId].brandId;
                if (brands[brandId].manufacturer == owners[i] && brands[brandId].isWhitelisted) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    }

    function getProductDetails(bytes32 _uniqueHash) public view returns (Product memory) {
        bytes32 _productId = productHashes[_uniqueHash];
        if(_productId ==0){
            revert productNotFound({
                errorMessage:"Product Not found"
            });
        }
        return products[_productId];
    }

    function getProductOwners(bytes32 _uniqueHash) public view returns (OwnerInfo[] memory) {
        bytes32 _productId = productHashes[_uniqueHash];
        if(_productId ==0){
            revert productNotFound({
                errorMessage:"Product Not found"
            });
        }
        address[] memory owners = productOwners[_productId];

        OwnerInfo[] memory ownersWithRoles = new OwnerInfo[](owners.length);

        for (uint256 i = 0; i < owners.length; i++) {
            ownersWithRoles[i] = OwnerInfo(users[owners[i]].role, owners[i]);
        }

        return ownersWithRoles;
    }
}