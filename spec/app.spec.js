const Add = require('../app');

describe("Add functionaly", () =>{
    it("calculates x + y = z", () =>{
        expect(Add(10,5)).toEqual(15)
    });
});