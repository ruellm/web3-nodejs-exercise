const Calculator = artifacts.require("Calculator");

contract('Calculator', function(accounts) {

  // Expected behavior - result is initialized to 10
  // Test Case#1
  it("should assert true", function() {
    var calculator;
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      return calculator.getResult.call();
    }).then(function (result) {
      assert.equal(result.valueOf(), 10, "Contract initialized with value NOT equal to 10!!!");
    });
  });

  // Test case#2 Checks if calls to add/subtract for ((Initial_Value + 10) - 5) = 15
  it("should add 10 and then substract 5 to get a result=15", function () {
    // Get the deployed instance
    var calculator;
    
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      return calculator.addToNumber(10)
    }).then(function () {
      return calculator.getResult.call();
    }).then(function (result) {

      assert.equal(result.toNumber(), 20, "Result after adding 10 should be 20");
      // Now substract 10
      return calculator.substractFromNumber(5);
    }).then(function () {
      return calculator.getResult.call();
    }).then(function (result) {
      assert.equal(result.toNumber(), 15, "Result after subtracting 5 should be 15");
    });
  });

  // Add Test Case#3 here
  // Test case#3 perform multiplication
  it("should call multiply with number", async function () {
    // Get the deployed instance
    var calculator = await Calculator.deployed();
    await calculator.multiplyWithNumber(10);      // calling transaction
    var result = await calculator.getResult.call();
    assert.equal(result.toNumber(), 150, "Result after multiplying 10 should be 150");
    var multipleResult = await calculator.getMultipleResult();
    console.log(multipleResult);

    /*
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      var result =  calculator.multiplyWithNumber(10);
      console.log(result);  // PRINTS a promise object, option is await()
    }).then(function () {
      return calculator.getResult.call();
    }).then(function (result) {
      assert.equal(result.toNumber(), 150, "Result after multiplying 10 should be 150");
    });*/

  });

  // Add Test Case#4 here
  // Test case#4 perform division
  it("should call division with number", function () {
    // Get the deployed instance
    var calculator;
    
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      return calculator.divideNumberBy(10);
    }).then(function () {
      return calculator.getResult.call();
    }).then(function (result) {
      assert.equal(result.toNumber(), 15, "Result after vision by 10 should be 15");
    });
  });

  // Add Test Case#4 here
  // Test case#5 perform double
  it("should call  double", function () {
    // Get the deployed instance
    var calculator;
    
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      var result = calculator.double();
    }).then(function () {
      return calculator.getResult.call();
  
    }).then(function (result) {
      assert.equal(result.toNumber(), 30, "2_Result after double should be 30");
    });
  });

  // Add Test Case#4 here
  // Test case#4 perform division
  it("should call half", function () {
    // Get the deployed instance
    var calculator;
    
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      return calculator.half();
    }).then(function () {
      return calculator.getResult.call();
    }).then(function (result) {
      assert.equal(result.toNumber(), 15, "Result after half by 10 should be 15");
    });
  });
});
